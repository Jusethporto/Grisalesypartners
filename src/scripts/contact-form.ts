const form = document.querySelector<HTMLFormElement>("[data-contact-form]");
const statusEl = document.querySelector<HTMLParagraphElement>("[data-contact-status]");

form?.addEventListener("submit", (event) => {
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

  window.setTimeout(() => {
    form.reset();
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "Enviar Solicitud";
    }
    if (statusEl) {
      statusEl.textContent = "Gracias. Un consultor se pondrá en contacto en las próximas 24 horas.";
      statusEl.classList.remove("hidden");
    }
  }, 900);
});
