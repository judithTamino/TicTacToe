const cells = document.querySelectorAll(".cell");
const gameStatus = document.querySelector(".game-status");
const players = ["X", "O", "X", "O", "X", "O", "X", "O", "X"];
let i = 0, currentPlayer = players[i], gameActive = false;
const winningPossibility = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
const popup = document.querySelector(".backdrop");

startGame();

function startGame() {
  cells.forEach(cell => cell.addEventListener('click', () => {
    const cellIndex = cell.dataset.index;

    if (options[cellIndex] != "" || !gameActive)
      return;

    updateCell(cell, cellIndex);
    checkWinner();
  }));

  gameStatus.textContent = `${currentPlayer}'s turn`;
  gameActive = true;
};

function updateCell(cell, cellIndex) {
  options[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;

  // add X's and O's style
  if (currentPlayer == "X")
    cell.classList.add("player-x");
  if (currentPlayer == "O")
    cell.classList.add("player-o");
};

// func -> change player
function changePlayer() {
  if (i < options.length)
    i++;
  currentPlayer = players[i];

  // change game status
  gameStatus.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
  let playerWin = false;

  for (let i = 0; i < winningPossibility.length; i++) {
    const cellOne = options[winningPossibility[i][0]];
    const cellTwo = options[winningPossibility[i][1]];
    const cellThree = options[winningPossibility[i][2]];

    if (cellOne == "" || cellTwo == "" || cellThree == "")
      continue;
    if (cellOne == cellTwo && cellOne == cellThree) {
      playerWin = true;
      break;
    }
  }
  displayPopup(playerWin);
};

function displayPopup(playerWin) {
  popup.classList.remove("hide-popup");
  popup.classList.add("show-popup");

  if (playerWin) {
    document.querySelector(".game-msg").textContent = `Player ${currentPlayer}'s Win`;
    gameActive = false;
  } else if (!options.includes("")) {
    document.querySelector(".game-msg").textContent = `Draw`;
    gameActive = false;
  } else {
    closePopup();
    changePlayer();
  }
}

function closePopup() {
  popup.classList.add("hide-popup");
  popup.classList.remove("show-popup");
}

function restartGame() {
  options = ["", "", "", "", "", "", "", "", ""];
  i = 0;
  currentPlayer = players[i];
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("player-x", "player-o");
  });
  startGame();
};