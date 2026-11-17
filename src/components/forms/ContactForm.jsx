import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { isPrerender } from '@/utils/boot';
import { ArrowUpRight, CheckCircle2, AlertCircle, Loader2, Mail, Info } from 'lucide-react';
import { serviceOptions } from '@/data/services';
import { industries } from '@/data/industries';
import { company } from '@/config/company';
import { submitEnquiry, buildMailto, isBackendConfigured } from '@/services/contact';
import { track } from '@/services/analytics';

const empty = { name: '', email: '', company: '', phone: '', service: '', industry: '', budget: '', message: '', preferred: 'Email', consent: false, website: '' };
export const CONTACT_METHODS = ['Email', 'Phone call', 'WhatsApp'];
/** Spam protection: a hidden honeypot field (`website`) and a minimum time before a submission is accepted. */
const MIN_FILL_MS = 3000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Please enter your full name.';
  if (!form.email.trim()) errors.email = 'Please enter your work email.';
  else if (!EMAIL_RE.test(form.email.trim())) errors.email = 'Please enter a valid email address, e.g. name@company.com.';
  if (form.preferred !== 'Email' && !form.phone.trim()) errors.phone = `Please add a phone number so we can contact you by ${form.preferred === 'WhatsApp' ? 'WhatsApp' : 'phone'}.`;
  else if (form.phone.trim() && !/^[+()\d\s-]{7,20}$/.test(form.phone.trim())) errors.phone = 'Please enter a valid phone number, or leave this blank.';
  if (!form.service) errors.service = 'Please choose the service you need.';
  if (!form.message.trim()) errors.message = 'Please describe your project or requirement.';
  else if (form.message.trim().length < 10) errors.message = 'Please add a little more detail (at least 10 characters).';
  if (!form.consent) errors.consent = 'Please confirm that we may contact you about this enquiry.';
  return errors;
}

function Field({ id, label, required, error, hint, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-navy">
        {label}{' '}
        {required ? <span className="text-brand" aria-hidden="true">*</span> : <span className="font-normal text-muted">(optional)</span>}
      </label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="text-[13px] text-muted">{hint}</p>}
      {error && (
        <p id={`${id}-error`} data-testid={`${id}-error`} className="flex items-start gap-1.5 text-[13px] font-medium text-[#B4182F]">
          <AlertCircle className="w-4 h-4 mt-px shrink-0" aria-hidden="true" /> {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ state: 'idle', error: '' });
  // Whether online submission is configured is only known in the browser (site-config.js), so the
  // first render — and the pre-rendered HTML — is neutral (null) and the real value is applied after mount.
  const [online, setOnline] = useState(null);
  useEffect(() => {
    if (!isPrerender()) setOnline(isBackendConfigured);
  }, []);
  const submitting = useRef(false); // guards against double submission between renders
  const startedAt = useRef(0);
  useEffect(() => { startedAt.current = Date.now(); }, []);
  const formRef = useRef(null);
  const statusRef = useRef(null);

  const update = (key) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const props = (key, required) => ({
    id: `contact-${key}`,
    name: key,
    value: form[key],
    onChange: update(key),
    'aria-required': required || undefined,
    'aria-invalid': errors[key] ? 'true' : undefined,
    'aria-describedby': errors[key] ? `contact-${key}-error` : undefined,
    className: 'field',
  });

  const submit = async (e) => {
    e.preventDefault();
    if (submitting.current) return;
    const found = validate(form);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      setStatus({ state: 'idle', error: '' });
      formRef.current?.querySelector(`#contact-${firstInvalid}`)?.focus();
      return;
    }
    submitting.current = true;
    setStatus({ state: 'submitting', error: '' });
    // Likely bot (honeypot filled or submitted implausibly fast): do not send anything.
    if (form.website || Date.now() - startedAt.current < MIN_FILL_MS) {
      submitting.current = false;
      setStatus({ state: 'error', error: 'Please take a moment to review your details, then send again.' });
      startedAt.current = Date.now() - MIN_FILL_MS + 1500;
      return;
    }
    try {
      await submitEnquiry(form);
      track('generate_lead', { service: form.service || 'not set', industry: form.industry || 'not set', preferred_contact: form.preferred });
      setStatus({ state: 'success', error: '' });
      setForm(empty); // cleared only after the backend confirmed receipt
    } catch (err) {
      // entered data is kept so nothing has to be re-typed
      setStatus({ state: 'error', error: err.message });
      requestAnimationFrame(() => statusRef.current?.focus());
    } finally {
      submitting.current = false;
    }
  };

  if (status.state === 'success') {
    return (
      <div data-testid="contact-success" role="status" className="flex flex-col items-start gap-4 py-6">
        <span className="inline-flex w-14 h-14 rounded-2xl bg-[#E6F6EC] text-[#11693A] items-center justify-center" aria-hidden="true">
          <CheckCircle2 className="w-7 h-7" />
        </span>
        <h3 className="h-section !text-3xl">Enquiry received.</h3>
        <p className="text-muted max-w-md leading-relaxed">
          Thank you — your project enquiry has reached us. We will get back to you using your preferred contact method. For anything
          urgent, call <a href={company.phone.href} className="font-semibold text-brand underline underline-offset-4">{company.phone.display}</a> or{' '}
          <a href={company.whatsapp.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand underline underline-offset-4">message us on WhatsApp</a>.
        </p>
        <button type="button" onClick={() => setStatus({ state: 'idle', error: '' })}
          className="inline-flex items-center min-h-[44px] font-semibold text-brand underline underline-offset-4">
          Send another enquiry
        </button>
      </div>
    );
  }

  const busy = status.state === 'submitting';
  const mailto = buildMailto(form);

  return (
    <form ref={formRef} onSubmit={submit} noValidate data-testid="contact-form" aria-busy={busy} className="relative grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-5">
      {online === false && (
        <div data-testid="contact-backend-notice" className="sm:col-span-2 flex items-start gap-3 rounded-2xl border border-[#F3D9A4] bg-[#FFF8E8] p-4 text-sm text-[#6B4300]">
          <Info className="w-5 h-5 mt-0.5 shrink-0" aria-hidden="true" />
          <p>
            Online submission is not connected on this site yet. Fill in the form and choose <strong>Send by email</strong> to
            open your email app with the details ready to send, or contact us directly.
          </p>
        </div>
      )}

      <Field id="contact-name" label="Full Name" required error={errors.name}>
        <input type="text" autoComplete="name" data-testid="contact-name" {...props('name', true)} />
      </Field>
      <Field id="contact-company" label="Company Name" error={errors.company}>
        <input type="text" autoComplete="organization" data-testid="contact-company" {...props('company')} />
      </Field>
      <Field id="contact-email" label="Work Email" required error={errors.email}>
        <input type="email" inputMode="email" autoComplete="email" data-testid="contact-email-input" placeholder="name@company.com" {...props('email', true)} />
      </Field>
      <Field id="contact-phone" label="Phone Number" required={form.preferred !== 'Email'} error={errors.phone}>
        <input type="tel" inputMode="tel" autoComplete="tel" data-testid="contact-phone-input" {...props('phone', form.preferred !== 'Email')} />
      </Field>
      <Field id="contact-industry" label="Industry" error={errors.industry}>
        <select data-testid="contact-industry" {...props('industry')}>
          <option value="">Select an industry…</option>
          {industries.map((i) => <option key={i.slug} value={i.name}>{i.name}</option>)}
          <option value="Other">Other</option>
        </select>
      </Field>
      <Field id="contact-service" label="Required Service" required error={errors.service}>
        <select data-testid="contact-service" {...props('service', true)}>
          <option value="">Select a service…</option>
          {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </Field>
      <div className="sm:col-span-2">
        <Field id="contact-message" label="Project Description" required error={errors.message}>
          <textarea rows={5} data-testid="contact-message" placeholder="What would you like to build or improve? Who will use it?" {...props('message', true)} className="field resize-y min-h-[140px]" />
        </Field>
      </div>
      <Field id="contact-budget" label="Approximate Project Budget" error={errors.budget} hint="A rough figure or range helps us suggest the right scope.">
        <input type="text" data-testid="contact-budget" {...props('budget')} aria-describedby="contact-budget-hint" />
      </Field>
      <fieldset className="flex flex-col gap-1.5" data-testid="contact-preferred">
        <legend className="text-sm font-semibold text-navy mb-1.5">Preferred Contact Method</legend>
        <div className="flex flex-wrap gap-2">
          {CONTACT_METHODS.map((m) => (
            <label key={m} className={`inline-flex items-center gap-2 min-h-[44px] px-4 rounded-full border cursor-pointer text-[15px] font-medium ${form.preferred === m ? 'border-purple bg-lavender text-brand' : 'border-[#D9D5E6] text-ink'}`}>
              <input type="radio" name="preferred" value={m} checked={form.preferred === m} onChange={update('preferred')} className="accent-[#6028D7]" />
              {m}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Honeypot: hidden from people and assistive tech; bots that fill every field are ignored. */}
      <div aria-hidden="true" className="absolute left-0 top-0 w-px h-px overflow-hidden opacity-0 pointer-events-none [clip:rect(0,0,0,0)]">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input id="contact-website" type="text" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={update('website')} />
      </div>

      <div className="sm:col-span-2 flex flex-col gap-1.5">
        <label htmlFor="contact-consent" className="flex items-start gap-3 text-[14px] leading-relaxed text-ink cursor-pointer">
          <input id="contact-consent" type="checkbox" checked={form.consent} onChange={update('consent')} data-testid="contact-consent"
            aria-invalid={errors.consent ? 'true' : undefined} aria-describedby={errors.consent ? 'contact-consent-error' : undefined}
            className="mt-1 w-5 h-5 shrink-0 accent-[#6028D7]" />
          <span>
            I agree that YP Nova may use these details to respond to my enquiry, as described in the{' '}
            <Link to="/privacy" className="font-semibold text-brand underline underline-offset-4">Privacy Policy</Link>. <span className="text-brand" aria-hidden="true">*</span>
          </span>
        </label>
        {errors.consent && (
          <p id="contact-consent-error" data-testid="contact-consent-error" className="flex items-start gap-1.5 text-[13px] font-medium text-[#B4182F]">
            <AlertCircle className="w-4 h-4 mt-px shrink-0" aria-hidden="true" /> {errors.consent}
          </p>
        )}
      </div>

      <div className="sm:col-span-2" aria-live="polite">
        {status.state === 'error' && (
          <div ref={statusRef} tabIndex={-1} role="alert" data-testid="contact-error" className="flex items-start gap-3 rounded-2xl border border-[#F2C2CB] bg-[#FFF1F3] p-4 text-sm text-[#8E1226]">
            <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" aria-hidden="true" />
            <div>
              <p className="font-semibold">Your enquiry was not sent.</p>
              <p className="mt-1">{status.error}</p>
              <p className="mt-2">
                Your details are still in the form. You can try again, or{' '}
                <a href={mailto} className="font-semibold underline underline-offset-4">send them by email instead</a>.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="sm:col-span-2 flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-[13px] text-muted max-w-xs">
          Fields marked <span className="text-brand" aria-hidden="true">*</span><span className="sr-only">with an asterisk</span> are required.
          We use your details only to respond to this enquiry.
        </p>
        {online !== false ? (
          <button type="submit" disabled={busy} data-testid="contact-submit"
            className="inline-flex items-center justify-center gap-2 min-h-[52px] grad-button text-white rounded-full px-7 text-base font-semibold shadow-cta hover:shadow-[0_12px_32px_rgba(96,40,215,0.4)] transition-shadow disabled:opacity-70 disabled:cursor-not-allowed">
            {busy ? (<><Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" /> Sending…</>) : (<>Send Project Enquiry <ArrowUpRight className="w-5 h-5" aria-hidden="true" /></>)}
          </button>
        ) : (
          <button type="button" data-testid="contact-submit-email"
            onClick={() => {
              const found = validate(form);
              setErrors(found);
              const firstInvalid = Object.keys(found)[0];
              if (firstInvalid) formRef.current?.querySelector(`#contact-${firstInvalid}`)?.focus();
              else window.location.href = mailto;
            }}
            className="inline-flex items-center justify-center gap-2 min-h-[52px] grad-button text-white rounded-full px-7 text-base font-semibold shadow-cta">
            <Mail className="w-5 h-5" aria-hidden="true" /> Send by email
          </button>
        )}
      </div>
    </form>
  );
}
