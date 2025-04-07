let widthVal = 10;
let heightVal = 10;
let targetWidth = 10;
let targetHeight = 10;
let fillColor = color(48, 113, 254); // Default blue color

function setup() {
  createCanvas(500, 500).parent("canvas");
  background("white");

  // Create color buttons
  createColorButtons();
}

function draw() {
  widthVal = lerp(widthVal, targetWidth, 0.1);
  heightVal = lerp(heightVal, targetHeight, 0.1);

  fill(fillColor);  // Set the current fill color
  noStroke();
  ellipse(mouseX, mouseY, widthVal, heightVal);
}

function mouseDragged() {
  targetWidth += 2;
  targetHeight += 2;
}

function mouseReleased() {
  targetWidth = 10;
  targetHeight = 10;
}

// Create color buttons
function createColorButtons() {
  let colors = [
    color(255, 0, 0),    // Red
    color(0, 255, 0),    // Green
    color(0, 0, 255),    // Blue
    color(255, 255, 0),  // Yellow
    color(255),          // White
    color(0)             // Black
  ];

  let colorNames = ['Red', 'Green', 'Blue', 'Yellow', 'White', 'Black'];

  for (let i = 0; i < colors.length; i++) {
    let btn = createButton(colorNames[i]);
    btn.position(10 + i * 60, height + 10);
    btn.mousePressed(() => fillColor = colors[i]);
  }
}
