let vines = [];
let X = 500;
let Y = 300;
let Radius = 100;

function setup() {
  createCanvas(1000, 600);
}

function draw() {
  background(220);
  circle(X, Y, Radius * 2);

  for (let v of vines) {
    v.update();
    v.display();
  }
}

function mousePressed() {
  vines.push(new Vine(500, 200, "red"));
}

function keyPressed() {
  if (key === ' ') {
    vines.push(new Vine(500, 200, "black"));
  }
}

class Vine {
  constructor(x, y, type) {
    this.points = [{ x: x, y: y }];
    this.growing = true;
    this.speed = 1;
    this.type = type;
  }

  update() {
    if (!this.growing) return;

    let last = this.points[this.points.length - 1];
    let newX;
    let newY = last.y + this.speed;


    if (this.type === "black") {
      newX = last.x + random(-3, 3);
    } else {
      newX = last.x + random(-1.2, 1.2);
    }

    let distToCenter = dist(newX, newY, X, Y);
    if (distToCenter < Radius) {
      this.points.push({ x: newX, y: newY });
    } else {
      this.growing = false;
    }
  }

  display() {
    noFill();
    if (this.type === "black") {
      stroke(0);
      strokeWeight(3);
    } else {
      stroke(180, 20, 20);
      strokeWeight(2);
    }
    beginShape();
    for (let p of this.points) {
      vertex(p.x, p.y);
    }
    endShape();
  }
}
