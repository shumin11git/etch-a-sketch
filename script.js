//grid size
let gridSidePX = 500;
let gridSideCells = 16;
const squareSide = gridSidePX/gridSideCells;

//setting up grid
const grid = document.querySelector('#grid');
const gridSize = gridSideCells * gridSideCells;
grid.style.width = `${gridSideCells * squareSide}px`;
grid.style.height = `${gridSideCells * squareSide}px`;
fillGridWithNSquares(gridSize);








//functions
function fillGridWithNSquares(n) {
    const singleSquare = document.createElement('div');
    singleSquare.style.width = `${squareSide}px`;
    singleSquare.style.height = `${squareSide}px`;
    singleSquare.classList.add('square', 'initial');
    for (let i = 1; i <= n; i++) {
        const singleSquareClone = singleSquare.cloneNode(true);
        grid.appendChild(singleSquareClone);
    }
}