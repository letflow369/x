(() => {
  'use strict';

  const navLinks = [...document.querySelectorAll('.cd-sidenav a[href^="#"]')];
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window && navLinks.length && sections.length) {
    const setCurrent = (id) => {
      navLinks.forEach((link) => {
        if (link.getAttribute('href') === `#${id}`) {
          link.setAttribute('aria-current', 'location');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    };

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setCurrent(visible.target.id);
    }, { rootMargin: '-20% 0px -62% 0px', threshold: [0.05, 0.2, 0.5] });

    sections.forEach((section) => observer.observe(section));
  }

  const filters = document.querySelector('.cd-source-filters');
  const references = [...document.querySelectorAll('.cd-reference-list details[data-source-type]')];
  if (filters && references.length) {
    filters.hidden = false;
    filters.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-source-filter]');
      if (!button) return;
      const filter = button.dataset.sourceFilter;
      filters.querySelectorAll('button').forEach((item) => {
        item.setAttribute('aria-pressed', String(item === button));
      });
      references.forEach((reference) => {
        reference.hidden = filter !== 'all' && reference.dataset.sourceType !== filter;
      });
    });
  }

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a.cd-ref[href^="#ref-"]');
    if (!link) return;
    const reference = document.querySelector(link.getAttribute('href'));
    if (reference instanceof HTMLDetailsElement) {
      reference.hidden = false;
      reference.open = true;
    }
  });
})();
