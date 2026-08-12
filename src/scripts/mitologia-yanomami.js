(() => {
  'use strict';

  const links = [...document.querySelectorAll('.yanomami-sidenav a[href^="#"]')];
  const sections = links.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      links.forEach((link) => {
        if (link.getAttribute('href') === `#${visible.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-20% 0px -65% 0px', threshold: [0.01, 0.2, 0.5] });
    sections.forEach((section) => observer.observe(section));
  }

  const filterBar = document.querySelector('[data-enhanced-only]');
  const filters = [...document.querySelectorAll('[data-ref-filter]')];
  const references = [...document.querySelectorAll('.yanomami-reference-list > details[data-ref-type]')];
  if (filterBar && filters.length && references.length) {
    filterBar.hidden = false;
    filters.forEach((button) => {
      button.addEventListener('click', () => {
        const filter = button.dataset.refFilter;
        filters.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
        references.forEach((item) => { item.hidden = filter !== 'all' && item.dataset.refType !== filter; });
      });
    });
  }

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#ref-"]');
    if (!link) return;
    const target = document.querySelector(link.getAttribute('href'));
    if (target?.tagName === 'DETAILS') target.open = true;
  });
})();
