const form = document.querySelector<HTMLFormElement>("[data-contact-form]");
const modal = document.querySelector<HTMLElement>("[data-contact-modal]");
const modalPanel = document.querySelector<HTMLElement>("[data-contact-modal-panel]");
const modalTitle = document.querySelector<HTMLElement>("[data-contact-modal-title]");
const modalMessage = document.querySelector<HTMLElement>("[data-contact-modal-message]");
const modalIcons = {
  success: document.querySelector<HTMLElement>('[data-contact-modal-icon="success"]'),
  error: document.querySelector<HTMLElement>('[data-contact-modal-icon="error"]'),
};

let lastFocused: HTMLElement | null = null;

const openModal = (
  variant: "success" | "error",
  title: string,
  message: string,
  returnFocusTo: HTMLElement | null,
) => {
  if (!modal || !modalTitle || !modalMessage) return;

  modalTitle.textContent = title;
  modalMessage.textContent = message;
  modalIcons.success?.classList.toggle("hidden", variant !== "success");
  modalIcons.success?.classList.toggle("flex", variant === "success");
  modalIcons.error?.classList.toggle("hidden", variant !== "error");
  modalIcons.error?.classList.toggle("flex", variant === "error");

  lastFocused = returnFocusTo;
  modal.setAttribute("data-open", "true");
  modalPanel?.focus();
};

const closeModal = () => {
  if (!modal) return;
  modal.removeAttribute("data-open");
  lastFocused?.focus();
};

modal?.querySelectorAll<HTMLElement>("[data-contact-modal-close]").forEach((el) => {
  el.addEventListener("click", closeModal);
});

modal?.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal?.getAttribute("data-open") === "true") closeModal();
});

if (modalPanel) modalPanel.tabIndex = -1;

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
    openModal(
      "success",
      "¡Solicitud enviada!",
      "Gracias. Un consultor se pondrá en contacto en las próximas 24 horas.",
      submitButton,
    );
  } catch {
    openModal(
      "error",
      "No se pudo enviar",
      "Intenta de nuevo o escríbenos directamente a contacto@grisalesandpartners.com.",
      submitButton,
    );
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "Enviar Solicitud";
    }
  }
});
