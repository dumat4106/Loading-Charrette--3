

let particles = [];
let img;
let particlesToAdd = []; // Temporary holding for new particles
let particlesToRemove = []; // Temporary holding for particles to remove

function preload() {
    img = loadImage("ArtworkImages/Artwork_4.jpg");
}

function setup() {
    createCanvas(500, 500);
    img.resize(500, 500);
    img.loadPixels();
    particles.push(new Particle(width/2, height/2, img.get(width/2, height/2), width));
}

function draw() {
    background("white");
    
    // Clear temporary arrays
    particlesToAdd = [];
    particlesToRemove = [];
    
    // Process all particles
    for (let particle of particles) {
        particle.draw();
        if (particle.isHovered() && !particle.hasSplit) {
            particle.update();
        }
    }
    
    // Apply changes AFTER processing all particles
    particles = particles.concat(particlesToAdd);
    particles = particles.filter(p => !particlesToRemove.includes(p));
}

class Particle {
    constructor(x, y, color, size) {
        this.x = x;
        this.y = y;
        this.col = color;
        this.size = size;
        this.hasSplit = false;
    }

    update() {
        if (!this.hasSplit) {
            const offset = this.size / 4;
            const newSize = this.size / 2;
            
            // Add new particles to temporary array
            particlesToAdd.push(
                new Particle(this.x - offset, this.y - offset, img.get(this.x - offset, this.y - offset), newSize),
                new Particle(this.x + offset, this.y - offset, img.get(this.x + offset, this.y - offset), newSize),
                new Particle(this.x + offset, this.y + offset, img.get(this.x + offset, this.y + offset), newSize),
                new Particle(this.x - offset, this.y + offset, img.get(this.x - offset, this.y + offset), newSize)
            );
            
            this.hasSplit = true;
            particlesToRemove.push(this); // Mark this particle for removal
        }
    }

    isHovered() {
        let d = dist(mouseX, mouseY, this.x, this.y);
        return d < this.size / 2;
    }

    draw() {
        fill(this.col);
        noStroke();
        ellipse(this.x, this.y, this.size);
    }
}