let col = 20;
let stripWidth = 500 / col;

function preload() {
  img = loadImage("ArtworkImages/Artwork_1.jpg");
}

function setup() {
  img.resize(500, 0);
  createCanvas(500, 500).parent("canvas");
}

function draw() {
  for (let i =0; i < col; i++)
  image(img, 0, 0);
}


  