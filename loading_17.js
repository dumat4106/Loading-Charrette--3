let drawing = []; // To store the points of the line drawn by the user
let drawingsHistory = []; // To store all drawn lines for redrawing
let isDrawing = false; // To track whether the user is currently drawing

function setup() {
  createCanvas(500, 500).parent('canvas');
  
  let clearButton = createButton('Clear Canvas');
  clearButton.position(800, 600);
  clearButton.mousePressed(clearCanvas);
}

function draw() {
  background(255); // Set the background to white (clear the canvas content)
  
  // Draw the outline around the canvas (rectangle)
  drawCanvasOutline();
  
  // Draw the stored lines from the history
  stroke("blue");
  strokeWeight(2); 
  noFill();
  for (let i = 0; i < drawingsHistory.length; i++) {
    let linePoints = drawingsHistory[i];
    beginShape();
    for (let j = 0; j < linePoints.length; j++) {
      vertex(linePoints[j].x, linePoints[j].y);
    }
    endShape();
  }
  
  // Draw the current line if the user is drawing
  if (isDrawing) {
    drawing.push(createVector(mouseX, mouseY)); // Add current mouse position to the line
    beginShape();
    for (let i = 0; i < drawing.length; i++) {
      vertex(drawing[i].x, drawing[i].y);
    }
    endShape();
  }
}

// Function to draw the canvas outline
function drawCanvasOutline() {
  stroke(0); // Outline color (black)
  strokeWeight(5); // Outline thickness
  noFill();
  rect(0, 0, width, height); // Draw the rectangle around the entire canvas
}

function mousePressed() {
  // Start drawing when the mouse is pressed
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    isDrawing = true;
    drawing = []; 
    drawing.push(createVector(mouseX, mouseY)); // Add the first point immediately
  }
}

function mouseReleased() {
  // Stop drawing when the mouse is released
  if (isDrawing) {
    isDrawing = false;
    
    // Save the current drawing to the history after the user releases the mouse
    if (drawing.length > 0) {
      drawingsHistory.push(drawing.slice()); // Add the current line to the history
    }
  }
}

function clearCanvas() {
  drawingsHistory = []; // Clear the drawing history
  drawing = []; // Clear the current drawing
  background(255); // Reset the canvas to white
}
