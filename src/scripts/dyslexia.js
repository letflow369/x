(() => {
  "use strict";
  document.documentElement.classList.add("dyslexia-js");

  const initTabs = () => {
    document.querySelectorAll("[data-dyslexia-tabs]").forEach((root) => {
      const tabs = Array.from(root.querySelectorAll("[data-dyslexia-tab]"));
      const panels = Array.from(root.querySelectorAll("[data-dyslexia-panel]"));
      const activate = (tab, focus = false) => {
        const id = tab.dataset.dyslexiaTab;
        tabs.forEach((item) => {
          const selected = item === tab;
          item.setAttribute("aria-selected", String(selected));
          item.tabIndex = selected ? 0 : -1;
        });
        panels.forEach((panel) => { panel.hidden = panel.id !== id; });
        if (focus) tab.focus();
      };
      const initiallySelected = tabs.find((tab) => tab.getAttribute("aria-selected") === "true") || tabs[0];
      if (initiallySelected) activate(initiallySelected);
      tabs.forEach((tab, index) => {
        tab.addEventListener("click", () => activate(tab));
        tab.addEventListener("keydown", (event) => {
          if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
          event.preventDefault();
          let next = index;
          if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
          if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
          if (event.key === "Home") next = 0;
          if (event.key === "End") next = tabs.length - 1;
          activate(tabs[next], true);
        });
      });
    });
  };

  const initAccordion = () => {
    document.querySelectorAll("[data-dyslexia-accordion]").forEach((group) => {
      group.querySelectorAll("details").forEach((item) => {
        item.addEventListener("toggle", () => {
          if (!item.open) return;
          group.querySelectorAll("details").forEach((other) => {
            if (other !== item) other.open = false;
          });
        });
      });
    });
  };

  const initToc = () => {
    const tocLinks = Array.from(document.querySelectorAll(".article-toc a[href^='#']"));
    if (!("IntersectionObserver" in window) || !tocLinks.length) return;
    const byId = new Map(tocLinks.map((link) => [link.getAttribute("href").slice(1), link]));
    const sections = Array.from(document.querySelectorAll(".article-content .article-section[id]"));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a,b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (!visible) return;
      tocLinks.forEach((link) => link.removeAttribute("aria-current"));
      const active = byId.get(visible.target.id);
      if (active) active.setAttribute("aria-current", "location");
    }, { rootMargin: "-18% 0px -68% 0px", threshold: 0 });
    sections.forEach((section) => observer.observe(section));
  };

  const initBackToTop = () => {
    const button = document.querySelector("[data-back-to-top]");
    if (!button) return;
    const update = () => button.classList.toggle("is-visible", window.scrollY > 700);
    update();
    window.addEventListener("scroll", update, { passive: true });
    button.addEventListener("click", (event) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      event.preventDefault();
      document.querySelector("#topo")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const init = () => { initTabs(); initAccordion(); initToc(); initBackToTop(); };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
