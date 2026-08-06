(() => {
  "use strict";

  const initializeChakraExplorer = () => {
    const root = document.querySelector("[data-chakra-explorer]");

    if (!root || root.dataset.chakraExplorerReady === "true") {
      return;
    }

    root.dataset.chakraExplorerReady = "true";

    const buttons = Array.from(root.querySelectorAll("[data-chakra-button]"));
    const rows = Array.from(root.querySelectorAll("[data-chakra-row]"));
    const name = root.querySelector("[data-chakra-name]");
    const location = root.querySelector("[data-chakra-location]");
    const traditional = root.querySelector("[data-chakra-traditional]");
    const modern = root.querySelector("[data-chakra-modern]");
    const caution = root.querySelector("[data-chakra-caution]");

    const selectChakra = (button) => {
      if (!button) {
        return;
      }

      buttons.forEach((item) => {
        item.setAttribute("aria-pressed", String(item === button));
      });

      rows.forEach((row) => {
        row.classList.toggle("is-selected", row.contains(button));
      });

      if (name) {
        name.textContent = button.dataset.name || "";
      }

      if (location) {
        location.textContent = button.dataset.location || "";
      }

      if (traditional) {
        traditional.textContent = button.dataset.traditional || "";
      }

      if (modern) {
        modern.textContent = button.dataset.modern || "";
      }

      if (caution) {
        caution.textContent = button.dataset.caution || "";
      }
    };

    buttons.forEach((button, index) => {
      button.addEventListener("click", () => {
        selectChakra(button);
      });

      button.addEventListener("keydown", (event) => {
        if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
          return;
        }

        event.preventDefault();

        let nextIndex = index;

        if (event.key === "ArrowDown") {
          nextIndex = (index + 1) % buttons.length;
        }

        if (event.key === "ArrowUp") {
          nextIndex = (index - 1 + buttons.length) % buttons.length;
        }

        if (event.key === "Home") {
          nextIndex = 0;
        }

        if (event.key === "End") {
          nextIndex = buttons.length - 1;
        }

        const nextButton = buttons[nextIndex];
        nextButton.focus();
        selectChakra(nextButton);
      });
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initializeChakraExplorer,
      { once: true },
    );
  } else {
    initializeChakraExplorer();
  }
})();
