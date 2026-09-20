// ================================================================
// 写真・日付はここで変更できます。
// 背景は4段で、左・右へ交互に流れ続けます。
// ================================================================
const pageData = {
  anniversaryOn: "2026-09-20",
  photoRows: [
    [
      "images/slide-01.webp",
      "images/slide-06.webp",
      "images/slide-09.webp",
      "images/slide-14.webp",
      "images/slide-17.webp",
    ],
    [
      "images/slide-03.webp",
      "images/slide-08.webp",
      "images/slide-11.webp",
      "images/slide-15.webp",
      "images/slide-18.webp",
    ],
    [
      "images/slide-02.webp",
      "images/slide-07.webp",
      "images/slide-10.webp",
      "images/slide-13.webp",
      "images/slide-19.webp",
    ],
    [
      "images/slide-04.webp",
      "images/slide-05.webp",
      "images/slide-12.webp",
      "images/slide-16.webp",
      "images/slide-20.webp",
    ],
  ],
};

const mosaic = document.querySelector("#mosaic");
const letterDialog = document.querySelector("#letterDialog");

function formatDate(dateString) {
  return dateString.replaceAll("-", ".");
}

function createPhotoGroup(photos) {
  const group = document.createElement("div");
  group.className = "mosaic-group";

  photos.forEach((file) => {
    const cell = document.createElement("div");
    cell.className = "mosaic-cell";

    const image = document.createElement("img");
    image.src = file;
    image.alt = "";
    image.loading = "eager";
    image.addEventListener("error", () => {
      if (image.src.endsWith(".webp")) {
        image.src = file.replace(".webp", ".jpg");
        return;
      }
      cell.style.background = "linear-gradient(145deg, #b28f84, #5b4b48)";
      image.remove();
    });

    cell.appendChild(image);
    group.appendChild(cell);
  });

  return group;
}

function shuffled(photos) {
  const result = [...photos];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

function createMosaic() {
  const rowSpeeds = [19, 22, 20, 24];

  for (let rowIndex = 0; rowIndex < 4; rowIndex += 1) {
    const row = document.createElement("div");
    const direction = rowIndex % 2 === 0 ? "left" : "right";
    row.className = `mosaic-row mosaic-row--${direction}`;
    row.style.setProperty("--flow-duration", `${rowSpeeds[rowIndex]}s`);
    row.style.setProperty("--flow-delay", `${-(Math.random() * rowSpeeds[rowIndex]).toFixed(2)}s`);

    const track = document.createElement("div");
    track.className = "mosaic-track";

    const orderedPhotos = shuffled(pageData.photoRows[rowIndex]);

    const firstGroup = createPhotoGroup(orderedPhotos);
    const secondGroup = createPhotoGroup(orderedPhotos);
    track.append(firstGroup, secondGroup);
    row.appendChild(track);
    mosaic.appendChild(row);
  }
}

function openLetter() {
  letterDialog.showModal();
  document.body.style.overflow = "hidden";
}

function closeLetter() {
  letterDialog.close();
  document.body.style.overflow = "";
}

createMosaic();
document.querySelector("#letterDate").textContent = formatDate(pageData.anniversaryOn);

document.querySelector("#openLetter").addEventListener("click", openLetter);
document.querySelectorAll("[data-close-letter]").forEach((button) => {
  button.addEventListener("click", closeLetter);
});

letterDialog.addEventListener("cancel", () => {
  document.body.style.overflow = "";
});
