/**
 * YP Nova — contact form → Google Sheet + email notification.   (version 2)
 * Paste this whole file into Extensions → Apps Script of your Google Sheet.
 * Setup steps: docs/google-sheets/SETUP.md
 *
 * v2 changes (optional upgrade — v1 keeps working with the current website):
 *  - adds a "Preferred contact" column
 *  - ignores submissions where the hidden spam-trap field ("website") is filled
 *  - requires the consent box to have been ticked
 */
var NOTIFY_EMAIL = 'info@ypnova.com';   // who gets the "new enquiry" email
var SHEET_NAME = 'Enquiries';           // tab name (created automatically)

var HEADERS = ['Received', 'Name', 'Email', 'Company', 'Phone', 'Service', 'Industry', 'Budget', 'Message', 'Page', 'Preferred contact'];

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    var d = JSON.parse(e.postData.contents);
    if (d.website) return json({ result: 'success' });            // spam trap: accept silently, store nothing
    if (!d.name || !d.email || !d.message) throw new Error('Missing required fields');
    if (d.consent && d.consent !== 'yes') throw new Error('Consent not given');

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
    // Upgrade an existing v1 header row in place.
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight('bold');
    sheet.setFrozenRows(1);

    // safe() stops spreadsheet formulas being injected through the form
    sheet.appendRow([new Date(), safe(d.name), safe(d.email), safe(d.company), safe(d.phone),
                     safe(d.service), safe(d.industry), safe(d.budget), safe(d.message), safe(d.page),
                     safe(d.preferredContact)]);

    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      replyTo: String(d.email),
      subject: 'New website enquiry — ' + String(d.name) + (d.service ? ' (' + d.service + ')' : ''),
      body: ['Name: ' + d.name, 'Email: ' + d.email, 'Company: ' + (d.company || '-'), 'Phone: ' + (d.phone || '-'),
             'Preferred contact: ' + (d.preferredContact || '-'),
             'Service: ' + (d.service || '-'), 'Industry: ' + (d.industry || '-'), 'Budget: ' + (d.budget || '-'),
             '', String(d.message), '', 'Sheet: ' + ss.getUrl()].join('\n')
    });
    return json({ result: 'success' });
  } catch (err) {
    return json({ result: 'error', error: String(err) });
  } finally {
    try { lock.releaseLock(); } catch (ignore) {}
  }
}

function doGet() { return json({ result: 'ok', note: 'YP Nova enquiry endpoint is running.' }); }

function safe(v) { var s = String(v == null ? '' : v).slice(0, 5000); return /^[=+\-@]/.test(s) ? "'" + s : s; }
function json(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
