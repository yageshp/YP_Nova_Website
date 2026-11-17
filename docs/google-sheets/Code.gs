/**
 * YP Nova — contact form → Google Sheet + email notification.   (version 3)
 * Paste this whole file into Extensions → Apps Script of your Google Sheet, Save, then
 * Deploy → Manage deployments → ✏️ (edit) → Version: "New version" → Deploy.
 * The web-app URL stays the same, so the website does not need any change.
 *
 * v3: the email links straight to the "Enquiries" tab, that tab is kept first in the spreadsheet,
 *     and the sheet is formatted (header, column widths, date format, wrapped messages, filter).
 * v2: "Preferred contact" column, spam-trap ("website") field ignored, consent required.
 */
var NOTIFY_EMAIL = 'info@ypnova.com';   // who gets the "new enquiry" email
var SHEET_NAME = 'Enquiries';           // tab name (created automatically)

var HEADERS = ['Received', 'Name', 'Email', 'Company', 'Phone', 'Preferred contact', 'Service', 'Industry', 'Budget', 'Message', 'Page'];
var WIDTHS  = [150,        160,    220,     160,       130,     130,                 190,       170,        110,      420,       260];

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    var d = JSON.parse(e.postData.contents);
    if (d.website) return json({ result: 'success' });            // spam trap: accept silently, store nothing
    if (!d.name || !d.email || !d.message) throw new Error('Missing required fields');
    if (d.consent && d.consent !== 'yes') throw new Error('Consent not given');

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = getEnquirySheet_(ss);

    sheet.appendRow([new Date(), safe(d.name), safe(d.email), safe(d.company), safe(d.phone), safe(d.preferredContact),
                     safe(d.service), safe(d.industry), safe(d.budget), safe(d.message), safe(d.page)]);
    var row = sheet.getLastRow();
    sheet.getRange(row, 1).setNumberFormat('dd mmm yyyy, hh:mm');
    sheet.getRange(row, 1, 1, HEADERS.length).setVerticalAlignment('top');
    sheet.getRange(row, 10).setWrap(true);

    var link = ss.getUrl() + '#gid=' + sheet.getSheetId();          // opens the Enquiries tab directly
    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      replyTo: String(d.email),
      subject: 'New website enquiry — ' + String(d.name) + (d.service ? ' (' + d.service + ')' : ''),
      body: ['Name: ' + d.name, 'Email: ' + d.email, 'Company: ' + (d.company || '-'), 'Phone: ' + (d.phone || '-'),
             'Preferred contact: ' + (d.preferredContact || '-'),
             'Service: ' + (d.service || '-'), 'Industry: ' + (d.industry || '-'), 'Budget: ' + (d.budget || '-'),
             '', String(d.message), '', 'All enquiries (Enquiries tab): ' + link].join('\n')
    });
    return json({ result: 'success' });
  } catch (err) {
    return json({ result: 'error', error: String(err) });
  } finally {
    try { lock.releaseLock(); } catch (ignore) {}
  }
}

/** Returns the Enquiries tab — created, moved to first position and formatted if needed. Older rows are re-mapped once. */
function getEnquirySheet_(ss) {
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME, 0);
  if (sheet.getIndex() !== 1) { ss.setActiveSheet(sheet); ss.moveActiveSheet(1); }

  var lastCol = Math.max(sheet.getLastColumn(), 1);
  var current = sheet.getRange(1, 1, 1, lastCol).getValues()[0].join('|');
  if (current !== HEADERS.join('|')) {
    if (sheet.getLastRow() > 1 && current.indexOf('Received') === 0) migrateOldRows_(sheet, current.split('|'));
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    formatSheet_(sheet);
  }
  return sheet;
}

/** v1/v2 rows had a different column order — move their values under the right v3 headers. */
function migrateOldRows_(sheet, oldHeaders) {
  var n = sheet.getLastRow() - 1;
  var old = sheet.getRange(2, 1, n, oldHeaders.length).getValues();
  var rows = old.map(function (r) {
    return HEADERS.map(function (h) { var i = oldHeaders.indexOf(h); return i >= 0 ? r[i] : ''; });
  });
  sheet.getRange(2, 1, n, Math.max(oldHeaders.length, HEADERS.length)).clearContent();
  sheet.getRange(2, 1, n, HEADERS.length).setValues(rows);
}

function formatSheet_(sheet) {
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, HEADERS.length)
    .setFontWeight('bold').setFontColor('#FFFFFF').setBackground('#10172D').setVerticalAlignment('middle');
  sheet.setRowHeight(1, 32);
  WIDTHS.forEach(function (w, i) { sheet.setColumnWidth(i + 1, w); });
  var rows = Math.max(sheet.getMaxRows() - 1, 1);
  sheet.getRange(2, 1, rows, 1).setNumberFormat('dd mmm yyyy, hh:mm');
  sheet.getRange(2, 10, rows, 1).setWrap(true);
  sheet.getRange(2, 1, rows, HEADERS.length).setVerticalAlignment('top');
  if (!sheet.getFilter()) sheet.getRange(1, 1, Math.max(sheet.getLastRow(), 2), HEADERS.length).createFilter();
}

/** Run once from the editor (select formatNow ▸ Run) to tidy the sheet without waiting for a new enquiry. */
function formatNow() {
  var sheet = getEnquirySheet_(SpreadsheetApp.getActiveSpreadsheet());
  formatSheet_(sheet);
}

function doGet() { return json({ result: 'ok', note: 'YP Nova enquiry endpoint is running.' }); }

function safe(v) { var s = String(v == null ? '' : v).slice(0, 5000); return /^[=+\-@]/.test(s) ? "'" + s : s; }
function json(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
