/**
 * Gesid Halal Center - Google Sheets Tim & Struktur Organisasi Loader
 * Hydrates struktur-tim.html from the `tim` tab.
 */

(function () {
  const TIM_CSV_URL =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vT2JzUgzPHeADkiRBmnSjsVcUlueYyEssZ82CZ_Nk-SJQ15Z_TGslqGSFzUnZ8TN_uZ4umJXq2yJylB/pub?gid=603509023&single=true&output=csv';
  const CACHE_KEY = 'gesid_tim_sheet_v1';

  const DEFAULT_AVATAR_SVG =
    '<svg viewBox="0 0 64 64"><circle cx="32" cy="24" r="12"/><path d="M12 58c0-11 9-19 20-19s20 8 20 19"/></svg>';

  function buildPhotoMarkup(item, isSmall) {
    const core = window.GesidSheetCore;
    const esc = core.escapeHTML;
    const photoClass = isSmall ? 'org-photo-sm' : 'org-photo';

    if (item.image) {
      return `
        <div class="${photoClass}">
          <img src="${esc(item.image)}" alt="${esc(item.nama)}" loading="lazy"
            style="width:100%;height:100%;object-fit:cover;border-radius:9999px;"
            onerror="this.parentElement.innerHTML='${DEFAULT_AVATAR_SVG.replace(/'/g, "\\'")}'">
        </div>
      `;
    }
    return `<div class="${photoClass}" aria-hidden="true">${DEFAULT_AVATAR_SVG}</div>`;
  }

  function buildOrgCard(item, isLead) {
    const esc = window.GesidSheetCore.escapeHTML;
    const leadClass = isLead ? ' org-card--lead' : '';
    return `
      <div class="org-card${leadClass}">
        ${buildPhotoMarkup(item, false)}
        <p class="org-role">${esc(item.jabatan)}</p>
        <p class="org-name">${esc(item.nama)}</p>
        <p class="org-note">${esc(item.keterangan)}</p>
      </div>
    `;
  }

  function mapTimRows(rows) {
    const core = window.GesidSheetCore;
    if (!core || !Array.isArray(rows)) return [];

    const members = [];
    rows.forEach((r, idx) => {
      const status = (r.status || '').toLowerCase();
      if (status && status !== 'tayang') return;

      const nama = r.nama || '';
      const kelompok = (r.kelompok || '').toLowerCase();
      if (!nama || !kelompok) return;
      if (core.hasSpam(`${nama} ${r.jabatan || ''} ${r.keterangan || ''}`)) return;

      const img = core.resolveImageUrl(r.foto);
      members.push({
        id: parseInt(r.id, 10) || idx + 1,
        kelompok,
        jabatan: r.jabatan || '',
        nama,
        keterangan: r.keterangan || '',
        image: img.isEmpty ? '' : img.primary,
        urutan: parseInt(r.urutan, 10) || idx + 1
      });
    });

    members.sort((a, b) => a.urutan - b.urutan || a.id - b.id);
    return members;
  }

  function updateModalCounts(count, cardId, btnId, modalId) {
    const c1 = document.getElementById(cardId);
    const c2 = document.getElementById(btnId);
    const c3 = document.getElementById(modalId);
    if (c1) c1.textContent = count;
    if (c2) c2.textContent = count;
    if (c3) c3.textContent = count;
  }

  function renderTimPage(members) {
    const canvas = document.querySelector('#orgChartScroll .org-canvas');
    if (!canvas || !members.length) return;

    const esc = window.GesidSheetCore.escapeHTML;
    const byGroup = g => members.filter(m => m.kelompok === g);

    // 1. Pembina (Lead Card paling atas)
    const pembina = byGroup('pembina')[0];
    if (pembina) {
      const firstLead = canvas.children[0];
      if (firstLead && firstLead.classList.contains('org-card')) {
        firstLead.outerHTML = buildOrgCard(pembina, true).replace('class="org-card org-card--lead"', 'class="org-card org-card--lead org-row-reveal is-in-view"');
      }
    }

    // 2. Pengawas (Pair pertama)
    const pairs = canvas.querySelectorAll(':scope > .org-pair');
    const pengawasList = byGroup('pengawas');
    if (pairs[0] && pengawasList.length > 0) {
      const cols = pairs[0].querySelectorAll('.org-pair-col');
      pengawasList.slice(0, cols.length).forEach((item, idx) => {
        const card = cols[idx].querySelector('.org-card');
        if (card) card.outerHTML = buildOrgCard(item, false);
      });
    }

    // 3. Direktur Eksekutif & Komite Ketidakberpihakan
    const directorRow = canvas.querySelector('.org-director-row');
    if (directorRow) {
      const direktur = byGroup('direktur')[0];
      const dirCard = directorRow.querySelector(':scope > .org-card--lead');
      if (direktur && dirCard) {
        dirCard.outerHTML = buildOrgCard(direktur, true);
      }

      const komiteList = byGroup('komite');
      const komiteContainer = directorRow.querySelector('.org-committee-list');
      if (komiteContainer && komiteList.length > 0) {
        komiteContainer.innerHTML = komiteList
          .map(item => `
            <div class="org-committee-item">
              ${buildPhotoMarkup(item, true)}
              <span>${esc(item.nama)}</span>
            </div>
          `)
          .join('');
      }
    }

    // 4. Manajer (Pair kedua)
    const manajerList = byGroup('manajer');
    if (pairs[1] && manajerList.length > 0) {
      const cols = pairs[1].querySelectorAll('.org-pair-col');
      manajerList.slice(0, cols.length).forEach((item, idx) => {
        const card = cols[idx].querySelector('.org-card');
        if (card) card.outerHTML = buildOrgCard(item, false);
      });
    }

    // 5. Divisi Non-Modal (Laboratorium & Media/Kelembagaan di kolom ke-2 & ke-4)
    const divisiCols = canvas.querySelectorAll('.org-divisions .org-division-col');
    const divisiList = byGroup('divisi');
    if (divisiCols.length >= 4 && divisiList.length > 0) {
      if (divisiList[0]) {
        const labCard = divisiCols[1].querySelector('.org-card');
        if (labCard) labCard.outerHTML = buildOrgCard(divisiList[0], false);
      }
      if (divisiList[1]) {
        const mediaCard = divisiCols[3].querySelector('.org-card');
        if (mediaCard) mediaCard.outerHTML = buildOrgCard(divisiList[1], false);
      }
    }

    // 6. Modal Auditor Halal
    const auditorList = byGroup('auditor');
    const auditorGrid = document.getElementById('auditorModalGrid');
    if (auditorGrid && auditorList.length > 0) {
      auditorGrid.innerHTML = auditorList.map(item => buildOrgCard(item, false)).join('');
      updateModalCounts(auditorList.length, 'auditorCardCount', 'auditorBtnCount', 'auditorModalCount');
    }

    // 7. Modal SDM Syariah
    const syariahList = byGroup('syariah');
    const syariahGrid = document.getElementById('syariahModalGrid');
    if (syariahGrid && syariahList.length > 0) {
      syariahGrid.innerHTML = syariahList.map(item => buildOrgCard(item, false)).join('');
      updateModalCounts(syariahList.length, 'syariahCardCount', 'syariahBtnCount', 'syariahModalCount');
    }
  }

  function applyTimData(members) {
    if (!Array.isArray(members) || members.length === 0) return;
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => renderTimPage(members));
    } else {
      renderTimPage(members);
    }
  }

  if (window.GesidSheetCore) {
    window.GesidSheetCore.fetchSheetObjects(TIM_CSV_URL, CACHE_KEY, rows => {
      const mapped = mapTimRows(rows);
      if (mapped.length > 0) applyTimData(mapped);
    });
  }
})();
