const menuToggle = document.querySelector("[data-menu-toggle]");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

document.querySelectorAll(".publication-card[data-themes]").forEach((card) => {
  const linkRow = card.querySelector(".link-row");
  if (!linkRow || card.querySelector(".theme-tags")) return;

  const themes = card.dataset.themes
    .split(";")
    .map((theme) => theme.trim())
    .filter(Boolean);

  if (!themes.length) return;

  const tagList = document.createElement("div");
  tagList.className = "theme-tags";
  tagList.setAttribute("aria-label", "Lifecycle themes");

  themes.forEach((theme) => {
    const tag = document.createElement("span");
    tag.className = "theme-tag";
    tag.dataset.theme = theme;
    tag.textContent = theme;
    tagList.append(tag);
  });

  linkRow.append(tagList);
});

document.querySelectorAll("[data-bio-toggle]").forEach((button) => {
  const panel = document.getElementById(button.getAttribute("aria-controls"));
  if (!panel) return;

  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isOpen));
    panel.hidden = isOpen;
  });
});

document.querySelectorAll("[data-load-group]").forEach((group) => {
  const showButton = group.querySelector("[data-show-more]");
  const hideButton = group.querySelector("[data-show-less]");
  const extras = Array.from(group.querySelectorAll(".is-extra"));
  let visibleCount = 0;
  const step = Number(group.dataset.step || 6);

  function update() {
    extras.forEach((item, index) => {
      item.classList.toggle("is-visible", index < visibleCount);
    });
    if (showButton) showButton.style.display = visibleCount >= extras.length ? "none" : "inline-flex";
    if (hideButton) hideButton.style.display = visibleCount > 0 ? "inline-flex" : "none";
  }

  if (showButton) {
    showButton.addEventListener("click", () => {
      visibleCount = Math.min(visibleCount + step, extras.length);
      update();
    });
  }

  if (hideButton) {
    hideButton.addEventListener("click", () => {
      visibleCount = 0;
      update();
    });
  }

  update();
});

document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
  const dots = Array.from(carousel.querySelectorAll("[data-carousel-dot]"));
  const previous = carousel.querySelector("[data-carousel-prev]");
  const next = carousel.querySelector("[data-carousel-next]");
  let activeIndex = 0;

  function showSlide(index) {
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === activeIndex);
    });
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === activeIndex);
    });
  }

  if (previous) {
    previous.addEventListener("click", () => showSlide(activeIndex - 1));
  }

  if (next) {
    next.addEventListener("click", () => showSlide(activeIndex + 1));
  }

  dots.forEach((dot, dotIndex) => {
    dot.addEventListener("click", () => showSlide(dotIndex));
  });

  if (slides.length > 1) {
    window.setInterval(() => showSlide(activeIndex + 1), 10000);
  }

  showSlide(0);
});
