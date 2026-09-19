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

  // 10. Dynamic News Detail Renderer
  if (typeof window.initNewsDetail === 'function') {
    window.initNewsDetail();
  }
});

/**
 * Berita Terkini — Category Filter
 * Filters news cards by category with a smooth staggered fade-in animation.
 * @param {string} kategori - 'semua' | 'nasional' | 'internasional' | 'daerah'
 */
window.filterBerita = function (kategori) {
  // Update active tab state
  document.querySelectorAll('.berita-tab').forEach(function (btn) {
    btn.classList.toggle('active-tab', btn.dataset.tab === kategori);
  });

  const cards = document.querySelectorAll('.berita-card');
  const emptyState = document.getElementById('beritaEmpty');
  let visibleCount = 0;

  cards.forEach(function (card, index) {
    const match = kategori === 'semua' || card.dataset.kategori === kategori;

    if (match) {
      card.classList.remove('hidden-card');
      // Stagger the fade-in animation
      card.classList.remove('fade-in-card');
      void card.offsetWidth; // force reflow to restart animation
      card.style.animationDelay = (index * 60) + 'ms';
      card.classList.add('fade-in-card');
      visibleCount++;
    } else {
      card.classList.add('hidden-card');
      card.classList.remove('fade-in-card');
    }
  });

  // Show/hide empty state
  if (emptyState) {
    emptyState.classList.toggle('hidden', visibleCount > 0);
  }
};

/**
 * Mobile Drawer — Accordion Toggle
 * Opens/closes a sub-menu in the mobile drawer.
 * Closes any other open accordion automatically.
 * @param {HTMLElement} btn - The accordion trigger button
 */
window.toggleMobileAcc = function (btn) {
  const submenu = btn.nextElementSibling;
  const isOpen = submenu && submenu.classList.contains('open');

  // Close all open accordions first
  document.querySelectorAll('.mobile-submenu.open').forEach(function (el) {
    el.classList.remove('open');
  });
  document.querySelectorAll('.mobile-acc-btn.open').forEach(function (el) {
    el.classList.remove('open');
  });

  // If it wasn't open, open it now
  if (!isOpen && submenu) {
    submenu.classList.add('open');
    btn.classList.add('open');
  }
};


