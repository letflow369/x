(() => {
  "use strict";

  const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const initializeTimeline = () => {
    const timeline = document.querySelector("[data-isla-timeline]");
    const controls = document.querySelector("[data-isla-timeline-controls]");
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
      items[currentIndex].scrollIntoView({
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

  const initializeTabs = () => {
    document.querySelectorAll("[data-isla-tabs]").forEach((tabs) => {
      const buttons = Array.from(tabs.querySelectorAll('[role="tab"]'));
      const panels = Array.from(tabs.querySelectorAll('[role="tabpanel"]'));
      if (!buttons.length || tabs.dataset.ready === "true") return;
      tabs.dataset.ready = "true";

      const activate = (index, focus = false) => {
        buttons.forEach((button, buttonIndex) => {
          const selected = buttonIndex === index;
          button.setAttribute("aria-selected", String(selected));
          button.tabIndex = selected ? 0 : -1;
        });
        panels.forEach((panel, panelIndex) => {
          panel.hidden = panelIndex !== index;
        });
        if (focus) buttons[index]?.focus();
      };

      buttons.forEach((button, index) => {
        button.addEventListener("click", () => activate(index));
        button.addEventListener("keydown", (event) => {
          if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
          event.preventDefault();
          if (event.key === "ArrowRight") activate((index + 1) % buttons.length, true);
          if (event.key === "ArrowLeft") activate((index - 1 + buttons.length) % buttons.length, true);
          if (event.key === "Home") activate(0, true);
          if (event.key === "End") activate(buttons.length - 1, true);
        });
      });
      activate(0);
    });
  };

  const initializeAccordions = () => {
    document.querySelectorAll("[data-isla-myths]").forEach((group) => {
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
    const toc = document.querySelector(".isla-toc details");
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

  const collectReadableChunks = () => {
    const selectors = [
      ".isla-hero__subtitle",
      ".isla-hero__intro",
      ".article-content h2",
      ".article-content h3",
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

    const finish = () => {
      state = "idle";
      index = 0;
      toggle.textContent = "Ouvir página";
      toggle.setAttribute("aria-pressed", "false");
      if (controls) controls.hidden = true;
      update("Leitura encerrada.");
    };

    const speakNext = () => {
      if (state !== "playing") return;
      if (index >= chunks.length) {
        finish();
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
        finish();
        update("A leitura foi interrompida pelo navegador.");
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
        update("Leitura pausada.");
        return;
      }

      window.speechSynthesis.resume();
      state = "playing";
      toggle.textContent = "Pausar leitura";
      update(`Continuando do trecho ${index + 1}.`);
    });

    stop?.addEventListener("click", () => {
      window.speechSynthesis.cancel();
      finish();
    });

    window.addEventListener("beforeunload", () => window.speechSynthesis.cancel());
  };

  const initialize = () => {
    initializeTimeline();
    initializeTabs();
    initializeAccordions();
    initializeMobileToc();
    initializeCopyButtons();
    initializeReader();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
