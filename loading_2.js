let row = 100;
let col = 100;

let stripWidth = 500 / col;
let rowWidth = 500 / row;

let grid = [];

function preload() {
    img = loadImage("ArtworkImages/Artwork_2.jpg");
  }
  
  function setup() {
    img.resize(500, 0);
    createCanvas(500, 500).parent("canvas");

    for (let i = 0; i < col; i++) {
        grid[i] = [];
        for (let j = 0; j < row; j++) {
            grid[i][j] = img.get(i * col, i * row, stripWidth, rowWidth);
        }
    }
    
  }
  
  function draw() {
    for (let i = 0; i < col; i++) {
        for (let j = 0; j < row; j++) {
            image(grid[i][j], i * stripWidth, j * rowWidth);
        }
    }
    
  }