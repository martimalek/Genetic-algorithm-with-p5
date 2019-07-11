import p5 from "p5";

const sketch = p => {
  let rocket;
  let population;
  let lifespan = 300;
  let count = 0;
  let lifeP;
  let target;
  let maxForce = 0.2;

  let rx = 100;
  let ry = 150;
  let rw = 200;
  let rh = 10;
  let width = p.windowWidth;

  p.setup = () => {
    console.log(p)
    p.createCanvas(400, 300);
    // rocket = new Rocket();
    // population = new Population();
    // lifeP = p.createP();
    target = p.createVector(width / 2, 50);
  }

  p.draw = () => {
    p.background(0);
    // population.run();
    // lifeP.html(count);

    // count++;
    // if (count == lifespan) {
    //   population.evaluate();
    //   population.selection();
    //   background(0);
    //   count = 0;
    // }

    p.fill(255);
    p.rect(100, 150, 200, 10);

    p.ellipse(target.x, target.y, 16, 16);
    p.fill(255, 0, 0);
    p.ellipse(target.x, target.y, 8, 8);
  }

  // /**
  //  * Creates a population (array) of rockets.
  //  */
  // function Population() {
  //   this.rockets = [];
  //   this.popsize = 25;
  //   this.matingPool = [];

  //   for (let i = 0; i < this.popsize; i++) {
  //     this.rockets[i] = new Rocket();
  //   }

  //   // Calculates the fitness of the rockets and creates a matingPool with them according to their fitness. 
  //   // As more fitness has a rocket more times it will be pushed to the matingPool.
  //   this.evaluate = function () {
  //     let maxfit = 0;
  //     for (let i = 0; i < this.popsize; i++) {
  //       this.rockets[i].calcFitness();
  //       if (this.rockets[i].fitness > maxfit) {
  //         maxfit = this.rockets[i].fitness;
  //       }
  //     }

  //     for (let i = 0; i < this.popsize; i++) {
  //       this.rockets[i].fitness /= maxfit;
  //     }

  //     this.matingPool = [];
  //     for (let i = 0; i < this.popsize; i++) {
  //       let n = this.rockets[i].fitness * 100;
  //       for (let j = 0; j < n; j++) {
  //         this.matingPool.push(this.rockets[i]);
  //       }
  //     }
  //   }

  //   // Creates a new array of rockets from making crossovers between the ones in the matingPool.
  //   // Establishes the new rockets as the next generation of rockets.
  //   this.selection = function () {
  //     let newRockets = [];

  //     for (let i = 0; i < this.rockets.length; i++) {
  //       let parentA = random(this.matingPool).dna;
  //       let parentB = random(this.matingPool).dna;
  //       let child = parentA.crossover(parentB);
  //       child.mutation();

  //       newRockets[i] = new Rocket(child);
  //     }
  //     this.rockets = newRockets;
  //   }

  //   // Updates the rockets while drawing them.
  //   this.run = function () {
  //     for (let i = 0; i < this.popsize; i++) {
  //       this.rockets[i].update();
  //       this.rockets[i].show();
  //     }
  //   }
  // }

  // /**
  //  * 
  //  * Creates the DNA (array of genes (vectors)) when no genes are passed. If genes are passed, this are used.
  //  * 
  //  * @param {array} genes
  //  */
  // function DNA(genes) {
  //   if (genes) {
  //     this.genes = genes;
  //   } else {
  //     this.genes = [];

  //     // Establishes the genes.
  //     for (let i = 0; i < lifespan; i++) {
  //       this.genes[i] = p5.Vector.random2D();
  //       this.genes[i].setMag(maxForce);
  //     }
  //   }

  //   // Creates a new chain of DNA from two parent's DNAs.
  //   this.crossover = function (partner) {
  //     let newGenes = [];
  //     let mid = floor(random(this.genes.length));
  //     for (let i = 0; i < this.genes.length; i++) {
  //       if (i > mid) {
  //         newGenes[i] = this.genes[i];
  //       } else {
  //         newGenes[i] = partner.genes[i];
  //       }
  //     }
  //     return new DNA(newGenes);
  //   }

  //   // Establishes the possibility of a mutation in a chain of DNA.
  //   this.mutation = function () {
  //     for (let i = 0; i < this.genes.length; i++) {
  //       if (random(1) < 0.01) {
  //         this.genes[i] = p5.Vector.random2D();
  //         this.genes[i].setMag(maxForce);
  //       }
  //     }
  //   }
  // }

  // /**
  //  * 
  //  * Creates a rocket as an object which follows a set of physics parting from it's DNA.
  //  * 
  //  * @param {array} dna 
  //  */
  // function Rocket(dna) {
  //   this.pos = p.createVector(width / 2, height);
  //   this.vel = p.createVector();
  //   this.acc = p.createVector();
  //   this.completed = false;
  //   this.crashed = false;

  //   if (dna) {
  //     this.dna = dna;
  //   } else {
  //     this.dna = new DNA();
  //   }
  //   this.fitness = 0;

  //   // Applies a force (vector) to the acceleration of the rocket.
  //   this.applyForce = function (force) {
  //     this.acc.add(force);
  //   }

  //   // Calculates the fitness of the rocket from it's distance to the target.
  //   this.calcFitness = function () {
  //     let d = dist(this.pos.x, this.pos.y, target.x, target.y);

  //     this.fitness = map(d, 0, width, width, 0);
  //     if (this.completed) {
  //       this.fitness *= 10;
  //     }
  //     if (this.crashed) {
  //       this.fitness /= 10;
  //     }
  //   }

  //   // Updates the state of the rocket ((applying forces => (pos, vel, acc)) && (crashed || completed))
  //   this.update = function () {
  //     let d = p.dist(this.pos.x, this.pos.y, target.x, target.y);
  //     if (d < 10) {
  //       this.completed = true;
  //       this.pos = target.copy();
  //     }

  //     if (this.pos.x > rx && this.pos.x < rx + rw && this.pos.y > ry && this.pos.y < ry + rh) {
  //       this.crashed = true;
  //     }

  //     if (this.pos.x > width || this.pos.x < 0) {
  //       this.crashed = true;
  //     }

  //     if (this.pos.y > height || this.pos.y < 0) {
  //       this.crashed = true;
  //     }

  //     this.applyForce(this.dna.genes[count]);

  //     if (!this.completed && !this.crashed) {
  //       this.vel.add(this.acc);
  //       this.pos.add(this.vel);
  //       this.acc.mult(0);
  //       this.vel.limit(4);
  //     }
  //   }

  //   // Creates the rocket drawing.
  //   this.show = function () {
  //     push();
  //     noStroke();
  //     fill(255, 150);
  //     translate(this.pos.x, this.pos.y);
  //     rotate(this.vel.heading())

  //     beginShape();
  //     vertex(0, 0);
  //     vertex(15, 0);
  //     vertex(20, 3);
  //     vertex(15, 6);
  //     vertex(0, 6);
  //     vertex(-3, 7);
  //     vertex(-2, 3);
  //     vertex(-3, -1);
  //     endShape();

  //     pop();
  //   }
  // }
} 

new p5(sketch)
