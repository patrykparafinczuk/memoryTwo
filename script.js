const container = document.getElementById("inner-container");
const startGameButton = document.getElementById("start-game-btn");
const resetGameButton = document.getElementById("reset-game-btn");
const instruction = document.getElementById("instruction");
const counterField = document.getElementById("counter");
let valuePairs = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7];
let isStarted = false;
let counter = 0;

const startGame = () => {
  container.innerHTML = "";
  valuePairs = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7];
  counter = 0;
  counterField.innerText = 0;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
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

const resetGame = () => {
  if (!isStarted) {
    return;
  }
  container.innerHTML = instruction.innerHTML;
  counterField.innerHTML = 0;
  isStarted = false;
};

startGameButton.addEventListener("click", startGame);
resetGameButton.addEventListener("click", resetGame);


