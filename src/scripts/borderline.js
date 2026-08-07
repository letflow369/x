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

  const initFont = () => {
    const dec = document.querySelector("[data-font-decrease]"), reset = document.querySelector("[data-font-reset]"), inc = document.querySelector("[data-font-increase]"), status = document.querySelector("[data-font-status]");
    if (!article || !dec || !reset || !inc) return;
    const levels = [.9,1,1.1,1.2,1.3], key = "lf369-borderline-font-scale";
    let i = 1;
    try { const stored = Number.parseFloat(localStorage.getItem(key)||""); const idx = levels.findIndex((v)=>Math.abs(v-stored)<.001); if (idx >= 0) i = idx; } catch {}
    const apply = (announce=true) => { const scale=levels[i]; article.style.setProperty("--bpd-font-scale", String(scale)); article.style.setProperty("--bpd-body-size", `${scale}rem`); dec.disabled=i===0; inc.disabled=i===levels.length-1; reset.textContent=`${Math.round(scale*100)}%`; if (announce&&status) status.textContent=`Tamanho do texto: ${Math.round(scale*100)}%.`; try{localStorage.setItem(key,String(scale));}catch{} };
    dec.addEventListener("click",()=>{i=Math.max(0,i-1);apply();}); inc.addEventListener("click",()=>{i=Math.min(levels.length-1,i+1);apply();}); reset.addEventListener("click",()=>{i=1;apply();}); apply(false);
  };

  const initContrast = () => {
    const toggle = document.querySelector("[data-contrast-toggle]"), status = document.querySelector("[data-contrast-status]"); if (!article || !toggle) return;
    const key="lf369-borderline-high-contrast"; let active=false; try{active=localStorage.getItem(key)==="1";}catch{}
    const apply=(announce=true)=>{article.classList.toggle("is-high-contrast",active);toggle.setAttribute("aria-pressed",String(active));toggle.textContent=active?"Contraste padrão":"Alto contraste";if(announce&&status)status.textContent=active?"Alto contraste ativado.":"Alto contraste desativado.";try{localStorage.setItem(key,active?"1":"0");}catch{}};
    toggle.addEventListener("click",()=>{active=!active;apply();}); apply(false);
  };

  const readableChunks = () => Array.from(document.querySelectorAll(".borderline-hero__subtitle,.borderline-hero__intro,.borderline-summary h2,.borderline-summary h3,.borderline-summary p,.borderline-content h2,.borderline-content h3,.borderline-content p,.borderline-content li,.borderline-content th,.borderline-content td"))
    .filter((el)=>!el.closest("#fontes")&&!el.closest("button")&&!el.hidden).map((el)=>el.textContent.replace(/\s+/g," ").trim()).filter((t)=>t.length>1);

  const initReader = () => {
    const toggle=document.querySelector("[data-reader-toggle]"),stop=document.querySelector("[data-reader-stop]"),controls=document.querySelector("[data-reader-controls]"),status=document.querySelector("[data-reader-status]"); if(!toggle)return;
    if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)){toggle.disabled=true;toggle.textContent="Leitura indisponível";return;}
    let chunks=[],index=0,state="idle";
    const update=(m)=>{if(status)status.textContent=m;};
    const finish=(m="Leitura encerrada.")=>{state="idle";index=0;toggle.textContent="Ouvir página";toggle.setAttribute("aria-pressed","false");if(controls)controls.hidden=true;update(m);};
    const speakNext=()=>{if(state!=="playing")return;if(index>=chunks.length){finish("Leitura concluída.");return;}const u=new SpeechSynthesisUtterance(chunks[index]);u.lang="pt-BR";u.rate=.98;u.onend=()=>{index+=1;speakNext();};u.onerror=(e)=>{if(e.error!=="canceled"&&e.error!=="interrupted")finish("A leitura foi interrompida pelo navegador.");};speechSynthesis.speak(u);update(`Lendo trecho ${index+1} de ${chunks.length}.`);};
    toggle.addEventListener("click",()=>{if(state==="idle"){chunks=readableChunks();if(!chunks.length)return;speechSynthesis.cancel();index=0;state="playing";toggle.textContent="Pausar leitura";toggle.setAttribute("aria-pressed","true");if(controls)controls.hidden=false;speakNext();}else if(state==="playing"){speechSynthesis.pause();state="paused";toggle.textContent="Continuar leitura";toggle.setAttribute("aria-pressed","false");update("Leitura pausada.");}else{speechSynthesis.resume();state="playing";toggle.textContent="Pausar leitura";toggle.setAttribute("aria-pressed","true");update(`Continuando do trecho ${index+1}.`);}});
    stop?.addEventListener("click",()=>{speechSynthesis.cancel();finish();}); window.addEventListener("beforeunload",()=>speechSynthesis.cancel());
  };

  const initBackTop = () => { const link=document.querySelector(".borderline-back-top"); if(!link)return; link.addEventListener("click",(e)=>{if(reduced())return;e.preventDefault();document.getElementById("topo")?.scrollIntoView({behavior:"smooth"});}); };
  const init=()=>{initMobileToc();initActiveToc();initTimeline();initTabs();initFont();initContrast();initReader();initBackTop();};
  document.readyState==="loading" ? document.addEventListener("DOMContentLoaded",init,{once:true}) : init();
})();
