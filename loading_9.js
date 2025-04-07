let img;
let pieces = [];
let pieceSize = 100;
let selectedPiece = null;
let offsetX, offsetY;

function preload() {
  img = loadImage("ArtworkImages/Artwork_9.jpg");
}

function setup() {
  createCanvas(500, 500).parent("canvas");;
  img.resize(500, 500);
  createPuzzle();
}

function draw() {
  background(220);
  
  for (let piece of pieces) {
    piece.display();
  }
  
  if (selectedPiece) {
    noFill();
    stroke(255, 0, 0);
    strokeWeight(2);
    rect(selectedPiece.x, selectedPiece.y, pieceSize, pieceSize);
  }
}

function createPuzzle() {
    pieces = [];
    let cols = floor(img.width / pieceSize);
    let rows = floor(img.height / pieceSize);
  
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        let pieceImg = createImage(pieceSize, pieceSize);
        pieceImg.copy(img, x * pieceSize, y * pieceSize, pieceSize, pieceSize, 0, 0, pieceSize, pieceSize);
        
        let piece = {
          img: pieceImg,
          correctX: x * pieceSize,
          correctY: y * pieceSize,
          x: random(width - pieceSize),
          y: random(height - pieceSize),
          width: pieceSize,
          height: pieceSize,
          isCorrect: false,
          display: function () {
            if (!this.isCorrect) {
              image(this.img, this.x, this.y);
            } else {
              image(this.img, this.x, this.y);
              noFill();
              stroke(0, 255, 0);
              strokeWeight(3);
              rect(this.x, this.y, this.width, this.height);
            }
          }
        };
        
        pieces.push(piece);
      }
    }
  
    pieces = shuffle(pieces);
  }
  

function mousePressed() {
  
  for (let i = pieces.length - 1; i >= 0; i--) {
    let piece = pieces[i];
    if (!piece.isCorrect && 
        mouseX > piece.x && mouseX < piece.x + piece.width &&
        mouseY > piece.y && mouseY < piece.y + piece.height) {
      selectedPiece = piece;
      offsetX = mouseX - piece.x;
      offsetY = mouseY - piece.y;
      
      pieces.splice(i, 1);
      pieces.push(piece);
      break;
    }
  }
}

function mouseDragged() {
  if (selectedPiece) {
    selectedPiece.x = mouseX - offsetX;
    selectedPiece.y = mouseY - offsetY;
  }
}

function mouseReleased() {
  if (selectedPiece) {
    // Check if piece is in correct position
    let d = dist(selectedPiece.x, selectedPiece.y, 
                selectedPiece.correctX, selectedPiece.correctY);
    if (d < 20) { // Snap threshold
      selectedPiece.x = selectedPiece.correctX;
      selectedPiece.y = selectedPiece.correctY;
      selectedPiece.isCorrect = true;
    }
    selectedPiece = null;
  }
}

// Puzzle piece display method
function displayPiece(piece) {
  if (!piece.isCorrect) {
    image(piece.img, piece.x, piece.y);
  } else {
    image(piece.img, piece.x, piece.y);
    // Draw green border when correct
    noFill();
    stroke(0, 255, 0);
    strokeWeight(3);
    rect(piece.x, piece.y, piece.width, piece.height);
  }
}

// Add display method to all pieces
pieces.forEach(piece => {
  piece.display = function() { displayPiece(this); };
});