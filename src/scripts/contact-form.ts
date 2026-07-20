const form = document.querySelector<HTMLFormElement>("[data-contact-form]");
const statusEl = document.querySelector<HTMLParagraphElement>("[data-contact-status]");

const showStatus = (message: string, variant: "success" | "error") => {
  if (!statusEl) return;
  statusEl.textContent = message;
  statusEl.classList.remove("hidden", "text-petrol", "text-red-600");
  statusEl.classList.add(variant === "success" ? "text-petrol" : "text-red-600");
};

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const submitButton = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Enviando...";
  }

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      body: new FormData(form),
    });

    if (!response.ok) {
      throw new Error("request failed");
    }

    form.reset();
    showStatus("Gracias. Un consultor se pondrá en contacto en las próximas 24 horas.", "success");
  } catch {
    showStatus("No se pudo enviar tu solicitud. Intenta de nuevo o escríbenos directamente.", "error");
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "Enviar Solicitud";
    }
  }
});
