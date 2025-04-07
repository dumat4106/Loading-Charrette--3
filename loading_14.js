let widthVal = 10;
let heightVal = 10;
let targetWidth = 10;
let targetHeight = 10;

let img, brushTexture;
let maskLayer;

function preload() {
  brushTexture = loadImage("ArtworkImages/Artwork_14.png");  
}

function setup() {
  createCanvas(500, 500).parent("canvas");
  img = createImage(width, height);  
  maskLayer = createGraphics(width, height);  
  maskLayer.background(255);  
}

function draw() {
  background(255);

  widthVal = lerp(widthVal, targetWidth, 0.1);
  heightVal = lerp(heightVal, targetHeight, 0.1);

  image(maskLayer, 0, 0);

  if (mouseIsPressed) {
    maskLayer.erase(); 
    
    maskLayer.image(brushTexture, mouseX - widthVal / 2, mouseY - heightVal / 2, widthVal, heightVal);

    maskLayer.noErase(); 


  image(img, 0, 0);
}
}

function mouseDragged() {
  targetWidth += 2;
  targetHeight += 2;
}

function mouseReleased() {
  targetWidth = 10;
  targetHeight = 10;
}
