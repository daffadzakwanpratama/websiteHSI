/**
 * Renders the selected service detail from the shared service catalog data.
 */

(function () {
  const flowIconPalettes = {
    blue: ['#60A5FA', '#2563EB'],
    indigo: ['#818CF8', '#4F46E5'],
    purple: ['#C084FC', '#9333EA'],
    teal: ['#2DD4BF', '#0F766E'],
    green: ['#4ADE80', '#15803D'],
    amber: ['#FBBF24', '#D97706']
  };

  function cloneTemplate(id) {
    const template = document.getElementById(id);
    return template.content.cloneNode(true);
  }

  function renderList(templateId, values) {
    const fragment = document.createDocumentFragment();
    values.forEach(value => {
      const item = cloneTemplate(templateId);
      item.querySelector('[data-service-text]').textContent = value;
      fragment.appendChild(item);
    });
    return fragment;
  }

  function renderFlow(section, flow) {
    if (!flow || !Array.isArray(flow.steps) || flow.steps.length === 0) {
      section.classList.add('hidden');
      return;
    }

    section.querySelector('[data-flow-intro]').textContent = flow.intro;
    const stepList = section.querySelector('[data-flow-steps]');
    const flowPanel = section.querySelector('[data-flow-panel]');
    const flowHint = section.querySelector('[data-flow-hint] span');
    const stepButtons = flow.steps.map((step, index) => {
      const item = cloneTemplate('serviceFlowStepTemplate');
      const button = item.querySelector('[data-flow-step]');
      button.setAttribute('aria-pressed', 'false');
      button.querySelector('[data-flow-number]').textContent = String(index + 1).padStart(2, '0');
      button.querySelector('[data-flow-step-title]').textContent = step.title;
      button.addEventListener('click', () => {
        stepButtons.forEach((stepButton, stepIndex) => {
          stepButton.setAttribute('aria-pressed', String(stepIndex === index));
        });
        flowPanel.classList.remove('hidden');
        flowHint.textContent = 'Pilih nomor lain untuk membaca langkah berikutnya.';
        section.querySelector('[data-flow-count]').textContent =
          `Langkah ${index + 1} dari ${flow.steps.length}`;
        section.querySelector('[data-flow-title]').textContent = step.title;
        section.querySelector('[data-flow-description]').textContent = step.description;
        const palette = flowIconPalettes[step.tone] || flowIconPalettes.amber;
        const flowIconTile = section.querySelector('[data-flow-icon-tile]');
        flowIconTile.style.backgroundImage = `linear-gradient(135deg, ${palette[0]}, ${palette[1]})`;
        const flowIcon = section.querySelector('[data-flow-icon]');
        flowIcon.className = `fa-solid ${step.icon || 'fa-circle-info'} relative z-10 text-3xl text-white drop-shadow-sm`;
      });
      return button;
    });

    stepButtons.forEach(button => stepList.appendChild(button));
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
      setText('serviceLabel', 'Katalog layanan');
      setText('serviceTitle', 'Layanan tidak ditemukan');
      setText('serviceHeroDescription', 'Silakan kembali ke katalog untuk memilih layanan yang tersedia.');
      dynamicContent.replaceChildren(cloneTemplate('serviceNotFoundTemplate'));
      document.title = 'Layanan tidak ditemukan — Gesid Halal Center';
      return;
    }

    setText('breadcrumbCurrent', service.breadcrumb);
    setText('serviceTitle', service.title);
    setText('serviceHeroDescription', service.shortDesc);

    const label = document.getElementById('serviceLabel');
    if (label) {
      const indicator = label.querySelector('span');
      if (indicator) indicator.className = 'h-2 w-2 rounded-full bg-[#c89020]';
      label.replaceChildren(
        ...(indicator ? [indicator] : []),
        document.createTextNode(service.label)
      );
    }

    const detail = cloneTemplate('serviceDetailTemplate');
    renderFlow(detail.querySelector('[data-service-flow]'), service.flow);
    detail.querySelector('[data-service-icon]').classList.add('fa-solid', service.icon);
    const description = detail.querySelector('[data-service-description]');
    service.desc.forEach(paragraph => {
      const element = document.createElement('p');
      element.textContent = paragraph;
      description.appendChild(element);
    });
    detail.querySelector('[data-service-features]').appendChild(
      renderList('serviceFeatureTemplate', service.features)
    );
    detail.querySelector('[data-service-targets]').appendChild(
      renderList('serviceTargetTemplate', service.target)
    );
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
