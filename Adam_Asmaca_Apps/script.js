const word_el = document.querySelector("#word");
const popup = document.querySelector("#popup-container");
const message_el = document.querySelector("#success-message");
const wrongLetters_el = document.querySelector("#wrong-letters");
const items = document.querySelectorAll(".item");
const message = document.querySelector("#message");
const playAgainBtn = document.querySelector("#play-again");

const correctLetters = ["j"];
const wrongLetters = [];
let selectedWord = getRandomWord();

function getRandomWord() {
  const words = ["armut", "kalem", "python", "elma", "java", "kardelen"];

  return words[Math.floor(Math.random() * words.length)];
}

function displayWord() {
  word_el.innerHTML = `
    ${selectedWord
      .split("")
      .map(
        (letter) => `
        <div class="letter"> 
            ${correctLetters.includes(letter) ? letter : ""}
        </div>
    `
      )
      .join("")}
    `;
  const w = word_el.innerText.replace(/\n/g, "");
  if (w == selectedWord) {
    popup.style.display = "flex";
    message_el.innerText = "Tebrikler Kazandınız. Afferinn ..";
  }
}

function updateWrongLetters() {
  wrongLetters_el.innerHTML = `

    ${wrongLetters.length > 0 ? "<h3> Hatalı Girdiğiniz hHarfler </h3>" : ""}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}

    `;
  items.forEach((item, index) => {
    const errorCount = wrongLetters.length;
    if (index < errorCount) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
  if (wrongLetters.length === items.length) {
    popup.style.display = "flex";
    message_el.innerText = "Maalesef Kaybettiniz.";
  }
}

function displayMessage() {
  message.classList.add("show");
  setTimeout(() => {
    message.classList.remove("show");
  }, 2000);
}

playAgainBtn.addEventListener("click", function (e) {
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = getRandomWord();

  displayWord();
  updateWrongLetters();
  popup.style.display = "none";
});

window.addEventListener("keydown", function (e) {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
        console.log(correctLetters);
      } else {
        //console.log(correctLetters);
        // console.log("Bu harfi zaten kullandınız.");
        displayMessage();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLetters();
      } else {
        displayMessage();
      }
    }
  }
});

displayWord();
