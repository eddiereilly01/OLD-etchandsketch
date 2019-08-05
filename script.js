//Get elements
const container = document.querySelector(".container");
const clear = document.querySelector("#clear");
const resize = document.querySelector("#resize");
const randCol = document.querySelector("#random");
const fixedCol = document.querySelector("#fixed");
const eraserBtn = document.querySelector('#eraser');
const inputCol = document.querySelector('#colpicker');
const heading = document.querySelector("#head");

let _side = 16;
let _size = 256;
let root = document.documentElement;


//Buttons events
clear.addEventListener('click', clearGrid);
resize.addEventListener('click', promptNew);
randCol.addEventListener('click', colorRandom);
fixedCol.addEventListener('click', colorBlockFixed);
eraserBtn.addEventListener('click', eraser);
inputCol.addEventListener('change', inputColor);

root.style.setProperty('--shadcol', 'red');



function inputColor(){
    root.style.setProperty('--shadcol', inputCol.value);
}

function colorBlockFixed() {
    const blocks = document.querySelectorAll(".block");
    blocks.forEach((block) => {
      

    block.onmouseenter = () => block.style.background = inputCol.value;
  });
}


function colorRandom() {
    const blocks = document.querySelectorAll(".block");
    blocks.forEach(block=>{
        let r = Math.floor(Math.random()*255)
        let g = Math.floor(Math.random()*255)
        let b = Math.floor(Math.random()*255)

       
        block.removeEventListener('mouseenter',colorBlockFixed)
        isColorRandom = true;
        block.onmouseenter = () => block.style.background = `rgb(${r},${g},${b})`;
      })
  
}
function eraser() {
    const blocks = document.querySelectorAll(".block");
    blocks.forEach(block=>{
        block.removeEventListener('mouseenter',colorBlockFixed)

        block.onmouseenter = () => block.style.background = "white"
      })
  
}

function promptNew(){
    let gridSideSize = prompt("Enter size");

  while (gridSideSize < 1) {
    gridSideSize = prompt("Enter a size above 0");
  }
  
  let gridSize = gridSideSize ** 2;
  createNewGrid(gridSize, gridSideSize);
        

}
function removeGrid() {
    const existingGrid = document.querySelector(".grid");
    existingGrid.parentNode.removeChild(existingGrid);
  }

function createNewGrid(size, side) {
  removeGrid();
  createGrid(size, side);
}

function createGrid(size, side) {

  

  const grid = document.createElement("div");
  grid.classList.add("grid");
  container.appendChild(grid);
  grid.style.setProperty("--sideSize", side);

  for (let i = 0; i < size; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    grid.appendChild(block);
    block.addEventListener("click", colorBlockFixed);
  }
}

function clearGrid(){
    const blocks = document.querySelectorAll(".block");
    blocks.forEach((block) => {
    block.style.background = "white";
    });
}

createGrid(_size, _side);