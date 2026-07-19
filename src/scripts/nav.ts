const toggle = document.querySelector<HTMLButtonElement>("[data-nav-toggle]");
const panelWrapper = document.querySelector<HTMLElement>("[data-nav-panel-wrapper]");
const panel = document.querySelector<HTMLElement>("[data-nav-panel]");
const nav = document.querySelector<HTMLElement>("[data-navbar]");

const setOpen = (open: boolean) => {
  toggle?.setAttribute("aria-expanded", String(open));
  panelWrapper?.setAttribute("data-open", String(open));
  if (panel) panel.inert = !open;
};

toggle?.addEventListener("click", () => {
  const isOpen = toggle.getAttribute("aria-expanded") === "true";
  setOpen(!isOpen);
});

panel?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setOpen(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setOpen(false);
});

setOpen(false);

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
