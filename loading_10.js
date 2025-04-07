let img, originalImg;
let sunsetImg;
let progress = 0;

function preload() {
  img = loadImage("ArtworkImages/Artwork_10.jpg");
}

function setup() {
  createCanvas(500, 500).parent("canvas");
  img.resize(500, 500);
  originalImg = img.get(); // Store untouched original
  sunsetImg = createImage(img.width, img.height);
  sunsetImg.copy(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);
  frameRate(100);
}

function draw() {
  background(0);
  
  if (progress < 1) {
    applySunsetEffect(progress);
    progress += 0.01;
  }

  image(sunsetImg, 0, 0);
}

function applySunsetEffect(progress) {
    originalImg.loadPixels();
    sunsetImg.loadPixels();
  
    for (let y = 0; y < originalImg.height; y++) {
      for (let x = 0; x < originalImg.width; x++) {
        let index = (x + y * originalImg.width) * 4;
  
        let r = originalImg.pixels[index];
        let g = originalImg.pixels[index + 1];
        let b = originalImg.pixels[index + 2];
  
        // Temporarily switch to HSB
        colorMode(RGB);
        let origColor = color(r, g, b);
        colorMode(HSB, 360, 100, 100);
  
        let h = hue(origColor);
        let s = saturation(origColor);
        let bri = brightness(origColor);
  
        let targetH = (h + 40) % 360;
        let targetS = min(s * 1.5, 100);
        let targetB = bri * 0.7;
  
        let newH = lerp(h, targetH, progress);
        let newS = lerp(s, targetS, progress);
        let newB = lerp(bri, targetB, progress);
  
        let newColor = color(newH, newS, newB);
        
        // Convert back to RGB before storing
        colorMode(RGB);
        sunsetImg.pixels[index]     = red(newColor);
        sunsetImg.pixels[index + 1] = green(newColor);
        sunsetImg.pixels[index + 2] = blue(newColor);
        sunsetImg.pixels[index + 3] = 255;
      }
    }
  
    sunsetImg.updatePixels();
  }
  