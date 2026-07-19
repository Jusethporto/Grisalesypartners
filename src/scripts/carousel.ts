document.querySelectorAll<HTMLElement>("[data-carousel]").forEach((carousel) => {
  const track = carousel.querySelector<HTMLElement>("[data-carousel-track]");
  const prev = carousel.querySelector<HTMLButtonElement>("[data-carousel-prev]");
  const next = carousel.querySelector<HTMLButtonElement>("[data-carousel-next]");
  if (!track) return;

  const scrollByCard = (direction: 1 | -1) => {
    const card = track.querySelector<HTMLElement>("[data-carousel-card]");
    const amount = (card?.offsetWidth ?? 360) + 24;
    track.scrollBy({ left: amount * direction, behavior: "smooth" });
  };

  const updateControls = () => {
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (prev) prev.disabled = track.scrollLeft <= 4;
    if (next) next.disabled = track.scrollLeft >= maxScroll - 4;
  };

  prev?.addEventListener("click", () => scrollByCard(-1));
  next?.addEventListener("click", () => scrollByCard(1));
  track.addEventListener("scroll", updateControls, { passive: true });
  window.addEventListener("resize", updateControls);
  updateControls();
});
