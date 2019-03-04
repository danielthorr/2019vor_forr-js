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

    // Lítið aðferð sem varð ekkert notuð en gæti komið sér vel
    moveTo(x, y) {
        this.posX = x;
        this.posY = y;
    }

    // Ég bý til þessa aðferð svo að allir erfi það frá GameObject en ég vil ekki
    // setja neitt hér inn til að byrja með
    collidedWith() {
        // Do nothing
    }
}

// Hér læt ég RectObject erfa frá GameObject. RectObject er búinn til til þess
// að búa til tiltörulega einfalda kassalaga gameobject-a
class RectObject extends GameObject
{
    // Við tökum inn algengar breytur: staðsetningu, lit, breidd og hæð
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

    // Aðferðin getBounds finnur fyrir okkur vinstri og hægri hliðar
    // kassans, ásamt efri og nerði hlið 
    getBounds() {
        this.bounds = {
            top: this.posY,
            bottom: this.posY + this.height, 
            left: this.posX,
            right: this.posX + this.width
        }
    }

    // draw segir sig sjálft, það er allir gameObjects með þetta á einhvern hátt
    // einfaldlega notum canvas "element-ið" til þess að teikna út kassana
    draw() {
        canvas.ctx.beginPath();
        canvas.ctx.fillStyle = this.color;
        canvas.ctx.rect(this.posX, this.posY, this.width, this.height);
        canvas.ctx.fill();
        canvas.ctx.stroke();
    }
}

// Þetta er brettið sem leikmaðurinn stýrir, það gerir í rauninni lítið annað en að
// hreyfa sig til vinstri og hægri
class Paddle extends RectObject
{
    constructor(posX, posY, tags, color = "blue", width = 100, height = 15){
        super(posX, posY, tags, color, width, height);

        // Við bætum við hröðun (acc = acceleration), hraða og hámarkshraða
        this.acc = 2;
        this.speed = 0;
        this.maxSpeed = 8;
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

// Brick býr til "múrsteinana" eða "brick-ana" sem við viljum útrýma í leiknum
class Brick extends RectObject
{
    constructor(posX, posY, tags, color, width = 60, height = 20) {
        super(posX, posY, tags, color, width, height);

        // Við notum þessa breytu þegar boltinn lendir á brick til þess að "aftengja" hann
        this.active = true;
    }

    // Þessi aðferð er kölluð þegar boltinn lendir á brick
    collidedWith() {
        // Við færum hann útaf skjánum og minnkum hann niður í 0,
        // síðan breytum við this.active í false
        this.posX, this.posY = -20;
        this.width, this.height = 0;
        this.active = false;
    }

    // Eina sem við viljum athuga hér er hvort að við eigum að "teikna" brick (samkvæmt this.active)
    // Ef brick er active þá kallar brick bara í aðferðina sem það erfir frá foreldrinu sínu (RectObject)
    draw() {
        if (this.active) {
            super.draw();
        }
    }
}

// Við búum til klasa fyrir boltann. Við þurfum ekki að búa til foreldra fyrir boltann
// þar sem það er bara einn bolti, hins vegar væri hægt að bæta við "power-ups" og þá
// gæti verið gott að vera með foreldra-klasa fyrir boltann
class Ball extends GameObject
{
    // Við bætum við radíus og fylki sem inniheldur allt sem boltinn getur rekist í
    constructor(posX, posY, tags, collideWith = [], radius = 10, color = "white") {
        super(posX, posY, tags);
        this.radius = radius;
        this.color = color;

        // Við notum startPos[X/Y] og startVel[X/Y] til þess að geta endurstillt boltann seinna
        this.startPosX = posX;
        this.startPosY = posY;

        this.startVelX = 2.5;
        this.startVelY = -2.5;

        // Við bætum einnig við hraða í bæði x og y átt, hröðun eins og hámarkshraða
        this.velX = this.startVelX;
        this.velY = this.startVelY;
        this.acc = 0.2;
        this.maxSpeed = 8;

        this.collideWith = collideWith;
    }

    // Aðferðin gerir meira eða minna það sama og draw fyrir kassana, nema þessi gerir hring
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

    // Hér athugum við á árekstrum og færum boltann okkar
    update() {
        this.collisionDetection();
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
        // Ef boltinn fer niður fyrir canvas-inn og notandinn nær honum ekki með brettinu
        // þá viljum við ekki láta hann skoppa aftur upp heldur viljum við endurstilla boltann
        // við drögum 100 frá staðsetningu boltans til þess að vera viss um að boltinn nái að
        // fara alveg út af skjánum og gefa notandanum smá tíma til að bregðast við
        if ((this.posY + this.radius - 100) >= canvas.height) {
            this.resetBall();
        } else if ( (this.posY - this.radius) <= 0) {
            this.velY = -this.velY;
            this.accelerate();
        }
    }

    // resetBall kemur boltanum aftur í upphafsstöðu
    resetBall() {
        this.posX = this.startPosX;
        this.posY = this.startPosY;

        this.velX = this.startVelX;
        this.velY = this.startVelY;
    }

    // Hér kemur stóra aðferðin sem kostaði mig margar klukkustundir og mikla höfuðverki
    collisionDetection() {

        // Við förum í gegnum alla "object-a" í this.collideWith fylkinu
        for (let obj of this.collideWith) {

            // Við búum til tvær breytur fyrir þægindi og læsileika
            let objX = obj.posX;
            let objY = obj.posY;

            /*
                Touch breyturnar finna punktinn á "obj" sem er næst miðju hringsins.
                https://yal.cc/rectangle-circle-intersection-test/

                Fyrir touchX:
                Til þess að útskýra þessa aðferð er best að byrja á Math.min() hlutanum
                og útskýra hvað Math.max() gerir á meðan við erum að gera það.

                Gefum okkur tvær mismunandi aðstæður: að boltinn sé hægra meginn við
                obj, eða að boltinn sé vinstra meginn við obj.

                Ef boltinn er hægra meginn við obj, þá er x gildið í miðju boltans hærra
                og min aðferðin skilar þá hægri hlið obj (þ.e.a.s. objX + obj.width).
                Þar sem að objX er vinstri hliðin á obj, þá hefur það lægra gildi heldur en hægri 
                hliðin og Math.max() skilar þá hægri hlið af því að sú hlið hefur hærra gildi.

                Ef boltinn er vinstra meginn við obj, þá er x gildið í miðju boltans lægra
                og min aðferðin skilar þá x gildið fyrir miðju boltans (þ.e.a.s. this.posX).
                Þar sem boltinn er staðsettur vinstra meginn við obj, þá er x gildi boltans
                lægra en vinstri hlið obj og þá skila Math.max() vinstri hlið obj.

                touchY gerir í rauninni það sama nema með efri og neðri hlið boltans.

                Með því að nota þessa aðferð fáum við alltaf þá hlið sem er næst boltanum.
            */
            let touchX = Math.max(objX, Math.min(this.posX, objX + obj.width));
            let touchY = Math.max(objY, Math.min(this.posY, objY + obj.height));
            
            // deltaX og deltaY er bara mismunurinn á x gildunum og y gildunum
            // það er lengdin á milli hverns punkts fyrir sig
            let deltaX = this.posX - touchX;
            let deltaY = this.posY - touchY;

            // touching er boolean breyta sem athugar hvort að lengd vigursins á milli miðju boltans og
            // punktinum sem við fundum með touchX og touchY sé lægri en radíus boltans

            // Hér erum við í raun að nota Pýþagóras regluna nema í stað þess að nota Math.pow() 
            // margföldum við tölurnar bara við sig sjálfar og í stað þess að nota Math.sqrt
            // þá finnum við hvað radíusinn á boltanum er í öðru veldi og berum það beint saman við
            let touching = ( (deltaX * deltaX) + (deltaY * deltaY) ) < (this.radius*this.radius);
            if (touching) {
                // Ef boltinn hefur rekist í eitthvað köllum við á collidedWith() aðferðina á þeim hlut
                // og leyfum honum að sjá um að framkvæma sínar aðferðir
                obj.collidedWith();
                
                // Ef punkturinn á obj er vinstra meginn eða hægra meginn við hlutinn þá 
                // skiptir boltinn um átt til annaðhvort hægri eða vinstri
                // Sama ef punkturinn er á efri eða neðri hlið obj, þá þarf boltinn að 
                // skipta um átt annaðhvort upp eða niður
                if (touchX === obj.bounds.left || touchX === obj.bounds.right) {
                    this.velX = -this.velX;
                } else if (touchY === obj.bounds.top || touchY === obj.bounds.bottom) {
                    this.velY = -this.velY;
                }
                // Ef við höfum rekist í hlut er óþarfi að halda áfram með for...of lykkjuna
                break;
            }
        }
    }

}