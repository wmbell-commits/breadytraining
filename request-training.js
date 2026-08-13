document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('trainingForm');
  const success = document.getElementById('success');

  if (new URLSearchParams(window.location.search).get('submitted') === '1') {
    success.style.display = 'block';
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  form.addEventListener('submit', function (e) {
    const courses = [...document.querySelectorAll('input[name="course"]:checked')];

    if (!courses.length) {
      e.preventDefault();
      alert('Please select at least one training type.');
      return;
    }

    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    button.textContent = 'SENDING...';
  });
});
