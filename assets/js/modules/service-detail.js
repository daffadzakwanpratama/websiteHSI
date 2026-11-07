/**
 * Renders the selected service detail from the shared service catalog data.
 * Visual, concise, and easy-to-scan layout.
 */

(function () {
  function cloneTemplate(id) {
    const template = document.getElementById(id);
    return template ? template.content.cloneNode(true) : document.createDocumentFragment();
  }

  function renderList(templateId, values) {
    const fragment = document.createDocumentFragment();
    if (!Array.isArray(values)) return fragment;
    values.forEach(value => {
      const item = cloneTemplate(templateId);
      const textEl = item.querySelector('[data-service-text]');
      if (textEl) textEl.textContent = value;
      fragment.appendChild(item);
    });
    return fragment;
  }

  function renderFlow(section, flow) {
    if (!section) return;
    if (!flow || !Array.isArray(flow.steps) || flow.steps.length === 0) {
      section.classList.add('hidden');
      return;
    }

    const introEl = section.querySelector('[data-flow-intro]');
    if (introEl) introEl.textContent = flow.intro || '';

    const stepList = section.querySelector('[data-flow-steps]');
    if (!stepList) return;

    flow.steps.forEach((step, index) => {
      const item = cloneTemplate('serviceFlowStepTemplate');
      const numEl = item.querySelector('[data-flow-number]');
      const iconEl = item.querySelector('[data-flow-icon]');
      const titleEl = item.querySelector('[data-flow-step-title]');
      const descEl = item.querySelector('[data-flow-step-desc]');

      if (numEl) numEl.textContent = `Tahap ${index + 1}`;
      if (iconEl) iconEl.className = `fa-solid ${step.icon || 'fa-check'} text-sm text-[#c89020]`;
      if (titleEl) titleEl.textContent = step.title || '';
      if (descEl) descEl.textContent = step.description || '';

      stepList.appendChild(item);
    });
  }

  function initServiceDetail() {
    const titleEl = document.getElementById('serviceTitle');
    const dynamicContent = document.getElementById('serviceDynamicContent');
    const legacyContent = document.getElementById('legacyLphProfile');
    if (!titleEl || !dynamicContent || !legacyContent) return;

    const serviceKey = new URLSearchParams(window.location.search).get('service');
    if (!serviceKey || serviceKey === 'lph') return;

    const service = (window.HSI_SERVICES_DATA || {})[serviceKey];
    dynamicContent.classList.remove('hidden');
    legacyContent.classList.add('hidden');

    const setText = (id, value) => {
      const element = document.getElementById(id);
      if (element) element.textContent = value;
    };

    if (!service) {
      setText('breadcrumbCurrent', 'Layanan tidak ditemukan');
      setText('serviceLabel', 'Katalog Layanan');
      setText('serviceTitle', 'Layanan tidak ditemukan');
      setText('serviceHeroDescription', 'Silakan kembali ke halaman Layanan untuk melihat daftar layanan resmi LPH GESID Halal Center.');
      dynamicContent.replaceChildren(cloneTemplate('serviceNotFoundTemplate'));
      document.title = 'Layanan tidak ditemukan — Gesid Halal Center';
      return;
    }

    setText('breadcrumbCurrent', service.breadcrumb);
    setText('serviceTitle', service.title);
    setText('serviceHeroDescription', service.shortDesc);

    const label = document.getElementById('serviceLabel');
    if (label) {
      label.textContent = service.label;
    }

    const detail = cloneTemplate('serviceDetailTemplate');

    // 1. Tentang Layanan
    const description = detail.querySelector('[data-service-description]');
    if (description && Array.isArray(service.desc)) {
      service.desc.forEach(paragraph => {
        const element = document.createElement('p');
        element.textContent = paragraph;
        description.appendChild(element);
      });
    }

    // 2. Apa yang Dilakukan GESID
    const featuresEl = detail.querySelector('[data-service-features]');
    if (featuresEl) {
      featuresEl.appendChild(renderList('serviceFeatureTemplate', service.features));
    }

    // 3. Hasil yang Diperoleh Klien
    const deliverablesSection = detail.querySelector('[data-service-deliverables-section]');
    const deliverablesEl = detail.querySelector('[data-service-deliverables]');
    if (deliverablesEl && Array.isArray(service.deliverables) && service.deliverables.length > 0) {
      deliverablesEl.appendChild(renderList('serviceDeliverableTemplate', service.deliverables));
    } else if (deliverablesSection) {
      deliverablesSection.classList.add('hidden');
    }

    // 4. Tahapan Layanan (Visual 2x2 Grid)
    renderFlow(detail.querySelector('[data-service-flow]'), service.flow);

    // 5. Sesuai Untuk Siapa
    const targetsEl = detail.querySelector('[data-service-targets]');
    if (targetsEl) {
      targetsEl.appendChild(renderList('serviceTargetTemplate', service.target));
    }

    // 6. Catatan Kewenangan & Ketidakberpihakan
    const noteSection = detail.querySelector('[data-service-impartiality-section]');
    const noteText = detail.querySelector('[data-service-impartiality]');
    if (noteSection && noteText && service.impartialityNote) {
      noteText.textContent = service.impartialityNote;
    } else if (noteSection) {
      noteSection.classList.add('hidden');
    }

    dynamicContent.replaceChildren(detail);

    document.title = `${service.title} — Gesid Halal Center`;
    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) descriptionMeta.content = service.shortDesc;
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      const serviceUrl = new URL(`detail-layanan.html?service=${encodeURIComponent(serviceKey)}`, canonical.href).href;
      canonical.setAttribute('href', serviceUrl);
      document.querySelector('meta[property="og:url"]')?.setAttribute('content', serviceUrl);
    }
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', `${service.title} — Gesid Halal Center`);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', service.shortDesc);
  }

  window.initServiceDetail = initServiceDetail;
})();
