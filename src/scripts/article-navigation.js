(() => {
  'use strict';

  const tocLinks = Array.from(document.querySelectorAll('.article-toc a[href^="#"]'));
  const sections = tocLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      tocLinks.forEach((link) => {
        const active = link.getAttribute('href') === `#${visible.target.id}`;
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, {
      rootMargin: '-18% 0px -68% 0px',
      threshold: [0.05, 0.2, 0.45]
    });

    sections.forEach((section) => observer.observe(section));
  }

  const backToTop = document.querySelector('[data-back-to-top]');
  if (backToTop) {
    const updateBackToTop = () => {
      backToTop.hidden = window.scrollY < 700;
    };
    updateBackToTop();
    window.addEventListener('scroll', updateBackToTop, { passive: true });
  }
})();
