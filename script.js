const container = document.getElementById("inner-container");
const startGameButton = document.getElementById("start-game-btn");
const resetGameButton = document.getElementById("reset-game-btn");
const instruction = document.getElementById("instruction");
const counterField = document.getElementById("counter");
const fourOnFourButton = document.getElementById("fourOnFour-btn");
const fiveOnFourButton = document.getElementById("fiveOnFour-btn");
const sixOnSixButton = document.getElementById("sixOnSix-btn");
let valuePairs = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7];
let isStarted = false;
let counter = 0;
let mode = "4x4";
let rowCount = 4;
let columnCount = 4;

const startGame = (modeSetted) => {
  container.innerHTML = "";
  counter = 0;
  counterField.innerText = 0;
  if (modeSetted === "4x4") {
    valuePairs = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7];
    rowCount = 4;
    columnCount = 4;
  }
  for (let i = 0; i < columnCount; i++) {
    for (let j = 0; j < rowCount; j++) {
      const tile = document.createElement("div");
      tile.classList.add("tiles");
      container.append(tile);

      tile.style.top = `${i * 90 + 25}px`;
      tile.style.left = `${j * 90 + 25}px`;

      let idPair;
      let isValidId = true;
      while (isValidId) {
        const positionSelected = Math.floor(Math.random() * 16);
        idPair = valuePairs[positionSelected];
        if (idPair !== "none") {
          valuePairs[positionSelected] = "none";
          isValidId = false;
        }
      }
      const showImage = (number) => {
        const uncoveredItems = document.querySelectorAll(".uncovered");
        if (uncoveredItems.length === 2) {
          return;
        }
        tile.style.backgroundImage = `url('images/${number + 1}.png')`;
        tile.style.backgroundSize = "75px 75px";
        tile.classList.add("uncovered");
      };
      const matchPair = () => {
        const uncoveredItems = document.querySelectorAll(".uncovered");
        const comparizer = () => {
          if (uncoveredItems.length <= 1 || uncoveredItems.length > 2) {
            return;
          } else if (uncoveredItems[0].id === uncoveredItems[1].id) {
            for (const el of uncoveredItems) {
              container.removeChild(el);
            }
            counter++;
            counterField.innerText = counter;
          } else {
            for (const el of uncoveredItems) {
              el.classList.remove("uncovered");
              el.style.backgroundImage = "url('images/puzzle.png')";
            }
            counter++;
            counterField.innerText = counter;
          }
          if (container.innerHTML === "") {
            const div = document.createElement("div");
            div.id = "won-caption";
            div.textContent = "You won!";
            container.append(div);
          }
        };
        setTimeout(comparizer,500);
      };
      tile.id = idPair;
      tile.addEventListener("click", showImage.bind(this, idPair));
      tile.addEventListener("click", matchPair);
    }
  }
  isStarted = true;
};

const changeMode = (btn) => {
  switch (btn) {
    case 0 :
      mode = "4x4";
      break;
    case 1 :
      mode = "5x4";
      break;
    case 2 :
      mode = "6x6";
      break;
    default :
      mode = "4x4";
  }
};

const resetGame = () => {
  if (!isStarted) {
    return;
  }
  container.innerHTML = instruction.innerHTML;
  counterField.innerHTML = 0;
  isStarted = false;
};

const setActiveClass = (btn) => {
  const arr = document.querySelectorAll(".changeSize");
  for (const el of arr) {
    el.classList.remove("active");
  }
  switch (btn) {
    case 0 :
      fourOnFourButton.classList.add("active");
      break;
    case 1 :
      fiveOnFourButton.classList.add("active");
      break;
    case 2 :
      sixOnSixButton.classList.add("active");
      break;
  }
};

startGameButton.addEventListener("click", startGame.bind(this, mode));
resetGameButton.addEventListener("click", resetGame);

fourOnFourButton.addEventListener("click", setActiveClass.bind(this, 0));
fourOnFourButton.addEventListener("click", changeMode.bind(this, 0));

fiveOnFourButton.addEventListener("click", setActiveClass.bind(this, 1));
fiveOnFourButton.addEventListener("click", changeMode.bind(this, 1));

sixOnSixButton.addEventListener("click", setActiveClass.bind(this, 2));
sixOnSixButton.addEventListener("click", changeMode.bind(this, 2));

