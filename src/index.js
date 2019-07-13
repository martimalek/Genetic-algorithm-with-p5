import p5 from "p5";
import "p5/lib/addons/p5.dom";
import "./styles.scss";

import Population from "./Population";
import Rocket from "./Rocket"

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
  let height = p.windowHeight;

  p.setup = () => {
    p.createCanvas(width, height);
    rocket = new Rocket();
    population = new Population();
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
