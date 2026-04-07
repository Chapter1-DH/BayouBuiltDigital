// NAV TOGGLE
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('nav-open');
    toggle.classList.toggle('nav-toggle--active');
    toggle.setAttribute('aria-expanded', String(open));
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('nav-open');
      toggle.classList.remove('nav-toggle--active');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

// INPUT SANITIZATION — strips HTML tags and trims whitespace
function sanitizeInput(value) {
  return value
    .trim()
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

function sanitizeForm(form) {
  form.querySelectorAll('input[type="text"], input[type="tel"], input[type="email"], textarea').forEach(el => {
    el.value = sanitizeInput(el.value);
  });
}

// FORM SUBMISSION
async function handleFormSubmit(e, btnId, successText) {
  e.preventDefault();
  const form   = e.target;
  const btn    = document.getElementById(btnId);
  const formId = form.dataset.formId;

  sanitizeForm(form);

  if (!formId || formId.startsWith('YOUR_')) {
    btn.textContent = 'Coming Soon — Check Back Shortly!';
    btn.disabled    = true;
    btn.style.opacity = '0.65';
    return;
  }

  btn.textContent = 'Sending…';
  btn.disabled    = true;

  try {
    const res = await fetch('https://formspree.io/f/' + formId, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });

    if (res.ok) {
      btn.textContent    = successText;
      btn.style.opacity  = '0.65';
      form.querySelectorAll('input, select, textarea').forEach(el => el.disabled = true);
    } else {
      btn.textContent = 'Something went wrong — try again';
      btn.disabled    = false;
    }
  } catch {
    btn.textContent = 'Connection error — try again';
    btn.disabled    = false;
  }
}
