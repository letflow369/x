(() => {
  "use strict";

  const root = document.querySelector("[data-vibration-filter]");

  if (!root) {
    return;
  }

  const buttons = Array.from(
    root.querySelectorAll("[data-vibration-filter-button]"),
  );
  const cards = Array.from(
    root.querySelectorAll("[data-vibration-category]"),
  );
  const status = root.querySelector("[data-vibration-filter-status]");

  const labels = {
    all: "Exibindo as quatro categorias.",
    science: "Exibindo os dois significados científicos: física e biologia.",
    subjective: "Exibindo o uso como experiência subjetiva e metáfora emocional.",
    spirituality: "Exibindo a interpretação espiritual e simbólica.",
  };

  const applyFilter = (filter) => {
    cards.forEach((card) => {
      const shouldShow =
        filter === "all" || card.dataset.vibrationCategory === filter;
      card.hidden = !shouldShow;
    });

    buttons.forEach((button) => {
      const isActive = button.dataset.vibrationFilterButton === filter;
      button.setAttribute("aria-pressed", String(isActive));
      button.classList.toggle("is-active", isActive);
    });

    if (status) {
      status.textContent = labels[filter] || labels.all;
    }
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      applyFilter(button.dataset.vibrationFilterButton || "all");
    });
  });
})();
