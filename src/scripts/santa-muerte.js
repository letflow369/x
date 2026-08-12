(() => {
  'use strict';

  const navLinks = [...document.querySelectorAll('.sm-sidenav a[href^="#"]')];
  const sections = navLinks
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver(entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      navLinks.forEach(link => link.removeAttribute('aria-current'));
      const active = navLinks.find(link => link.getAttribute('href') === `#${visible.target.id}`);
      if (active) active.setAttribute('aria-current', 'location');
    }, {
      rootMargin: '-20% 0px -65% 0px',
      threshold: [0, 0.25, 0.6]
    });

    sections.forEach(section => observer.observe(section));
  }

  const filterBox = document.querySelector('.sm-source-filters');
  const references = [...document.querySelectorAll('.sm-reference-list details[data-source-type]')];

  if (filterBox && references.length) {
    filterBox.hidden = false;
    const buttons = [...filterBox.querySelectorAll('[data-source-filter]')];

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.dataset.sourceFilter;
        buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
        references.forEach(item => {
          item.hidden = filter !== 'all' && item.dataset.sourceType !== filter;
        });
      });
    });
  }

  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#ref-"]');
    if (!link) return;

    const target = document.querySelector(link.getAttribute('href'));
    if (target instanceof HTMLDetailsElement) {
      target.hidden = false;
      target.open = true;
    }
  });
})();

(() => {
  const mobileNav = document.querySelector('.sm-mobile-nav');
  if (!(mobileNav instanceof HTMLDetailsElement)) return;
  mobileNav.addEventListener('click', event => {
    if (event.target.closest('a[href^="#"]')) mobileNav.open = false;
  });
})();
