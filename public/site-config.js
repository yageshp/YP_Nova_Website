/*
 * YP Nova — site settings read by the website at runtime.
 * Since the site deploys from GitHub, change this file in the repository (public/site-config.js), not in
 * File Manager — a server-side edit would be overwritten by the next deployment.
 *
 * sheetsWebhookUrl:
 *   Paste the Google Apps Script "Web app URL" here (it ends with /exec).
 *   Contact-form enquiries are then saved to your Google Sheet and emailed to you.
 *   Leave it as '' and the form offers "Send by email" instead.
 *
 * ga4MeasurementId:
 *   Google Analytics 4 Measurement ID, e.g. 'G-ABC123XYZ9' (GA4 → Admin → Data streams → Web).
 *   Leave as '' to load no analytics at all.
 */
window.YPNOVA_CONFIG = {
  sheetsWebhookUrl: 'https://script.google.com/macros/s/AKfycbyIO0ztqlZW0-G8uP9UEMslCx_PRMdI4Tqdr-MdeSWCgw6iwALWesaIZGWJVmVXYY3Rlw/exec',
  ga4MeasurementId: '',
};
