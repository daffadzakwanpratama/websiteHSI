/**
 * PT Halal Standard Indonesia - Scroll & Reveal Animation Engine
 * Creates smooth, conceptual, staggered reveal animations on scroll using IntersectionObserver.
 */

(function () {
  function initScrollAnimations() {
    // Respect user's motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.querySelectorAll('[data-animate], .reveal-on-scroll, [data-stagger]').forEach(el => {
        el.classList.add('is-revealed');
      });
      return;
    }

    // Target elements: either explicit [data-animate] or automatic semantic cards/sections
    const animElements = document.querySelectorAll('[data-animate], .reveal-on-scroll, [data-stagger]');
    
    if (animElements.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -8% 0px',
      threshold: 0.12
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = parseInt(el.getAttribute('data-delay') || '0', 10);
          
          if (delay > 0) {
            setTimeout(() => {
              el.classList.add('is-revealed');
            }, delay);
          } else {
            el.classList.add('is-revealed');
          }

          // Handle staggered children if parent has data-stagger
          if (el.hasAttribute('data-stagger')) {
            const staggerDelay = parseInt(el.getAttribute('data-stagger') || '100', 10);
            const children = el.children;
            Array.from(children).forEach((child, index) => {
              setTimeout(() => {
                child.classList.add('is-revealed');
              }, (index + 1) * staggerDelay);
            });
          }

          obs.unobserve(el);
        }
      });
    }, observerOptions);

    animElements.forEach(el => {
      // If element is a stagger container, prepare direct children
      if (el.hasAttribute('data-stagger')) {
        Array.from(el.children).forEach(child => {
          if (!child.hasAttribute('data-animate')) {
            child.classList.add('reveal-child');
          }
        });
      }
      observer.observe(el);
    });
  }

  // Smooth Hover Ripple / Magnetic micro-interactions
  function initMicroInteractions() {
    // Smooth magnetic feel for buttons & badges
    const interactiveCards = document.querySelectorAll('.hover-lift, .interactive-card');
    interactiveCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.willChange = 'transform, box-shadow';
      });
      card.addEventListener('mouseleave', () => {
        card.style.willChange = 'auto';
      });
    });
  }

  window.initScrollAnimations = function() {
    initScrollAnimations();
    initMicroInteractions();
  };
})();
