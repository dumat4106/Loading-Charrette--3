let drawings = []; // Stores all drawn ellipses
let currentSize = 10;
let targetSize = 10;
let isDrawing = false;
let fillColor = color(48, 113, 254); // Default blue color
let minSize = 10;
let maxSize = 100;
let growthRate = 2;

function setup() {
  let canvas = createCanvas(500, 500);
  canvas.parent("canvas");
  background(255);
  
  // Clear button
  let clearButton = createButton('Clear Canvas');
  clearButton.position(10, height + 10);
  clearButton.mousePressed(clearCanvas);
  
  // Color buttons
  createColorButtons();
  
  // Size slider
  let sizeSlider = createSlider(5, 100, minSize, 1);
  sizeSlider.position(200, height + 40);
  sizeSlider.input(() => {
    minSize = sizeSlider.value();
    targetSize = minSize;
  });
}

function createColorButtons() {
  let colors = [
    color(255, 0, 0),    // Red
    color(0, 255, 0),    // Green
    color(0, 0, 255),    // Blue
    color(255, 255, 0),  // Yellow
    color(255),          // White
    color(0)             // Black
  ];
  
  for (let i = 0; i < colors.length; i++) {
    let btn = createButton(''); 
    btn.position(10 + i * 30, height + 40);
    btn.style('width', '25px');
    btn.style('height', '25px');
    btn.style('background-color', `rgb(${red(colors[i])}, ${green(colors[i])}, ${blue(colors[i])})`);
    btn.mousePressed(() => fillColor = colors[i]);
  }
}

function draw() {
  background(255); // Clear the canvas each frame
  
  // Draw all saved ellipses
  noStroke();
  for (let e of drawings) {
    fill(e.color);
    ellipse(e.x, e.y, e.size, e.size);
  }
  
  // Smooth size transition
  currentSize = lerp(currentSize, targetSize, 0.1);
  
  // Draw current ellipse if mouse is pressed
  if (isDrawing) {
    fill(fillColor);
    ellipse(mouseX, mouseY, currentSize, currentSize);
  }
}

function mousePressed() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    isDrawing = true;
    targetSize = minSize;
  }
}

function mouseDragged() {
  if (isDrawing) {
    // Grow the ellipse while dragging
    if (targetSize < maxSize) {
      targetSize += growthRate;
    }
    
    // Save the current ellipse to drawings array
    drawings.push({
      x: mouseX,
      y: mouseY,
      size: currentSize,
      color: color(fillColor) // Store a copy of the color
    });
  }
}

function mouseReleased() {
  if (isDrawing) {
    isDrawing = false;
    targetSize = minSize;
  }
}

function clearCanvas() {
  drawings = [];
  background(255);
}
