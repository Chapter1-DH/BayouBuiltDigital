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

// ACTIVE NAV HIGHLIGHTING ON SCROLL
(function () {
  const sections = document.querySelectorAll('section[id], .services-bg[id], .contact-bg[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  if (!sections.length || !navLinks.length) return;

  function updateActive() {
    var scrollY = window.scrollY + 120;
    var current = '';
    sections.forEach(function (section) {
      if (section.offsetTop <= scrollY) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();
})();

// SCROLL TO TOP BUTTON
(function () {
  var btn = document.querySelector('.scroll-top');
  if (!btn) return;

  window.addEventListener('scroll', function () {
    btn.classList.toggle('visible', window.scrollY > 600);
  }, { passive: true });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// FORM SUBMISSION
async function handleFormSubmit(e, btnId, successText) {
  e.preventDefault();
  const form      = e.target;
  const btn       = document.getElementById(btnId);
  const formId    = form.dataset.formId;
  const formEmail = form.dataset.formEmail;

  sanitizeForm(form);

  // Determine Formspree endpoint
  let endpoint;
  if (formEmail) {
    endpoint = 'https://formspree.io/' + formEmail;
  } else if (formId && !formId.startsWith('YOUR_')) {
    endpoint = 'https://formspree.io/f/' + formId;
  } else {
    btn.textContent = 'Coming Soon — Check Back Shortly!';
    btn.disabled    = true;
    btn.style.opacity = '0.65';
    return;
  }

  btn.textContent = 'Sending…';
  btn.disabled    = true;

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });

    if (res.ok) {
      // Show success confirmation
      var successEl = document.getElementById('form-success');
      if (successEl) {
        form.hidden = true;
        successEl.hidden = false;
      } else {
        btn.textContent    = successText;
        btn.style.opacity  = '0.65';
        form.querySelectorAll('input, select, textarea').forEach(el => el.disabled = true);
      }
    } else {
      btn.textContent = 'Something went wrong — try again';
      btn.disabled    = false;
    }
  } catch {
    btn.textContent = 'Connection error — try again';
    btn.disabled    = false;
  }
}
