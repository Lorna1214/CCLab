let scannedImages = [];

let down;
let icecream;

let currentDownIndex = 0;
let currentIcecreamIndex = 0;

let icecreamY = -100;
let icecreamSpeedY = 0;

async function setup() {
    createCanvas(800, 500);

    // load all images first
    const imagePromises = [];
    for (let i = 0; i < 3; i++) {
        imagePromises.push(loadImage("assets/image" + i + ".jpg"));
    }
    scannedImages = await Promise.all(imagePromises);

    eraseBackground(scannedImages, 10);

    down = crop(scannedImages, 0, 0, 585, 356);
    icecream = crop(scannedImages, 600, 0, 1600, 600);
}
function draw() {
    background(255);

    currentDownIndex = floor((frameCount / 20) % down.length);
    image(
        down[currentDownIndex],
        mouseX,
        mouseY,
        down[0].width * 0.25,
        down[0].height * 0.25
    );
    currentIcecreamIndex = floor((frameCount / 10) % icecream.length);
    icecreamSpeedY += 0.1;
    icecreamY += icecreamSpeedY;
    if (icecreamY > height + 100) {
        icecreamY = -100;
        icecreamSpeedY = 0;
    }
    push();
    translate(width / 2, icecreamY);
    //rotate(radians(90));
    imageMode(CENTER);
    image(
        icecream[currentIcecreamIndex],
        0,
        0,
        icecream[0].width * 0.25,
        icecream[0].height * 0.25
    );
    pop();
}
// IMAGE PROCESSING FUNCTIONS
function crop(images, x, y, width, height) {
    const croppedImages = [];
    for (let imageIndex = 0; imageIndex < images.length; imageIndex++) {
        croppedImages.push(images[imageIndex].get(x, y, width, height));
    }
    return croppedImages;
}

function eraseBackground(images, threshold = 10) {
    for (let imageIndex = 0; imageIndex < images.length; imageIndex++) {
        const currentImage = images[imageIndex];
        currentImage.loadPixels();

        for (let pixelIndex = 0; pixelIndex < currentImage.pixels.length; pixelIndex += 4) {
            let distanceFromWhite = 255 - currentImage.pixels[pixelIndex];
            distanceFromWhite += 255 - currentImage.pixels[pixelIndex + 1];
            distanceFromWhite += 255 - currentImage.pixels[pixelIndex + 2];

            if (distanceFromWhite < threshold) {
                currentImage.pixels[pixelIndex + 3] = 0;
            }
        }

        currentImage.updatePixels();
    }
}
