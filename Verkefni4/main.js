"use strict";
//Grab what we need from external files first
//import Tools from "/Verkefni4/tools";
new InputHandler();
// setup canvas

let canvas = {
    canvasElement: document.querySelector('canvas')
}
canvas = {
    ctx: canvas.canvasElement.getContext('2d'),
    width: canvas.canvasElement.width = "780",
    height: canvas.canvasElement.height = "600"
}


let paddle = new Paddle(((canvas.width-100)/2), (canvas.height-25), { name: "player", collision: true });
paddle.draw();

let brickHandler = new BrickHandler();
brickHandler.makeBricks();

let gameObjects = brickHandler.bricks;
gameObjects.push(paddle);

let ball = new Ball(200, 400, {name: "ball"}, gameObjects);
//let ball = new Ball(200, 400, {name: "ball"}, [test]);

function loop() {

    canvas.ctx.fillStyle = "rgba(0, 0, 0, 1.00)";
    canvas.ctx.fillRect(0, 0, canvas.width, canvas.height);

    ball.collisionDetection();

    paddle.draw();
    ball.draw();
    //test.draw();
    for (let i = 0; i < brickHandler.bricks.length; i++){
        brickHandler.bricks[i].draw();
    }

    paddle.update();
    ball.update();
    /*for (let i = 0; i < bricks.length; i++) {
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetection();
    }*/

    requestAnimationFrame(loop);
}

loop();
