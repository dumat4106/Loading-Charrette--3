let img; // To store the image
let widthVal = 10;
let heightVal = 10;
let targetWidth = 10;
let targetHeight = 10;

function setup() {
  createCanvas(500, 500).parent("canvas");
  background(255);

  // Get reference to existing HTML button
  const saveButton = select('#button');
  
  // Attach save function to button
  saveButton.mousePressed(saveImage);

  // Create a file input to upload an image
  let fileInput = createFileInput(handleFile);
  fileInput.position(10, 10);

  frameRate(60);
}

function draw() {
  widthVal = lerp(widthVal, targetWidth, 0.1);
  heightVal = lerp(heightVal, targetHeight, 0.1);
  
  fill("black");
  noStroke();
  ellipse(mouseX, mouseY, widthVal, heightVal);
  
  if (img) {
    image(img, 0, 0, width, height); // Display the uploaded image
  }
}

// Function to handle the uploaded image
function handleFile(file) {
  if (file.type === 'image') {
    img = loadImage(file.data); // Load the image into p5.js
  } else {
    console.log('Not an image file');
  }
}

function saveImage() {
  saveCanvas('myDrawing', 'png');
}

function sendToServer(imageData) {
  // Send the image to your backend (Node.js) for Gemini API interaction
  fetch('/upload-image', {
    method: 'POST',
    body: JSON.stringify({ image: imageData }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log('Image processing response:', data);
  })
  .catch(error => console.error('Error:', error));
}

// Convert image to Base64 before sending
function convertImageToBase64(image) {
  let canvas = createCanvas(image.width, image.height);
  image(image, 0, 0);
  let base64 = canvas.elt.toDataURL(); // Convert canvas to Base64
  sendToServer(base64);  // Send to server
}