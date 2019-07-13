import p5 from "p5";
import Rocket from "./Rocket";
/**
   * Creates a population of rockets.
   */
function Population() {
    this.rockets = [];
    this.popsize = 25;
    this.matingPool = [];

    for (let i = 0; i < this.popsize; i++) {
        this.rockets[i] = new Rocket();
    }

    // Calculates the fitness of the rockets and creates a matingPool with them according to their fitness. 
    // As more fitness has a rocket more times it will be pushed to the matingPool.
    this.evaluate = function () {
        let maxfit = 0;
        for (let i = 0; i < this.popsize; i++) {
            this.rockets[i].calcFitness();
            if (this.rockets[i].fitness > maxfit) {
                maxfit = this.rockets[i].fitness;
            }
        }

        for (let i = 0; i < this.popsize; i++) {
            this.rockets[i].fitness /= maxfit;
        }

        this.matingPool = [];
        for (let i = 0; i < this.popsize; i++) {
            let n = this.rockets[i].fitness * 100;
            for (let j = 0; j < n; j++) {
                this.matingPool.push(this.rockets[i]);
            }
        }
    }

    // Creates a new array of rockets from making crossovers between the ones in the matingPool.
    // Establishes the new rockets as the next generation of rockets.
    this.selection = function () {
        let newRockets = [];

        for (let i = 0; i < this.rockets.length; i++) {
            let parentA = random(this.matingPool).dna;
            let parentB = random(this.matingPool).dna;
            let child = parentA.crossover(parentB);
            child.mutation();

            newRockets[i] = new Rocket(child);
        }
        this.rockets = newRockets;
    }

    // Updates the rockets while drawing them.
    this.run = function () {
        for (let i = 0; i < this.popsize; i++) {
            this.rockets[i].update();
            this.rockets[i].show();
        }
    }
}

export default Population;