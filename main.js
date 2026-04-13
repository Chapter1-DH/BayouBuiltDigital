/* ============================================
   BAYOUBUILT DIGITAL — MAIN SCRIPT
   D & G Fuzion LLC DBA BayouBuilt Digital
   ============================================ */

// ── NAV TOGGLE ──────────────────────────────
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var links  = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', function () {
    var open = links.classList.toggle('nav-open');
    toggle.classList.toggle('nav-toggle--active');
    toggle.setAttribute('aria-expanded', String(open));
  });

  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      links.classList.remove('nav-open');
      toggle.classList.remove('nav-toggle--active');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

// ── ACTIVE NAV HIGHLIGHTING ON SCROLL ───────
(function () {
  var sections = document.querySelectorAll('section[id], .services-bg[id], .contact-bg[id]');
  var navLinks = document.querySelectorAll('.nav-links a');
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

// ── SCROLL TO TOP ───────────────────────────
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

// ── FORM SUBMISSION ─────────────────────────
(function () {
  var container = document.getElementById('contact-form');
  var link      = document.getElementById('contact-submit-btn');
  if (!container || !link) return;

  var emailTo = 'contact@bayoubuilt-digital.com';
  var fields  = container.querySelectorAll('input, textarea');

  function buildMailto() {
    var name     = (container.querySelector('#cf-name').value || '').trim();
    var business = (container.querySelector('#cf-business').value || '').trim();
    var phone    = (container.querySelector('#cf-phone').value || '').trim();
    var email    = (container.querySelector('#cf-email').value || '').trim();
    var message  = (container.querySelector('#cf-message').value || '').trim();

    var subject = 'New Project Inquiry from ' + name + ' — ' + business;
    var body    = 'Name: ' + name + '\n'
                + 'Business: ' + business + '\n'
                + 'Phone: ' + phone + '\n'
                + 'Email: ' + email + '\n\n'
                + message;

    link.href = 'mailto:' + emailTo
      + '?subject=' + encodeURIComponent(subject)
      + '&body='    + encodeURIComponent(body);
  }

  // Rebuild mailto href as user types
  fields.forEach(function (field) {
    field.addEventListener('input', buildMailto);
  });

  // Validate before navigating
  link.addEventListener('click', function (e) {
    var valid = true;
    fields.forEach(function (field) {
      if (!field.value.trim()) {
        field.classList.add('form-input--error');
        valid = false;
      } else {
        field.classList.remove('form-input--error');
      }
    });
    if (!valid) {
      e.preventDefault();
    }
  });
})();
