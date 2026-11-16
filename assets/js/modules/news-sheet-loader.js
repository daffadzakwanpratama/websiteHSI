/**
 * Gesid Halal Center - Google Sheets News Loader
 * Hydrates index.html, berita.html, and detail-berita.html from the `berita` tab.
 */

(function () {
  const NEWS_CSV_URL =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vT2JzUgzPHeADkiRBmnSjsVcUlueYyEssZ82CZ_Nk-SJQ15Z_TGslqGSFzUnZ8TN_uZ4umJXq2yJylB/pub?gid=677283694&single=true&output=csv';
  const CACHE_KEY = 'gesid_news_sheet_v2';

  const MONTH_MAP = {
    jan: 0, januari: 0,
    feb: 1, februari: 1,
    mar: 2, maret: 2,
    apr: 3, april: 3,
    mei: 4, may: 4,
    jun: 5, juni: 5,
    jul: 6, juli: 6,
    agu: 7, ags: 7, aug: 7, agustus: 7,
    sep: 8, sept: 8, september: 8,
    okt: 9, oct: 9, oktober: 9,
    nov: 10, november: 10,
    des: 11, dec: 11, desember: 11
  };

  function formatPlainTextToHTML(rawContent, escapeHTML) {
    const text = String(rawContent || '').trim();
    if (!text) return '';
    return text
      .split(/\r?\n+/)
      .map(p => p.trim())
      .filter(Boolean)
      .map((p, idx) => (idx === 0 ? `<p class="lead-text">${escapeHTML(p)}</p>` : `<p>${escapeHTML(p)}</p>`))
      .join('\n');
  }

  function parseIndonesianDate(dateStr) {
    const parts = String(dateStr || '').trim().split(/\s+/);
    if (parts.length < 3) return 0;
    const day = parseInt(parts[0], 10);
    const monthKey = parts[1].toLowerCase().replace(/[^a-z]/g, '');
    const year = parseInt(parts[2], 10);
    const month = MONTH_MAP[monthKey];
    if (isNaN(day) || month === undefined || isNaN(year)) return 0;
    return new Date(year, month, day).getTime();
  }

  function mapCategory(rawCategory) {
    const label = String(rawCategory || 'Nasional').trim();
    const key = label.toLowerCase();
    if (key === 'internasional') {
      return { category: 'internasional', categoryLabel: 'Internasional', categoryBadgeClass: 'badge-internasional' };
    }
    if (key === 'daerah') {
      return { category: 'daerah', categoryLabel: 'Daerah', categoryBadgeClass: 'badge-daerah' };
    }
    if (key === 'trending') {
      return { category: 'trending', categoryLabel: 'Trending', categoryBadgeClass: 'badge-trending' };
    }
    return { category: 'nasional', categoryLabel: label || 'Nasional', categoryBadgeClass: 'badge-nasional' };
  }

  function mapObjectsToNewsData(rows) {
    const core = window.GesidSheetCore;
    if (!core || !Array.isArray(rows)) return [];

    const articles = [];

    rows.forEach((r, index) => {
      const status = (r.status || '').toLowerCase();
      if (status && status !== 'tayang') return;

      const title = r.judul || '';
      if (!title) return;

      const summary = r.ringkasan || '';
      const rawBody = r.isi || '';
      if (core.hasSpam(`${title} ${summary} ${rawBody}`)) return;

      const id = Math.max(1, parseInt(r.id, 10) || index + 1);
      const cat = mapCategory(r.kategori);
      const date = r.tanggal || '';
      const img = core.resolveImageUrl(r.foto);
      const contentHtml =
        formatPlainTextToHTML(rawBody, core.escapeHTML) || `<p class="lead-text">${core.escapeHTML(summary)}</p>`;

      articles.push({
        id,
        title,
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
        category: cat.category,
        categoryLabel: cat.categoryLabel,
        categoryBadgeClass: cat.categoryBadgeClass,
        date,
        _timestamp: parseIndonesianDate(date),
        readTime: r.waktu_baca || '3 menit baca',
        author: {
          name: r.penulis || 'Tim Redaksi Gesid',
          role: r.peran_penulis || 'Tim Redaksi Gesid Halal Center',
          avatar: 'assets/images/logo-emblem.webp'
        },
        image: img.isEmpty ? core.FALLBACK_IMAGE : img.primary,
        imageFallback: img.fallback,
        caption: r.caption || title,
        summary,
        content: contentHtml,
        relatedIds: []
      });
    });

    articles.sort((a, b) => {
      if (b._timestamp !== a._timestamp) return b._timestamp - a._timestamp;
      return b.id - a.id;
    });

    articles.forEach(art => {
      art.relatedIds = articles.filter(other => other.id !== art.id).slice(0, 3).map(o => o.id);
    });

    return articles;
  }

  function renderHomeNews(newsList) {
    const core = window.GesidSheetCore;
    const section = document.getElementById('berita');
    if (!core || !section || !newsList.length) return;

    const esc = core.escapeHTML;
    const lead = newsList[0];
    const leadEl = section.querySelector('.home-news-lead');
    if (leadEl && lead) {
      leadEl.href = `detail-berita.html?id=${lead.id}`;
      leadEl.innerHTML = `
        <img src="${esc(lead.image)}" alt="${esc(lead.title)}" loading="lazy" onerror="${core.buildImageOnError(lead.imageFallback)}">
        <span class="home-news-lead-shade"></span>
        <span class="home-news-lead-content">
          <span class="home-news-label">Sorotan Berita</span>
          <span class="home-news-lead-title">${esc(lead.title)}</span>
          <span class="home-news-meta">${esc(lead.categoryLabel)} <span aria-hidden="true">·</span> ${esc(lead.date)}</span>
        </span>
      `;
    }

    const listContainer = section.querySelector('.home-news-list');
    if (listContainer) {
      const listItems = newsList.length > 1 ? newsList.slice(1, 4) : [lead];
      const listMarkup = listItems
        .map(item => `
          <a href="detail-berita.html?id=${item.id}" class="home-news-list-item group">
            <img src="${esc(item.image)}" alt="" loading="lazy" onerror="${core.buildImageOnError(item.imageFallback)}">
            <span class="min-w-0">
              <span class="home-news-list-title">${esc(item.title)}</span>
              <span class="home-news-meta"><span>${esc(item.categoryLabel)}</span> · ${esc(item.date)}</span>
            </span>
          </a>
        `)
        .join('');

      listContainer.innerHTML = `<h2 class="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-4">Berita Terbaru</h2>${listMarkup}`;
    }

    const track = section.querySelector('.home-news-track');
    if (track) {
      const cardsMarkup = newsList
        .map(item => `
          <a href="detail-berita.html?id=${item.id}" class="home-news-card group">
            <img src="${esc(item.image)}" alt="${esc(item.title)}" loading="lazy" onerror="${core.buildImageOnError(item.imageFallback)}">
            <span class="home-news-card-shade"></span>
            <span class="home-news-card-content">
              <span class="home-news-meta">${esc(item.categoryLabel)} <span aria-hidden="true">·</span> ${esc(item.date)}</span>
              <span class="home-news-card-title">${esc(item.title)}</span>
            </span>
          </a>
        `)
        .join('');

      if (newsList.length >= 3) {
        track.classList.add('home-news-marquee');
        track.innerHTML = `
          <div class="home-news-group">${cardsMarkup}</div>
          <div class="home-news-group" aria-hidden="true" inert>${cardsMarkup}</div>
        `;
      } else {
        track.classList.remove('home-news-marquee');
        track.innerHTML = cardsMarkup;
      }
    }
  }

  function renderBeritaGrid(newsList) {
    const core = window.GesidSheetCore;
    const grid = document.getElementById('articlesGrid');
    if (!core || !grid || !newsList.length) return;

    const esc = core.escapeHTML;
    grid.innerHTML = newsList
      .map(item => {
        const badgeIcon =
          item.category === 'trending' ? '<i class="fa-solid fa-fire text-[9px]"></i> ' : '';
        const badgeExtraClass = item.category === 'trending' ? ' flex items-center gap-1' : '';
        return `
          <article class="article-card" data-kategori="${esc(item.category)}" data-title="${esc(item.title.toLowerCase())}">
            <a href="detail-berita.html?id=${item.id}"
              class="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover-lift flex flex-col h-full">
              <div class="relative aspect-[16/10] overflow-hidden bg-slate-100 flex-shrink-0">
                <img src="${esc(item.image)}"
                  alt="${esc(item.title)}"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                  onerror="${core.buildImageOnError(item.imageFallback)}">
                <span class="${esc(item.categoryBadgeClass)} absolute top-3 left-3 px-2.5 py-0.5 text-white text-[10px] font-bold rounded-md uppercase tracking-wide${badgeExtraClass}">${badgeIcon}${esc(item.categoryLabel)}</span>
              </div>
              <div class="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <p class="text-[11px] text-slate-400 font-medium mb-2 flex items-center gap-1.5"><i
                      class="fa-regular fa-calendar text-[10px]"></i> ${esc(item.date)}</p>
                  <h3
                    class="text-[14px] sm:text-[15px] font-bold text-slate-900 leading-snug mb-2 group-hover:text-[#c89020] transition-colors line-clamp-3">
                    ${esc(item.title)}</h3>
                  <p class="text-xs text-slate-500 leading-relaxed line-clamp-2">${esc(item.summary)}</p>
                </div>
                <div class="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span class="text-[11px] text-slate-400 font-medium">${esc(item.readTime)}</span>
                  <span
                    class="text-[11px] font-bold text-[#c89020] flex items-center gap-1 group-hover:gap-2 transition-all">Baca
                    <i class="fa-solid fa-arrow-right text-[9px]"></i></span>
                </div>
              </div>
            </a>
          </article>
        `;
      })
      .join('');

    if (typeof window.refreshBeritaGrid === 'function') {
      window.refreshBeritaGrid();
    }
  }

  function applyNewsData(newsList) {
    if (!Array.isArray(newsList) || newsList.length === 0) return;
    window.NEWS_DATA = newsList;

    const runRender = () => {
      renderHomeNews(newsList);
      renderBeritaGrid(newsList);
      if (typeof window.initNewsDetail === 'function') window.initNewsDetail();
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', runRender);
    } else {
      runRender();
    }
  }

  if (window.GesidSheetCore) {
    window.GesidSheetCore.fetchSheetObjects(NEWS_CSV_URL, CACHE_KEY, rows => {
      const mapped = mapObjectsToNewsData(rows);
      if (mapped.length > 0) applyNewsData(mapped);
    });
  }
})();
