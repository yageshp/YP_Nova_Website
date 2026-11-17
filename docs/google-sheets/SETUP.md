# Connect the contact form to Google Sheets (about 10 minutes)

Every enquiry is added as a row in your Google Sheet **and** emailed to you.

1. Sign in to the Google account that should own the enquiries. Go to https://sheets.new and name the sheet "YP Nova Enquiries".
2. In the sheet: **Extensions → Apps Script**. Delete the sample code, paste everything from `Code.gs`, and click **Save**.
   - To be notified at a different address, change `NOTIFY_EMAIL` on line 6.
3. Click **Deploy → New deployment**. Click the gear icon → **Web app**, then set:
   - Execute as: **Me**
   - Who has access: **Anyone**
   Click **Deploy**, then **Authorize access**, choose your account and allow. (If Google shows
   "Google hasn't verified this app", click **Advanced → Go to … (unsafe)** — it is your own script.)
4. Copy the **Web app URL**. It looks like `https://script.google.com/macros/s/AKfy…/exec`.
5. In MilesWeb File Manager open `public_html/site-config.js`, click **Edit**, and paste the URL between the quotes:
   `sheetsWebhookUrl: 'https://script.google.com/macros/s/AKfy…/exec',` — then **Save**.
6. Open your website's Contact page, hard-refresh (Ctrl/Cmd + Shift + R) and send a test enquiry.
   A new row should appear in the "Enquiries" tab and an email should arrive.

**If you change the script later:** Deploy → Manage deployments → pencil icon → Version: **New version** → Deploy.
The URL stays the same. (Choosing "New deployment" instead creates a different URL.)

## Updating to version 3 (recommended)
Version 3 opens the email link directly on the **Enquiries** tab, keeps that tab first, and formats the sheet (navy header, column widths,
readable dates, wrapped messages, filter). Existing rows are moved into the new column order automatically.
1. Open the sheet → **Extensions → Apps Script** → select all the old code → paste the whole of `Code.gs` (v3) → **Save**.
2. **Deploy → Manage deployments → ✏️ → Version: New version → Deploy.** (Not "New deployment" — that would change the URL.)
3. Optional: in the editor choose the function **formatNow** in the toolbar → **Run** to tidy the sheet straight away.
4. You may delete the empty **Sheet1** tab (right-click → Delete) — enquiries are only written to **Enquiries**.

**Phone alerts:** install the Gmail app for the notified address and enable notifications, or in the sheet
use Tools → Notification settings.

**Limits:** a free Google account can send about 100 notification emails a day; rows are still saved beyond that.
The URL is visible in the website's code, so treat the sheet as an inbox that could receive spam.
