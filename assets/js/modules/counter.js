/**
 * Counter Animation Module
 * Animates numerical metrics smoothly using IntersectionObserver and Ease-Out Quartic easing.
 */

(function () {
  function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (counters.length === 0) return;

    function animateCounter(el) {
      const rawVal = el.getAttribute('data-counter');
      const target = parseInt(rawVal, 10);
      if (isNaN(target)) return;

      const prefix = el.getAttribute('data-prefix') || '';
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = 1500; // 1.5 seconds smooth duration
      const startTime = performance.now();

      // Smooth Ease-out Quartic curve
      function easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
      }

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutQuart(progress);
        const current = Math.round(target * eased);

        el.textContent = `${prefix}${current.toLocaleString('id-ID')}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = `${prefix}${target.toLocaleString('id-ID')}${suffix}`;
        }
      }

      requestAnimationFrame(update);
    }

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.25 });

      counters.forEach(c => observer.observe(c));
    } else {
      counters.forEach(c => animateCounter(c));
    }
  }

  window.initCounters = initCounters;
})();
