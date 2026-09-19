/**
 * Navigation Module
 * Handles mobile drawer toggle, backdrop overlays, and auto-detecting the active navigation link.
 */

(function () {
  function initMobileMenu() {
    const btn = document.getElementById('mobileMenuBtn');
    const closeBtn = document.getElementById('closeMobileMenuBtn');
    const drawer = document.getElementById('mobileMenuDrawer');
    const backdrop = document.getElementById('mobileBackdrop');

    if (!btn || !drawer || !backdrop) return;

    function open() {
      drawer.classList.remove('translate-x-full');
      backdrop.classList.remove('hidden', 'opacity-0');
      setTimeout(() => backdrop.classList.add('opacity-100'), 10);
      document.body.style.overflow = 'hidden';
    }

    function close() {
      drawer.classList.add('translate-x-full');
      backdrop.classList.remove('opacity-100');
      setTimeout(() => backdrop.classList.add('hidden', 'opacity-0'), 200);
      document.body.style.overflow = '';
    }

    btn.addEventListener('click', open);
    closeBtn?.addEventListener('click', close);
    backdrop.addEventListener('click', close);
  }

  function initActiveNav() {
    const currentFile = window.location.pathname.split('/').pop() || 'index.html';
    const pageMap = {
      '': 'index.html',
      '/': 'index.html',
      'index.html': 'index.html',
      'tentang-kami.html': 'tentang-kami.html',
      'layanan.html': 'layanan.html',
      'detail-layanan.html': 'layanan.html', // Detail layanan maps to Layanan in main navbar
      'berita.html': 'berita.html',
      'detail-berita.html': 'berita.html', // Detail berita maps to Berita in main navbar
      'kontak.html': 'kontak.html'
    };
    const activeTarget = pageMap[currentFile] || currentFile;

    // Desktop Nav Links
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === activeTarget) {
        link.classList.add('text-[#c89020]', 'font-semibold');
        link.classList.remove('text-slate-600');
      } else {
        link.classList.remove('text-[#c89020]', 'font-semibold');
        link.classList.add('text-slate-600');
      }
    });

    // Mobile Nav Links
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === activeTarget) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.initNavigation = function () {
    initMobileMenu();
    initActiveNav();
  };
})();
