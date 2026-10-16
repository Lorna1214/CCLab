let x = 400;
let y = 300;
let armCount = 12;
let r = 255;
let g = 255;
let b = 255;
let bodySize = 50;

function setup() {
    createCanvas(800, 500);
}

function draw() {
    background(79, 88, 125, 60);
    text("frameCount: " + frameCount, 20, 30);

    stroke(194, 224, 238, 80);
    strokeWeight(1);
    noFill();
    for (let i = 0; i < 10; i++) {
        let x = random(width);
        let y = random(height);
        let dia = random(10, 30);
        circle(x, y, dia);
    }
    r = map(sin(frameCount * 0.01), -1, 1, 100, 255);
    g = map(sin(frameCount * 0.01 + 2), -1, 1, 50, 220);
    b = map(sin(frameCount * 0.01 + 4), -1, 1, 180, 255);

    drawCreature(x, y);

    if (frameCount < 500) {
        if (mouseIsPressed) {
            x = x + random(-15, 15);
            y = y + random(-15, 15);
        }
    } else {
        bodySize += 30;
    }
}

function drawCreature(x, y) {
    push();
    translate(x, y);

    drawBody(0, 0, bodySize);
    drawArm();

    pop();
}

function drawBody(x, y, size) {
    push();
    noStroke();
    fill(r, g, b, 80);
    let dia = size + random(-10, 10);
    circle(x, y, dia);
    pop();
}

function drawArm() {
    stroke(40, 40, 40, 50);
    strokeWeight(2.5);
    noFill();

    for (let i = 0; i < armCount; i++) {
        push();
        let angle = map(i, 0, armCount, 0, TWO_PI);
        rotate(angle);
        translate(25, 0);
        stroke(r, g, b, 100);
        line(0, 0, 15, 0);
        translate(15, 0);
        rotate(random(-0.25, 0.25));

        line(0, 0, 15, 0);
        translate(15, 0);
        rotate(random(-0.25, 0.25));

        line(0, 0, 15, 0);

        pop();
    }
}