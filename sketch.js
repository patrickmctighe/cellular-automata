
let sketch = function(p) {

let cells = []
let ruleValue = 26 ;
let ruleSet;
let w = 5;
let y = 0;
let lastColor;
let colorCount = 0;
let colorToggle = false;


p.resetSketch = function(newRuleValue, newW, newColorToggle) {
  cells = [];
  y = 0;
  colorCount = 0;
  ruleValue = newRuleValue !== undefined ? parseInt(newRuleValue) : 110;
  w = newW !== undefined ? parseInt(newW) : 5;
  colorToggle = newColorToggle !== undefined ? newColorToggle : false;
  ruleSet = (ruleValue >>> 0).toString(2).padStart(8, '0');
  while (ruleSet.length < 8){
    ruleSet = "0" + ruleSet;
  }

  let total = Math.floor(p.width / w);
  for (let i = 0; i < total; i++){
    cells[i] = 0;
  }
  cells[p.floor(total/2)] = 1;
  p.background(0);
}
p.setup = function() {
  p.createCanvas(p.windowWidth, p.windowHeight);
 
  p.resetSketch(ruleValue, w, colorToggle);
}

p.windowResized = function() {
  p.resizeCanvas(p.windowWidth, p.windowHeight);
  p.resetSketch();
}

p.draw = function(){



  for (let i = 0; i < cells.length; i++){
    let x = i * w;
   
    p.noStroke();
    if (cells[i] == 0) {
      p.fill(0);
      colorCount = 0;
    } else {
      if (colorToggle) {
        if (colorCount < 1) {
          lastColor = [p.random(255), p.random(255), p.random(255)]; 
          colorCount++;
        }
        p.fill(...lastColor);
      } else {
        p.fill(255);
      }
    }
    p.square(x, y, w);
  }

  y += w;

  let nextCells = [];

  let len = cells.length;
  for (let i = 0; i < len; i++){
    let left = cells[((i - 1) + len) % len];
  let right =  cells[(i + 1) % len];
  let state = cells[i];
  let newState = calculateState(left, state, right)
  nextCells[i] = newState;
  }
  cells = nextCells;
}

function calculateState(left, state, right){

  let neighborhood = "" +left + state + right;
  let value =  parseInt(neighborhood, 2);
  return parseInt(ruleSet[7 - value]);



}}

let myp5 = new p5(sketch);

window.onload = function() {
  document.getElementById('ruleForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    let newRuleValue = document.getElementById('ruleValue').value;
    let newW = document.getElementById('w').value;
    let newColorToggle = document.getElementById('colorToggle').checked;
    myp5.resetSketch(newRuleValue, newW, newColorToggle); 
    console.log(newRuleValue, newW, newColorToggle);
  });
}