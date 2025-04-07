let row = 75;
let col = 75;
let stripWidth, rowWidth;
let grid = [];
let drawSpeed = 6;
let currentIndex = 0;
let shuffledIndices = []; 
let img;

function preload() {
    img = loadImage("ArtworkImages/Artwork_6.jpg");
}

function setup() {
    createCanvas(500, 500).parent("canvas");
    img.resize(500, 500);
    img.loadPixels();
    
    stripWidth = width / col;
    rowWidth = height / row;
    
    for (let i = 0; i < col; i++) {
        grid[i] = [];
        for (let j = 0; j < row; j++) {
            grid[i][j] = img.get(i * stripWidth, j * rowWidth, stripWidth, rowWidth);
        }
    }

    let allIndices = [];
    for (let i = 0; i < col * row; i++) {
        allIndices.push(i);
    }
    shuffledIndices = shuffle(allIndices); 
    background("white");
    frameRate(60);
}

function draw() {
    for (let n = 0; n < drawSpeed; n++) {
        if (currentIndex < col * row) {
           
            let linearIndex = shuffledIndices[currentIndex];
            let i = floor(linearIndex / row);
            let j = linearIndex % row;
            
            image(grid[i][j], i * stripWidth, j * rowWidth, stripWidth, rowWidth);
            currentIndex++;
        } else {
            noLoop();
        }
    }
}