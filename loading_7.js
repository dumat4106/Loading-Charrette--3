
let particles = [];
let img;

function preload() {
    img = loadImage("ArtworkImages/Artwork_7.jpg");
}

function setup() {
    createCanvas(500, 500).parent("canvas");
    img.resize(500, 500);
    img.loadPixels();
    spawnParticles();
    background("white");
}

function draw() {
    background("white");

    for (let particle of particles) {
        particle.update();
        particle.draw();
    }
}

function spawnParticles() {
    let spacing = 7.5;
    for (let i = 0; i < width; i += spacing) {
        for (let j = 0; j < height; j += spacing) {
            const color = img.get(i, j);
            particles.push(new Particle(i, j, color));
        }
    }
}

function mouseMoved() {
    for (let particle of particles) {
        if (particle.isHovered()) {
            particle.scatter();
        }
    }
}

class Particle {
    constructor(x, y, color) {
        this.origin = createVector(x, y);
        this.pos = this.origin.copy();
        this.vel = createVector(0, 0);
        this.col = color;
        this.size = 7.5;
        this.isScattering = false;
        this.scatterTimer = 0;
        this.scatterDuration = 30;
    }

    scatter() {
        if (!this.isScattering) {
            let angle = random(TWO_PI);
            let speed = random(3, 6);
            this.vel = createVector(cos(angle), sin(angle)).mult(speed);
            this.isScattering = true;
            this.scatterTimer = 0;
        }
    }

    update() {
        if (this.isScattering) {
            this.pos.add(this.vel);
            this.vel.mult(0.95);
            this.scatterTimer++;
            if (this.scatterTimer > this.scatterDuration) {
                this.isScattering = false;
            }
        } else {
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

    isHovered() {
        let d = dist(mouseX, mouseY, this.pos.x, this.pos.y);
        return d < 15; 
    }

    draw() {
        fill(this.col);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.size);
    }
}