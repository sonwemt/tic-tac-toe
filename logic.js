
const gameBoard = (() => {
    let board = [false, false, false, false, false, false, false, false, false];

    
    function addToBoard(location, type) {
        if(!board[location]) {
            board[location] = type;
            return true;
        }
        return false;
    }

    function clearBoard() {
        for(let type in board) {
            board[type] = false;
        }
    }

    function getBoardCopy() {
        let boardCopy = [];
        for(element in board){
            boardCopy.push(board[element]);
        }
        return boardCopy;
    }

    function consoleLogGrid () {
        for(let item of board) {
            console.log(item);
        }
    }
    
    return {addToBoard, clearBoard, getBoardCopy, consoleLogGrid};
})();

const displayController = (() => {
    let gridSquares = document.querySelectorAll('.square');
    gridSquares.forEach((item) => {
        item.addEventListener('click', (e) => {
            gameLogic.playerTurn(gameLogic.getCurrentTurn(), e.target.id);
    })});

    const newGameButton = document.querySelector('.newGame');
    newGameButton.addEventListener('click', () => {
        gameLogic.startNewGame();
    });

    let header = document.querySelector('.header');
    let victoryContainer = document.createElement('div');
    header.appendChild(victoryContainer);


    function cleanGrid() {
        for(let square of gridSquares) {
            square.textContent = '';
        }
    }

    function updateGrid() { //Renamed 28.05
        cleanGrid();
        let array = gameBoard.getBoardCopy();
        for(const element in array) {
            if(array[element]){
                let gridSquare = document.getElementById(element);
                let content = document.createTextNode(array[element]);
                gridSquare.appendChild(content);
            }
        }
    }

    function addWinText (player) {
        let text = document.createTextNode(`${player} Wins!`);
        victoryContainer.appendChild(text);
    }

    function removeWinText () {
        victoryContainer.textContent = '';
    }


    return {updateGrid, addWinText, removeWinText};
})();


const Player = (playerSelection) => {
    const getSelection = () => playerSelection;
    let score = 0;
    function wonGame() {
        score += 1;
    }
    return {getSelection, wonGame};
};

const gameLogic = (() => {
    const player1 = Player('X');
    const player2 = Player('O');
    let turnState = player1;
    let gameOver = false;
    

    const nextTurn = () => {
        if(turnState === player1){
            turnState = player2;
        }
        else{
            turnState = player1;
        }
    }

    const getCurrentTurn = () => {
        return turnState;
    }

    const startNewGame = () => {
        gameOver = false;
        gameBoard.clearBoard();
        displayController.removeWinText();
        displayController.updateGrid();
    }

    const endConditions = (board, playerChar) => {
        if(gameOver) {
            return 0;
        }
        //Horizontal
        if(board[0] === playerChar && board[1] === playerChar && board[2] === playerChar){
            return 1;
        }
        if(board[3] === playerChar && board[4] === playerChar && board[5] === playerChar){
            return 1;
        }
        if(board[6] === playerChar && board[7] === playerChar && board[8] === playerChar){
            return 1;
        }

        //Vertical
        if(board[0] === playerChar && board[3] === playerChar && board[6] === playerChar){
            return 1;
        }
        if(board[1] === playerChar && board[4] === playerChar && board[7] === playerChar){
            return 1;
        }
        if(board[2] === playerChar && board[5] === playerChar && board[8] === playerChar){
            return 1;
        }

        //Diagonal
        if(board[0] === playerChar && board[4] === playerChar && board[8] === playerChar){
            return 1;
        }
        if(board[2] === playerChar && board[4] === playerChar && board[6] === playerChar){
            return 1;
        }

        return 0;
    }

    const playerTurn = (player, id) => {
        if(turnState){
            if(gameBoard.addToBoard(id, player.getSelection())){
                nextTurn();
            }
            if(endConditions(gameBoard.getBoardCopy(), player.getSelection())){
                gameOver = true;
                player.wonGame();
                displayController.addWinText(player.getSelection());
            }
        }
        displayController.updateGrid();
    }

    

    return {startNewGame, playerTurn, endConditions, getCurrentTurn};
})();




