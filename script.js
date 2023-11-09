//grid size in pixels

const gridSidePX = 500;
const maxGridSize = 100;

//--- initializing grid and squares --->

const gridSizeButton = document.querySelector('#grid-size-button');
const gridSizeInput = document.querySelector('#grid-size-input');
const clearButton = document.querySelector('#clear-button');
const grid = document.querySelector('#grid');
const singleSquare = document.createElement('div');

createGrid(gridSizeInput.value);

//--- event listeners for buttons --->

gridSizeButton.addEventListener('click', recreateGrid);

gridSizeInput.addEventListener('keyup', e => {
    if (e.key === 'Enter') {
        recreateGrid();
    }
})

clearButton.addEventListener('click', recreateGrid);

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

function createGrid(size) {
    if (size > maxGridSize || size < 1) return;
    //setting up square
    let gridSideCells = size;
    let squareSide = gridSidePX/gridSideCells;
    singleSquare.style.width = `${squareSide}px`;
    singleSquare.style.height = `${squareSide}px`;
    singleSquare.classList.add('square', 'initial');
    //setting up grid
    let gridSize = size * size;
    grid.style.width = `${gridSideCells * squareSide}px`;
    grid.style.height = `${gridSideCells * squareSide}px`;
    fillGridWithNSquares(gridSize);
    addHoverToSquares();
}

function recreateGrid() {
    if (gridSizeInput.value > maxGridSize || gridSizeInput.value < 1) return;
    grid.innerHTML = '';
    createGrid(gridSizeInput.value);
}

function addHoverToSquares() {
    let squaresClass = document.querySelectorAll('.square');
    addEventAndClassForEach(squaresClass, 'mouseover', 'hover', 'initial');
}
