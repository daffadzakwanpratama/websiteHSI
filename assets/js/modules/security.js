/**
 * Gesid Halal Center — Security Utilities Module
 * Client-side XSS protection & safe DOM helpers
 */

(function () {
  'use strict';

  // ── 1. HTML SANITIZER ──────────────────────────────────────────────────────
  // Escape karakter berbahaya sebelum di-inject ke DOM via innerHTML
  function escapeHTML(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
      .replace(/`/g, '&#x60;')
      .replace(/\//g, '&#x2F;');
  }

  // Sanitize URL — hanya izinkan http/https, blokir javascript: dan data:
  function sanitizeURL(url) {
    if (typeof url !== 'string') return '#';
    const trimmed = url.trim().toLowerCase();
    if (trimmed.startsWith('javascript:') || trimmed.startsWith('data:') || trimmed.startsWith('vbscript:')) {
      return '#';
    }
    return url;
  }

  // Safe innerHTML setter — strip tag script sebelum inject
  function safeSetHTML(el, html) {
    if (!el || typeof html !== 'string') return;
    // Buat temporary container untuk sanitasi via DOMParser
    const doc = new DOMParser().parseFromString(html, 'text/html');
    // Hapus semua elemen script & event handler attributes
    doc.querySelectorAll('script, [onclick], [onload], [onerror], [onmouseover]').forEach(node => node.remove());
    el.innerHTML = doc.body.innerHTML;
  }

  // ── 2. BLOKIR DEVTOOLS SNIFFING (Production Only) ────────────────────────
  // Deteksi jika console terbuka dan batasi output sensitif
  (function () {
    const noop = function () {};
    // Jangan matikan console di development — hanya sembunyikan output debug
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      const noopConsole = { log: noop, warn: noop, info: noop, debug: noop };
      // Pertahankan error untuk monitoring
      Object.assign(console, noopConsole);
    }
  })();

  // ── 3. ANTI CLICK-JACKING CLIENT-SIDE (Defense in Depth) ─────────────────
  // Jika halaman ini di-embed di iframe yang tidak diizinkan, redirect keluar
  if (window.self !== window.top) {
    try {
      if (window.top.location.hostname !== window.location.hostname) {
        window.top.location = window.location.href;
      }
    } catch (e) {
      // Cross-origin frame — paksa keluar
      document.body.style.display = 'none';
    }
  }

  // ── 4. BLOKIR AKSES URL PARAM BERBAHAYA ──────────────────────────────────
  (function () {
    const dangerousPatterns = [
      /<script/i,
      /javascript:/i,
      /on\w+\s*=/i,
      /data:text\/html/i,
      /vbscript:/i,
    ];
    const search = window.location.search;
    const hash = window.location.hash;
    const toCheck = search + hash;
    const hasDanger = dangerousPatterns.some(p => p.test(toCheck));
    if (hasDanger) {
      // Redirect ke halaman tanpa parameter berbahaya
      window.location.replace(window.location.pathname);
    }
  })();

  // ── 5. VALIDASI FORM INPUT SISI KLIEN ────────────────────────────────────
  function sanitizeInput(value) {
    if (typeof value !== 'string') return '';
    return value
      .replace(/<[^>]*>/g, '')      // strip HTML tags
      .replace(/[<>&"']/g, '')      // strip chars berbahaya
      .trim()
      .substring(0, 2000);          // batasi panjang
  }

  // Pasang sanitizer ke semua input form saat submit
  document.addEventListener('DOMContentLoaded', function () {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      form.addEventListener('submit', function () {
        form.querySelectorAll('input[type="text"], input[type="email"], textarea').forEach(input => {
          input.value = sanitizeInput(input.value);
        });
      });
    });
  });

  // ── 6. BLOKIR KLIK KANAN & SELECTION PADA LOGO/GAMBAR (Opsional) ──────────
  // Hanya pada gambar asset brand — bukan konten artikel
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('img.brand-logo, img[alt="Gesid Halal Center"]').forEach(img => {
      img.addEventListener('contextmenu', function (e) { e.preventDefault(); });
      img.setAttribute('draggable', 'false');
    });
  });

  // ── 7. EXPOSE SAFE UTILITIES UNTUK MODULE LAIN ───────────────────────────
  window.GesidSecurity = {
    escapeHTML,
    sanitizeURL,
    safeSetHTML,
    sanitizeInput,
  };

})();
