/**
 * Service Detail Page Renderer Module
 * Reads `service` query parameter from the URL, retrieves data from `window.HSI_SERVICES_DATA`,
 * and populates the dynamic detail-layanan.html DOM elements.
 */

(function () {
  function initServiceDetail() {
    // Only run on pages containing service detail container
    const titleEl = document.getElementById('serviceTitle');
    if (!titleEl) return;

    const data = window.HSI_SERVICES_DATA || {};
    const params = new URLSearchParams(window.location.search);
    const serviceKey = params.get('service') || 'sertifikasi';

    const d = data[serviceKey] || data['sertifikasi'];
    if (!d) return;

    const set = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };

    set('serviceLabel', d.label);
    set('breadcrumbCurrent', d.breadcrumb);
    set('serviceTitle', d.title);

    const descEl = document.getElementById('serviceDesc');
    if (descEl && Array.isArray(d.desc)) {
      descEl.innerHTML = d.desc.map(p => `<p>${p}</p>`).join('');
    }

    const featEl = document.getElementById('serviceFeatures');
    if (featEl && Array.isArray(d.features)) {
      featEl.innerHTML = d.features.map(f =>
        `<li class="flex items-start gap-3">
          <i class="fa-solid fa-check text-forest-600 text-xs mt-1 flex-shrink-0"></i>
          <span class="text-sm text-slate-700">${f}</span>
        </li>`
      ).join('');
    }

    const targetEl = document.getElementById('serviceTarget');
    if (targetEl && Array.isArray(d.target)) {
      targetEl.innerHTML = d.target.map(t =>
        `<li class="flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-forest-600 flex-shrink-0"></span>
          <span>${t}</span>
        </li>`
      ).join('');
    }
  }

  window.initServiceDetail = initServiceDetail;
})();
