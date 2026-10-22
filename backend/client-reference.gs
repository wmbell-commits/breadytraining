/**
 * B-Ready client references -> Google Sheet -> XLSX email snapshot.
 * Setup: run setup() once, then Deploy > New deployment > Web app.
 * Execute as: Me; Who has access: Anyone.
 * Copy deployment /exec URL into client-reference-backend.js.
 */
const OWNER_EMAIL = 'wayne@breadytraining.com';
const SHEET_NAME = 'References';
const HEADERS = [
  'Submitted At','Approval Status','Full Name','Job Title / Role','Company / Organization',
  'Email (Private)','Phone (Private)','Professional Relationship','Character Reference',
  'Preferred Public Attribution','Permission to Publish','Approved Text / Edits',
  'Date Approved','Published'
];
function setup() {
  const props = PropertiesService.getScriptProperties();
  if (!props.getProperty('SPREADSHEET_ID')) {
    const ss = SpreadsheetApp.create('B-Ready Client References — Master');
    const sh = ss.getActiveSheet().setName(SHEET_NAME);
    sh.appendRow(HEADERS);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, HEADERS.length).setBackground('#080808').setFontColor('#ffc400').setFontWeight('bold');
    sh.getRange('B2:B1000').setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(['Pending','Approved','Declined'],true).build());
    sh.getRange('N2:N1000').setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(['No','Yes'],true).build());
    sh.autoResizeColumns(1, HEADERS.length);
    sh.setColumnWidth(9, 420);
    props.setProperty('SPREADSHEET_ID', ss.getId());
    Logger.log('Master sheet: ' + ss.getUrl());
  } else { Logger.log('Existing sheet: ' + SpreadsheetApp.openById(props.getProperty('SPREADSHEET_ID')).getUrl()); }
}
function doPost(e) {
  const p = (e && e.parameter) || {};
  if (p.website || p._honey) return response_('Thank you.');
  const name = clean_(p.full_name,120), company = clean_(p.company,150);
  const email = clean_(p.email,180), reference = clean_(p.reference,3000);
  const relation = clean_(p.relationship,100);
  const permission = clean_(p.permission,10);
  if (!name || !company || !email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/) ||
      reference.length < 20 || !relation || permission !== 'yes') {
    return response_('Your submission was incomplete. Please return to the form and try again.');
  }
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const id = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
    if (!id) throw new Error('Run setup() first');
    const ss = SpreadsheetApp.openById(id);
    const sh = ss.getSheetByName(SHEET_NAME);
    const row = [
      new Date(), 'Pending', safe_(name), safe_(clean_(p.job_title,120)), safe_(company),
      safe_(email), safe_(clean_(p.phone,50)), safe_(relation), safe_(reference),
      safe_(clean_(p.attribution,120)), 'Yes', '', '', 'No'
    ];
    sh.appendRow(row);
    const last=sh.getLastRow();
    sh.getRange(last,1).setNumberFormat('yyyy-mm-dd hh:mm');
    const url='https://docs.google.com/spreadsheets/d/'+id+'/export?format=xlsx';
    const token=ScriptApp.getOAuthToken();
    const result=UrlFetchApp.fetch(url,{headers:{Authorization:'Bearer '+token},muteHttpExceptions:true});
    if (result.getResponseCode() === 200) {
      const attachment=result.getBlob().setName('B-Ready_Client_References.xlsx');
      MailApp.sendEmail({to:OWNER_EMAIL, subject:'New B-Ready character reference — '+name,
        body:'A new client reference was added with status Pending.\n\nFrom: '+name+'\nCompany: '+company+'\n\nReview and mark Approved or Declined in the master spreadsheet:\n'+ss.getUrl()+'\n\nThe latest Excel workbook is attached.',
        attachments:[attachment]});
    } else {
      MailApp.sendEmail(OWNER_EMAIL,'New B-Ready character reference — spreadsheet link',
      'The row was saved, but Excel export failed. Review it here: '+ss.getUrl());
    }
    return response_('Thank you for sharing your reference. It has been received privately by B-Ready Training.');
  } finally { lock.releaseLock(); }
}
function clean_(value,max) {return String(value||'').trim().slice(0,max);}
function safe_(value) {return /^[=+@\-\t\r]/.test(value) ? "'"+value : value;}
function response_(message) {
 return HtmlService.createHtmlOutput('<!doctype html><html><meta name="viewport" content="width=device-width,initial-scale=1"><title>B-Ready Training</title><body style="font-family:Arial;background:#f4f4f1;margin:0"><div style="background:#080808;color:#ffc400;padding:30px;font-weight:900">B-READY TRAINING</div><main style="max-width:660px;margin:55px auto;background:white;border-top:7px solid #ffc400;padding:34px;border-radius:14px"><h1>Reference Submission</h1><p>'+message+'</p><p><a href="https://breadytraining.com/">Return to B-Ready Training</a></p></main></body></html>');
}
