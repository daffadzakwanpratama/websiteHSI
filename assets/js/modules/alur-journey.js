/**
 * Gesid Halal Center - Alur Sertifikasi Interactive Journey Controller
 * High-performance, GPU-friendly scroll timeline with cached geometry,
 * layout-thrashing prevention, and smooth 60+ FPS interpolation.
 */

(function () {
  'use strict';

  function initAlurJourney() {
    const section = document.getElementById('alur-sertifikasi');
    const container = document.getElementById('alurTimelineContainer');
    const progressLine = document.getElementById('alurProgressLine');
    const stepItems = Array.from(document.querySelectorAll('.alur-step-item'));

    if (!section || !container || !progressLine || stepItems.length === 0) {
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      progressLine.style.height = '100%';
      stepItems.forEach(item => {
        item.classList.add('is-passed', 'is-active');
      });
      return;
    }

    // Cached timeline geometry metrics
    let totalTrackHeight = 0;
    let firstNodeCenterOffset = 0;
    let nodeCenterOffsets = [];
    let lastDeepestIndex = -999;

    // Smooth progress interpolation state
    let currentHeightPx = 0;
    let targetHeightPx = 0;
    let animFrameId = null;
    let resizeTicking = false;

    function measureTimeline() {
      const containerRect = container.getBoundingClientRect();
      const nodes = stepItems.map(item => item.querySelector('.alur-step-node')).filter(Boolean);

      if (nodes.length === 0) return;

      nodeCenterOffsets = nodes.map(node => {
        const nodeRect = node.getBoundingClientRect();
        return (nodeRect.top + nodeRect.height / 2) - containerRect.top;
      });

      firstNodeCenterOffset = nodeCenterOffsets[0];
      const lastNodeCenterOffset = nodeCenterOffsets[nodeCenterOffsets.length - 1];
      totalTrackHeight = Math.max(0, lastNodeCenterOffset - firstNodeCenterOffset);
    }

    // Buttery-smooth spring/lerp loop: only runs when moving, 0% CPU when idle
    function animateProgress() {
      const diff = targetHeightPx - currentHeightPx;
      if (Math.abs(diff) < 0.25) {
        currentHeightPx = targetHeightPx;
        progressLine.style.height = `${currentHeightPx.toFixed(1)}px`;
        animFrameId = null;
        return;
      }

      // Responsive damping factor: snappy follow with silky ease-out
      currentHeightPx += diff * 0.22;
      progressLine.style.height = `${currentHeightPx.toFixed(1)}px`;
      animFrameId = window.requestAnimationFrame(animateProgress);
    }

    function triggerProgressAnimation() {
      if (!animFrameId) {
        animFrameId = window.requestAnimationFrame(animateProgress);
      }
    }

    function onScrollUpdate() {
      const containerRect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Skip heavy work if container is completely outside viewport bounds
      if (containerRect.bottom < -100 || containerRect.top > viewportHeight + 100) {
        return;
      }

      // Trigger line in viewport: when node reaches ~58% of viewport height
      const triggerY = viewportHeight * 0.58;
      const scrolledPastFirst = triggerY - (containerRect.top + firstNodeCenterOffset);

      let ratio = 0;
      if (totalTrackHeight > 0) {
        ratio = Math.max(0, Math.min(1, scrolledPastFirst / totalTrackHeight));
      }

      targetHeightPx = ratio * totalTrackHeight;
      triggerProgressAnimation();

      // Active & Passed step calculations (pure arithmetic against cached metrics)
      let deepestActiveIndex = -1;
      const threshold = triggerY + 10;

      for (let i = 0; i < nodeCenterOffsets.length; i++) {
        if (containerRect.top + nodeCenterOffsets[i] <= threshold) {
          deepestActiveIndex = i;
        }
      }

      // Batch DOM mutations: only touch classList when stage threshold changes!
      if (deepestActiveIndex !== lastDeepestIndex) {
        lastDeepestIndex = deepestActiveIndex;
        for (let i = 0; i < stepItems.length; i++) {
          const item = stepItems[i];
          const isPassed = i <= deepestActiveIndex;
          const isActive = i === deepestActiveIndex;

          item.classList.toggle('is-passed', isPassed);
          item.classList.toggle('is-active', isActive);
        }
      }
    }

    function handleResize() {
      if (!resizeTicking) {
        window.requestAnimationFrame(() => {
          measureTimeline();
          onScrollUpdate();
          resizeTicking = false;
        });
        resizeTicking = true;
      }
    }

    // Initial measurement & first render
    measureTimeline();
    onScrollUpdate();

    // Attach lightweight passive listeners
    window.addEventListener('scroll', onScrollUpdate, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAlurJourney);
  } else {
    initAlurJourney();
  }
})();
