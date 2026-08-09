(() => {
  'use strict';

  const page = document.querySelector('[data-integrative-page]');
  if (!page) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const progressBar = document.querySelector('[data-reading-progress]');
  const tocLinks = [...document.querySelectorAll('[data-integrative-toc] a[href^="#"]')];
  const backToTop = document.querySelector('[data-integrative-back-to-top]');

  const updateProgress = () => {
    if (!progressBar) return;
    const rect = page.getBoundingClientRect();
    const viewport = window.innerHeight || document.documentElement.clientHeight;
    const total = Math.max(page.offsetHeight - viewport, 1);
    const scrolled = Math.min(Math.max(-rect.top, 0), total);
    progressBar.style.width = `${(scrolled / total) * 100}%`;
  };

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      updateProgress();
      if (backToTop) backToTop.hidden = window.scrollY < 700;
      ticking = false;
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  updateProgress();

  if (backToTop) {
    backToTop.hidden = window.scrollY < 700;
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  if (tocLinks.length && 'IntersectionObserver' in window) {
    const targets = tocLinks
      .map((link) => document.getElementById(decodeURIComponent(link.hash.slice(1))))
      .filter(Boolean);

    const setCurrent = (id) => {
      tocLinks.forEach((link) => {
        if (link.hash === `#${id}`) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    };

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setCurrent(visible[0].target.id);
    }, { rootMargin: '-22% 0px -62% 0px', threshold: [0, 0.15, 0.5] });

    targets.forEach((target) => observer.observe(target));
  }

  document.querySelectorAll('[data-integrative-filters]').forEach((group) => {
    const buttons = [...group.querySelectorAll('[data-filter]')];
    const targetSelector = group.dataset.target || '[data-evidence-card]';
    const cards = [...page.querySelectorAll(targetSelector)];
    if (!buttons.length || !cards.length) return;

    const applyFilter = (value) => {
      buttons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.filter === value)));
      cards.forEach((card) => {
        const levels = (card.dataset.level || '').split(/\s+/).filter(Boolean);
        card.hidden = value !== 'all' && !levels.includes(value);
      });
    };

    buttons.forEach((button) => button.addEventListener('click', () => applyFilter(button.dataset.filter || 'all')));
  });
})();
