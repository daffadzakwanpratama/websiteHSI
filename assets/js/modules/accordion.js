/**
 * Accordion Module
 * Handles FAQ collapsibles and single-open/multi-open accordion behavior.
 */

(function () {
  function initAccordions() {
    const btns = document.querySelectorAll('.accordion-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        const icon = btn.querySelector('.accordion-icon');
        const isOpen = content?.classList.contains('active');

        // Close all other accordions
        document.querySelectorAll('.accordion-content').forEach(el => el.classList.remove('active'));
        document.querySelectorAll('.accordion-icon').forEach(el => el.classList.remove('rotated'));

        // Toggle clicked one
        if (!isOpen && content) {
          content.classList.add('active');
          icon?.classList.add('rotated');
        }
      });
    });
  }

  window.initAccordions = initAccordions;
})();
