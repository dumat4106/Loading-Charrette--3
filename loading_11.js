function setup() {
    createCanvas(500, 500).parent("canvas");
    background("white");
  }
  
  function draw() {
    fill("rgb(48, 113, 254)");
    noStroke();
    ellipse( mouseX, mouseY, 10, 10);
  }