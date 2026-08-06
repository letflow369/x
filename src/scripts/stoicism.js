(() => {
  "use strict";

  const form = document.querySelector("[data-reflection-form]");
  const clearButton = document.querySelector("[data-reflection-clear]");
  const status = document.querySelector("[data-reflection-status]");
  const storageKey = "let-flow-369:stoic-reflection";

  const setStatus = (message) => {
    if (status) {
      status.textContent = message;
    }
  };

  if (!form) {
    return;
  }

  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "null");

    if (saved && typeof saved === "object") {
      Object.entries(saved).forEach(([name, value]) => {
        const field = form.elements.namedItem(name);

        if (field && typeof value === "string") {
          field.value = value;
        }
      });

      setStatus("Reflexão local restaurada deste navegador.");
    }
  } catch {
    setStatus("Não foi possível restaurar um registro anterior.");
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(form).entries());
    const hasContent = Object.values(data).some(
      (value) => String(value).trim().length > 0,
    );

    if (!hasContent) {
      setStatus("Preencha ao menos um campo antes de registrar.");
      return;
    }

    try {
      localStorage.setItem(storageKey, JSON.stringify(data));
      setStatus("Reflexão registrada somente neste navegador.");
    } catch {
      setStatus(
        "O navegador bloqueou o armazenamento local. Copie suas respostas antes de sair.",
      );
    }
  });

  if (clearButton) {
    clearButton.addEventListener("click", () => {
      form.reset();

      try {
        localStorage.removeItem(storageKey);
      } catch {
        // O formulário ainda pode ser apagado quando o armazenamento estiver bloqueado.
      }

      setStatus("Registro local apagado.");
    });
  }
})();
