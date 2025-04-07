let drawing = []; // To store the points of the line drawn by the user
let drawingsHistory = []; // To store all the ellipses along the drawn paths
let isDrawing = false; // To track whether the user is currently drawing
let prevPosition = null; // Previous mouse position for speed calculation
let fillColor = color(255, 0, 0); // Color of the ellipses (can change dynamically)

function setup() {
  createCanvas(500, 500).parent("canvas");
  let clearButton = createButton('Clear Canvas');
  clearButton.position(800, 600);
  clearButton.mousePressed(clearCanvas);
}

function draw() {
  background(255, 255, 255, 10); // Slight fade effect with transparency
  
  // Draw the stored ellipses from the history
  noFill();
  for (let i = 0; i < drawingsHistory.length; i++) {
    let path = drawingsHistory[i];
    for (let j = 0; j < path.length; j++) {
      let p = path[j];
      fill("blue");
      noStroke();
      ellipse(p.x, p.y, p.size, p.size); // Draw an ellipse at each point along the path
    }
  }

  // Draw ellipses while the user is drawing
  if (isDrawing) {
    let currentPosition = createVector(mouseX, mouseY);
    let speed = prevPosition ? dist(currentPosition.x, currentPosition.y, prevPosition.x, prevPosition.y) : 0;
    let ellipseSize = map(speed, 0, 50, 5, 30); // Change ellipse size based on speed
    
    drawing.push({ x: currentPosition.x, y: currentPosition.y, size: ellipseSize });
    fill("blue");
      noStroke();
    ellipse(currentPosition.x, currentPosition.y, ellipseSize, ellipseSize); // Draw ellipse at current position
    
    prevPosition = currentPosition; // Update the previous position for the next frame
  }
}

function mousePressed() {
  // Start drawing when the mouse is pressed
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    isDrawing = true;
    drawing = []; 
    prevPosition = createVector(mouseX, mouseY); // Set initial position
  }
}

function mouseReleased() {
  // Stop drawing when the mouse is released
  if (isDrawing) {
    isDrawing = false;
    
    // Save the current drawing to the history after the user releases the mouse
    if (drawing.length > 0) {
      drawingsHistory.push(drawing.slice()); // Add the current path to the history
    }
  }
}

function clearCanvas() {
  drawingsHistory = []; // Clear the drawing history
  drawing = []; // Clear the current drawing
  prevPosition = null; // Reset the previous position
  background(255); // Reset the canvas to white
}

