import {lifespan, maxForce} from "./constants"
import p5 from "p5"
/**
   * 
   * Creates the DNA (array of genes (vectors)) when no genes are passed. If genes are passed, this are used.
   * 
   * @param {array} genes
   */
function DNA(p, genes) {
    if (genes) {
        this.genes = genes;
    } else {
        this.genes = [];

        // Establishes the genes.
        for (let i = 0; i < lifespan; i++) {
            this.genes[i] = p5.Vector.random2D();
            this.genes[i].setMag(maxForce);
        }
    }

    // Creates a new chain of DNA from two parent's DNAs.
    this.crossover = function (partner) {
        let newGenes = [];
        let mid = p.floor(p.random(this.genes.length));
        for (let i = 0; i < this.genes.length; i++) {
            if (i > mid) {
                newGenes[i] = this.genes[i];
            } else {
                newGenes[i] = partner.genes[i];
            }
        }
        return new DNA(p, newGenes);
    }

    // Establishes the possibility of a mutation in a chain of DNA.
    this.mutation = function () {
        for (let i = 0; i < this.genes.length; i++) {
            if (p.random(1) < 0.01) {
                this.genes[i] = p5.Vector.random2D();
                this.genes[i].setMag(maxForce);
            }
        }
    }
}

export default DNA;