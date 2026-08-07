(() => {
  "use strict";
  document.documentElement.classList.add("social-anxiety-js");
  const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ids = ["o-que-e","timidez","sintomas","ciclo","causas","historia","desenvolvimento","impactos","comorbidades","diagnostico","tratamentos","pesquisas","estrategias","mitos","ajuda","glossario","fontes"];

  const mobileToc = document.querySelector(".social-anxiety-mobile-nav");
  mobileToc?.querySelectorAll('a[href^="#"]').forEach((link) => link.addEventListener("click", () => {
    if (window.matchMedia("(max-width: 62rem)").matches) mobileToc.open = false;
  }));

  const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
  const navLinks = Array.from(document.querySelectorAll('.social-anxiety-desktop-nav a[href^="#"], .social-anxiety-mobile-nav a[href^="#"]'));
  if ("IntersectionObserver" in window && sections.length) {
    const visible = new Map();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.set(entry.target.id, entry.boundingClientRect.top);
        else visible.delete(entry.target.id);
      }
      if (!visible.size) return;
      const current = [...visible.entries()].sort((a,b) => Math.abs(a[1]) - Math.abs(b[1]))[0][0];
      navLinks.forEach((link) => {
        if (link.getAttribute("href") === `#${current}`) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }, { rootMargin: "-18% 0px -68% 0px", threshold: [0, 0.01] });
    sections.forEach((section) => observer.observe(section));
  }

  document.querySelectorAll(".social-anxiety-timeline details").forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open || !window.matchMedia("(max-width: 48rem)").matches) return;
      document.querySelectorAll(".social-anxiety-timeline details").forEach((other) => { if (other !== item) other.open = false; });
    });
  });

  const backTop = document.querySelector(".social-anxiety-back-top");
  backTop?.addEventListener("click", (event) => {
    if (reducedMotion()) return;
    event.preventDefault();
    document.getElementById("topo")?.scrollIntoView({ behavior: "smooth" });
  });
})();
