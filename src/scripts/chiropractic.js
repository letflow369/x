(() => {
  'use strict';

  const tocLinks = [...document.querySelectorAll('[data-chiro-toc] a[href^="#"]')];
  const backToTop = document.querySelector('[data-chiro-back-to-top]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (backToTop) {
    const updateButton = () => { backToTop.hidden = window.scrollY < 700; };
    updateButton();
    window.addEventListener('scroll', updateButton, { passive: true });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  if (tocLinks.length && 'IntersectionObserver' in window) {
    const targets = tocLinks
      .map((link) => document.getElementById(decodeURIComponent(link.hash.slice(1))))
      .filter(Boolean);

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (!visible[0]) return;
      const id = visible[0].target.id;
      tocLinks.forEach((link) => {
        if (link.hash === `#${id}`) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-24% 0px -62% 0px', threshold: [0, 0.15, 0.5] });

    targets.forEach((target) => observer.observe(target));
  }
})();
