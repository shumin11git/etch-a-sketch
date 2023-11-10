//grid size in pixels
const gridSidePX = 500;
//maximum cells on each side
const maxGridSize = 100;
//initial cells on each side
const gridSizeInput = document.querySelector('#grid-size-input');
gridSizeInput.value = 16;

//--- initializing page content --->

//page elements
const grid = document.querySelector('#grid');
const gridSizeButton = document.querySelector('#grid-size-button');
const clearButton = document.querySelector('#clear-button');
const switchColorsButton = document.querySelector('#switch-colors-button');
const rainbowModeButton = document.querySelector('#rainbow-mode-button');
const rainbowStats = document.querySelector('#rainbow-stats');
const modifiedSquaresStat = document.querySelector('#modified-squares-stat');
const percentModifiedStat = document.querySelector('#percent-modified-stat');
const statsDiv = document.querySelector('#stats');
const congratulations = document.querySelector('#congratulations');
const logo = document.querySelector('#logo');
let modifiedSquaresCount = 0;
let squaresCount;
//fill grid with squares
const singleSquare = document.createElement('div');
createGrid(gridSizeInput.value);

//--- event listeners --->

//apply size input with button
gridSizeButton.addEventListener('click', e => {
    recreateGrid(true)
});
//apply size input with keyboard
gridSizeInput.addEventListener('keyup', e => {
    if (e.key === 'Enter') {
        recreateGrid(true);
    }
})
//clear board
clearButton.addEventListener('click', e => {
    let squaresClass = document.querySelectorAll('.square');
    squaresClass.forEach(node => addClass(node, 'initial', 'removeAll'));
    resetStats();
});
//switch colors
let hoverClasses = ['hover1', 'hover2', 'hover3', 'hover4'];
let hoverClassIndex = 0;
switchColorsButton.addEventListener('click', e => {
    if (hoverClassIndex >= hoverClasses.length - 1) hoverClassIndex = 0;
    else hoverClassIndex++;
    recreateGrid(false, hoverClasses[hoverClassIndex]);
})
//rainbow mode
rainbowModeButton.addEventListener('click', e => {
    recreateGrid(false, 'random');
})

//--- functions --->

function createGrid(size, hoverClass='hover1') {
    if (size > maxGridSize || size < 1) return;
    //setting up square
    let gridSideSquares = size;
    let squareSide = gridSidePX/gridSideSquares;
    singleSquare.style.width = `${squareSide}px`;
    singleSquare.style.height = `${squareSide}px`;
    singleSquare.classList.add('square', 'initial');
    //setting up grid
    let gridSize = size * size;
    grid.style.width = `${gridSideSquares * squareSide}px`;
    grid.style.height = `${gridSideSquares * squareSide}px`;
    fillGridWithNSquares(gridSize);
    addHoverToSquares(hoverClass);
    resetStats();
}

function fillGridWithNSquares(n) {
    for (let i = 1; i <= n; i++) {
        const singleSquareClone = singleSquare.cloneNode(true);
        grid.appendChild(singleSquareClone);
    };
    squaresCount = grid.childNodes.length;
}

function recreateGrid(checkInput, hoverClass) {
    if (checkInput) {
        if (gridSizeInput.value == squaresCount ** (1/2)) return;
    }
    if (gridSizeInput.value > maxGridSize || 
        gridSizeInput.value < 1)
        return;
    grid.innerHTML = '';
    createGrid(gridSizeInput.value, hoverClass);
}

function addClass(node, classToAdd, classToRemove) {
    let alreadyModified = false;
    if (node.classList.contains(classToAdd)) return;
    if (classToAdd === 'random') {
        if (node.style['background-color'] !== '') alreadyModified = true;
        node.style['background-color'] = randomColor();
    } else {
        node.classList.add(`${classToAdd}`);
    }
    if (classToRemove === 'removeAll') {
        node.className = '';
        node.style['background-color'] = '';
        node.classList.add('square', 'initial');
    } else {
        if (node.classList.contains(classToRemove)) {
            node.classList.remove(`${classToRemove}`);
        }
    }
    if (squaresCount >= modifiedSquaresCount && !alreadyModified) {
            refreshStats();
        }
}

function addEventAndClass(node, event, classToAdd, classToRemove) {
    node.addEventListener(`${event}`, e => addClass(node, classToAdd, classToRemove));
}

function addEventAndClassForEach(nodeList, event, classToAdd, classToRemove) {
    nodeList.forEach(node => {
        addEventAndClass(node, event, classToAdd, classToRemove);
});
}

function addHoverToSquares(hoverClass) {
    let squaresClass = document.querySelectorAll('.square');
    addEventAndClassForEach(squaresClass, 'mouseenter', hoverClass, 'initial');
}

function randomColor() {
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    let randomRGB = `rgb(${red}, ${green}, ${blue})`;
    rainbowStats.textContent = randomRGB;
    return randomRGB;
}

function resetStats() {
    modifiedSquaresCount = 0;
    modifiedSquaresStat.textContent = '';
    percentModifiedStat.textContent = '';
    rainbowStats.textContent = '';
    congratulations.textContent = '';
    grid.classList.remove('expanding-shadow');
    logo.classList.remove('expanding-shadow-logo');
}

function refreshStats() {
    if (squaresCount === modifiedSquaresCount) return;
    modifiedSquaresCount++;
    let percentPainted = (Math.round((modifiedSquaresCount / squaresCount) * 10000) / 100)
    modifiedSquaresStat.textContent = 'Painted cells: ' + modifiedSquaresCount;
    percentModifiedStat.textContent = 'Percent cells painted of total: ' + percentPainted + '%';
    if (modifiedSquaresCount === squaresCount) {
        congratulations.textContent = 'Congratulations! All cells painted.';
        grid.classList.add('expanding-shadow');
        logo.classList.add('expanding-shadow-logo');
    }
}