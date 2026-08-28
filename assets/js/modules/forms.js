/**
 * Forms Module
 * Handles contact and consultation form submissions, validation feedback, and success message transitions.
 */

(function () {
  function initForms() {
    const formIds = ['contactForm', 'consultForm'];

    formIds.forEach(id => {
      const form = document.getElementById(id);
      if (!form) return;

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const successId = id === 'contactForm' ? 'contactSuccess' : 'formSuccess';
        const successEl = document.getElementById(successId);

        // Hide form and reveal success element
        form.classList.add('hidden');
        if (successEl) {
          successEl.classList.remove('hidden');
          successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    });
  }

  window.initForms = initForms;
})();
