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

  const collectReadableChunks = () => {
    const selectors = [
      ".burnout-hero__subtitle",
      ".burnout-hero__intro",
      ".burnout-summary h2",
      ".burnout-summary h3",
      ".burnout-summary p",
      ".article-content h2",
      ".article-content h3",
      ".article-content h4",
      ".article-content p",
      ".article-content li",
      ".article-content th",
      ".article-content td"
    ];

    return Array.from(document.querySelectorAll(selectors.join(",")))
      .filter((element) => !element.closest("#fontes") && !element.closest("button") && !element.hidden)
      .map((element) => element.textContent.replace(/\s+/g, " ").trim())
      .filter((text) => text.length > 1);
  };

  const initializeReader = () => {
    const toggle = document.querySelector("[data-reader-toggle]");
    const stop = document.querySelector("[data-reader-stop]");
    const controls = document.querySelector("[data-reader-controls]");
    const status = document.querySelector("[data-reader-status]");
    if (!toggle) return;

    if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
      toggle.disabled = true;
      toggle.textContent = "Leitura indisponível";
      toggle.title = "Seu navegador não oferece leitura em voz alta nesta página.";
      return;
    }

    let chunks = [];
    let index = 0;
    let state = "idle";

    const update = (message) => {
      if (status) status.textContent = message;
    };

    const finish = (message = "Leitura encerrada.") => {
      state = "idle";
      index = 0;
      toggle.textContent = "Ouvir página";
      toggle.setAttribute("aria-pressed", "false");
      if (controls) controls.hidden = true;
      update(message);
    };

    const speakNext = () => {
      if (state !== "playing") return;
      if (index >= chunks.length) {
        finish("Leitura concluída.");
        return;
      }

      const utterance = new SpeechSynthesisUtterance(chunks[index]);
      utterance.lang = "pt-BR";
      utterance.rate = 0.98;
      utterance.pitch = 1;
      utterance.onend = () => {
        index += 1;
        speakNext();
      };
      utterance.onerror = (event) => {
        if (event.error === "canceled" || event.error === "interrupted") return;
        finish("A leitura foi interrompida pelo navegador.");
      };
      window.speechSynthesis.speak(utterance);
      update(`Lendo trecho ${index + 1} de ${chunks.length}.`);
    };

    toggle.addEventListener("click", () => {
      if (state === "idle") {
        chunks = collectReadableChunks();
        if (!chunks.length) {
          update("Não foi possível localizar texto para leitura.");
          return;
        }
        window.speechSynthesis.cancel();
        index = 0;
        state = "playing";
        toggle.textContent = "Pausar leitura";
        toggle.setAttribute("aria-pressed", "true");
        if (controls) controls.hidden = false;
        speakNext();
        return;
      }

      if (state === "playing") {
        window.speechSynthesis.pause();
        state = "paused";
        toggle.textContent = "Continuar leitura";
        toggle.setAttribute("aria-pressed", "false");
        update("Leitura pausada.");
        return;
      }

      window.speechSynthesis.resume();
      state = "playing";
      toggle.textContent = "Pausar leitura";
      toggle.setAttribute("aria-pressed", "true");
      update(`Continuando do trecho ${index + 1}.`);
    });

    stop?.addEventListener("click", () => {
      window.speechSynthesis.cancel();
      finish();
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden && state === "playing") {
        window.speechSynthesis.pause();
        state = "paused";
        toggle.textContent = "Continuar leitura";
        toggle.setAttribute("aria-pressed", "false");
        update("Leitura pausada porque a página ficou em segundo plano.");
      }
    });

    window.addEventListener("beforeunload", () => window.speechSynthesis.cancel());
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
    initializeReader();
    initializeBackToTop();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
