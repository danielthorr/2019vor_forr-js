/*class TestObj
{
    constructor(x, y, sizeX, sizeY, color) {
        this.x = x;
        this.y = y;
        //this.velX = velX;
        //this.velY = velY;
        this.color = color;
        //this.size = size;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    update() {
        if ((this.x + this.size) >= width || (this.x + this.size) <= 0) {
            this.velX = -(this.velX);
        }
        if ((this.y + this.size) >= height || (this.y + this.size) <= 0) {
            this.velY = -(this.velY);
        }
    
        this.x += this.velX;
        this.y += this.velY;
    }

    collisionDetection() {
        for (let i = 0; i < balls.length; i++) {
            if (!(this === balls[i])){
                let dx = this.x - balls[i].x;
                let dy = this.y - balls[i].y;
                let distance = Math.sqrt(dx*dx + dy*dy);
    
                if (distance < this.size + balls[i].size){
                    balls[i].color = this.color = "rgb(" + tools.random(0,255) + "," + tools.random(0,255) + "," + tools.random(0,255)+ ")";
                }
            }
        }
    }
}*/


class MakeRect
{
    constructor(color, posX, posY, sizeX, sizeY, parent) {
        this.posX = posX;
        this.posY = posY;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.color = color;
        this.parent = parent;
        this.makeChild();
    }

    makeChild(){
        if (typeof(this.parent) !== "undefined") {
            this.parent.children.push(this);
        }
        console.log(this.parent);
    }
    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.rect(this.posX, this.posY, this.sizeX, this.sizeY);
        ctx.fill();
    }

    moveTo(x, y) {
        this.posX = (parent !== undefined) ? x + this.parent.posX : x;
        this.posY = (parent !== undefined) ? y + this.parent.posY : x;
        /*if (parent !== undefined) {
            this.posX = x + this.parent.posX;
            this.posY = 
        }*/
        if (Array.isArray(this.children)){
            for (let child of this.children) {
                child.moveTo(x, y);
            }
        }
    }
}

//makeObj();

/*let balls = [];

function loop() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, width, height);

    while (balls.length < 50) {
        let size = tools.random(10, 25);
        let ball = new Ball(
            tools.random(0+size, width-size),
            tools.random(0+size, height-size),
            tools.random(-7,7),
            tools.random(-7,7),
            "rgba(" + tools.random(0,255) + "," + tools.random(0,255) + "," + tools.random(0,255) + ")",
            size
        );
        balls.push(ball);
    }

    for (let i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetection();
    }

    requestAnimationFrame(loop);
}

loop();*/

/*function GameLoop(timeStamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    requestAnimationFrame(GameLoop)
}

GameLoop();*/