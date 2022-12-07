let img

var ufoX;
var ufoY;

var gifts = [];

radius = 30
size = 60

angle = 0

interval = 1140
level = 1
speed = 3

class UFO {
    constructor() {
        this.x = random(width + size * 2)
        this.y = random(height)
        this.vx = random(-speed, speed)
        this.vy = random(-speed, speed)
    }
    move() {
        this.x += this.vx
        
        this.y += this.vy
        if (this.x + this.vx > width + 2 * size || this.x + this.vx < -2 * size) {
            this.vx = -this.vx;
        }
        if (this.y + this.vy > height + 2 * size || this.y + this.vy < -2 * size) {
            this.vy = -this.vy;
        }
    }
    draw() {
        push()
        translate(this.x, this.y);
        fill(3, 252, 177);
        arc(0, 0, size, size, PI, TWO_PI);
        fill(120, 132, 135);
        ellipse(0, 0, size * 2, size * 0.75);
        fill(3, 252, 177);
        ellipse(0, size / 2.5, size * 0.75, size * 0.25);
        pop()
    }
}

class Mothership {
    constructor() {
        this.x = random(width + size * 4)
        this.y = random(height)
        this.vx = random(-speed * 2, speed * 2)
        this.vy = random(-speed * 2, speed * 2)
    }
    move() {
        this.x += this.vx
        this.x += random(-this.vx, this.vx)
        this.y += this.vy
        this.y += random(-this.vy, this.vy)
        if (this.x + this.vx > width + 4 * size || this.x + this.vx < -4 * size) {
            this.vx = -this.vx;
        }
        if (this.y + this.vy > height + 4 * size || this.y + this.vy < -4 * size) {
            this.vy = -this.vy;
        }
    }
    draw() {
        push()
        translate(this.x, this.y);
        fill(29, 179, 216);
        ellipse(0, 0, size * 4, size * 1.5);
        fill(3, 252, 177);
        ellipse(0, size / 2.5, size * 1.5, size * 0.5);
        pop()
    }
}

class Gift {
    constructor(tempX, tempY) {
        this.x = random(width)
        this.y = random(height)
        this.vx = random(-0.5, 0.5)
        this.vy = random(-0.5, 0.5)
    }
    move() {
        this.x += random(-this.vx, this.vx)
        this.y += random(-this.vy, this.vy)
        angle+=0.001
    }
    draw() {
        fill(255, 0, 0)
        push()
        translate(this.x, this.y)
        rotate(angle)
        rect(0, 0, radius * 4 / 3)
        noFill()
        stroke(55, 168, 112)
        strokeWeight(5)
        line(0, radius * 2 / 3, 0, -radius * 2 / 3)
        line(radius * 2 / 3, 0, -radius * 2 / 3, 0)
        circle(radius / 6, -radius * 5 / 6, radius * 4 / 15)
        circle(-radius / 6, -radius * 5 / 6, radius * 4 / 15)
        pop()
    }
}

let ufos = []
let motherships = []
let score = 0
timer = 0

function generation() {
    for (var i = 0; i < 50; i++) {
        var x = random(width);
        var y = random(height);
        gifts[i] = new Gift(x, y);
        gifts.push(gifts[i])
    }
    for (let j = 0; j < 25; j++) {
        let ufo = new UFO()
        ufos.push(ufo)
    }
}

function mousePressed() {
    for (let i = 0; i < ufos.length; i++) {
        let distance = dist(mouseX, mouseY,
            ufos[i].x,
            ufos[i].y)
        if (distance < size) {
            ufos.splice(i, 1)
            score++
        }
    }
    for (let j = 0; j < motherships.length; j++) {
        let distance = dist(mouseX, mouseY,
            motherships[j].x,
            motherships[j].y)
        if (distance < 2 * size) {
            motherships.splice(j, 1)
            score+=5
        }
    }
}

function setup() {
    createCanvas(1920, 1106)
    ufoX = windowWidth / 2
    ufoY = windowHeight / 2
    rectMode(CENTER)
    textAlign(CENTER)
    noStroke()
    generation()

    img = loadImage('cupcage.jpeg')
}

function draw() {
    image(img, 0, 0)
    if (0 < frameCount && frameCount < 120) {
        fill(255, 177, 41)
        push()
        textSize(height / 10)
        text("X-MasTerrestrials", width / 2, height / 4)
        pop()
    }

    if (120 < frameCount % interval && frameCount % interval < 240) {
        fill(255, 177, 41)
        push()
        textSize(height / 10)
        text("Level " + level, width / 2, height / 2)
        pop()
    } else if (frameCount % interval == 240) {
        for (let k = 0; k < level - 1; k++) {
            let mothership = new Mothership()
            motherships.push(mothership)
        }
        level++
        speed++
        gifts = []
        ufos = []
        generation()
    } else if (240 < frameCount % interval && frameCount % interval < 1140) {
        gifts.forEach(p => p.draw())
        gifts.forEach(p => p.move())

        if (gifts.length >= 5) {
            for (let i = 0; i < ufos.length; i++) {
                for (let j = 0; j < gifts.length; j++) {
                    let distance = dist(ufos[i].x, ufos[i].y,
                        gifts[j].x,
                        gifts[j].y)
                    if (distance < 0.875 * radius) {
                        gifts.splice(j, 1)
                        score -= 0.1
                    }
                    if (distance > 0 && distance < 2 * radius) {
                        push()
                        fill(216, 60, 159)
                        ellipse(ufos[i].x, ufos[i].y, size * 2.5, size * 1.25)
                        pop()
                    }
                }
            }
            for (let k = 0; k < motherships.length; k++) {
                for (let j = 0; j < gifts.length; j++) {
                    let distance = dist(motherships[k].x, motherships[k].y,
                        gifts[j].x,
                        gifts[j].y)
                    if (distance < 2.5 * radius) {
                        gifts.splice(j, 1)
                        score -= 0.1
                    }
                    if (distance > 0 && distance < 4 * radius) {
                        push()
                        fill(156, 120, 207)
                        ellipse(motherships[k].x, motherships[k].y, size * 5, size * 1.875)
                        pop()
                    }
                }
            }
            ufos.forEach(p => p.draw())
            ufos.forEach(p => p.move())
            motherships.forEach(p => p.draw())
            motherships.forEach(p => p.move())
            if (mouseX > ufoX) {
                ufoX += 9;
            }
            if (mouseX < ufoX) {
                ufoX -= 9;
            }
            if (mouseY > ufoY) {
                ufoY += 9;
            }
            if (mouseY < ufoY) {
                ufoY -= 9;
            }
          
    let d = dist(mouseX, mouseY, ufoX, ufoY);

    push()
    stroke(3, 252, 177);
    strokeWeight(10);
    line(ufoX, 0, ufoX, height);
    line(0, ufoY, width, ufoY);
    noFill();
    rect(mouseX, mouseY, d + 25, d + 25);
    pop()
        } else {
            fill(255, 177, 41)
            push()
            textSize(height / 10)
            text("GAME OVER", width / 2, height / 2)
            textSize(height / 20)
            text("Thanks for playing, Happy Holidays!", width / 2, height * 5 / 8)
            pop()
            noLoop()
        }
    }

    fill(255, 177, 41)
    textSize(height / 50)
    text("Score: " + Math.round(score * 100), width / 10, height / 10)

}
