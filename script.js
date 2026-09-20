// ================================================================
// ここだけ書き換えれば、日付・写真・文章を自分たち用に変更できます。
// 写真は images フォルダに入れて、file の名前を合わせてください。
// ================================================================
const pageData = {
  // 付き合い始めた日（例: 2026-06-20）
  startedOn: "2026-06-20",

  // 3ヶ月記念日（例: 2026-09-20）
  anniversaryOn: "2026-09-20",

  memories: [
    {
      file: "images/memory-01.jpg",
      title: "はじめてのデート",
      date: "2026.06",
      placeholder: "01",
      colors: ["#c9a493", "#77645d"],
    },
    {
      file: "images/memory-02.jpg",
      title: "一緒に見た景色",
      date: "2026.07",
      placeholder: "02",
      colors: ["#9aa6a0", "#5f7777"],
    },
    {
      file: "images/memory-03.jpg",
      title: "たくさん笑った日",
      date: "2026.08",
      placeholder: "03",
      colors: ["#d2b9a7", "#977c70"],
    },
    {
      file: "images/memory-04.jpg",
      title: "これからもふたりで",
      date: "2026.09",
      placeholder: "04",
      colors: ["#9d9a8c", "#66665d"],
    },
  ],
};

const gallery = document.querySelector("#gallery");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const lightboxCaption = document.querySelector("#lightboxCaption");
let currentIndex = 0;

function formatDate(dateString) {
  const [year, month, day] = dateString.split("-");
  return `${year}.${month}.${day}`;
}

function calculateDaysTogether() {
  const start = new Date(`${pageData.startedOn}T00:00:00`);
  const anniversary = new Date(`${pageData.anniversaryOn}T00:00:00`);
  const diff = Math.round((anniversary - start) / 86_400_000);
  return Number.isFinite(diff) && diff >= 0 ? diff : 90;
}

function createMemoryCard(memory, index) {
  const card = document.createElement("figure");
  card.className = "memory-card";
  card.innerHTML = `
    <button type="button" aria-label="${memory.title}の写真を拡大する">
      <div class="memory-card__image">
        <img src="${memory.file}" alt="${memory.title}" loading="lazy" />
      </div>
    </button>
    <figcaption>
      <span>${memory.title}</span>
      <time>${memory.date}</time>
    </figcaption>
  `;

  const image = card.querySelector("img");
  image.addEventListener("error", () => {
    const fallback = document.createElement("div");
    fallback.className = "memory-card__fallback";
    fallback.style.setProperty("--fallback-a", memory.colors[0]);
    fallback.style.setProperty("--fallback-b", memory.colors[1]);
    fallback.textContent = memory.placeholder;
    image.replaceWith(fallback);
  });

  card.querySelector("button").addEventListener("click", () => openLightbox(index));
  return card;
}

function openLightbox(index) {
  const memory = pageData.memories[index];
  const probe = new Image();
  probe.onload = () => {
    currentIndex = index;
    lightboxImage.src = memory.file;
    lightboxImage.alt = memory.title;
    lightboxCaption.textContent = `${memory.title}  —  ${memory.date}`;
    if (!lightbox.open) lightbox.showModal();
  };
  // 写真未設定のプレースホルダーは拡大しない
  probe.onerror = () => {};
  probe.src = memory.file;
}

function moveLightbox(direction) {
  const nextIndex = (currentIndex + direction + pageData.memories.length) % pageData.memories.length;
  openLightbox(nextIndex);
}

pageData.memories.forEach((memory, index) => {
  gallery.appendChild(createMemoryCard(memory, index));
});

// 先頭と手紙部分にも、ギャラリーと同じ写真を自動で表示します。
document.querySelectorAll("[data-memory-index]").forEach((image) => {
  const memory = pageData.memories[Number(image.dataset.memoryIndex)];
  if (!memory) return;
  image.addEventListener("error", () => image.remove());
  image.src = memory.file;
});

document.querySelector("#daysTogether").textContent = calculateDaysTogether();
document.querySelector("#anniversaryDate").textContent = formatDate(pageData.anniversaryOn);

document.querySelector(".lightbox__close").addEventListener("click", () => lightbox.close());
document.querySelector(".lightbox__nav--prev").addEventListener("click", () => moveLightbox(-1));
document.querySelector(".lightbox__nav--next").addEventListener("click", () => moveLightbox(1));

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});

document.addEventListener("keydown", (event) => {
  if (!lightbox.open) return;
  if (event.key === "ArrowLeft") moveLightbox(-1);
  if (event.key === "ArrowRight") moveLightbox(1);
});
