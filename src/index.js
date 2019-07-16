import p5 from "p5";
import "p5/lib/addons/p5.dom";
import { lifespan, rh, rw, rx, ry } from "./js/constants";
import Population from "./js/Population";
import Rocket from "./js/Rocket";
import "./styles.scss";

const sketch = p => {
  let rocket
  let population
  let target
  let lifeP
  let count = 0;
  let width = p.windowWidth;
  let height = p.windowHeight;

  p.setup = () => {
    p.createCanvas(width, height);
    lifeP = p.createP();
    target = p.createVector(width / 2, 50);
    rocket = new Rocket(p);
    population = new Population(p);
  }

  p.draw = () => {
    p.background(0);
    population.run(target, count);
    lifeP.html(count);

    count++;
    if (count == lifespan) {
      population.evaluate(target);
      population.selection();
      p.background(0);
      count = 0;
    }

    p.fill(255);
    p.rect(rx, ry, rw, rh);

    p.ellipse(target.x, target.y, 16, 16);
    p.fill(255, 0, 0);
    p.ellipse(target.x, target.y, 8, 8);
  }
}

new p5(sketch)
