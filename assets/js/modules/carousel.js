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
      const sectionParent = carousel.closest('section') || carousel.parentElement;
      const prevBtn = sectionParent ? sectionParent.querySelector('[data-carousel-prev]') : null;
      const nextBtn = sectionParent ? sectionParent.querySelector('[data-carousel-next]') : null;
      const internalPrev = carousel.querySelector('[data-carousel-prev]');
      const internalNext = carousel.querySelector('[data-carousel-next]');
      const actualPrevBtn = internalPrev || prevBtn;
      const actualNextBtn = internalNext || nextBtn;
      const dotsContainer = carousel.querySelector('[data-carousel-dots]');

      if (!track) return;

      if (track.classList.contains('home-news-track')) {
        const newsCards = track.querySelectorAll('.home-news-card');
        if (newsCards.length === 0) return;

        const group = document.createElement('div');
        group.className = 'home-news-group';
        newsCards.forEach((card) => group.appendChild(card));
        track.appendChild(group);

        const duplicateGroup = group.cloneNode(true);
        duplicateGroup.setAttribute('aria-hidden', 'true');
        duplicateGroup.setAttribute('inert', '');
        track.appendChild(duplicateGroup);

        track.classList.add('home-news-marquee');
        return;
      }

      if (slides.length === 0) return;

      let currentIndex = 0;
      const totalSlides = slides.length;

      // Create Dots if container exists
      if (dotsContainer) {
        dotsContainer.innerHTML = '';
        slides.forEach((_, idx) => {
          const dot = document.createElement('button');
          dot.className = `carousel-dot ${idx === 0 ? 'active' : ''}`;
          dot.setAttribute('aria-label', `Slide ${idx + 1}`);
          dot.addEventListener('click', (e) => {
            e.preventDefault();
            goToSlide(idx);
          });
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

      function getMaxScroll() {
        return Math.max(0, track.scrollWidth - track.clientWidth);
      }

      function goToSlide(index) {
        if (index < 0) index = 0;
        if (index >= totalSlides) index = totalSlides - 1;
        currentIndex = index;

        const maxScroll = getMaxScroll();
        if (maxScroll <= 0) {
          updateDots(0);
          return;
        }

        // Proportional target scroll position based on total slides
        const targetLeft = (index / (totalSlides - 1)) * maxScroll;
        track.scrollTo({
          left: targetLeft,
          behavior: 'smooth'
        });
        updateDots(index);
      }

      if (actualPrevBtn) {
        actualPrevBtn.addEventListener('click', (e) => {
          e.preventDefault();
          currentIndex = (currentIndex > 0) ? currentIndex - 1 : 0;
          goToSlide(currentIndex);
        });
      }

      if (actualNextBtn) {
        actualNextBtn.addEventListener('click', (e) => {
          e.preventDefault();
          currentIndex = (currentIndex < totalSlides - 1) ? currentIndex + 1 : totalSlides - 1;
          goToSlide(currentIndex);
        });
      }

      // Update active dot proportionally on manual touch scroll / swipe
      let scrollTimeout;
      track.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          const maxScroll = getMaxScroll();
          if (maxScroll <= 0) {
            updateDots(0);
            return;
          }

          // Calculate current progress between 0 and 1
          const progress = Math.max(0, Math.min(1, track.scrollLeft / maxScroll));
          const nearestIndex = Math.min(totalSlides - 1, Math.round(progress * (totalSlides - 1)));

          currentIndex = nearestIndex;
          updateDots(nearestIndex);
        }, 35);
      }, { passive: true });

      // Desktop Mouse Drag support (disable snap during drag to avoid stutter)
      let isDown = false;
      let startX;
      let scrollStart;

      track.addEventListener('mousedown', (e) => {
        isDown = true;
        track.classList.add('cursor-grabbing');
        track.style.scrollSnapType = 'none';
        track.style.scrollBehavior = 'auto';
        startX = e.pageX - track.offsetLeft;
        scrollStart = track.scrollLeft;
      });

      function stopDrag() {
        if (!isDown) return;
        isDown = false;
        track.classList.remove('cursor-grabbing');
        track.style.scrollSnapType = '';
        track.style.scrollBehavior = '';
      }

      track.addEventListener('mouseleave', stopDrag);
      track.addEventListener('mouseup', stopDrag);

      track.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - track.offsetLeft;
        const walk = (x - startX) * 1.3;
        track.scrollLeft = scrollStart - walk;
      });
    });
  }

  window.initCarousels = initCarousels;
})();
