const box = document.querySelectorAll(".box");
const statusText = document.querySelector('#statusText');
const restartBtn = document.querySelector('#restartBtn')
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
let currentPlayer = "X";
let running = false;

initializeGame();

// Functions 
funtion initializeGame(){
    box.forEach(box => box.addEventListener("click", boxClicked));
    restartBtn.addEventListener("clicked", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;

}

function boxClicked(){
    const dataCell = this.getAttribute("dataCell");

    if(options[dataCell] != "" || !running){
        return;
    }

    updateBox(this, dataCell);
    checkWinner();

}

function updateBox(box, data){
    options[data] = currentPlayer;
    box.textContent = currentPlayer;

}

function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;

}

function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const boxA = options[condition[0]];
        const boxB = options[condition[1]];
        const boxc = options[condition[2]];

        if(boxA == "" || boxB == "" || boxC == ""){
            continue;
        }

        if(boxA == boxB && boxb == boxC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusText.textContent = `${currentPlayer} Wins!`;
        running = false;
    } else if(!options.includes("")){
        statusText.textContent = `Tie!`;
        running = false;
    } else{
        changePlayer();
    }

}

funtion updateScore(){

}

funtion restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    box.forEach(box => box.textContent = "");
    running = true;
    
}