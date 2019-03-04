"use strict";

// Byrjum á því að búa til þær breytur sem við eigum eftir að þurfa að nota,
// allt frá Input og levels, yfir í canvas og gameobjects
new InputHandler();
let lvlManager = new LevelManager();

// Stillum canvas
let canvas = {
    canvasElement: document.querySelector('canvas')
}
canvas = {
    ctx: canvas.canvasElement.getContext('2d'),
    width: canvas.canvasElement.width = "780",
    height: canvas.canvasElement.height = "600"
}

// Hér búum við til brettið fyrir notandann. 
// Við stillum honum upp í miðjuna með smá reikningum og gefum honum "player" tag
let paddle = new Paddle(((canvas.width-100)/2), (canvas.height-25), { name: "player", collision: true });

// Brickhandler býr til bricks fyrir okkur með aðferðinni makeBricks
let brickHandler = new BrickHandler();
brickHandler.makeBricks();

// Við búum til fylki sem inniheldur allt sem boltinn getur rekist í
let collisionObjects = brickHandler.bricks;
collisionObjects.push(paddle);

// Þegar við búum til boltann gefum við honum staðsetningu og tag með nafni
// svo færum við inn fylkið okkar sem inniheldur gameObjects með collision
let ball = new Ball(200, 400, {name: "ball"}, collisionObjects);

// Hér er að aðal lykkjan okkar sem sér um að uppfæra grafík,
// hreyfingu og allt annað sem kemur að leiknum
function loop() {

    // hér fyllum við skjáinn til þess að uppfæra allt sem þarf að teikna
    // Mikilvægt er að gera það í réttri röð
    canvas.ctx.fillStyle = "rgba(0, 0, 0, 1.00)";
    canvas.ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Við köllum í draw aðferðirnar hjá öllum gameobjects sem við viljum teikna
    paddle.draw();
    ball.draw();
    for (let i = 0; i < brickHandler.bricks.length; i++){
        brickHandler.bricks[i].draw();
    }

    // Við köllum í update á öllum gameobjects sem þurfa að uppfæra sig 
    paddle.update();
    ball.update();

    // Þegar við erum búin að uppfæra allt köllum við í requestAnimationFrame()
    // sem sér um að gera allt tilbúið fyrir næstu uppfærslu og "teikningu"
    requestAnimationFrame(loop);
}

loop();
