(() => {
  "use strict";

  const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const initializeTimeline = () => {
    const timeline = document.querySelector("[data-cristianismo-timeline]");
    const controls = document.querySelector("[data-cristianismo-timeline-controls]");
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
      items[currentIndex]?.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: "nearest",
        inline: "start",
      });
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

  const initializeAccordions = () => {
    document.querySelectorAll("[data-cristianismo-myths]").forEach((group) => {
      group.querySelectorAll("details").forEach((item) => {
        item.addEventListener("toggle", () => {
          if (!item.open) return;
          group.querySelectorAll("details").forEach((other) => {
            if (other !== item) other.open = false;
          });
        });
      });
    });
  };

  const initializeMobileToc = () => {
    const toc = document.querySelector(".cristianismo-toc details");
    if (!toc) return;
    toc.querySelectorAll("a[href^='#']").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.matchMedia("(max-width: 62rem)").matches) toc.open = false;
      });
    });
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
    const article = document.querySelector("[data-cristianismo-readable]");
    const decrease = document.querySelector("[data-font-decrease]");
    const reset = document.querySelector("[data-font-reset]");
    const increase = document.querySelector("[data-font-increase]");
    const status = document.querySelector("[data-font-status]");
    if (!article || !decrease || !reset || !increase) return;

    const levels = [0.9, 1, 1.1, 1.2];
    const storageKey = "lf369-cristianismo-font-scale";
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
      article.style.setProperty("--christian-font-scale", String(scale));
      article.style.setProperty("--christian-body-size", `${scale}rem`);
      decrease.disabled = currentIndex === 0;
      increase.disabled = currentIndex === levels.length - 1;
      const percentage = Math.round(scale * 100);
      if (announce && status) status.textContent = `Tamanho do texto: ${percentage}%.`;
      try {
        window.localStorage.setItem(storageKey, String(scale));
      } catch {
        // A preferência continua válida durante a sessão atual.
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
      ".cristianismo-hero__subtitle",
      ".cristianismo-hero__intro",
      ".article-content h2",
      ".article-content h3",
      ".article-content h4",
      ".article-content p",
      ".article-content li",
      ".article-content dt",
      ".article-content dd",
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

  const initialize = () => {
    initializeTimeline();
    initializeAccordions();
    initializeMobileToc();
    initializeCopyButtons();
    initializeFontControls();
    initializeReader();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
