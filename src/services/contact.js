import axios from 'axios';
import { company } from '@/config/company';

/**
 * Contact enquiry service.
 *
 * Existing backend contract (recovered from the original build, unchanged):
 *   POST {REACT_APP_BACKEND_URL}/api/contact
 *   JSON body: { name, email, company, service, budget, message }
 *   Error responses may carry { detail: string }.
 *
 * The backend is NOT part of this repository. The new optional form fields
 * (phone, industry) are appended to `message` so they reach the team without
 * changing the contract. If the backend is extended to accept them as separate
 * fields, set SEND_EXTENDED_FIELDS to true.
 */
const BACKEND_URL = (process.env.REACT_APP_BACKEND_URL || '').replace(/\/+$/, '');
const SEND_EXTENDED_FIELDS = false;

/**
 * Google Sheets delivery (optional, takes priority when set).
 * The URL of a Google Apps Script web app, read at runtime from public/site-config.js
 * (window.YPNOVA_CONFIG.sheetsWebhookUrl) so it can be changed on the server without a rebuild,
 * or from REACT_APP_SHEETS_WEBHOOK_URL at build time. Script source: docs/google-sheets/Code.gs
 */
const runtimeConfig = (typeof window !== 'undefined' && window.YPNOVA_CONFIG) || {};
const SHEETS_URL = String(runtimeConfig.sheetsWebhookUrl || process.env.REACT_APP_SHEETS_WEBHOOK_URL || '').trim();
const isSheetsConfigured = /^https:\/\/script\.google\.com\/macros\/s\/.+\/exec$/.test(SHEETS_URL)
  || (process.env.NODE_ENV !== 'production' && Boolean(SHEETS_URL));

/** True when enquiries can be submitted online (Google Sheets or the API backend). */
export const isBackendConfigured = isSheetsConfigured || Boolean(BACKEND_URL);
export const API = `${BACKEND_URL}/api`;

function composeMessage(form) {
  const extras = [
    form.phone && `Phone: ${form.phone}`,
    form.industry && `Industry: ${form.industry}`,
    form.preferred && `Preferred contact method: ${form.preferred}`,
  ].filter(Boolean);
  return extras.length ? `${form.message}\n\n---\n${extras.join('\n')}` : form.message;
}

export function buildPayload(form) {
  const payload = {
    name: form.name.trim(),
    email: form.email.trim(),
    company: form.company.trim(),
    service: form.service,
    budget: form.budget.trim(),
    message: composeMessage({ ...form, message: form.message.trim() }),
  };
  if (SEND_EXTENDED_FIELDS) {
    payload.message = form.message.trim();
    payload.phone = form.phone.trim();
    payload.industry = form.industry;
  }
  return payload;
}

/** Resolves only on a 2xx response from the backend; throws an Error with a readable message otherwise. */
async function submitToSheets(form) {
  const generic = 'We could not send your enquiry. Please try again, or contact us by phone or email.';
  let res;
  try {
    // text/plain keeps this a "simple" cross-origin request — Apps Script cannot answer CORS preflights.
    res = await fetch(SHEETS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        name: form.name.trim(),
        email: form.email.trim(),
        company: form.company.trim(),
        phone: form.phone.trim(),
        service: form.service,
        industry: form.industry,
        budget: form.budget.trim(),
        preferredContact: form.preferred || 'Email',
        // Also included in the message so a not-yet-updated Apps Script still records it.
        message: `${form.message.trim()}\n\nPreferred contact method: ${form.preferred || 'Email'}`,
        consent: form.consent ? 'yes' : 'no',
        website: form.website || '',
        page: window.location.href,
      }),
      redirect: 'follow',
    });
  } catch (err) {
    throw new Error('We could not reach the server. Please check your connection and try again, or contact us by phone or email.');
  }
  let data = null;
  try { data = await res.json(); } catch (err) { /* not JSON → treated as failure below */ }
  // Success is reported only when the script confirms the row was saved.
  if (!res.ok || !data || data.result !== 'success') throw new Error(generic);
}

export async function submitEnquiry(form) {
  if (!isBackendConfigured) {
    throw new Error('The online enquiry service is not configured.');
  }
  if (isSheetsConfigured) return submitToSheets(form);
  try {
    await axios.post(`${API}/contact`, buildPayload(form), { timeout: 20000 });
  } catch (err) {
    const detail = err?.response?.data?.detail;
    let message = 'We could not send your enquiry. Please try again, or contact us by phone or email.';
    if (typeof detail === 'string' && detail) message = detail;
    else if (!err?.response) message = 'We could not reach the server. Please check your connection and try again, or contact us by phone or email.';
    throw new Error(message);
  }
}

/** mailto: link carrying the enquiry — the working fallback when no backend is available. */
export function buildMailto(form) {
  const header = [
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    form.company && `Company: ${form.company}`,
    form.phone && `Phone: ${form.phone}`,
    form.industry && `Industry: ${form.industry}`,
    form.service && `Service required: ${form.service}`,
    form.budget && `Approximate budget: ${form.budget}`,
    form.preferred && `Preferred contact method: ${form.preferred}`,
  ].filter(Boolean);
  const lines = [...header, '', form.message];
  const subject = `Project enquiry${form.service ? ` — ${form.service}` : ''}`;
  return `${company.email.href}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
}
