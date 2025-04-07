let widthVal = 10;
let heightVal = 10;
let targetWidth = 10;
let targetHeight = 10;

function setup() {
  createCanvas(500, 500).parent("canvas");
  background("white");
}

function draw() {
  
  widthVal = lerp(widthVal, targetWidth, 0.1);
  heightVal = lerp(heightVal, targetHeight, 0.1);

  fill("rgb(48, 113, 254)");
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