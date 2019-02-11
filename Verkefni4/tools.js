"use strict";
class Tools
{
    // function to generate random number
    random(min,max) {
        var num = Math.floor(Math.random()*(max-min)) + min;
        return num;
    }
}