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

  const article = document.querySelector("[data-tcc-readable]");
  const decrease = document.querySelector("[data-font-decrease]");
  const reset = document.querySelector("[data-font-reset]");
  const increase = document.querySelector("[data-font-increase]");
  const fontStatus = document.querySelector("[data-font-status]");
  if (article && decrease && reset && increase) {
    const levels=[.9,1,1.1,1.2,1.3]; let index=1; const key="lf369-tcc-font-scale";
    try { const n=Number.parseFloat(localStorage.getItem(key)||""); const idx=levels.findIndex(v=>Math.abs(v-n)<.001); if(idx>=0) index=idx; } catch {}
    const apply=(announce=true)=>{ const scale=levels[index]; article.style.setProperty("--tcc-font-scale",String(scale)); decrease.disabled=index===0; increase.disabled=index===levels.length-1; reset.textContent=`${Math.round(scale*100)}%`; if(announce&&fontStatus) fontStatus.textContent=`Tamanho do texto: ${Math.round(scale*100)}%.`; try{localStorage.setItem(key,String(scale));}catch{} };
    decrease.addEventListener("click",()=>{index=Math.max(0,index-1);apply();}); increase.addEventListener("click",()=>{index=Math.min(levels.length-1,index+1);apply();}); reset.addEventListener("click",()=>{index=1;apply();}); apply(false);
  }

  const toggle = document.querySelector("[data-reader-toggle]");
  const stop = document.querySelector("[data-reader-stop]");
  const controls = document.querySelector("[data-reader-controls]");
  const readerStatus = document.querySelector("[data-reader-status]");
  if (toggle) {
    if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) { toggle.disabled=true; toggle.textContent="Leitura indisponível"; }
    else {
      let chunks=[],idx=0,state="idle";
      const collect=()=>[...document.querySelectorAll('.tcc-hero__subtitle,.tcc-hero__intro,.tcc-summary h2,.tcc-summary h3,.tcc-summary p,.article-content h2,.article-content h3,.article-content h4,.article-content p,.article-content li,.article-content th,.article-content td')].filter(el=>!el.closest("#fontes")&&!el.closest("button")&&!el.hidden).map(el=>el.textContent.replace(/\s+/g," ").trim()).filter(t=>t.length>1);
      const finish=(msg="Leitura encerrada.")=>{state="idle";idx=0;toggle.textContent="Ouvir página";toggle.setAttribute("aria-pressed","false");if(controls)controls.hidden=true;if(readerStatus)readerStatus.textContent=msg;};
      const speak=()=>{ if(state!=="playing") return; if(idx>=chunks.length){finish("Leitura concluída.");return;} const u=new SpeechSynthesisUtterance(chunks[idx]);u.lang="pt-BR";u.rate=.98;u.onend=()=>{idx++;speak();};u.onerror=e=>{if(!["canceled","interrupted"].includes(e.error))finish("A leitura foi interrompida pelo navegador.");};speechSynthesis.speak(u);if(readerStatus)readerStatus.textContent=`Lendo trecho ${idx+1} de ${chunks.length}.`; };
      toggle.addEventListener("click",()=>{ if(state==="idle"){chunks=collect();if(!chunks.length)return;speechSynthesis.cancel();idx=0;state="playing";toggle.textContent="Pausar leitura";toggle.setAttribute("aria-pressed","true");if(controls)controls.hidden=false;speak();} else if(state==="playing"){speechSynthesis.pause();state="paused";toggle.textContent="Continuar leitura";toggle.setAttribute("aria-pressed","false");} else {speechSynthesis.resume();state="playing";toggle.textContent="Pausar leitura";toggle.setAttribute("aria-pressed","true");} });
      stop?.addEventListener("click",()=>{speechSynthesis.cancel();finish();}); window.addEventListener("beforeunload",()=>speechSynthesis.cancel());
    }
  }
  document.querySelector(".tcc-back-top")?.addEventListener("click", event => { if (reduced()) return; event.preventDefault(); document.getElementById("topo")?.scrollIntoView({behavior:"smooth"}); });
})();
