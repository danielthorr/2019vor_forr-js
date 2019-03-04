"use strict";
// Búum til einfaldan object sem við getum breytt ef við viljum
// bæta við aðferðum eða eiginleikum fyrir alla hluti á skjánum
class GameObject
{
    // Við erum með x og y hnit fyrir staðsetningu og svo fylki sem kallast "tags"
    // við notum þetta fylki til þess að athuga ýmsa hluti, t.d. hvort hlutur sé óvinur eða ekki
    constructor(posX, posY, tags = {}) {
        this.posX = posX;
        this.posY = posY;
        this.tags = tags;
    }

    moveTo(x, y) {
        this.posX = x;
        this.posY = y;
    }

    collidedWith() {
        // Do nothing
    }
}

class RectObject extends GameObject
{
    constructor (posX, posY, tags, color, width, height = "undefined") {
        super(posX, posY, tags);
        this.color = color;
        this.width = width;
        // Ef ferhyrningurinn á að vera ferningur þarf ekki að setja inn hæð
        if (typeof(this.height) === undefined) {
            this.height = this.width;
        } else {
            this.height = height;
        }
        this.getBounds();
    }
    getBounds() {
        this.bounds = {
            top: this.posY,
            bottom: this.posY + this.height, 
            left: this.posX,
            right: this.posX + this.width,
            topLeft: this.posX, 
            topRight: this.posX + this.width,
            bottomLeft: this.posX + this.height,
            bottomRight:  this.posX + this.width + this.height
        }
    }
    draw() {
        canvas.ctx.beginPath();
        canvas.ctx.fillStyle = this.color;
        canvas.ctx.rect(this.posX, this.posY, this.width, this.height);
        canvas.ctx.fill();
        canvas.ctx.stroke();
    }
}

class Paddle extends RectObject
{
    constructor(posX, posY, tags, color = "blue", width = 100, height = 15){
        super(posX, posY, tags, color, width, height);

        // Við bætum við hröðun (acc = acceleration), hraða og hámarkshraða
        this.acc = 2;
        this.speed = 0;
        this.maxSpeed = 6;
        // Eiginleiki sem segir til um hvort brettið megi færi sig til vinstri og/eða hægri
        this.canMove = { left: true, right: true };
    }

    update() {
        // Athugum hvort brettið sé komið út í enda,
        // annaðhvort vinstra- eða hægra megin
        this.canMove.left  = (this.posX > 0) ? true : false;
        this.canMove.right  = (this.posX + this.width < canvas.width) ? true : false;

        // Ef notandi er að ýta á vinstri eða hægri takka
        if (Inputs.left || Inputs.right) {

            // Ef notandi ýtir til vinstri og getur hreyft sig til vinstri
            if (Inputs.left && this.canMove.left) {
                // Athugum hvort notandi sé á hámarskhraða, ef ekki þá notum við
                // hröðun til þess að koma notandanum upp að hámarkshraða
                if (this.speed > -this.maxSpeed) {
                    this.speed -= this.acc;
                } else {
                    this.speed = -this.maxSpeed;
                }

            // Ef notandi ýtil til hægri og getur hreyft sig til hægri
            } else if (Inputs.right && this.canMove.right) {
                //Sama og hér fyrir ofan, athugum hvort notandi sé kominn á 
                // hámarskhraða og notum hröðun ef á við
                if (this.speed < this.maxSpeed) {
                    this.speed += this.acc;
                } else {
                    this.speed = this.maxSpeed;
                }
            // Ef notandi er að ýta til hægri eða vinstri en kemst ekki lengra
            } else {
                this.speed = 0;
            }

        // Ef notandi er ekki að ýta á neinn takka
        } 
        else {

            // Athugum hvort hraði notandans sé jákvæð eða neikvæð tala
            // og bætum við eða tökum frá hröðun til þess að hægja á brettinu
            if (this.speed < 0) {
                this.speed += this.acc;
            } 
            else if (this.speed > 0) {
                this.speed -= this.acc;
            } 
            else {
                this.speed = 0;
            }
        }

        // Bætum hraðanum við "x-stöðu" notandans
        this.posX += this.speed;
    }

}

class Brick extends RectObject
{
    constructor(posX, posY, tags, color, width = 60, height = 20) {
        super(posX, posY, tags, color, width, height);
        this.active = true;
    }

    collidedWith() {
        this.posX, this.posY = -20;
        this.width, this.height = 0;
        this.active = false;
    }

    draw() {
        if (this.active) {
            super.draw();
        }
    }

    makeBricks() {
        let bricks = []
        let brickModel = new Brick();
        let padding = { before: 12, between: 3 };
        let lvlDesign = lvlManager.level[ lvlManager.currentLevel ];
        for (let column = 0; column < lvlDesign.length; column++) {
            for (let row = 0; row < lvlDesign[column].length; row++) {
                let posX = padding.before + row * (brickModel.width + padding.between);
                let posY = padding.before + column * (brickModel.height + padding.between);
                let brick = new Brick(
                    posX, posY, 
                    { name: "brick" + column + "," + row, collision: true }, 
                    "red"
                    );
                bricks.push(brick);
            }
        }
        return bricks;
    }
}

// Við búum bara til einn klasa fyrir boltann og erfum frá GameObject
class Ball extends GameObject
{
    // Við bætum við radíus og lit í constructor-inn
    constructor(posX, posY, tags, collideWith = [], radius = 10, color = "white") {
        super(posX, posY, tags);
        this.radius = radius;
        this.color = color;

        // Við bætum einnig við hraða í bæði x og y átt, hröðun eins og hámarkshraða
        this.velX = 2.5;
        this.velY = -2.5;
        this.acc = 0.2;
        this.maxSpeed = 8;

        this.collideWith = collideWith;
    }

    draw() {
        canvas.ctx.beginPath();
        canvas.ctx.fillStyle = this.color;
        canvas.ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI*2, false);
        canvas.ctx.fill();
        canvas.ctx.beginPath();
    }

    // Notum litla aðferð hér til að bæta við hröðun á boltann. Við athugum hvort boltinn sé
    // kominn á hámarkshraða og annaðhvort hröðum við á honum eða höldum honum á hámarkshraða
    accelerate() {
        if (Math.abs(this.velX) < this.maxSpeed) {
            if      (this.velX < 0) { this.velX -= this.acc; }
            else if (this.velX > 0) { this.velX += this.acc; }
        }
        if (Math.abs(this.velY) < this.maxSpeed) {
            if      (this.velY < 0) { this.velY -= this.acc; }
            else if (this.velY > 0) { this.velY += this.acc; }
        }
    }

    update() {
        this.wallCollision();
        this.posX += this.velX;
        this.posY += this.velY;
    }

    // Við notum sér aðferð til þess að athuga hvort boltin rekist í vegg þar sem við erum
    // ekki með neitt gameobject sem heldur utan um veggina í leiknum.
    // Væri mögulega sniðugt að bæta því inn til þess að geta sett veggi í miðju og á aðra staði
    wallCollision() {
        // Við berum saman staðsetningu boltans á bæði x-ás og y-ás og athugum hvort það boltinn
        // sé kominn út í enda á leikjasvæðinu og uppfærum þá áttina sem hann snýr samkvæmt því
        // Hér er líka aðferðin til þess að hraða á boltanum af því að við viljum
        // bara hraða á boltanum ef hann rekst í vegg.
        if ((this.posX + this.radius) >= canvas.width || (this.posX - this.radius) <= 0) {
            this.velX = -this.velX;
            this.accelerate();
        }
        if ((this.posY + this.radius) >= canvas.height || (this.posY - this.radius) <= 0) {
            this.velY = -this.velY;
            this.accelerate();
        }
    }

    // Við athugum hvort boltinn rekist í eitthvað
    collisionDetection() {

        for (let obj of this.collideWith) {

            let objX = obj.posX;
            let objY = obj.posY;
            let objW = obj.width;
            let objH = obj.height;

            let touchX = Math.max(objX, Math.min(this.posX, objX+obj.width));
            let touchY = Math.max(objY, Math.min(this.posY, objY+obj.height));
            
            let deltaX = this.posX - touchX;
            let deltaY = this.posY - touchY;
            
            let tmp = (deltaX * deltaX + deltaY * deltaY) < (this.radius*this.radius);
            if (tmp) {
                obj.collidedWith();
                
                if (touchX === obj.bounds.left || touchX === obj.bounds.right) {
                    this.velX = -this.velX;
                } else if (touchY === obj.bounds.top || touchY === obj.bounds.bottom) {
                    this.velY = -this.velY;
                }
            }
        }
    }

}