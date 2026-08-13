(() => {
  'use strict';
  const links = [...document.querySelectorAll('.pg-sidenav a[href^="#"]')];
  const sections = links.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      links.forEach((link) => {
        const active = link.getAttribute('href') === `#${visible.target.id}`;
        if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-18% 0px -67% 0px', threshold: [0, .15, .4] });
    sections.forEach((section) => observer.observe(section));
  }

  const filterGroup = document.querySelector('.pg-source-filters');
  const refs = [...document.querySelectorAll('.pg-reference-list details[data-source-type]')];
  if (filterGroup && refs.length) {
    filterGroup.hidden = false;
    filterGroup.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-source-filter]');
      if (!button) return;
      const filter = button.dataset.sourceFilter;
      filterGroup.querySelectorAll('button').forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
      refs.forEach((item) => { item.hidden = filter !== 'all' && item.dataset.sourceType !== filter; });
    });
  }

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a.pg-ref[href^="#ref-"]');
    if (!link) return;
    const target = document.querySelector(link.getAttribute('href'));
    if (target instanceof HTMLDetailsElement) target.open = true;
  });
})();
