"use strict";
class Tools
{
    // function to generate random number
    random(min,max) {
        var num = Math.floor(Math.random()*(max-min)) + min;
        return num;
    }

    approx10(num, targetNum) {
        if (num < targetNum - 10 || num > targetNum + 10) {
            return false;
        } else {
            return true;
        }
    }
}

class LevelManager
{
    constructor() {
        this.currentLevel = 1;
        this.lvlDesign = [];
        this.lvlRowCount = 12;
        this.lvlColumnCount = 12;

        this.level = [this.mainMenu(), this.level1()]
    }

    switchLevels() {
        
    }

    constructLevel() {

    }

    mainMenu() {

    }

    level1() {
        for (let i = 0; i < this.lvlColumnCount; i++) {
            let tmpArray = [];
            for (let j = 0; j < this.lvlRowCount; j++) {
                tmpArray.push(1);
            }
            this.lvlDesign.push(tmpArray);
        }
        /*
        for (let i = 0; i < 12; i++) {
            for (let j = 0; j < 12; j++) {
                console.log(this.lvlDesign[i][j]);
            }
        }*/
        return this.lvlDesign;

    }
}

new Tools();
let lvlManager = new LevelManager();

/*
12 í hverri röð
10 í hverjum dálk
    1   2   3   4   5   6   7   8   9   10  11  12
1  [x,  x,  x,  x,  x,  x,  x,  x,  x,  x,  x,  x]
2  [x,  x,  x,  x,  x,  x,  x,  x,  x,  x,  x,  x]
3  [x,  x,  x,  x,  x,  x,  x,  x,  x,  x,  x,  x]
4  [x,  x,  x,  x,  x,  x,  x,  x,  x,  x,  x,  x]
5  [x,  x,  x,  x,  x,  x,  x,  x,  x,  x,  x,  x]
6  [x,  x,  x,  x,  x,  x,  x,  x,  x,  x,  x,  x]
7  [x,  x,  x,  x,  x,  x,  x,  x,  x,  x,  x,  x]
8  [x,  x,  x,  x,  x,  x,  x,  x,  x,  x,  x,  x]
9  [x,  x,  x,  x,  x,  x,  x,  x,  x,  x,  x,  x]
10 [x,  x,  x,  x,  x,  x,  x,  x,  x,  x,  x,  x]
11 [x,  x,  x,  x,  x,  x,  x,  x,  x,  x,  x,  x]
12 [x,  x,  x,  x,  x,  x,  x,  x,  x,  x,  x,  x]

*/