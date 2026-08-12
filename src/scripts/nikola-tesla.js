(() => {
  document.documentElement.classList.add('js');

  const tocLinks = [...document.querySelectorAll('.tesla-toc a[href^="#"]')];
  const sections = tocLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const linkById = new Map(tocLinks.map((link) => [link.getAttribute('href').slice(1), link]));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      tocLinks.forEach((link) => link.removeAttribute('aria-current'));
      linkById.get(visible.target.id)?.setAttribute('aria-current', 'location');
    }, { rootMargin: '-18% 0px -65% 0px', threshold: [0, .1, .35] });
    sections.forEach((section) => observer.observe(section));
  }

  const filters = [...document.querySelectorAll('[data-filter]')];
  const references = [...document.querySelectorAll('.tesla-reference-list > details')];
  filters.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filters.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
      references.forEach((reference) => {
        reference.hidden = filter !== 'all' && reference.dataset.referenceType !== filter;
      });
    });
  });

  const openReferenceFromHash = () => {
    if (!location.hash.startsWith('#ref-')) return;
    const reference = document.querySelector(location.hash);
    if (reference instanceof HTMLDetailsElement) {
      reference.hidden = false;
      reference.open = true;
    }
  };

  openReferenceFromHash();
  window.addEventListener('hashchange', openReferenceFromHash);
})();
