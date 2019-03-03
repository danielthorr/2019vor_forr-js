"use strict";
class Inputs
{
    constructor() {
        this.left = false;
        this.right = false;
    }
}

new Inputs();

class InputHandler
{
    constructor(){
        document.addEventListener("keydown", this.keyDown);
        document.addEventListener("keyup", this.keyUp);
    }

    keyDown(event) {
        //alert(event.keyCode);
        if (event.keyCode === 37 || event.keyCode === 65) {
            Inputs.left = true;
            //alert("left");
        } else if (event.keyCode === 39 || event.keyCode === 68) {
            Inputs.right = true;
            //alert("right");
        }
    }
    keyUp(event) {
        //alert(event.keyCode);
        if (event.keyCode === 37 || event.keyCode === 65) {
            Inputs.left = false;
            //alert("left");
        } else if (event.keyCode === 39 || event.keyCode === 68) {
            Inputs.right = false;
            //alert("right");
        }
    }
}