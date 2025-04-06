let row = 50;
let col = 50;

let stripWidth = 500 / col;
let rowWidth = 500 / row;

let grid = [];
let originalGrid = [];
let shuffledGrid = [];

function preload() {
    img = loadImage("ArtworkImages/Artwork_2.jpg");
  }
  
  function setup() {
    img.resize(500, 0);
    createCanvas(500, 500).parent("canvas");

    for (let i = 0; i < col; i++) {
        grid[i] = [];
        for (let j = 0; j < row; j++) {
            grid[i][j] = img.get(i * stripWidth, j * rowWidth, stripWidth, rowWidth);
        }
    }

    originalGrid = grid.map(row => row.map(cell => cell.get()));

    shuffledGrid = shuffle2DArray(grid);
    
  }
  
  function draw() {
      
    for (let i = 0; i < col; i++) {
        for (let j = 0; j < row; j++) {
            image(shuffledGrid[i][j], i * stripWidth, j * rowWidth);
        }
      }
  
  }

  function shuffle2DArray(arr) {

      let flatArray = [];
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
          flatArray.push(arr[i][j]);
        }
      }
    
      flatArray = shuffle(flatArray);
    
      let k = 0;
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
          arr[i][j] = flatArray[k++];
        }
      }

      return arr;
  }

  function mousePressed() {
    if (col > 6 && row > 6) {
      col -= 5;
      row -= 5;
      generateStrips();
    }
    else {
      col = 50;
      row = 50;
      stripWidth = 500 / col;
      rowWidth = 500 / row;
      shuffledGrid = originalGrid.map(row => row.map(cell => cell.get()));
    }
  }
  
  function generateStrips() {
  
      stripWidth = 500 / col;
      rowWidth = 500 / row;

      grid.length = 0;
    
      for (let i = 0; i < col; i++) {
        grid[i] = [];
        for (let j = 0; j < row; j++) {
            grid[i][j] = img.get(i * stripWidth, j * rowWidth, stripWidth, rowWidth);
        }
    }
    
      shuffledGrid = shuffle2DArray(grid);
    
    
  }
  