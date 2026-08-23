// PT Halal Standard Indonesia - Main JS

// ── Mobile Menu ──────────────────────────────────────────────────────────────
(function () {
  const btn      = document.getElementById('mobileMenuBtn');
  const closeBtn = document.getElementById('closeMobileMenuBtn');
  const drawer   = document.getElementById('mobileMenuDrawer');
  const backdrop = document.getElementById('mobileBackdrop');

  if (!btn) return;

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
})();

// ── Active Navigation State Auto-Detector ────────────────────────────────────
(function () {
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  const pageMap = {
    '': 'index.html',
    '/': 'index.html',
    'index.html': 'index.html',
    'tentang-kami.html': 'tentang-kami.html',
    'layanan.html': 'layanan.html',
    'detail-layanan.html': 'layanan.html', // Detail layanan maps to Layanan
    'kontak.html': 'kontak.html'
  };
  const activeTarget = pageMap[currentFile] || currentFile;

  // Desktop Nav Links
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === activeTarget) {
      link.classList.add('text-forest-800', 'font-semibold');
      link.classList.remove('text-slate-600');
    } else {
      link.classList.remove('text-forest-800', 'font-semibold');
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
})();

// ── FAQ Accordion ─────────────────────────────────────────────────────────────
(function () {
  const btns = document.querySelectorAll('.accordion-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      const icon    = btn.querySelector('.accordion-icon');
      const isOpen  = content.classList.contains('active');

      // Close all
      document.querySelectorAll('.accordion-content').forEach(el => el.classList.remove('active'));
      document.querySelectorAll('.accordion-icon').forEach(el => el.classList.remove('rotated'));

      if (!isOpen) {
        content.classList.add('active');
        icon?.classList.add('rotated');
      }
    });
  });
})();

// ── Contact / Consult Form ────────────────────────────────────────────────────
(function () {
  ['contactForm', 'consultForm'].forEach(id => {
    const form = document.getElementById(id);
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const successId = id === 'contactForm' ? 'contactSuccess' : 'formSuccess';
      form.classList.add('hidden');
      document.getElementById(successId)?.classList.remove('hidden');
    });
  });
})();

// ── Detail Layanan Dynamic Content ───────────────────────────────────────────
(function () {
  const params = new URLSearchParams(window.location.search);
  const service = params.get('service') || 'sertifikasi';

  const data = {
    sertifikasi: {
      label: 'Layanan 01',
      breadcrumb: 'Sertifikasi Halal Resmi BPJPH & MUI',
      title: 'Sertifikasi Halal Resmi BPJPH & MUI',
      desc: [
        'Pendampingan komprehensif untuk memperoleh Sertifikat Halal dari BPJPH dan ketetapan fatwa halal MUI yang diakui secara resmi di Indonesia. Kami menangani seluruh proses dari persiapan dokumen, audit LPH, hingga penerbitan sertifikat.',
        'Dengan tim berpengalaman yang memahami regulasi BPJPH dan prosedur fatwa MUI, kami memastikan proses sertifikasi berjalan efisien, terencana, dan tepat waktu.'
      ],
      features: ['Analisis kesiapan produk dan fasilitas produksi', 'Penyusunan dokumen SJPH sesuai regulasi BPJPH', 'Pendampingan audit lapangan oleh LPH', 'Koordinasi sidang fatwa dan BPJPH/MUI', 'Pengurusan penerbitan sertifikat halal resmi', 'Pembaruan sertifikat berkala'],
      target: ['Perusahaan yang baru memulai proses sertifikasi halal', 'Pelaku usaha yang membutuhkan panduan alur BPJPH & MUI', 'Produsen makanan, minuman, kosmetik, dan farmasi yang ingin memenuhi kewajiban hukum', 'Perusahaan yang perlu memperbarui sertifikat halal']
    },
    sjph: {
      label: 'Layanan 02',
      breadcrumb: 'Konsultasi & Manual SJPH',
      title: 'Konsultasi & Manual SJPH',
      desc: [
        'Penyusunan Sistem Jaminan Produk Halal secara menyeluruh — termasuk manual SJPH, prosedur SOP, penunjukan dan bimbingan Penyelia Halal, serta audit internal perusahaan.',
        'Kami membantu perusahaan membangun sistem halal yang kuat dan dapat dipertahankan secara mandiri dalam jangka panjang.'
      ],
      features: ['Gap analysis kondisi perusahaan', 'Penyusunan manual SJPH lengkap', 'Pembuatan prosedur SOP halal', 'Penunjukan dan bimbingan penyelia halal', 'Audit internal SJPH', 'Tindak lanjut temuan ketidaksesuaian'],
      target: ['Perusahaan yang belum memiliki sistem SJPH', 'Tim internal yang perlu membangun manual halal', 'Perusahaan yang gagal audit karena dokumen tidak lengkap', 'Organisasi yang ingin meningkatkan standar internal halal']
    },
    standarisasi: {
      label: 'Layanan 03',
      breadcrumb: 'Standarisasi & Kepatuhan Regulasi',
      title: 'Standarisasi & Kepatuhan Regulasi Halal',
      desc: [
        'Fasilitasi penyelarasan standar mutu halal, uji laboratorium bahan baku, dan pemenuhan regulasi jaminan produk halal secara menyeluruh di Indonesia.',
        'Kami membantu memastikan seluruh rantai pasok, bahan baku, dan proses produksi Anda memenuhi kriteria ketat audit LPH dan ketetapan BPJPH.'
      ],
      features: ['Pemenuhan standar regulasi halal BPJPH', 'Verifikasi kehalalan bahan baku kritis', 'Koordinasi uji laboratorium independen', 'Penyelarasan standar fasilitas dan sanitasi', 'Pendampingan kepatuhan perundang-undangan halal', 'Evaluasi dan validasi dokumen teknis'],
      target: ['Produsen yang memerlukan verifikasi bahan baku halal', 'Perusahaan manufaktur dengan lini produksi kompleks', 'Perusahaan yang ingin memastikan kepatuhan menyeluruh terhadap regulasi BPJPH', 'Brand yang ingin meningkatkan jaminan mutu dan kepercayaan konsumen di Indonesia']
    },
    pelatihan: {
      label: 'Layanan 04',
      breadcrumb: 'Pelatihan Penyelia Halal',
      title: 'Pelatihan Penyelia Halal',
      desc: [
        'Program bimbingan teknis dan pelatihan sertifikasi kompetensi bagi personel internal perusahaan agar mampu mengelola dan memelihara SJPH secara mandiri.',
        'Materi pelatihan disusun sesuai standar SKKNI Penyelia Halal dan diperkaya dengan studi kasus nyata dari berbagai industri.'
      ],
      features: ['Materi sesuai SKKNI Penyelia Halal', 'Sertifikat pelatihan resmi', 'Modul praktis berbasis studi kasus industri', 'Simulasi audit internal SJPH', 'Pemahaman regulasi BPJPH terkini', 'Konsultasi pasca pelatihan'],
      target: ['Tim QA / QC yang ditunjuk sebagai penyelia halal', 'Manajer produksi yang perlu memahami regulasi halal', 'Staf yang akan mengelola sistem SJPH mandiri', 'Perusahaan yang ingin mengurangi ketergantungan pada konsultan eksternal']
    }
  };

  const d = data[service] || data['sertifikasi'];

  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };

  set('serviceLabel', d.label);
  set('breadcrumbCurrent', d.breadcrumb);
  set('serviceTitle', d.title);

  const descEl = document.getElementById('serviceDesc');
  if (descEl) {
    descEl.innerHTML = d.desc.map(p => `<p>${p}</p>`).join('');
  }

  const featEl = document.getElementById('serviceFeatures');
  if (featEl) {
    featEl.innerHTML = d.features.map(f =>
      `<li class="flex items-start gap-3"><i class="fa-solid fa-check text-forest-600 text-xs mt-1 flex-shrink-0"></i><span class="text-sm text-slate-700">${f}</span></li>`
    ).join('');
  }

  const targetEl = document.getElementById('serviceTarget');
  if (targetEl) {
    targetEl.innerHTML = d.target.map(t =>
      `<li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-forest-600 flex-shrink-0"></span>${t}</li>`
    ).join('');
  }
})();

// ── Interactive Carousel / Slider Engine ─────────────────────────────────────
(function () {
  const carousels = document.querySelectorAll('[data-carousel]');

  carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('[data-carousel-prev]');
    const nextBtn = carousel.querySelector('[data-carousel-next]');
    const dotsContainer = carousel.querySelector('[data-carousel-dots]');

    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    const totalSlides = slides.length;

    // Create Dots if container exists
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      slides.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.className = `carousel-dot ${idx === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Slide ${idx + 1}`);
        dot.addEventListener('click', () => goToSlide(idx));
        dotsContainer.appendChild(dot);
      });
    }

    const dots = dotsContainer ? dotsContainer.querySelectorAll('.carousel-dot') : [];

    function updateDots(index) {
      dots.forEach((dot, i) => {
        if (i === index) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }

    function goToSlide(index) {
      if (index < 0) index = 0;
      if (index >= totalSlides) index = totalSlides - 1;
      currentIndex = index;

      const slide = slides[index];
      if (slide) {
        track.scrollTo({
          left: slide.offsetLeft - track.offsetLeft,
          behavior: 'smooth'
        });
      }
      updateDots(index);
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalSlides - 1;
        goToSlide(currentIndex);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex < totalSlides - 1) ? currentIndex + 1 : 0;
        goToSlide(currentIndex);
      });
    }

    // Update active dot on manual touch scroll / swipe
    let scrollTimeout;
    track.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollLeft = track.scrollLeft;
        let nearestIndex = 0;
        let minDiff = Infinity;

        slides.forEach((slide, idx) => {
          const diff = Math.abs(slide.offsetLeft - track.offsetLeft - scrollLeft);
          if (diff < minDiff) {
            minDiff = diff;
            nearestIndex = idx;
          }
        });

        currentIndex = nearestIndex;
        updateDots(nearestIndex);
      }, 50);
    }, { passive: true });

    // Desktop Mouse Drag support
    let isDown = false;
    let startX;
    let scrollStart;

    track.addEventListener('mousedown', (e) => {
      isDown = true;
      track.classList.add('cursor-grabbing');
      startX = e.pageX - track.offsetLeft;
      scrollStart = track.scrollLeft;
    });

    track.addEventListener('mouseleave', () => {
      isDown = false;
      track.classList.remove('cursor-grabbing');
    });

    track.addEventListener('mouseup', () => {
      isDown = false;
      track.classList.remove('cursor-grabbing');
    });

    track.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.5;
      track.scrollLeft = scrollStart - walk;
    });
  });
})();

// ── Hero Image Carousel Engine (Swipe, Drag, Arrows & Dynamic Dots) ───────────
(function () {
  const container = document.getElementById('heroSliderContainer');
  const track = document.getElementById('heroSliderTrack');
  const slides = track ? track.querySelectorAll('.hero-slide') : [];
  const prevBtn = document.getElementById('heroPrevBtn');
  const nextBtn = document.getElementById('heroNextBtn');
  const dotsContainer = document.getElementById('heroDotsContainer');

  if (!container || !track || slides.length === 0) return;

  let currentIndex = 0;
  const totalSlides = slides.length;
  let autoSlideTimer = null;

  // Build Interactive Dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = `transition-all duration-300 rounded-full ${idx === 0 ? 'w-8 h-2 bg-forest-400 shadow-sm' : 'w-2.5 h-2.5 bg-white/50 hover:bg-white'}`;
      dot.setAttribute('aria-label', `Slide ${idx + 1}`);
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        goToSlide(idx);
        restartAutoSlide();
      });
      dotsContainer.appendChild(dot);
    });
  }

  function updateDots(index) {
    if (!dotsContainer) return;
    const dots = dotsContainer.querySelectorAll('button');
    dots.forEach((dot, idx) => {
      if (idx === index) {
        dot.className = 'transition-all duration-300 rounded-full w-8 h-2 bg-forest-400 shadow-sm';
      } else {
        dot.className = 'transition-all duration-300 rounded-full w-2.5 h-2.5 bg-white/50 hover:bg-white';
      }
    });
  }

  function goToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    currentIndex = index;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots(currentIndex);
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      nextSlide();
      restartAutoSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      prevSlide();
      restartAutoSlide();
    });
  }

  // Auto-slide every 5 seconds
  function startAutoSlide() {
    stopAutoSlide();
    autoSlideTimer = setInterval(nextSlide, 5000);
  }

  function stopAutoSlide() {
    if (autoSlideTimer) clearInterval(autoSlideTimer);
  }

  function restartAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
  }

  startAutoSlide();

  // Pause on hover (Desktop)
  const heroSection = document.getElementById('heroCarouselSection');
  if (heroSection) {
    heroSection.addEventListener('mouseenter', stopAutoSlide);
    heroSection.addEventListener('mouseleave', startAutoSlide);
  }

  // Touch Swipe for Mobile
  let touchStartX = 0;
  let touchEndX = 0;
  let touchStartTime = 0;

  heroSection?.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartTime = Date.now();
    stopAutoSlide();
  }, { passive: true });

  heroSection?.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diffX = touchStartX - touchEndX;
    const diffTime = Date.now() - touchStartTime;

    // Minimum swipe threshold 35px in under 600ms
    if (Math.abs(diffX) > 35 && diffTime < 600) {
      if (diffX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    startAutoSlide();
  }, { passive: true });

  // Mouse Drag for Desktop
  let isDragging = false;
  let mouseStartX = 0;
  let mouseCurrentX = 0;

  heroSection?.addEventListener('mousedown', (e) => {
    // Ignore clicks on buttons/links
    if (e.target.closest('button, a, input')) return;
    isDragging = true;
    mouseStartX = e.clientX;
    stopAutoSlide();
    heroSection.classList.add('cursor-grabbing');
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    mouseCurrentX = e.clientX;
  });

  window.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    heroSection?.classList.remove('cursor-grabbing');
    const diffX = mouseStartX - (mouseCurrentX || mouseStartX);
    if (Math.abs(diffX) > 40) {
      if (diffX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    mouseCurrentX = 0;
    startAutoSlide();
  });
})();

// ── Smooth Natural Counter Animation (IntersectionObserver + EaseOut) ─────────
(function () {
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length === 0) return;

  function animateCounter(el) {
    const rawVal = el.getAttribute('data-counter');
    const target = parseInt(rawVal, 10);
    if (isNaN(target)) return;

    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1500; // 1.5s smooth duration
    const startTime = performance.now();

    // Smooth Ease-out Quartic curve
    function easeOutQuart(t) {
      return 1 - Math.pow(1 - t, 4);
    }

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);
      const current = Math.round(target * eased);

      el.textContent = `${prefix}${current.toLocaleString('id-ID')}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = `${prefix}${target.toLocaleString('id-ID')}${suffix}`;
      }
    }

    requestAnimationFrame(update);
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    counters.forEach(c => observer.observe(c));
  } else {
    counters.forEach(c => animateCounter(c));
  }
})();


