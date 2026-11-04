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
      'profil-visi-misi.html': 'tentang-kami.html',
      'struktur-tim.html': 'tentang-kami.html',
      'galeri.html': 'tentang-kami.html',
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
        link.classList.remove('text-slate-600', 'text-slate-700');
      } else {
        link.classList.remove('text-[#c89020]', 'font-semibold');
        link.classList.remove('text-slate-600');
        link.classList.add('text-slate-700');
      }
    });

    // Desktop Dropdown Sub-items
    document.querySelectorAll('.nav-dropdown-item').forEach(item => {
      const href = item.getAttribute('href');
      if (href === currentFile) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Mobile Nav Links
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      const href = link.getAttribute('href') || link.getAttribute('data-nav-target');
      if (href === activeTarget) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Mobile Dropdown Sub-items & Auto-expand when on About pages
    let isAboutSubpage = false;
    document.querySelectorAll('.mobile-subnav-link').forEach(item => {
      const href = item.getAttribute('href');
      if (href === currentFile) {
        item.classList.add('active');
        isAboutSubpage = true;
      } else {
        item.classList.remove('active');
      }
    });

    if (isAboutSubpage || activeTarget === 'tentang-kami.html') {
      const content = document.getElementById('mobileDropdownContent');
      const chevron = document.getElementById('mobileDropdownChevron');
      content?.classList.remove('hidden');
      chevron?.classList.add('rotate-180');
    }
  }

  function initMobileDropdown() {
    const btn = document.getElementById('mobileDropdownBtn');
    const content = document.getElementById('mobileDropdownContent');
    const chevron = document.getElementById('mobileDropdownChevron');
    if (!btn || !content) return;

    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const isHidden = content.classList.contains('hidden');
      if (isHidden) {
        content.classList.remove('hidden');
        chevron?.classList.add('rotate-180');
      } else {
        content.classList.add('hidden');
        chevron?.classList.remove('rotate-180');
      }
    });
  }

  function initDesktopDropdown() {
    document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
      let closeTimer = null;

      function openMenu() {
        if (closeTimer) {
          clearTimeout(closeTimer);
          closeTimer = null;
        }
        dropdown.classList.add('is-open');
      }

      function scheduleClose() {
        if (closeTimer) clearTimeout(closeTimer);
        closeTimer = setTimeout(() => {
          dropdown.classList.remove('is-open');
        }, 220);
      }

      dropdown.addEventListener('mouseenter', openMenu);
      dropdown.addEventListener('mouseleave', scheduleClose);
    });
  }

  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    function onScroll() {
      if (window.scrollY > 12) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  window.initNavigation = function () {
    initMobileMenu();
    initMobileDropdown();
    initDesktopDropdown();
    initActiveNav();
    initHeaderScroll();
  };
})();
