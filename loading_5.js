let row = 75;
let col = 75;

let stripWidth = 500 / col;
let rowWidth = 500 / row;

let grid = [];
let originalGrid = [];
let shuffledGrid = [];

let drawSpeed = 7;
let currentIndex = 0;

function preload() {
    img = loadImage("ArtworkImages/Artwork_5.jpg");
  }
  
  function setup() {
    img.resize(500, 500);
    createCanvas(500, 500).parent("canvas");
    frameRate(60);

    for (let i = 0; i < col; i++) {
        grid[i] = [];
        for (let j = 0; j < row; j++) {
            grid[i][j] = img.get(i * stripWidth, j * rowWidth, stripWidth, rowWidth);
        }
    }

  }
  
  function draw() {

    
    for (let n = 0; n < drawSpeed; n++) {
        if (currentIndex < col * row) {
            let i = floor(currentIndex / row);
            let j = currentIndex % row;
            image(grid[i][j], i * stripWidth, j * rowWidth, stripWidth, rowWidth);
            currentIndex++;
        } else {
            noLoop(); 
        }
    }
}
  

  