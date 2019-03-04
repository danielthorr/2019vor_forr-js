"use strict";
// Bara einfaldur klasi sem heldur utan um breytur
// Í rauninni algjörlega óþarfi
class Inputs
{
    constructor() {
        this.left = false;
        this.right = false;
    }
}

new Inputs();

// Hér sé ég um input
class InputHandler
{
    // Í constructor-inum bæti ég við event listener fyrir keyDown og keyUp
    // svo ég viti hvenær ég þarf að færa brettið á skjánum
    constructor(){
        document.addEventListener("keydown", this.keyDown);
        document.addEventListener("keyup", this.keyUp);
    }

    //Þessi keyCode sem ég er með fyrir neðan eru fyrir takkana:
    // [a, d, vinstriTakki, hægriTakki]

    // Fyrir keyDown viljum við færa brettið
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

    // Fyrir keyUp viljum við að brettið stöðvist
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