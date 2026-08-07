(() => {
  "use strict";
  document.documentElement.classList.add("borderline-js");
  const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const article = document.querySelector(".borderline-article");

  const initMobileToc = () => {
    const toc = document.querySelector(".borderline-mobile-nav");
    if (!toc) return;
    toc.querySelectorAll('a[href^="#"]').forEach((a) => a.addEventListener("click", () => {
      if (window.matchMedia("(max-width: 62rem)").matches) toc.open = false;
    }));
  };

  const initActiveToc = () => {
    const ids = ["o-que-e","historia","desenvolvimento","sintomas","ciclo-vida","prognostico","comorbidades","diferencial","seguranca","tratamentos","medicamentos","evidencias","mitos","apoio","importancia","incertezas","faq","fontes"];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const links = Array.from(document.querySelectorAll('.borderline-desktop-nav a[href^="#"], .borderline-mobile-nav a[href^="#"]'));
    const mark = (id) => links.forEach((link) => link.getAttribute("href") === `#${id}` ? link.setAttribute("aria-current","location") : link.removeAttribute("aria-current"));
    if (!("IntersectionObserver" in window) || !sections.length) return;
    const visible = new Map();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting ? visible.set(entry.target.id, entry.boundingClientRect.top) : visible.delete(entry.target.id));
      if (visible.size) mark([...visible.entries()].sort((a,b)=>Math.abs(a[1])-Math.abs(b[1]))[0][0]);
    }, { rootMargin:"-18% 0px -68% 0px", threshold:[0,.01] });
    sections.forEach((s) => observer.observe(s));
  };

  const initTimeline = () => document.querySelectorAll(".borderline-timeline details").forEach((item) => item.addEventListener("toggle", () => {
    if (!item.open || !window.matchMedia("(max-width: 48rem)").matches) return;
    document.querySelectorAll(".borderline-timeline details").forEach((other) => { if (other !== item) other.open = false; });
  }));

  const initTabs = () => {
    document.querySelectorAll("[data-tabs]").forEach((tabs) => {
      const buttons = Array.from(tabs.querySelectorAll('[role="tab"]'));
      const panels = buttons.map((b) => document.getElementById(b.getAttribute("aria-controls"))).filter(Boolean);
      const activate = (button, focus = true) => {
        buttons.forEach((b) => { const selected = b === button; b.setAttribute("aria-selected", String(selected)); b.tabIndex = selected ? 0 : -1; });
        panels.forEach((p) => p.hidden = p.id !== button.getAttribute("aria-controls"));
        if (focus) button.focus();
      };
      const initial = buttons.find((b) => b.getAttribute("aria-selected") === "true") || buttons[0];
      if (initial) activate(initial, false);
      buttons.forEach((button, index) => {
        button.addEventListener("click", () => activate(button, false));
        button.addEventListener("keydown", (e) => {
          let next = null;
          if (e.key === "ArrowRight") next = buttons[(index+1)%buttons.length];
          if (e.key === "ArrowLeft") next = buttons[(index-1+buttons.length)%buttons.length];
          if (e.key === "Home") next = buttons[0];
          if (e.key === "End") next = buttons[buttons.length-1];
          if (next) { e.preventDefault(); activate(next); }
        });
      });
    });
  };



  const initBackTop = () => { const link=document.querySelector(".borderline-back-top"); if(!link)return; link.addEventListener("click",(e)=>{if(reduced())return;e.preventDefault();document.getElementById("topo")?.scrollIntoView({behavior:"smooth"});}); };
  const init=()=>{initMobileToc();initActiveToc();initTimeline();initTabs();initBackTop();};
  document.readyState==="loading" ? document.addEventListener("DOMContentLoaded",init,{once:true}) : init();
})();
