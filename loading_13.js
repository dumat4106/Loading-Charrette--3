let widthVal = 10;
let heightVal = 10;
let targetWidth = 10;
let targetHeight = 10;


function preload() {
    img = loadImage("ArtworkImages/Artwork_13.jpg");
}

function setup() {
  createCanvas(500, 500).parent("canvas");
  background("white");

  maskLayer = createGraphics(width, height);
  maskLayer.background(255); 
  maskLayer.noStroke();
}

function draw() {
  
  widthVal = lerp(widthVal, targetWidth, 0.1);
  heightVal = lerp(heightVal, targetHeight, 0.1);

  // Display the image in the background
  image(img, 0, 0);

  // Erase using transparent ellipses on the mask layer
  if (mouseIsPressed) {
    maskLayer.erase(); // Switch to erase mode (draws transparency)
    maskLayer.ellipse(mouseX, mouseY, widthVal, heightVal);
    maskLayer.noErase(); // Reset erase mode
  }

  // Draw the mask on top (parts erased will show the image beneath)
  image(maskLayer, 0, 0);
}



function mouseDragged() {
  targetWidth += 2;
  targetHeight += 2;
}

function mouseReleased() {
  
  targetWidth = 10;
  targetHeight = 10;
}