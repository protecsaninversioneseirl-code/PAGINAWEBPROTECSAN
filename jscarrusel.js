// jscarrusel.js (reemplazar todo)
let slides = document.querySelectorAll(".slide");
let current = 0;

// tiempos (ms)
const AUTOPLAY_INTERVAL = 15000; // tiempo entre slides (ya lo habías aumentado)
const TITLE_DELAY = 1000; // 2 segundos para mostrar título

let autoPlayTimer = null;
let titleTimer = null;

function hideAllTitles() {
  slides.forEach((slide) => {
    const title = slide.querySelector(".titulo-hover");
    if (title) title.classList.remove("show-title");
  });
}

function showTitleFor(index) {
  const slide = slides[index];
  if (!slide) return;
  const title = slide.querySelector(".titulo-hover");
  if (title) {
    // asegurar repaint/transition
    requestAnimationFrame(() => {
      title.classList.add("show-title");
    });
  }
}

function updateCarousel() {
  // limpiar cualquier timer previo de título
  if (titleTimer) {
    clearTimeout(titleTimer);
    titleTimer = null;
  }

  // cambiar clase active en slides
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === current);
  });

  // ocultar títulos inmediatamente
  hideAllTitles();

  // programar mostrar título después del delay
  titleTimer = setTimeout(() => {
    showTitleFor(current);
    titleTimer = null;
  }, TITLE_DELAY);
}

function nextSlide() {
  current = (current + 1) % slides.length;
  updateCarousel();
}

function prevSlide() {
  current = (current - 1 + slides.length) % slides.length;
  updateCarousel();
}

// botones
const btnRight = document.querySelector(".btn-right");
const btnLeft = document.querySelector(".btn-left");

btnRight.onclick = () => {
  nextSlide();
  restartAutoplay();
};

btnLeft.onclick = () => {
  prevSlide();
  restartAutoplay();
};

// autoplay (gestión con reinicio)
function startAutoplay() {
  // evitar duplicados
  stopAutoplay();
  autoPlayTimer = setInterval(() => {
    nextSlide();
  }, AUTOPLAY_INTERVAL);
}

function stopAutoplay() {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer);
    autoPlayTimer = null;
  }
}

function restartAutoplay() {
  stopAutoplay();
  startAutoplay();
}

// inicialización
updateCarousel(); // muestra slide 1 y programa título
startAutoplay();
