//--- grid size variables --->

const gridSidePX = 500;
const gridSideCells = 16;
const squareSide = gridSidePX/gridSideCells;


//--- initializing grid and squares --->

//setting up squares
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


//--- event listeners for square --->

const squaresClass = document.querySelectorAll('.square');
addEventAndClassForEach(squaresClass, 'mouseover', 'hover', 'initial');

//--- functions --->

function fillGridWithNSquares(n) {
    for (let i = 1; i <= n; i++) {
        const singleSquareClone = singleSquare.cloneNode(true);
        grid.appendChild(singleSquareClone);
    };
}

function addEventAndClass(node, event, classToAdd, classToRemove) {
    node.addEventListener(`${event}`, e => {
        node.classList.add(`${classToAdd}`);
        node.classList.remove(`${classToRemove}`);
    });
}

function addEventAndClassForEach(nodeList, event, classToAdd, classToRemove) {
    nodeList.forEach(node =>
        addEventAndClass(node, event, classToAdd, classToRemove)
    );
}