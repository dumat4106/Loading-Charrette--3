let img;
let fileInput;
let thresholdSlider, sizeSlider;
let ellipseSize = 5;
let brightnessThreshold = 100;

function setup() {
  createCanvas(500, 500).parent("canvas");
  
  // Create file input for image upload
  fileInput = createFileInput(handleFile);
  fileInput.position(350, height + 10);
  
  // Slider for adjusting the brightness threshold
  thresholdSlider = createSlider(0, 255, 100);
  thresholdSlider.position(350, height + 50);
  thresholdSlider.style('width', '200px');
  
  // Add description for brightness threshold slider
  let thresholdLabel = createDiv('Brightness Threshold');
  thresholdLabel.position(350, height + 35);
  thresholdLabel.style('font-size', '14px');
  
  // Slider for adjusting the ellipse size
  sizeSlider = createSlider(1, 20, 5);
  sizeSlider.position(350, height + 90);
  sizeSlider.style('width', '200px');

  let sizeLabel = createDiv('Ellipse Size');
  sizeLabel.position(350, height + 75);
  sizeLabel.style('font-size', '14px');
  
  // Clear button
  let clearButton = createButton('Clear Canvas');
  clearButton.position(350, height + 130);
  clearButton.mousePressed(clearCanvas);
}

function handleFile(file) {
  if (file.type === 'image') {
    img = loadImage(file.data, () => {
      image(img, 0, 0, width, height); // Draw image on canvas
      img.loadPixels(); // Load the pixel data to work with
      traceImage(img);
    });
  } else {
    alert("Please upload an image!");
  }
}

function traceImage(img) {
  noFill();
  
  // Get updated threshold and ellipse size values from sliders
  brightnessThreshold = thresholdSlider.value();
  ellipseSize = sizeSlider.value();
  
  stroke(0, 255, 0); // Green color for tracing
  
  // Traverse all the pixels of the image
  for (let y = 0; y < img.height; y += 5) {
    for (let x = 0; x < img.width; x += 5) {
      let pix = img.get(x, y); // Get the color of the pixel at (x, y)
      let r = red(pix);
      let g = green(pix);
      let b = blue(pix);

      // Convert pixel to grayscale value (average of RGB values)
      let gray = (r + g + b) / 3;
      
      // Apply the brightness threshold
      if (gray > brightnessThreshold) {
        ellipse(x, y, ellipseSize, ellipseSize); // Draw ellipse at each detected point
      }
    }
  }
}

function clearCanvas() {
  clear(); // Clear the entire canvas
  image(img, 0, 0, width, height); // Redraw the uploaded image
}



