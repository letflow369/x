(() => {
  'use strict';

  const tocLinks = [...document.querySelectorAll('.acupuncture-toc a[href^="#"]')];
  const sections = tocLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const setCurrent = (id) => {
    tocLinks.forEach((link) => {
      const active = link.getAttribute('href') === `#${id}`;
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };

  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setCurrent(visible.target.id);
    }, { rootMargin: '-18% 0px -64% 0px', threshold: [0, 0.15, 0.35] });
    sections.forEach((section) => observer.observe(section));
  }

  const backToTop = document.querySelector('[data-back-to-top]');
  if (backToTop) {
    const syncTopButton = () => backToTop.classList.toggle('is-visible', window.scrollY > 700);
    syncTopButton();
    window.addEventListener('scroll', syncTopButton, { passive: true });
  }
})();
