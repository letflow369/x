(() => {
  "use strict";
  document.documentElement.classList.add("down-js");
  const links = Array.from(document.querySelectorAll(".article-toc a[href^='#']"));
  if ("IntersectionObserver" in window && links.length) {
    const byId = new Map(links.map((link) => [link.getAttribute("href").slice(1), link]));
    const sections = Array.from(document.querySelectorAll(".article-content .article-section[id], .down-summary[id]"));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a,b) => a.boundingClientRect.top-b.boundingClientRect.top)[0];
      if (!visible) return;
      links.forEach((link) => link.removeAttribute("aria-current"));
      byId.get(visible.target.id)?.setAttribute("aria-current","location");
    }, {rootMargin:"-18% 0px -68% 0px",threshold:0});
    sections.forEach((section) => observer.observe(section));
  }
  const button=document.querySelector("[data-back-to-top]");
  if(button){const update=()=>button.classList.toggle("is-visible",window.scrollY>700);update();window.addEventListener("scroll",update,{passive:true});button.addEventListener("click",(event)=>{if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;event.preventDefault();document.querySelector("#topo")?.scrollIntoView({behavior:"smooth",block:"start"});});}
})();