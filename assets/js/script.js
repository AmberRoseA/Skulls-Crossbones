/**
 * Basic Stucture and const of game layout
 */
let box = document.querySelectorAll(".box");
let statusText = document.querySelector("#status-text");
let restartBtn = document.querySelector("#restartBtn");
let skullScoreDisplay = document.querySelector("#skull-score");
let tieScoreDisplay = document.querySelector("#tie-score");
let boneScoreDisplay = document.querySelector("#bone-score");
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
 * playerX- crossbones and playerO- for skulls
 */
let playerX = "Crossbone";
let playerO = "Skull";

/**
 * Initial game rules
 */
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = playerX;
let running = false;

/**
 * Score let rules
 */
let skullScore = 0;
let tieScore = 0;
let boneScore = 0;

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

    /**
     * Set the background image based on the current player and their graphic
     */ 
    this.style.backgroundImage = (currentPlayer === playerX) ? 'url("assets/images/bones.png")' : 'url("assets/images/skull.png")';

    updateBox(this, boxIndex);
    checkWinner();
}

function updateBox(box, index) {
    options[index] = currentPlayer;

    changePlayer();
}

function changePlayer() {
    currentPlayer = (currentPlayer === playerX) ? playerO : playerX;
    statusText.textContent = `${currentPlayer}'s Turn`;
}

/**
 *  Function to update scores
 */
function updateScores() {
    skullScoreDisplay.textContent = skullScore;
    tieScoreDisplay.textContent = tieScore;
    boneScoreDisplay.textContent = boneScore;
}


/**
 * Function to handle score updates based on game outcome 
 */
function handleScoreUpdate(winner) {
    if (winner === playerX) {
        boneScore++;
    } else if (winner === playerO) {
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
            winner = boxA; /**Set the winner here*/
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
 * Wont let player start until page has fully loaded
 */
document.addEventListener("DOMContentLoaded", (event) => {
    runGame();
    /**
 * Restart button--- Clear board 
 */
    restartBtn.addEventListener("click", resetGame);
});



function resetGame() {
    /**Confirmation user wants game reset*/
    const userConfirmed = confirm("Would you like to Reset Game?");

    if (userConfirmed) {
        options = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = playerX;
        running = true;

    /**
     *  Reset the text content and background image of each box
     */
        box.forEach(box => {
            box.textContent = "";
            box.style.backgroundImage = "none"; /** Clear the background image */
        });

    /**
     * Update status text
     */
        statusText.textContent = `${currentPlayer}'s Turn`;
    }    
}
