/**
 * Start of Game variable and layout
 */
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true; 

/**
 * Functions to handle players moves 
 */
function handleClick(cell) {
    if (gameBoard[cell] === '' && gameActive) {
        gameBoard[cell] = currentPlayer;
        updateBoard();
        checkWinner();
        checkTie();
        currerntPlayer = currentPlayer === 'X' ? 'O' : 'X';    // switch player
    }
}

// Function to update the visual representation of the board
function updateBoard() {
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box, index) => {
        box.textContent = gameBoard[index];
    });
}