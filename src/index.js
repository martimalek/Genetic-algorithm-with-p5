import p5 from "p5";
import "p5/lib/addons/p5.dom";
import globals from "./js/globals";
import Population from "./js/Population";
import Rocket from "./js/Rocket";
import "./styles.scss";

let {lifespan, count, maxForce, rx, ry, rw, rh, width, height, target} = globals

const sketch = p => {
  let rocket
  let population
  let lifeP
  lifespan = 300;
  count = 0;
  maxForce = 0.2;

  rx = 100;
  ry = 150;
  rw = 200;
  rh = 10;
  width = p.windowWidth;
  height = p.windowHeight;

  p.setup = () => {
    p.createCanvas(width, height);
    rocket = new Rocket(p);
    population = new Population(p);
    lifeP = p.createP();
    target = p.createVector(width / 2, 50);
  }

  p.draw = () => {
    p.background(0);
    population.run();
    lifeP.html(count);

    count++;
    if (count == lifespan) {
      population.evaluate();
      population.selection();
      p.background(0);
      count = 0;
    }

    p.fill(255);
    p.rect(100, 150, 200, 10);

    p.ellipse(target.x, target.y, 16, 16);
    p.fill(255, 0, 0);
    p.ellipse(target.x, target.y, 8, 8);
  }
}

new p5(sketch)
