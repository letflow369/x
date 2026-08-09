(() => {
  'use strict';

  const tocLinks = [...document.querySelectorAll('.phytotherapy-toc a[href^="#"]')];
  const sections = tocLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);

  const setCurrent = (id) => {
    tocLinks.forEach((link) => {
      if (link.getAttribute('href') === `#${id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };

  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setCurrent(visible.target.id);
    }, { rootMargin: '-18% 0px -64% 0px', threshold: [0, 0.15, 0.35] });
    sections.forEach((section) => observer.observe(section));
  }

  const filterButtons = [...document.querySelectorAll('[data-evidence-filter]')];
  const evidenceCards = [...document.querySelectorAll('[data-evidence-list] > [data-evidence]')];

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.evidenceFilter;
      filterButtons.forEach((item) => item.classList.toggle('is-active', item === button));
      evidenceCards.forEach((card) => {
        const visible = filter === 'all' || card.dataset.evidence === filter;
        card.hidden = !visible;
        if (!visible) card.open = false;
      });
    });
  });

  const backToTop = document.querySelector('[data-back-to-top]');
  if (backToTop) {
    const syncTopButton = () => backToTop.classList.toggle('is-visible', window.scrollY > 700);
    syncTopButton();
    window.addEventListener('scroll', syncTopButton, { passive: true });
  }
})();
