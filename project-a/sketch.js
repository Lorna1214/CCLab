let x = 400;
let y = 300;
let armCount = 12;
let r = 255;
let g = 255;
let b = 255;
let bodySize = 50;
const MAX_THRESHOLD = 120;

function setup() {
    createCanvas(800, 500);
}

function draw() {
    background(79, 88, 125, 30);
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

    if (frameCount > 500) {
        r = 220;
        g = 30;
        b = 30;
    } else {
        r = 255;
        g = 255;
        b = 255;
    }

    drawCreature(x, y);

    if (frameCount < 500) {
        if (mouseIsPressed) {
            x = x + random(-15, 15);
            y = y + random(-15, 15);
        }
    } else {
        if (mouseIsPressed) {
            bodySize += 20;
        }
    }
}

function drawCreature(x, y) {
    push();
    translate(x, y);

    drawBody(0, 0, bodySize);

    if (bodySize <= MAX_THRESHOLD) {
        drawArm();
    }

    pop();
}

function drawBody(x, y, size) {
    push();
    noStroke();
    fill(r, g, b, 40);
    if (frameCount < 500) {
        size = size + random(-10, 10);
    }
    if (frameCount > 500) {
        size = size + random(-30, 30);
    }
    circle(x, y, size);
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