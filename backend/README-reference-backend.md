# B-Ready references: Excel-by-email setup

The website is a static GitHub Pages site. It cannot privately write to a workbook or send updated workbook attachments on its own. This Google Apps Script is a small backend that creates and updates a private Google Sheet, then emails an up-to-date Excel (.xlsx) copy to wayne@breadytraining.com after each submitted reference.

## One-time connection (requires owner Google authorization)
1. Sign in with the Google account where you want the private reference sheet stored. Open https://script.google.com/home/projects/create
2. Replace the default Code.gs contents with the file `backend/client-reference.gs` from this repository. Save.
3. In the Apps Script editor, choose the function `setup`, press Run, and approve the spreadsheet, Drive/export, and email permissions. Open the Execution log for your private Master Sheet URL.
4. Choose **Deploy > New deployment > Web app**. Set **Execute as: Me** and **Who has access: Anyone** (because clients aren't required to log in). Deploy and copy the URL ending in `/exec`.
5. In `client-reference-backend.js`, replace the empty value of `WEB_APP_URL` with that exact /exec URL. Commit the file. After site deployment, new references will be sent to the script.
6. Test with a clearly labeled test reference, confirm it appears as **Pending** in your Google Sheet, and verify a complete .xlsx attachment arrives at wayne@breadytraining.com.

## Workflow
- Each submission appends a row and emails the **entire latest workbook**, not just the new row.
- In the private master Google Sheet, set Approval Status = Approved or Declined; optionally enter Approved Text / Edits, Date Approved and Published.
- Changes you make to Approval Status are in Google Sheets. The attached Excel files are snapshots only; editing an emailed copy will NOT update the private master. After approving rows, you can download and send the latest Excel sheet for the website ticker.
- Email and phone are private; never show these in the website ticker.
- The web app endpoint is public and may attract spam. The form has a hidden honeypot and server-side checks, but this is not a full anti-spam solution. If spam becomes a problem, add CAPTCHA or an authenticated backend.

## Important
Until the Web App URL is installed, the public form keeps its existing FormSubmit email workflow. FormSubmit emails individual form responses, not Excel attachments. The site navigation and reviews page remain unchanged.
