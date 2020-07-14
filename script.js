const container = document.getElementById("inner-container");
const startGameButton = document.getElementById("start-game-btn");
const resetGameButton = document.getElementById("reset-game-btn");
const valuePairs = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7];
let isStarted = false;

const startGame = () => {
  if (isStarted) {
    return;
  }
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
      tile.id = idPair;
    }
  }
  isStarted = true;
};

const resetGame = () => {
  if (!isStarted) {
    return;
  }
  const tile = document.querySelectorAll(".tiles");
  for (let i = 0; i < 16; i++) {
    tile[i].removeAttribute("id");
  }
};

startGameButton.addEventListener("click", startGame);
resetGameButton.addEventListener("click", resetGame);


