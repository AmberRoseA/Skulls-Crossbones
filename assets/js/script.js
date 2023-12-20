const box = document.querySelectorAll(".box");
const statusText = document.querySelector('#status-text');
const restartBtn = document.querySelector('#restartBtn');
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

/**
 * Player options 
 */
let pX = 'X'; // Player X symbol
let pO = 'O'; // Player O symbol

/**
 * Initial game rules
 */
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = pX;
let running = false;

runGame();

// Functions 
function runGame() {
    box.forEach(box => box.addEventListener("click", boxClicked));
    running = true;
}

function boxClicked() {
    const boxIndex = this.getAttribute("boxIndex");

    if (options[boxIndex] !== "" || !running) {
        return;
    }

    // Set the background image based on the current player
    this.style.backgroundImage = (currentPlayer === pX) ? 'url("assets/images/bones.png")' : 'url("assets/images/skull.png")';

    updateBox(this, boxIndex);
    checkWinner();
}

function updateBox(box, index) {
    options[index] = currentPlayer;
    box.textContent = currentPlayer;

    changePlayer();
}

function changePlayer() {
    currentPlayer = (currentPlayer === pX) ? pO : pX;
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const boxA = options[condition[0]];
        const boxB = options[condition[1]];
        const boxC = options[condition[2]];

        if (boxA == "" || boxB == "" || boxC == "") {
            continue;
        }
        if (boxA == boxB && boxB == boxC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;
    } else if (!options.includes("")) {
        statusText.textContent = `Tie!`;
        running = false;
    }
}