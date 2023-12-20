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

    updateBox(this, boxIndex);
    checkWinner();
}

function updateBox(box, index) {
    options[index] = currentPlayer;
    box.textContent = currentPlayer;

    // Set the background image based on the current player
    if (currentPlayer === pX) {
        box.style.backgroundImage = `url("assets/images/bones.png")`;
    } else {
        box.style.backgroundImage = `url("assets/images/skull.png")`;
    }

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
    } else {
        changePlayer();
    }

/**
 * Gets the current tally of Games one by Skull from the DOM and increments it by 1
 */
function incrementSkullScore() {
    let oldScore = parseInt(document.getElementById("skull-score").innerText);
    document.getElementById("skull-score").innerText = ++oldScore;

}

/**
 * Gets the current tally of Games one by Crossbones from the DOM and increments it by 1
 */
function incrementBoneScore() {

    let oldScore = parseInt(document.getElementById("bone-score").innerText);
    document.getElementById("bone-score").innerText = ++oldScore;

}

/**
 * Gets the current tally of Tied Game from the DOM and increments it by 1
 */