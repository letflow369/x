(() => {
  "use strict";

  const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const initializeTimeline = () => {
    const timeline = document.querySelector("[data-judaismo-timeline]");
    const controls = document.querySelector("[data-judaismo-timeline-controls]");
    if (!timeline || !controls || controls.dataset.ready === "true") return;

    controls.dataset.ready = "true";
    const items = Array.from(timeline.children);
    const buttons = Array.from(controls.querySelectorAll("[data-timeline-target]"));
    const previous = controls.querySelector("[data-timeline-previous]");
    const next = controls.querySelector("[data-timeline-next]");
    let currentIndex = 0;

    const select = (index, focus = false) => {
      currentIndex = (index + items.length) % items.length;
      items.forEach((item, itemIndex) => item.classList.toggle("is-current", itemIndex === currentIndex));
      buttons.forEach((button, buttonIndex) => {
        const selected = buttonIndex === currentIndex;
        button.setAttribute("aria-selected", String(selected));
        button.tabIndex = selected ? 0 : -1;
      });
      items[currentIndex]?.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: "nearest",
        inline: "start",
      });
      if (focus) buttons[currentIndex]?.focus();
    };

    buttons.forEach((button, index) => {
      button.addEventListener("click", () => select(index));
      button.addEventListener("keydown", (event) => {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        if (event.key === "ArrowRight") select(index + 1, true);
        if (event.key === "ArrowLeft") select(index - 1, true);
        if (event.key === "Home") select(0, true);
        if (event.key === "End") select(items.length - 1, true);
      });
    });

    previous?.addEventListener("click", () => select(currentIndex - 1));
    next?.addEventListener("click", () => select(currentIndex + 1));
    select(0);
  };

  const initializeAccordions = () => {
    document.querySelectorAll("[data-judaismo-myths]").forEach((group) => {
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

  const initializeMobileToc = () => {
    const toc = document.querySelector(".judaismo-toc details");
    if (!toc) return;
    toc.querySelectorAll("a[href^='#']").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.matchMedia("(max-width: 62rem)").matches) toc.open = false;
      });
    });
  };

  const copyText = async (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.append(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    textarea.remove();
    if (!copied) throw new Error("Falha ao copiar.");
  };

  const initializeCopyButtons = () => {
    const status = document.querySelector("[data-copy-status]");
    document.querySelectorAll("[data-copy-reference]").forEach((button) => {
      button.addEventListener("click", async () => {
        try {
          await copyText(button.dataset.copyReference || "");
          if (status) status.textContent = "Referência copiada para a área de transferência.";
        } catch {
          if (status) status.textContent = "Não foi possível copiar automaticamente. Selecione o texto da referência.";
        }
      });
    });
  };


  const initialize = () => {
    initializeTimeline();
    initializeAccordions();
    initializeMobileToc();
    initializeCopyButtons();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
