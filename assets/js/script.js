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

}

function boxClicked(){

}

function updateBox(box, index){

}

function changePlayer(){

}

function checkWinner(){

}

funtion updateScore(){

}

funtion restartGame(){
    
}