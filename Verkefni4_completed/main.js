"use strict";
//Grab what we need from external files first
//import Tools from "/Verkefni4/tools";
let tools = new Tools();
new InputHandler();
new Brick();
// setup canvas
let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

let width = canvas.width = "780";
let height = canvas.height = "600";

let bricks = [];

let paddle = new Paddle(((width-100)/2), (height-25), { name: "player", collision: true });
paddle.draw();

let brickHandler = new BrickHandler();
brickHandler.makeBricks();

let gameObjects = brickHandler.bricks;
gameObjects.push(paddle);

let ball = new Ball(200, 400, {name: "ball"}, gameObjects);
//let ball = new Ball(200, 400, {name: "ball"}, [test]);

function loop() {

    ctx.fillStyle = "rgba(0, 0, 0, 1.00)";
    ctx.fillRect(0, 0, width, height);

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
