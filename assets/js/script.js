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

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = ;
let running = false;
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
function incrementTieScore() {

    let oldScore = parseInt(document.getElementById("tie-score").innerText);
    document.getElementById("tie-score").innerText = ++oldScore;

}

