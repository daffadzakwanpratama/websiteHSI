/**
 * Gesid Halal Center - Google Sheets Galeri & Beranda Carousel Loader
 * Hydrates galeri.html (bagian=kantor, aktivitas) and index.html (bagian=beranda).
 */

(function () {
  const GALERI_CSV_URL =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vT2JzUgzPHeADkiRBmnSjsVcUlueYyEssZ82CZ_Nk-SJQ15Z_TGslqGSFzUnZ8TN_uZ4umJXq2yJylB/pub?gid=1929918079&single=true&output=csv';
  const CACHE_KEY = 'gesid_galeri_sheet_v1';

  function buildPortfolioCard(item, extraWrapClass, isRevealed) {
    const core = window.GesidSheetCore;
    const esc = core.escapeHTML;
    const revealClass = isRevealed ? ' is-revealed' : '';
    const wrapperOpen = extraWrapClass ? `<div class="${extraWrapClass}">` : '';
    const wrapperClose = extraWrapClass ? '</div>' : '';

    return `
      ${wrapperOpen}
        <div class="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:border-[#c89020] transition-colors duration-200 flex flex-col h-full${revealClass}">
          <div class="aspect-[16/10] overflow-hidden bg-slate-100 relative" style="cursor:zoom-in;" data-galeri-preview>
            <img src="${esc(item.image)}"
              alt="${esc(item.judul)}"
              class="w-full h-full object-cover"
              loading="lazy" decoding="async"
              onerror="${core.buildImageOnError(item.imageFallback)}">
            <span class="absolute top-3 left-3 px-2.5 py-1 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded-md shadow-xs border border-white/10">
              ${esc(item.kategori)}
            </span>
          </div>
          <div class="p-4 sm:p-5 flex-1 flex flex-col justify-between">
            <h3 class="text-[15px] sm:text-base font-bold text-slate-900 group-hover:text-[#c89020] transition-colors leading-snug line-clamp-2">
              ${esc(item.judul)}
            </h3>
            <div class="mt-3 pt-2.5 border-t border-slate-100 flex items-center text-xs text-slate-500 font-medium gap-1.5">
              <i class="fa-solid ${esc(item.ikon)} text-[#c89020] text-[11px] shrink-0"></i>
              <span class="truncate">${esc(item.lokasi)}</span>
            </div>
          </div>
        </div>
      ${wrapperClose}
    `;
  }

  function mapGaleriRows(rows) {
    const core = window.GesidSheetCore;
    if (!core || !Array.isArray(rows)) return [];

    const items = [];
    rows.forEach((r, idx) => {
      const status = (r.status || '').toLowerCase();
      if (status && status !== 'tayang') return;

      const judul = r.judul || '';
      const bagian = (r.bagian || '').toLowerCase();
      if (!judul || !bagian) return;
      if (core.hasSpam(`${judul} ${r.kategori || ''} ${r.lokasi_atau_ket || ''}`)) return;

      const img = core.resolveImageUrl(r.foto);
      items.push({
        id: parseInt(r.id, 10) || idx + 1,
        bagian,
        kategori: r.kategori || 'Dokumentasi',
        judul,
        lokasi: r.lokasi_atau_ket || 'Gesid Halal Center',
        ikon: core.isSafeIconClass(r.ikon),
        image: img.isEmpty ? core.FALLBACK_IMAGE : img.primary,
        imageFallback: img.fallback,
        urutan: parseInt(r.urutan, 10) || idx + 1
      });
    });

    items.sort((a, b) => a.urutan - b.urutan || a.id - b.id);
    return items;
  }

  function renderGaleriPage(items) {
    const kantorGrid = document.querySelector('#galeri-kantor [data-stagger]');
    if (kantorGrid) {
      const kantorItems = items.filter(i => i.bagian === 'kantor');
      if (kantorItems.length > 0) {
        kantorGrid.innerHTML = kantorItems.map(item => buildPortfolioCard(item, '', true)).join('');
      }
    }

    const aktivitasGrid = document.querySelector('#aktivitas-lapangan [data-stagger]');
    if (aktivitasGrid) {
      const aktivitasItems = items.filter(i => i.bagian === 'aktivitas');
      if (aktivitasItems.length > 0) {
        aktivitasGrid.innerHTML = aktivitasItems.map(item => buildPortfolioCard(item, '', true)).join('');
      }
    }
  }

  function renderHomeInspectionCarousel(items) {
    const berandaItems = items.filter(i => i.bagian === 'beranda');
    if (berandaItems.length === 0) return;

    const carousels = document.querySelectorAll('[data-carousel]');
    carousels.forEach(carousel => {
      if (carousel.classList.contains('home-news-carousel')) return;
      const track = carousel.querySelector('.carousel-track');
      if (!track) return;

      track.innerHTML = berandaItems
        .map(item => buildPortfolioCard(item, 'carousel-slide w-[85%] sm:w-[55%] lg:w-[32%] flex-shrink-0', false))
        .join('');
    });
  }

  function applyGaleriData(items) {
    if (!Array.isArray(items) || items.length === 0) return;
    const runRender = () => {
      renderGaleriPage(items);
      renderHomeInspectionCarousel(items);
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', runRender);
    } else {
      runRender();
    }
  }

  function initGaleriLightbox() {
    const isGaleriPage = document.getElementById('galeri-kantor') || document.getElementById('aktivitas-lapangan');
    if (!isGaleriPage || document.getElementById('galeriLightboxModal')) return;

    // Add zoom cursor to initial static cards too
    document.querySelectorAll('#galeri-kantor .aspect-\\[16\\/10\\], #aktivitas-lapangan .aspect-\\[16\\/10\\]').forEach(el => {
      el.style.cursor = 'zoom-in';
    });

    const modal = document.createElement('div');
    modal.id = 'galeriLightboxModal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-hidden', 'true');
    modal.style.cssText = 'position:fixed;inset:0;z-index:9999;display:none;align-items:center;justify-content:center;background:rgba(15,23,42,0.88);padding:16px;';
    modal.innerHTML = `
      <button type="button" id="galeriLightboxClose" aria-label="Tutup foto"
        style="position:fixed;top:16px;right:16px;width:40px;height:40px;border-radius:9999px;background:rgba(255,255,255,0.16);color:#fff;display:flex;align-items:center;justify-content:center;font-size:18px;cursor:pointer;border:1px solid rgba(255,255,255,0.2);">
        <i class="fa-solid fa-xmark"></i>
      </button>
      <div style="max-width:1000px;width:100%;display:flex;flex-direction:column;align-items:center;" data-lightbox-content>
        <img id="galeriLightboxImg" src="" alt=""
          style="max-height:82vh;max-width:92vw;width:auto;height:auto;object-fit:contain;border-radius:12px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.5);background:#0f172a;">
        <div style="margin-top:12px;text-align:center;max-width:640px;padding:0 8px;">
          <p id="galeriLightboxTitle" style="color:#fff;font-weight:700;font-size:15px;line-height:1.4;margin:0;"></p>
          <p id="galeriLightboxMeta" style="color:#cbd5e1;font-size:12px;margin:4px 0 0;"></p>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const imgEl = document.getElementById('galeriLightboxImg');
    const titleEl = document.getElementById('galeriLightboxTitle');
    const metaEl = document.getElementById('galeriLightboxMeta');
    const closeBtn = document.getElementById('galeriLightboxClose');

    function openLightbox(src, title, meta) {
      if (!src) return;
      imgEl.src = src;
      imgEl.alt = title || 'Foto Galeri';
      titleEl.textContent = title || '';
      metaEl.textContent = meta || '';
      modal.style.display = 'flex';
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
      imgEl.src = '';
      document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeLightbox);

    modal.addEventListener('click', function (e) {
      if (e.target === modal || e.target.closest('[data-lightbox-content]') === null) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.style.display === 'flex') {
        closeLightbox();
      }
    });

    document.addEventListener('click', function (e) {
      const card = e.target.closest('#galeri-kantor .group, #aktivitas-lapangan .group');
      if (!card) return;
      const cardImg = card.querySelector('img');
      if (!cardImg) return;
      const cardTitle = card.querySelector('h3')?.textContent?.trim() || cardImg.alt || '';
      const cardMeta = card.querySelector('.truncate')?.textContent?.trim() || '';
      openLightbox(cardImg.currentSrc || cardImg.src, cardTitle, cardMeta);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGaleriLightbox);
  } else {
    initGaleriLightbox();
  }

  if (window.GesidSheetCore) {
    window.GesidSheetCore.fetchSheetObjects(GALERI_CSV_URL, CACHE_KEY, rows => {
      const mapped = mapGaleriRows(rows);
      if (mapped.length > 0) applyGaleriData(mapped);
    });
  }
})();
