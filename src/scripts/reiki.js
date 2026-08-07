(() => {
  "use strict";

  const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const initializeTimeline = () => {
    const timeline = document.querySelector("[data-reiki-timeline]");
    const controls = document.querySelector("[data-reiki-timeline-controls]");
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
      if (window.matchMedia("(min-width: 62.001rem)").matches) {
        items[currentIndex]?.scrollIntoView({
          behavior: prefersReducedMotion() ? "auto" : "smooth",
          block: "nearest",
          inline: "start",
        });
      }
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

  const initializeToc = () => {
    const toc = document.querySelector(".reiki-toc details");
    if (!toc) return;
    const links = Array.from(toc.querySelectorAll("a[href^='#']"));
    const sections = links
      .map((link) => document.querySelector(link.getAttribute("href")))
      .filter(Boolean);

    links.forEach((link) => {
      link.addEventListener("click", () => {
        if (window.matchMedia("(max-width: 62rem)").matches) toc.open = false;
      });
    });

    if (!("IntersectionObserver" in window) || !sections.length) return;
    const byId = new Map(links.map((link) => [link.getAttribute("href").slice(1), link]));
    const visible = new Map();

    const updateCurrent = () => {
      const candidates = Array.from(visible.entries())
        .filter(([, ratio]) => ratio > 0)
        .sort((a, b) => {
          const aEl = document.getElementById(a[0]);
          const bEl = document.getElementById(b[0]);
          return Math.abs(aEl.getBoundingClientRect().top - 120) - Math.abs(bEl.getBoundingClientRect().top - 120);
        });
      const currentId = candidates[0]?.[0];
      links.forEach((link) => link.removeAttribute("aria-current"));
      if (currentId) byId.get(currentId)?.setAttribute("aria-current", "location");
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => visible.set(entry.target.id, entry.intersectionRatio));
      updateCurrent();
    }, { rootMargin: "-15% 0px -68% 0px", threshold: [0, 0.05, 0.2, 0.5] });

    sections.forEach((section) => observer.observe(section));
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

  const initializeFontControls = () => {
    const article = document.querySelector("[data-reiki-readable]");
    const decrease = document.querySelector("[data-font-decrease]");
    const reset = document.querySelector("[data-font-reset]");
    const increase = document.querySelector("[data-font-increase]");
    const status = document.querySelector("[data-font-status]");
    if (!article || !decrease || !reset || !increase) return;

    const levels = [0.9, 1, 1.1, 1.2, 1.3];
    const storageKey = "lf369-reiki-font-scale";
    let currentIndex = 1;

    try {
      const stored = Number.parseFloat(window.localStorage.getItem(storageKey) || "");
      const storedIndex = levels.findIndex((value) => Math.abs(value - stored) < 0.001);
      if (storedIndex >= 0) currentIndex = storedIndex;
    } catch {
      currentIndex = 1;
    }

    const apply = (announce = true) => {
      const scale = levels[currentIndex];
      article.style.setProperty("--reiki-font-scale", String(scale));
      article.style.setProperty("--reiki-body-size", `${scale}rem`);
      decrease.disabled = currentIndex === 0;
      increase.disabled = currentIndex === levels.length - 1;
      const percentage = Math.round(scale * 100);
      if (announce && status) status.textContent = `Tamanho do texto: ${percentage}%.`;
      try { window.localStorage.setItem(storageKey, String(scale)); } catch { /* sessão atual */ }
    };

    decrease.addEventListener("click", () => { currentIndex = Math.max(0, currentIndex - 1); apply(); });
    increase.addEventListener("click", () => { currentIndex = Math.min(levels.length - 1, currentIndex + 1); apply(); });
    reset.addEventListener("click", () => { currentIndex = 1; apply(); });
    apply(false);
  };

  const initializeBackToTop = () => {
    const button = document.querySelector("[data-back-to-top]");
    if (!button) return;
    const update = () => button.classList.toggle("is-visible", window.scrollY > 700);
    window.addEventListener("scroll", update, { passive: true });
    update();
  };

  const initialize = () => {
    initializeTimeline();
    initializeToc();
    initializeCopyButtons();
    initializeFontControls();
    initializeBackToTop();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
