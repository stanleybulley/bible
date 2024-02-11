
const body = document.querySelector("body");
const toggle = document.querySelector(".toggle");
const copy = document.querySelector("#copy_verse");
const popup = document.querySelector(".copy-popup");
const verseContainer = document.getElementById("verse");
const btn = document.getElementById("btn");
const url = "https://labs.bible.org/api/?passage=random&type=json";

let getVerse = () => {
  verseContainer.classList.remove("fade");
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const verseText = data[0].text;
      const verseReference = `${data[0].bookname} ${data[0].chapter}:${data[0].verse}`;
      verseContainer.innerHTML = `<b>${verseReference}</b><br>${verseText}`;
      verseContainer.classList.add("fade");
    })
    .catch((error) => {
      if (!window.navigator.onLine) {
        verseContainer.textContent =
          "Error: Your browser is offline. \nPlease try again with an internet connection.";
      } else {
        verseContainer.textContent =
          "Some Error Occurred: " + error + ".\n Please try again";
        verseContainer.classList.add("fade");
      }
    });
};

window.addEventListener("online", () => {
  getVerse();
});

btn.addEventListener("click", getVerse);

toggle.addEventListener("click", () => {
  body.classList.toggle("dark")
    ? (toggle.firstElementChild.className = "far fa-sun")
    : (toggle.firstElementChild.className = "far fa-moon");
});

copy.addEventListener("click", () => {
  const text = verseContainer.textContent;
  navigator.clipboard.writeText(text);
  popup.classList.add("fade-in-image");
  setTimeout(function () {
    popup.classList.remove("fade-in-image");
  }, 3000);
  copy.querySelector("i").className = "fa-solid fa-check";
  setTimeout(function () {
    copy.querySelector("i").className = "fa-regular fa-copy";
  }, 1000);
});

// Fade in
setTimeout(function () {
  verseContainer.innerHTML = "Get Some Verse";
  verseContainer.style.opacity = 1;
}, 500);

// List of background images
const backgroundImages = ['1.jpg', '2.jpg', '3.jpg'];

// Function to change background image every one second
function changeBackgroundImage() {
  const randomIndex = Math.floor(Math.random() * backgroundImages.length);
  document.body.style.backgroundImage = `url('${backgroundImages[randomIndex]}')`;
}

// Change background image initially
changeBackgroundImage();

// Change background image every one second
setInterval(changeBackgroundImage, 1000);


