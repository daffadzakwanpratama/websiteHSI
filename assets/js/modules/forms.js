/**
 * Forms Module
 * Validates the contact and consultation forms, blocks basic spam, and hands the
 * message over to WhatsApp (the site has no backend to receive form data).
 */

(function () {
  const WHATSAPP_NUMBER = '62895626779601';
  const MIN_FILL_MS = 3000;
  const COOLDOWN_MS = 60000;
  const COOLDOWN_KEY = 'gesid:lastFormSubmit';
  const MAX_VALUE_LENGTH = 1000;

  const FORMS = {
    contactForm: {
      successId: 'contactSuccess',
      heading: 'Halo Gesid Halal Center, saya ingin berkonsultasi.'
    },
    consultForm: {
      successId: 'formSuccess',
      heading: 'Halo Gesid Halal Center, saya ingin konsultasi layanan halal.'
    }
  };

  function clean(value) {
    return String(value)
      .replace(/<[^>]*>/g, '')
      .replace(/[<>]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, MAX_VALUE_LENGTH);
  }

  function labelFor(form, field) {
    const label = field.id && form.querySelector('label[for="' + field.id + '"]');
    const text = label ? label.textContent : field.name;
    return text.replace(/\*/g, '').replace(/\s+/g, ' ').trim();
  }

  function displayValue(field) {
    if (field.tagName === 'SELECT') {
      return field.options[field.selectedIndex] ? field.options[field.selectedIndex].text : '';
    }
    return field.value;
  }

  function buildMessage(form, heading) {
    const lines = [heading, ''];
    form.querySelectorAll('input:not([type="hidden"]):not([data-honeypot]), select, textarea').forEach(function (field) {
      const value = clean(displayValue(field));
      if (value) lines.push(labelFor(form, field) + ': ' + value);
    });
    return lines.join('\n');
  }

  function isCoolingDown() {
    try {
      const last = Number(localStorage.getItem(COOLDOWN_KEY));
      return last && Date.now() - last < COOLDOWN_MS;
    } catch (e) {
      return false;
    }
  }

  function markSubmitted() {
    try {
      localStorage.setItem(COOLDOWN_KEY, String(Date.now()));
    } catch (e) {
      // Storage unavailable (private mode); the honeypot and timing checks still apply.
    }
  }

  function showError(form, message) {
    let note = form.querySelector('[data-form-error]');
    if (!note) {
      note = document.createElement('p');
      note.setAttribute('data-form-error', '');
      note.setAttribute('role', 'alert');
      note.className = 'text-sm text-center text-red-500 font-semibold';
      form.appendChild(note);
    }
    note.textContent = message;
  }

  function initForms() {
    Object.keys(FORMS).forEach(function (id) {
      const form = document.getElementById(id);
      if (!form) return;

      const config = FORMS[id];
      const loadedAt = Date.now();

      form.addEventListener('submit', function (e) {
        e.preventDefault();

        const honeypot = form.querySelector('[data-honeypot]');
        if (honeypot && honeypot.value) return;

        if (Date.now() - loadedAt < MIN_FILL_MS) {
          showError(form, 'Formulir terkirim terlalu cepat. Silakan periksa isian Anda dan coba lagi.');
          return;
        }

        if (isCoolingDown()) {
          showError(form, 'Pesan sebelumnya baru saja dikirim. Mohon tunggu satu menit sebelum mengirim lagi.');
          return;
        }

        const url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(buildMessage(form, config.heading));
        markSubmitted();

        const successEl = document.getElementById(config.successId);
        const fallback = successEl && successEl.querySelector('[data-whatsapp-link]');
        if (fallback) fallback.href = url;

        form.classList.add('hidden');
        if (successEl) {
          successEl.classList.remove('hidden');
          successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        window.open(url, '_blank', 'noopener');
      });
    });
  }

  window.initForms = initForms;
})();
