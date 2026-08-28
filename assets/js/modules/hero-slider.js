/**
 * Hero Slider Module
 * Handles auto-sliding, previous/next controls, dot indicators, touch swipe (mobile), and mouse drag (desktop).
 */

(function () {
  function initHeroSlider() {
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
  }

  window.initHeroSlider = initHeroSlider;
})();
