(() => {
  "use strict";

  document.documentElement.classList.add("burnout-js");

  const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const initializeMobileToc = () => {
    const toc = document.querySelector(".burnout-mobile-nav");
    if (!toc) return;
    toc.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", () => {
        if (window.matchMedia("(max-width: 62rem)").matches) toc.open = false;
      });
    });
  };

  const initializeActiveToc = () => {
    const sectionIds = [
      "o-que-e", "historia", "comparador", "desenvolvimento", "riscos", "sinais",
      "impactos", "evolucao", "comorbidades", "avaliacao", "intervencoes",
      "evidencias", "prevencao", "mitos", "importancia", "ajuda", "glossario", "fontes"
    ];
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
    const links = Array.from(document.querySelectorAll(
      '.burnout-desktop-nav a[href^="#"], .burnout-mobile-nav a[href^="#"]'
    ));

    const markCurrent = (id) => {
      links.forEach((link) => {
        if (link.getAttribute("href") === `#${id}`) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    };

    if (!("IntersectionObserver" in window) || !sections.length) return;

    const visible = new Map();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visible.set(entry.target.id, entry.boundingClientRect.top);
        else visible.delete(entry.target.id);
      });

      if (visible.size) {
        const current = [...visible.entries()]
          .sort((a, b) => Math.abs(a[1]) - Math.abs(b[1]))[0][0];
        markCurrent(current);
      }
    }, { rootMargin: "-18% 0px -68% 0px", threshold: [0, 0.01] });

    sections.forEach((section) => observer.observe(section));
  };

  const initializeTimeline = () => {
    document.querySelectorAll(".burnout-timeline details").forEach((item) => {
      item.addEventListener("toggle", () => {
        if (!item.open || !window.matchMedia("(max-width: 48rem)").matches) return;
        document.querySelectorAll(".burnout-timeline details").forEach((other) => {
          if (other !== item) other.open = false;
        });
      });
    });
  };

  const initializeFontControls = () => {
    const article = document.querySelector("[data-burnout-readable]");
    const decrease = document.querySelector("[data-font-decrease]");
    const reset = document.querySelector("[data-font-reset]");
    const increase = document.querySelector("[data-font-increase]");
    const status = document.querySelector("[data-font-status]");
    if (!article || !decrease || !reset || !increase) return;

    const levels = [0.9, 1, 1.1, 1.2, 1.3];
    const storageKey = "lf369-burnout-font-scale";
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
      article.style.setProperty("--burnout-font-scale", String(scale));
      article.style.setProperty("--burnout-body-size", `${scale}rem`);
      decrease.disabled = currentIndex === 0;
      increase.disabled = currentIndex === levels.length - 1;
      reset.textContent = `${Math.round(scale * 100)}%`;
      if (announce && status) status.textContent = `Tamanho do texto: ${Math.round(scale * 100)}%.`;
      try {
        window.localStorage.setItem(storageKey, String(scale));
      } catch {
        // Preferência válida apenas durante a sessão.
      }
    };

    decrease.addEventListener("click", () => {
      currentIndex = Math.max(0, currentIndex - 1);
      apply();
    });

    increase.addEventListener("click", () => {
      currentIndex = Math.min(levels.length - 1, currentIndex + 1);
      apply();
    });

    reset.addEventListener("click", () => {
      currentIndex = 1;
      apply();
    });

    apply(false);
  };

  const initializeBackToTop = () => {
    const link = document.querySelector(".burnout-back-top");
    if (!link) return;
    link.addEventListener("click", (event) => {
      if (prefersReducedMotion()) return;
      event.preventDefault();
      document.getElementById("topo")?.scrollIntoView({ behavior: "smooth" });
    });
  };

  const initialize = () => {
    initializeMobileToc();
    initializeActiveToc();
    initializeTimeline();
    initializeFontControls();
    initializeBackToTop();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
