/**
 * Gesid Halal Center - Main Application Entry Point
 * Initializes all active client-side modules.
 */

document.addEventListener('DOMContentLoaded', function () {
  // 1. Navigation & Active Links
  if (typeof window.initNavigation === 'function') {
    window.initNavigation();
  }

  // 2. Hero Carousel / Image Slider
  if (typeof window.initHeroSlider === 'function') {
    window.initHeroSlider();
  }

  // 3. Generic Horizontal Carousels
  if (typeof window.initCarousels === 'function') {
    window.initCarousels();
  }

  // 4. Accordions & Collapsibles
  if (typeof window.initAccordions === 'function') {
    window.initAccordions();
  }

  // 5. Interactive Forms
  if (typeof window.initForms === 'function') {
    window.initForms();
  }

  // 6. Dynamic Service Detail Renderer
  if (typeof window.initServiceDetail === 'function') {
    window.initServiceDetail();
  }

  // 7. Conceptual Scroll & Micro-Interaction Animations
  if (typeof window.initScrollAnimations === 'function') {
    window.initScrollAnimations();
  }

  // 8. Dynamic News Detail Renderer
  if (typeof window.initNewsDetail === 'function') {
    window.initNewsDetail();
  }
});
