/**
 * Generic Carousel Engine
 * Reusable slider component for visual cards, documentations, and highlights.
 * Supports touch drag, mouse drag, dot indicators, and prev/next buttons.
 */

(function () {
  function initCarousels() {
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
  }

  window.initCarousels = initCarousels;
})();
