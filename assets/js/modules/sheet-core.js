/**
 * Gesid Halal Center - Shared Google Sheets CSV Core Helper
 * Provides RFC-4180 CSV parsing, Google Drive image resolution,
 * anti-spam/anti-XSS sanitization, and stale-while-revalidate caching.
 */

(function () {
  const FALLBACK_IMAGE = 'assets/images/photos/1450101499163-c8848c66ca85-800.webp';
  const BLOCKED_SPAM_PATTERN =
    /\b(slot\s*gacor|maxwin|judol|judi\s*online|togel\s*online|sbobet|pragmatic\s*play|rtp\s*live|situs\s*gacor|bandar\s*togel|zeus\s*slot|mahjong\s*ways)\b/i;

  function escapeHTML(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function hasSpam(text) {
    return BLOCKED_SPAM_PATTERN.test(String(text || ''));
  }

  const ICON_LABEL_MAP = {
    lokasi: 'fa-location-dot',
    tempat: 'fa-location-dot',
    kantor: 'fa-landmark',
    gedung: 'fa-landmark',
    konsultasi: 'fa-comments',
    rapat: 'fa-handshake',
    koordinasi: 'fa-handshake',
    pelatihan: 'fa-chalkboard-user',
    edukasi: 'fa-chalkboard-user',
    sertifikat: 'fa-certificate',
    penghargaan: 'fa-award',
    resmi: 'fa-award',
    pabrik: 'fa-industry',
    produksi: 'fa-industry',
    laboratorium: 'fa-flask-vial',
    lab: 'fa-flask-vial',
    'uji lab': 'fa-flask-vial',
    gudang: 'fa-boxes-packing',
    logistik: 'fa-boxes-packing',
    dokumen: 'fa-scale-balanced',
    aturan: 'fa-scale-balanced',
    centang: 'fa-circle-check',
    standar: 'fa-circle-check'
  };

  function isSafeIconClass(icon) {
    const clean = String(icon || '').trim();
    if (!clean) return 'fa-circle-check';
    const mapped = ICON_LABEL_MAP[clean.toLowerCase()];
    if (mapped) return mapped;
    return /^fa-[a-z0-9-]+$/i.test(clean) ? clean : 'fa-circle-check';
  }

  function isSafeImagePath(url) {
    if (!url || typeof url !== 'string') return false;
    if (/^assets\/images\/[a-zA-Z0-9/_.-]+\.(webp|jpg|jpeg|png|svg)$/i.test(url) && !url.includes('..')) {
      return true;
    }
    try {
      const parsed = new URL(url);
      return parsed.protocol === 'https:';
    } catch (_) {
      return false;
    }
  }

  function resolveImageUrl(rawUrl, defaultFallback) {
    const fallbackFinal = defaultFallback || FALLBACK_IMAGE;
    const url = String(rawUrl || '').trim();
    if (!url) {
      return { primary: '', fallback: fallbackFinal, isEmpty: true };
    }

    let driveId = null;
    const fileMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]{10,80})/i);
    if (fileMatch) {
      driveId = fileMatch[1];
    } else if (/drive\.google\.com/i.test(url)) {
      const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]{10,80})/i);
      if (idMatch) driveId = idMatch[1];
    }

    if (driveId) {
      return {
        primary: `https://lh3.googleusercontent.com/d/${driveId}=w1200`,
        fallback: `https://drive.google.com/thumbnail?id=${driveId}&sz=w1200`,
        isEmpty: false
      };
    }

    if (!isSafeImagePath(url)) {
      return { primary: fallbackFinal, fallback: fallbackFinal, isEmpty: false };
    }

    return { primary: url, fallback: fallbackFinal, isEmpty: false };
  }

  function buildImageOnError(fallbackUrl, finalUrl) {
    const safeFb1 = escapeHTML(fallbackUrl || FALLBACK_IMAGE);
    const safeFb2 = escapeHTML(finalUrl || FALLBACK_IMAGE);
    return `if(!this.dataset.fb1){this.dataset.fb1='1';this.src='${safeFb1}';}else if(!this.dataset.fb2){this.dataset.fb2='1';this.src='${safeFb2}';}`;
  }

  function parseCSV(text) {
    const rows = [];
    let row = [];
    let cell = '';
    let inQuotes = false;

    const cleanText = String(text || '').replace(/^\uFEFF/, '');

    for (let i = 0; i < cleanText.length; i++) {
      const ch = cleanText[i];
      const next = cleanText[i + 1];

      if (inQuotes) {
        if (ch === '"' && next === '"') {
          cell += '"';
          i++;
        } else if (ch === '"') {
          inQuotes = false;
        } else {
          cell += ch;
        }
      } else {
        if (ch === '"') {
          inQuotes = true;
        } else if (ch === ',') {
          row.push(cell);
          cell = '';
        } else if (ch === '\r' && next === '\n') {
          row.push(cell);
          rows.push(row);
          row = [];
          cell = '';
          i++;
        } else if (ch === '\n' || ch === '\r') {
          row.push(cell);
          rows.push(row);
          row = [];
          cell = '';
        } else {
          cell += ch;
        }
      }
    }

    if (cell.length > 0 || row.length > 0) {
      row.push(cell);
      rows.push(row);
    }

    return rows.filter(r => r.some(c => String(c).trim() !== ''));
  }

  function rowsToObjects(rows) {
    if (!rows || rows.length < 2) return [];
    const headers = rows[0].map(h => String(h).trim().toLowerCase());
    const list = [];
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const obj = {};
      headers.forEach((key, idx) => {
        if (key) obj[key] = row[idx] !== undefined ? String(row[idx]).trim() : '';
      });
      list.push(obj);
    }
    return list;
  }

  function getCache(key) {
    try {
      const raw = sessionStorage.getItem(key);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed && Array.isArray(parsed.data) ? parsed.data : null;
    } catch (_) {
      return null;
    }
  }

  function setCache(key, data) {
    try {
      sessionStorage.setItem(key, JSON.stringify({ timestamp: Date.now(), data }));
    } catch (_) {
      // Ignore storage quota errors
    }
  }

  function fetchSheetObjects(url, cacheKey, onData) {
    const cached = getCache(cacheKey);
    if (cached && cached.length > 0) {
      onData(cached);
    }

    const sep = url.includes('?') ? '&' : '?';
    const freshUrl = `${url}${sep}_t=${Date.now()}`;

    fetch(freshUrl, { cache: 'no-store' })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then(csvText => {
        const objects = rowsToObjects(parseCSV(csvText));
        if (objects.length > 0) {
          setCache(cacheKey, objects);
          onData(objects);
        }
      })
      .catch(err => {
        console.warn(`[SheetCore] Menggunakan data lokal untuk ${cacheKey}:`, err.message);
      });
  }

  window.GesidSheetCore = {
    FALLBACK_IMAGE,
    escapeHTML,
    hasSpam,
    isSafeIconClass,
    resolveImageUrl,
    buildImageOnError,
    parseCSV,
    rowsToObjects,
    fetchSheetObjects
  };
})();
