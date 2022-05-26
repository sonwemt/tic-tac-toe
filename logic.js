
const gameBoard = (() => {
    let board = [false, false, false, false, false, false, false, false, false];

    
    function addToBoard(location, type) {
            board[location] = type;
    }

    function clearBoard() {
        for(let type in board) {
            if(type) {
                type = false;
            }
        }
    }

    function returnBoardCopy() {
        let boardState = [];
        for(let element of board) {
            boardState.push(element);
        }
        return boardState;
    }
    

    return {addToBoard, clearBoard, returnBoardCopy};
})();

const displayController = (() => {
    let boardWrapper = document.querySelector('.board');
    let gridSquares = document.querySelectorAll('.square');
    const selectionX = 'X';
    const selectionO = 'O';
   
    function clearGrid() {
        for(let square of gridSquares) {
            square.textContent = '';
        }
    }

    function fillGrid(array) {
        clearGrid();
        for(const element in array) {
            let gridSquare = document.getElementById(element);
            if(array[element] === selectionO) {
                let contentO = document.createTextNode(selectionO);
                gridSquare.appendChild(contentO);
            }
            else if(array[element] === selectionX) {
                let contentX = document.createTextNode(selectionX);
                gridSquare.appendChild(contentX);
            }
        }
    }

    return {fillGrid};
})();

const gameLogic = (() => {
    
})();

const player = () => {

}

const playerX = () => {

}

const playerY = () => {

}
