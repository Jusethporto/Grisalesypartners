const toggle = document.querySelector<HTMLButtonElement>("[data-nav-toggle]");
const panel = document.querySelector<HTMLElement>("[data-nav-panel]");
const nav = document.querySelector<HTMLElement>("[data-navbar]");

toggle?.addEventListener("click", () => {
  const isOpen = panel?.classList.toggle("flex");
  panel?.classList.toggle("hidden");
  toggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

panel?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    panel.classList.add("hidden");
    panel.classList.remove("flex");
    toggle?.setAttribute("aria-expanded", "false");
  });
});

let lastScroll = 0;
window.addEventListener(
  "scroll",
  () => {
    const current = window.scrollY;
    nav?.classList.toggle("shadow-card", current > 8);
    nav?.classList.toggle("bg-surface/80", current > 8);
    nav?.classList.toggle("bg-surface/40", current <= 8);
    lastScroll = current;
  },
  { passive: true },
);
