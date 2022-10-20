var x;
var y;

function setup() {
    createCanvas(windowWidth, windowHeight);
    x = width / 2
    y = height / 2;
    rectMode(CENTER);
}

function draw() {
    if (mouseX > x) {
        x += 3;
    }
    if (mouseX < x) {
        x -= 3;
    }
    if (mouseY > y) {
        y += 3;
    }
    if (mouseY < y) {
        y -= 3;
    }
  
    let d = dist(mouseX, mouseY, x, y);
    
    background(0)
    stroke(3, 252, 177);
    strokeWeight(10);
    line(x, 0, x, height);
    line(0, y, width, y);
    noFill();
    rect(mouseX, mouseY, d + 25, d + 25);
}