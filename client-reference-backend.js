/* B-Ready: add your deployed Google Apps Script /exec URL below.
 * While empty, reference submissions continue through the existing email form.
 * The Apps Script writes to a private Sheet and emails an Excel attachment.
 */
const WEB_APP_URL = '';
if (WEB_APP_URL.startsWith('https://script.google.com/macros/s/') && WEB_APP_URL.endsWith('/exec')) {
  const form = document.getElementById('referenceForm');
  form.action = WEB_APP_URL;
  const mapping = {
    'Full name':'full_name','Job title or role':'job_title',
    'Company or organization':'company','Reply email':'email',
    'Phone':'phone','Professional relationship':'relationship',
    'Character reference':'reference','Preferred public attribution':'attribution',
    'Permission to publish':'permission'
  };
  for (const input of form.querySelectorAll('[name]')) {
    if (mapping[input.name]) input.name = mapping[input.name];
    if (input.name === 'permission') input.value = 'yes';
    if (input.name.startsWith('_')) input.disabled = true;
  }
}
