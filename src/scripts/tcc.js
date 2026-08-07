(() => {
  "use strict";
  document.documentElement.classList.add("tcc-js");
  const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const toc = document.querySelector(".tcc-mobile-nav");
  toc?.querySelectorAll('a[href^="#"]').forEach((link) => link.addEventListener("click", () => { if (window.matchMedia("(max-width:68rem)").matches) toc.open = false; }));

  const ids = ["o-que-e","historia","modelo","conceitos","etapas","tecnicas","aplicacoes","comorbidades","evidencias","digital","limites","importancia","faq","fontes"];
  const sections = ids.map(id => document.getElementById(id)).filter(Boolean);
  const tocLinks = [...document.querySelectorAll('.tcc-desktop-nav a[href^="#"], .tcc-mobile-nav a[href^="#"]')];
  if ("IntersectionObserver" in window) {
    const visible = new Map();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.isIntersecting ? visible.set(entry.target.id, entry.boundingClientRect.top) : visible.delete(entry.target.id));
      if (!visible.size) return;
      const id = [...visible.entries()].sort((a,b)=>Math.abs(a[1])-Math.abs(b[1]))[0][0];
      tocLinks.forEach(link => link.getAttribute("href") === `#${id}` ? link.setAttribute("aria-current","location") : link.removeAttribute("aria-current"));
    }, {rootMargin:"-18% 0px -68% 0px", threshold:[0,.01]});
    sections.forEach(section => observer.observe(section));
  }

  document.querySelectorAll(".tcc-timeline details").forEach(item => item.addEventListener("toggle", () => {
    if (!item.open || !window.matchMedia("(max-width:48rem)").matches) return;
    document.querySelectorAll(".tcc-timeline details").forEach(other => { if (other !== item) other.open = false; });
  }));

  const cycleData = [
    ["Situação","Preciso apresentar um trabalho.","Um evento externo inicia o exemplo. A mesma situação pode ser interpretada de maneiras diferentes por pessoas diferentes."],
    ["Interpretação","“Vou errar e todos perceberão que sou incompetente.”","A interpretação não é tratada como fato. Ela pode ser examinada, contextualizada e testada."],
    ["Emoções e corpo","Ansiedade, vergonha, tensão muscular e tremor.","Emoções e sensações físicas são respostas reais. O objetivo não é invalidá-las, mas compreender sua relação com o significado atribuído à situação."],
    ["Comportamento","Evito a apresentação ou preparo-me de forma excessiva.","A ação pode produzir alívio imediato, mas também impedir aprendizado novo, dependendo do problema e da função do comportamento."],
    ["Consequência","Não descubro se conseguiria enfrentar a situação.","A consequência pode reforçar a previsão inicial. Intervenções podem modificar diferentes pontos do ciclo, não apenas pensamentos."]
  ];
  const cyclePanel = document.querySelector("[data-cycle-panel]");
  document.querySelectorAll("[data-cycle-step]").forEach(btn => btn.addEventListener("click", () => {
    const i = Number(btn.dataset.cycleStep);
    document.querySelectorAll("[data-cycle-step]").forEach(b => b.classList.toggle("is-active", b === btn));
    if (!cyclePanel || !cycleData[i]) return;
    const [label,title,text] = cycleData[i];
    cyclePanel.innerHTML = `<p class="tcc-cycle__label">${label}</p><h3>${title}</h3><p>${text}</p>`;
  }));

  const filter = document.querySelector("[data-tcc-filter]");
  const filterStatus = document.querySelector("[data-filter-status]");
  const rows = [...document.querySelectorAll(".tcc-application-table tbody tr")];
  filter?.addEventListener("change", () => {
    const value = filter.value;
    let shown = 0;
    rows.forEach(row => { const match = value === "all" || row.dataset.category === value; row.hidden = !match; if (match) shown++; });
    if (filterStatus) filterStatus.textContent = `${shown} ${shown === 1 ? "condição exibida" : "condições exibidas"}.`;
  });

  document.querySelector(".tcc-back-top")?.addEventListener("click", event => { if (reduced()) return; event.preventDefault(); document.getElementById("topo")?.scrollIntoView({behavior:"smooth"}); });
})();
