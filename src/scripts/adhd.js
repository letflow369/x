(() => {
  "use strict";

  const initializeLifeTabs = () => {
    document.querySelectorAll("[data-life-tabs]").forEach((root) => {
      if (root.dataset.ready === "true") return;
      root.dataset.ready = "true";

      const tabs = Array.from(root.querySelectorAll("[data-life-tab]"));
      const panels = Array.from(root.querySelectorAll("[data-life-panel]"));

      const activate = (tab, moveFocus = false) => {
        const targetId = tab.dataset.lifeTab;
        tabs.forEach((item) => {
          const selected = item === tab;
          item.setAttribute("aria-selected", String(selected));
          item.tabIndex = selected ? 0 : -1;
        });
        panels.forEach((panel) => {
          panel.hidden = panel.id !== targetId;
        });
        if (moveFocus) tab.focus();
      };

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

  const initializeAccordionGroups = () => {
    document.querySelectorAll("[data-accordion-group]").forEach((group) => {
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

  const initialize = () => {
    initializeLifeTabs();
    initializeAccordionGroups();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
