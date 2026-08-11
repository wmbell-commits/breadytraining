document.getElementById('trainingForm').addEventListener('submit', function(e){
 e.preventDefault();
 const f = new FormData(this);
 const courses = [...document.querySelectorAll('input[name="course"]:checked')].map(x => x.value);
 if (!courses.length) {
   alert('Please select at least one training type.');
   return;
 }
 const subject = 'B-Ready Training Request - ' + f.get('company');
 const body = [
  'B-READY TRAINING REQUEST',
  '',
  'Company: ' + f.get('company'),
  'Contact: ' + f.get('name'),
  'Email: ' + f.get('email'),
  'Phone: ' + (f.get('phone') || 'Not provided'),
  'Training location: ' + f.get('location'),
  'Approx. trainees: ' + f.get('trainees'),
  '',
  'Training requested: ' + courses.join(', '),
  'Program type: ' + f.get('program'),
  'Preferred date/timeframe: ' + (f.get('timeframe') || 'Not specified'),
  'Shift/scheduling needs: ' + (f.get('shift') || 'Not specified'),
  'Equipment make/model: ' + (f.get('equipment') || 'Not specified'),
  '',
  'Needs / goals:',
  f.get('goals') || 'Not provided'
 ].join('\n');
 document.getElementById('success').style.display = 'block';
 window.location.href = 'mailto:wayne@breadytraining.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
});
