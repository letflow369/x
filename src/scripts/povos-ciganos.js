(() => {
  'use strict';

  const article = document.querySelector('.roma-article');
  if (!article) return;

  const nav = article.querySelector('.roma-sidenav nav');
  const navLinks = nav ? [...nav.querySelectorAll('a[href^="#"]')] : [];
  const sectionById = new Map(
    navLinks
      .map((link) => {
        const id = link.getAttribute('href')?.slice(1);
        const section = id ? document.getElementById(id) : null;
        return section ? [id, section] : null;
      })
      .filter(Boolean)
  );

  const setCurrent = (id) => {
    navLinks.forEach((link) => {
      if (link.getAttribute('href') === `#${id}`) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  if ('IntersectionObserver' in window && sectionById.size) {
    const visible = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.boundingClientRect.top);
          } else {
            visible.delete(entry.target.id);
          }
        });

        if (!visible.size) return;
        const [closestId] = [...visible.entries()].sort((a, b) => {
          const aDistance = Math.abs(a[1] - 120);
          const bDistance = Math.abs(b[1] - 120);
          return aDistance - bDistance;
        })[0];
        setCurrent(closestId);
      },
      { rootMargin: '-96px 0px -62% 0px', threshold: [0, 0.08, 0.25] }
    );

    sectionById.forEach((section) => observer.observe(section));
  }

  const openReference = (hash) => {
    if (!hash || !hash.startsWith('#ref-')) return;
    const target = document.querySelector(hash);
    if (target instanceof HTMLDetailsElement) target.open = true;
  };

  article.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#ref-"]');
    if (link) openReference(link.getAttribute('href'));
  });

  window.addEventListener('hashchange', () => openReference(window.location.hash));
  openReference(window.location.hash);
})();
