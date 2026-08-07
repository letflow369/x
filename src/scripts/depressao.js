(() => {
  'use strict';

  document.documentElement.classList.add('depressao-js');

  const tabs = Array.from(document.querySelectorAll('.life-tabs [role="tab"]'));
  const panels = Array.from(document.querySelectorAll('.life-tabs [role="tabpanel"]'));

  const activateTab = (tab, moveFocus = false) => {
    if (!tab) return;

    tabs.forEach((item) => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
    });

    panels.forEach((panel) => {
      panel.hidden = panel.id !== tab.getAttribute('aria-controls');
    });

    if (moveFocus) tab.focus();
  };

  if (tabs.length && panels.length) {
    const selected = tabs.find((tab) => tab.getAttribute('aria-selected') === 'true') || tabs[0];
    activateTab(selected);

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activateTab(tab));
      tab.addEventListener('keydown', (event) => {
        let nextIndex = null;

        if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') nextIndex = 0;
        if (event.key === 'End') nextIndex = tabs.length - 1;

        if (nextIndex !== null) {
          event.preventDefault();
          activateTab(tabs[nextIndex], true);
        }
      });
    });
  }

  const sectionIds = [
    'o-que-e', 'tristeza-luto', 'historia', 'manifestacoes', 'causas',
    'ciclo-vida', 'evolucao', 'comorbidades', 'diagnostico', 'tratamentos',
    'evidencias', 'mitos', 'ajuda', 'fontes'
  ];
  const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
  const internalLinks = Array.from(document.querySelectorAll(
    '.depression-desktop-nav a[href^="#"], .depression-mobile-nav a[href^="#"]'
  ));

  const markCurrent = (id) => {
    internalLinks.forEach((link) => {
      if (link.getAttribute('href') === `#${id}`) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  if ('IntersectionObserver' in window && sections.length) {
    const visible = new Map();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visible.set(entry.target.id, entry.boundingClientRect.top);
        else visible.delete(entry.target.id);
      });

      if (visible.size) {
        const current = [...visible.entries()].sort((a, b) => Math.abs(a[1]) - Math.abs(b[1]))[0][0];
        markCurrent(current);
      }
    }, { rootMargin: '-18% 0px -68% 0px', threshold: [0, 0.01] });

    sections.forEach((section) => observer.observe(section));
  }
})();
