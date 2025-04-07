
let particles = [];
let img;

function preload() {
    img = loadImage("ArtworkImages/Artwork_8.jpg");
}

function setup() {
    createCanvas(500, 500).parent("canvas");
    img.resize(500, 500);
    img.loadPixels();

    spawnParticles();
}

function draw() {
    background("white");

    for (let particle of particles) {
        particle.draw();
    }
}

function spawnParticles() {
    let spacing = 7.5;
    for (let i = 0; i < width; i += spacing) {
        for (let j = 0; j < height; j += spacing) {
            let pixel = img.get(i, j);
            let c = color(pixel[0], pixel[1], pixel[2], 50);
            particles.push(new Particle(i, j, c));
        }
    }
}

function mouseMoved() {
    for (let particle of particles) {
        
        if (particle.checkHover()) {
            particle.update();
        }
    }
}

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.col = color;
        this.size = 7.5;
        this.isHovered = false; 
    }

    update() {
        this.col.setAlpha(255);
    }

    
    checkHover() {
        let d = dist(mouseX, mouseY, this.x, this.y);
        this.isHovered = d < this.size * 2; // Store state
        return this.isHovered;
    }

    draw() {
        fill(this.col);
        noStroke();
        ellipse(this.x, this.y, this.size);
    }
}