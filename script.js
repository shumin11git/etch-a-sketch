//grid size variables
const gridSidePX = 500;
const gridSideCells = 16;
const squareSide = gridSidePX/gridSideCells;


//setting up single square
const singleSquare = document.createElement('div');
singleSquare.style.width = `${squareSide}px`;
singleSquare.style.height = `${squareSide}px`;
singleSquare.classList.add('square', 'initial');
//setting up grid
const grid = document.querySelector('#grid');
const gridSize = gridSideCells * gridSideCells;
grid.style.width = `${gridSideCells * squareSide}px`;
grid.style.height = `${gridSideCells * squareSide}px`;
fillGridWithNSquares(gridSize);


//event listeners for square
const squaresClass = document.querySelectorAll('.square');
squaresClass.forEach(item => addHover(item));
//squareClass.addEventListener('click', e => squareClass.style['background-color'] = 'white');
//squareClass.




//functions
function fillGridWithNSquares(n) {
    for (let i = 1; i <= n; i++) {
        const singleSquareClone = singleSquare.cloneNode(true);
        grid.appendChild(singleSquareClone);
    }
}

function addHover(item) {
    item.addEventListener('mouseover', e => {
        item.classList.remove('initial');
        item.classList.add('hover');
    });
}