(() => {
  "use strict";

  const initializeTabs = () => {
    document.querySelectorAll("[data-autism-tabs]").forEach((root) => {
      if (root.dataset.ready === "true") return;
      root.dataset.ready = "true";

      const tabs = Array.from(root.querySelectorAll("[data-autism-tab]"));
      const panels = Array.from(root.querySelectorAll("[data-autism-panel]"));

      const activate = (tab, moveFocus = false) => {
        const targetId = tab.dataset.autismTab;

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
          if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
            return;
          }

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

  const initializeAccordion = () => {
    document.querySelectorAll("[data-autism-accordion]").forEach((group) => {
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

  const writeClipboard = async (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const temporary = document.createElement("textarea");
    temporary.value = text;
    temporary.setAttribute("readonly", "");
    temporary.style.position = "fixed";
    temporary.style.opacity = "0";
    document.body.append(temporary);
    temporary.select();

    const copied = document.execCommand("copy");
    temporary.remove();

    if (!copied) {
      throw new Error("Falha ao copiar.");
    }
  };

  const initializeCopyButtons = () => {
    const status = document.querySelector("[data-copy-status]");

    document.querySelectorAll("[data-copy-reference]").forEach((button) => {
      button.addEventListener("click", async () => {
        try {
          await writeClipboard(button.dataset.copyReference || "");
          if (status) status.textContent = "Referência copiada para a área de transferência.";
        } catch {
          if (status) status.textContent = "Não foi possível copiar automaticamente. Selecione o texto da referência.";
        }
      });
    });
  };

  const initialize = () => {
    initializeTabs();
    initializeAccordion();
    initializeCopyButtons();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
