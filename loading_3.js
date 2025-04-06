let particles = [];

let state = "gather";
let scatterDuration = 50; 
let scatterTimer = 0;

function preload() {
    img = loadImage("ArtworkImages/Artwork_3.jpg");
}

function setup() {
    img.resize(500, 0);
    createCanvas(500, 500).parent("canvas");
    spawnParticles();
}

function draw() {
    for (let particle of particles) {
        particle.update();
        particle.draw();
    }

    if (state === "scatter") {
        scatterTimer++;
        if (scatterTimer > scatterDuration) {
          state = "gather";
        }
      }
}

function spawnParticles() {
    let spacing = 5;
    for (let i = 0; i < width; i += spacing) {
        for (let j = 0; j < height; j += spacing) {
            const color = img.get(i, j);
            particles.push(new Particle (i, j, color));
        }
    }
}

function mousePressed() {
    if (state === "gather") {
      scatter(); // scatter again
    }
  }

function scatter() {
    state = "scatter";
    scatterTimer = 0;
    for (let particle of particles) {
      let angle = random(TWO_PI);
      let speed = random(5, 10);
      particle.vel = createVector(cos(angle), sin(angle)).mult(speed);
    }
  }

class Particle {
    constructor(x, y, color) {
        this.origin = createVector(x, y);
        this.pos = this.origin.copy();
        this.vel = createVector(0,0);
        this.col = color;
    }

    update(){
        if (state === "scatter") {
            this.pos.add(this.vel);
            this.vel.mult(0.95);
          } else if (state === "gather") {
            let dir = p5.Vector.sub(this.origin, this.pos);
            this.vel.add(dir.mult(0.05));
            this.vel.mult(0.9);
            this.pos.add(this.vel);

            if (dir.mag() < 0.5 && this.vel.mag() < 0.5) {
                this.pos = this.origin.copy();
                this.vel.mult(0);
            }
          }
    }

    draw() {
        fill(this.col);
        noStroke();
        ellipse(this.pos.x, this.pos.y, 5);
    }
}