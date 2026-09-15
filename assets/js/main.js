/**
 * Gesid Halal Center - Main Application Entry Point
 * Initializes all client-side modules and ensures seamless hydration.
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

  // 4. Smooth Counter Animation
  if (typeof window.initCounters === 'function') {
    window.initCounters();
  }

  // 5. Accordions & Collapsibles
  if (typeof window.initAccordions === 'function') {
    window.initAccordions();
  }

  // 6. Interactive Forms
  if (typeof window.initForms === 'function') {
    window.initForms();
  }

  // 7. Dynamic Service Detail Renderer
  if (typeof window.initServiceDetail === 'function') {
    window.initServiceDetail();
  }

  // 8. Conceptual Scroll & Micro-Interaction Animations
  if (typeof window.initScrollAnimations === 'function') {
    window.initScrollAnimations();
  }

  // 9. Countdown Timer Widget
  if (typeof window.initCountdown === 'function') {
    window.initCountdown();
  }
});
