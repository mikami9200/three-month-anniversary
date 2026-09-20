// ================================================================
// 写真・日付・キャプションは、ここを書き換えるだけで変更できます。
// 写真は横向きの4:3比率がおすすめです。
// ================================================================
const pageData = {
  anniversaryOn: "2026-09-20",
  slideInterval: 5000,
  photos: [
    {
      file: "images/slide-01.webp",
      caption: "一緒に作った日の思い出",
      colors: ["#c89c8c", "#64504c"],
    },
    {
      file: "images/slide-02.webp",
      caption: "夏の夜の思い出",
      colors: ["#91a9aa", "#4c6568"],
    },
    {
      file: "images/slide-03.webp",
      caption: "ふたりで過ごす休日",
      colors: ["#ceb09e", "#8f7269"],
    },
    {
      file: "images/slide-04.webp",
      caption: "何気ない日も特別に",
      colors: ["#9b9b88", "#595c53"],
    },
    {
      file: "images/slide-05.webp",
      caption: "一緒に歩いた街",
      colors: ["#a99b8d", "#5c5956"],
    },
    {
      file: "images/slide-06.webp",
      caption: "ふたりのおでかけ",
      colors: ["#b49a8c", "#66534c"],
    },
    {
      file: "images/slide-07.webp",
      caption: "君の笑顔が好き",
      colors: ["#b9a28f", "#685b52"],
    },
    {
      file: "images/slide-08.webp",
      caption: "これからもふたりで",
      colors: ["#8b8f8b", "#505957"],
    },
  ],
};

const slideshow = document.querySelector("#slideshow");
const celebration = document.querySelector(".celebration");
const dotsContainer = document.querySelector("#slideDots");
const caption = document.querySelector("#slideCaption");
const letterDialog = document.querySelector("#letterDialog");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let currentSlide = 0;
let autoPlayTimer;
let touchStartX = 0;

function formatDate(dateString) {
  return dateString.replaceAll("-", ".");
}

function createSlides() {
  pageData.photos.forEach((photo, index) => {
    const slide = document.createElement("div");
    slide.className = `slide${index === 0 ? " is-active" : ""}`;
    slide.style.setProperty("--color-a", photo.colors[0]);
    slide.style.setProperty("--color-b", photo.colors[1]);
    slide.innerHTML = `
      <span class="slide__number">0${index + 1}</span>
      <img class="slide__blur" src="${photo.file}" alt="" />
      <img class="slide__photo" src="${photo.file}" alt="" />
    `;
    slide.querySelectorAll("img").forEach((image) => {
      image.addEventListener("error", (event) => event.currentTarget.remove());
    });
    slideshow.appendChild(slide);

    const dot = document.createElement("button");
    dot.className = `slide-dot${index === 0 ? " is-active" : ""}`;
    dot.type = "button";
    dot.setAttribute("aria-label", `${index + 1}枚目の写真を見る`);
    dot.addEventListener("click", () => showSlide(index, true));
    dotsContainer.appendChild(dot);
  });
}

function showSlide(index, restart = false) {
  const slides = [...document.querySelectorAll(".slide")];
  const dots = [...document.querySelectorAll(".slide-dot")];
  currentSlide = (index + slides.length) % slides.length;

  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === currentSlide);
  });
  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === currentSlide);
  });
  caption.textContent = pageData.photos[currentSlide].caption;

  if (restart) startAutoPlay();
}

function startAutoPlay() {
  window.clearInterval(autoPlayTimer);
  if (reduceMotion || pageData.photos.length < 2) return;
  autoPlayTimer = window.setInterval(() => showSlide(currentSlide + 1), pageData.slideInterval);
}

function openLetter() {
  window.clearInterval(autoPlayTimer);
  letterDialog.showModal();
  document.body.style.overflow = "hidden";
}

function closeLetter() {
  letterDialog.close();
  document.body.style.overflow = "";
  startAutoPlay();
}

createSlides();
showSlide(0);
startAutoPlay();

const formattedDate = formatDate(pageData.anniversaryOn);
document.querySelector("#anniversaryDate").textContent = formattedDate;
document.querySelector("#letterDate").textContent = formattedDate;

document.querySelector("#previousSlide").addEventListener("click", () => showSlide(currentSlide - 1, true));
document.querySelector("#nextSlide").addEventListener("click", () => showSlide(currentSlide + 1, true));
document.querySelector("#openLetter").addEventListener("click", openLetter);
document.querySelectorAll("[data-close-letter]").forEach((button) => {
  button.addEventListener("click", closeLetter);
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) window.clearInterval(autoPlayTimer);
  else if (!letterDialog.open) startAutoPlay();
});

celebration.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].clientX;
}, { passive: true });

celebration.addEventListener("touchend", (event) => {
  const distance = event.changedTouches[0].clientX - touchStartX;
  if (Math.abs(distance) < 45) return;
  showSlide(currentSlide + (distance < 0 ? 1 : -1), true);
}, { passive: true });

letterDialog.addEventListener("cancel", () => {
  document.body.style.overflow = "";
  startAutoPlay();
});
