const box = document.querySelectorAll(".box");
const statusText = document.querySelector('#statusText');
const scoresElement = document.querySelector('.scoreArea');
const restartBtn = document.querySelector('#restartBtn');
const X = document.querySelector('.playerX');
const O = document.querySelector('.playerO');
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

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = X;
let running = false;
let scores = { X: 0, Tie: 0, O: 0 }; // Initialize scores
 

initializeGame();

// Functions 
function initializeGame(){
    box.forEach(box => box.addEventListener("click", boxClicked));
    statusText.textContent = `${currentPlayer}'s turn`;
    updateScoresDisplay();
    running = true;

}

function boxClicked(){
    const boxIndex = this.getAttribute("boxIndex");

    if(options[boxIndex] != "" || !running){
        return;
    }

    updateBox(this, boxIndex);
    checkWinner();

}

function updateBox(box, index) {
    options[index] = currentPlayer;
    box.style.backgroundImage = `url(${currentPlayer.src})`;
}


function changePlayer(){
    currentPlayer = (currentPlayer == X) ? O : X;
    statusText.textContent = `${currentPlayer}'s turn`;

}

function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const boxA = options[condition[0]];
        const boxB = options[condition[1]];
        const boxC = options[condition[2]];

        if(boxA == "" || boxB == "" || boxC == ""){
            continue;
        }

        if(boxA == boxB && boxB == boxC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusText.textContent = `${currentPlayer} Wins!`;
        scores[currentPlayer]++; //incredment scores for the current player
        updateScoresDisplay();
        running = false;
    } else if(!options.includes("")){
        statusText.textContent = `Tie!`;
        // increment needed here
        running = false;
    } else{
        changePlayer();
    }

}

function updateScoresDisplay(){
   



}

function restartGame() {
    currentPlayer = X;
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;

    // Clear the content of each box
    box.forEach(boxElement => {
        boxElement.textContent = ""; // Clear any text content
        boxElement.style.backgroundImage = ""; // Clear the background image
    });

    running = true;
}
