var colors = [
    [55, 168, 112],
    [247, 149, 60],
    [255, 177, 41],
    [250, 104, 31],
    [226, 126, 92],
    [95, 40, 19]
];

function setup() {
    createCanvas(1000, 1000);
    rectMode(CENTER);
    frameRate(5);
    noStroke();
}

function draw() {
    background(255, 188, 35);
    for (var x = 200; x <= 800; x += 150) {
        for (var y = 280; y <= 640; y += 360) {
            fill(181, 83, 13)
            rect(x, y + 98, 20, 100)
            fill(random(colors))
            ellipse(x, y, 100, 100)
        }
    }
}