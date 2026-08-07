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
    initializeBackToTop();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
