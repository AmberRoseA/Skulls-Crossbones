/**
 * Basic Stucture and const of game layout
 */
const box = document.querySelectorAll(".box");
const statusText = document.querySelector('#status-text');
const restetGame = document.querySelector('#restartBtn');
const skullScoreDisplay = document.querySelector('#skull-score');
const tieScoreDisplay = document.querySelector('#tie-score');
const boneScoreDisplay = document.querySelector('#bone-score');
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
let pX = 'Crossbone'; // Player X symbol
let pO = 'Skull'; // Player O symbol

/**
 * Initial game rules
 */
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = pX;
let running = false;

/**
 * Score let rules
 */
let skullScore = 0;
let tieScore = 0;
let boneScore = 0;

runGame();

// Functions 
function runGame() {
    box.forEach(box => box.addEventListener("click", boxClicked));
    running = true;
}

function boxClicked() {
    const boxIndex = this.getAttribute("data-boxindex");

    if (options[boxIndex] !== "" || !running) {
        return;
    }

    // Set the background image based on the current player and their graphic
    this.style.backgroundImage = (currentPlayer === pX) ? 'url("assets/images/bones.png")' : 'url("assets/images/skull.png")';

    updateBox(this, boxIndex);
    checkWinner();
}

function updateBox(box, index) {
    options[index] = currentPlayer;

    changePlayer();
}

function changePlayer() {
    currentPlayer = (currentPlayer === pX) ? pO : pX;
    statusText.textContent = `${currentPlayer}'s Turn`;
}

// Function to update scores
function updateScores() {
    skullScoreDisplay.textContent = skullScore;
    tieScoreDisplay.textContent = tieScore;
    boneScoreDisplay.textContent = boneScore;
}


// Function to handle score updates based on game outcome
function handleScoreUpdate(winner) {
    if (winner === pX) {
        boneScore++;
    } else if (winner === pO) {
        skullScore++;
    } else {
        tieScore++;
    }
    updateScores();
}

function checkWinner() {
    let roundWon = false;
    let winner = null;

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
            winner = boxA; // Set the winner here
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${winner} WINS!`;
        handleScoreUpdate(winner);
        running = false;
    } else if (!options.includes("")) {
        statusText.textContent = `Tie!`;
        handleScoreUpdate("tie");
        running = false;
    }
}

/**
 * Restart button--- Clear board 
 */
restartBtn.addEventListener("click", resetGame);


function resetGame() {
    options = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = pX;
    running = true;

    // Reset the text content and background image of each box
    box.forEach(box => {
        box.textContent = "";
        box.style.backgroundImage = "none"; // Clear the background image
    });

    // Update status text
    statusText.textContent = `${currentPlayer}'s Turn`;
}
