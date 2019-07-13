import DNA from "./DNA";
/**
   * 
   * Creates a rocket as an object which follows a set of physics parting from it's DNA.
   * 
   * @param {array} dna 
   */
function Rocket(dna) {
    this.pos = p.createVector(width / 2, height);
    this.vel = p.createVector();
    this.acc = p.createVector();
    this.completed = false;
    this.crashed = false;

    if (dna) {
        this.dna = dna;
    } else {
        this.dna = new DNA();
    }
    this.fitness = 0;

    // Applies a force (vector) to the acceleration of the rocket.
    this.applyForce = function (force) {
        this.acc.add(force);
    }

    // Calculates the fitness of the rocket from it's distance to the target.
    this.calcFitness = function () {
        let d = p.dist(this.pos.x, this.pos.y, target.x, target.y);

        this.fitness = p.map(d, 0, width, width, 0);
        if (this.completed) {
            this.fitness *= 10;
        }
        if (this.crashed) {
            this.fitness /= 10;
        }
    }

    // Updates the state of the rocket ((applying forces => (pos, vel, acc)) && (crashed || completed))
    this.update = function () {
        let d = p.dist(this.pos.x, this.pos.y, target.x, target.y);
        if (d < 10) {
            this.completed = true;
            this.pos = target.copy();
        }

        if (this.pos.x > rx && this.pos.x < rx + rw && this.pos.y > ry && this.pos.y < ry + rh) {
            this.crashed = true;
        }

        if (this.pos.x > width || this.pos.x < 0) {
            this.crashed = true;
        }

        if (this.pos.y > height || this.pos.y < 0) {
            this.crashed = true;
        }

        this.applyForce(this.dna.genes[count]);

        if (!this.completed && !this.crashed) {
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);
            this.vel.limit(4);
        }
    }

    // Creates the rocket drawing.
    this.show = function () {
        p.push();
        p.noStroke();
        p.fill(255, 150);
        p.translate(this.pos.x, this.pos.y);
        p.rotate(this.vel.heading())

        p.beginShape();
        p.vertex(0, 0);
        p.vertex(15, 0);
        p.vertex(20, 3);
        p.vertex(15, 6);
        p.vertex(0, 6);
        p.vertex(-3, 7);
        p.vertex(-2, 3);
        p.vertex(-3, -1);
        p.endShape();

        p.pop();
    }
}

export default Rocket;