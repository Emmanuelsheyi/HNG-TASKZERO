document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  function showError(id, message) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = message;
    el.classList.remove('visually-hidden');
  }

  function clearErrors() {
    ['error-name','error-email','error-subject','error-message'].forEach(id => {
      const el = document.getElementById(id);
      if (el) { el.textContent = ''; el.classList.add('visually-hidden'); }
    });
    if(status) { status.textContent = ''; status.classList.add('visually-hidden'); }
  }

  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    const name = document.getElementById('full-name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    let valid = true;
    if (!name) { showError('error-name', 'Name is required'); valid = false; }
    if (!email) { showError('error-email','Email is required'); valid = false; }
    else if (!validateEmail(email)) { showError('error-email','Enter a valid email'); valid = false; }
    if (!subject) { showError('error-subject','Subject is required'); valid = false; }
    if (!message) { showError('error-message','Message is required'); valid = false; }
    else if (message.length < 10) { showError('error-message','Message must be at least 10 characters'); valid = false; }

    if (!valid) return;

    if(status) {
      status.textContent = 'Thanks — your message has been sent.';
      status.classList.remove('visually-hidden');
    }

    form.reset();
  });
});
