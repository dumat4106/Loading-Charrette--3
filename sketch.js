let col = 20;
let stripWidth = 500 / col;
let strips = [];
let shuffledStrips = [];

function preload() {
  img = loadImage("ArtworkImages/Artwork_1.jpg");
}

function setup() {
  img.resize(500, 0);
  createCanvas(500, 500).parent("canvas");
  for (let i =0; i < col; i++) {
    strips[i] = img.get(i * col, 0, stripWidth, height);
  }
  shuffledStrips = shuffle(strips);

}

function draw() {
  for (let i=0; i < col; i++) {
    image(shuffledStrips[i], i * stripWidth, 0);
  }
  
}

function mousePressed() {
  if (col > 2) {
    col -= 2;
    generateStrips();
  }
  else {
    shuffledStrips = strips;
  }
}

function generateStrips() {

    stripWidth = 500 / col;
    strips.length = 0;
  
    for (let i = 0; i < col; i++) {
      strips[i] = img.get(i * stripWidth, 0, stripWidth, height);
    }
  
    shuffledStrips = shuffle(strips.slice());
  
  
}






  