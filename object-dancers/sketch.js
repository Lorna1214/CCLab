let dancer;

function setup() {
  createCanvas(windowWidth, windowHeight);

  dancer = new ocotopo(width / 2, height / 2);
}

function draw() {
  background(0);
  drawFloor();

  dancer.update();
  dancer.display();
}

class ocotopo {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.startX = startX;
    this.startY = startY;

    this.angle = 0;
    this.bodyScale = 1;
    this.bodyScaleDir = 0.005;
    this.eyeOffset = 0;
    this.eyeDir = 0.3;
  }
  update() {
    this.angle += 0.05;

    this.bodyScale += this.bodyScaleDir;
    if (this.bodyScale > 1.06 || this.bodyScale < 0.94) {
      this.bodyScaleDir *= -1;
    }

    this.eyeOffset += this.eyeDir;
    if (this.eyeOffset > 4 || this.eyeOffset < -4) {
      this.eyeDir *= -1;
    }

    this.x = this.startX + sin(this.angle * 0.7) * 20;
    this.y = this.startY + cos(this.angle * 0.5) * 10;
  }
  display() {
    push();
    translate(this.x, this.y);

    let tentacleA = sin(this.angle) * 18;
    let tentacleB = sin(this.angle + 1.2) * 18;
    let tentacleC = sin(this.angle + 2.4) * 18;
    let tentacleD = sin(this.angle + 3.6) * 18;

    fill(133, 142, 221);
    circle(-40 + tentacleA * 0.3, 30 + tentacleA * 0.4, 35);
    circle(40 + tentacleB * 0.3, 30 + tentacleB * 0.4, 35);
    circle(-15 + tentacleC * 0.3, 40 + tentacleC * 0.4, 35);
    circle(15 + tentacleD * 0.3, 40 + tentacleD * 0.4, 35);

    push();
    scale(this.bodyScale);
    fill(174, 180, 242);
    circle(0, 0, 80);
    pop();

    fill(160, 226, 251);
    circle(-15, 0 + this.eyeOffset, 20);
    circle(15, 0 + this.eyeOffset, 20);

    fill(255, 255, 255);
    circle(-20, -2 + this.eyeOffset, 5);
    circle(10, -2 + this.eyeOffset, 5);

    pop();
  }
}
