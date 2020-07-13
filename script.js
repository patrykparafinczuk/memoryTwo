const container = document.getElementById("inner-container");
const startGameButton = document.getElementById("start-game-btn");
const resetGameButton = document.getElementById("reset-game-btn");
let isStarted = false;

const startGame = () => {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const tile = document.createElement("div");
      tile.classList.add("tiles");
      tile.style.width = "80px";
      tile.style.height = "80px";
      tile.style.position = "absolute";
      tile.style.top = `${i * 90 + 25}px`;
      tile.style.left = `${j * 90 + 25}px`;
      tile.style.backgroundColor = "black";
      container.append(tile);
    }
  }
  isStarted = true;
};

const resetGame = () => {
  if (!isStarted) {
    return;
  }

};

startGameButton.addEventListener("click", startGame);
resetGameButton.addEventListener("click", resetGame);


