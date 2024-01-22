let cells = []
let ruleValue = 75;
let ruleSet;
let w = 1;
let y = 0;


function setup() {
  createCanvas(810, 810);
  ruleSet = ruleValue.toString(2);
  while (ruleSet.length < 8){
    ruleSet = "0" + ruleSet;
  }

  let total = width / w;
  for (let i = 0; i < total; i++){
    cells[i] = 0;
  }
  cells[floor(total/2)] = 1;
  background(255);
}



function draw(){


  for (let i = 0; i < cells.length; i++){
    let x = i * w;
    noStroke();
    fill(255 - cells[i] * 255);
    square(x, y, w);
  }

  y += w;

  let nextCells = [];
  // nextCells[0] = cells[0];
  // nextCells[cells.length - 1] = cells[cells.length - 1];
  let len = cells.length;
  for (let i = 0; i < len; i++){
  let left = cells[(i - 1) % len];
  let right =  cells[(i + 1) % len];
  let state = cells[i];
  let newState = calculateState(left, state, right)
  nextCells[i] = newState;
  }
  cells = nextCells;
}

function calculateState(left, state, right){

  let neighborhood = "" +left + state + right;
  let value = 7 - parseInt(neighborhood, 2);
  return parseInt(ruleSet[value]);



}