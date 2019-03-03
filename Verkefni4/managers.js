"use strict";

class LevelManager
{
    // Með þessu constructor væri hægt að stjórna borðunum í leiknum
    // currentLevel segir til um hvaða level notandinn er í þar sem 0 væri "main menu"
    constructor() {
        this.currentLevel = 1;
        this.lvlDesign = [];
        this.lvlRowCount = 12;
        this.lvlColumnCount = 12;

        // Þessi breyta heldur utan um öll mismunandi borðin í leiknum
        this.level = [this.mainMenu(), this.level1()]
    }

    // Hérna eru nokkrar aðferðir sem mig langaði að búa til en hafði ekki tíma til
    switchLevels() {        
    }
    constructLevel() {
    }
    mainMenu() {
    }

    // Hérna erum við að búa til fyrsta borðið. Við fyllum fylki með tölum og tölurnar segja til um
    // hvort það eigi að vera auður reitur, 
    // Einmitt núna erum við bara að fylla alla reiti inn með 1 eða 0
    // mig langaði að bæta við öðruvísi "bricks" sem hefðu meira líf og svoleiðis
    level1() {
        for (let i = 0; i < this.lvlRowCount; i++) {
            // Við búum til tímabundið fylki
            let tmpArray = [];

            for (let j = 0; j < this.lvlColumnCount; j++) {
                // Hér fylli ég inn reiti með 0 ef ég vil hafa auða röð
                if (i < 2 || i == 5 || i == 6 || i > 9){
                    tmpArray.push(0);
                } else {
                    tmpArray.push(1);
                }
            }

            //Hér bætum við inn þessu tímabundna fylki til þess að gera fylki af fylkjum
            this.lvlDesign.push(tmpArray);
        }
        return this.lvlDesign;

    }
}

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

// Þessi klasi er í rauninni ekki nauðsynlegur, ég ætlaði alltaf
// að skrifa aðra aðferð fyrir hann, en hann í rauninni geymir bara
// breytuna fyrir alla "bricks" í leiknum og sér um að búa þá til.
class BrickHandler
{
    constructor() {
        this.bricks = [];
    }

    makeBricks() {
        // Við byrjum á því að búa vegna þess að hann fær nokkrar default parameters
        // sem við getum þá notað í stað þess að harðkóða hér
        let brickModel = new Brick();

        // Padding.before er plássið sem kemur vinstra megin við, og fyrir ofan, "brick-anna"
        // Padding.between er plássið sem kemur á milli "brick-anna"
        let padding = { before: 12, between: 3 };

        // hér tökum við inn fylkið sem við bjuggum til í LevelManager
        let lvlDesign = lvlManager.level[ lvlManager.currentLevel ];

        // Fyrir hvert fylki í fylkinu okkar ... 
        for (let i = 0; i < lvlDesign.length; i++) {
            // og fyrir hvert element í hverju fylki fyrir sig
            for (let j = 0; j < lvlDesign[i].length; j++) {

                // Með þessari if() skoðun erum við að athuga hvort það eigi að fylla í með brick eða ekki
                if (lvlDesign[i][j] == 1) {

                    // Ég nota padding, staðsetningu hverns brick, breidd og hæð hverns bricks til
                    // þess að búa til svona hálfgert "grid"
                    let posX = padding.before + j * (brickModel.width + padding.between);
                    let posY = padding.before + i * (brickModel.height + padding.between);

                    // Ég bý til nýjan brick með öllu sem ég er búinn að taka saman
                    let brick = new Brick(
                        posX, posY, 
                        { name: "brick" + i + "," + i, collision: true }, 
                        "red"
                        );
                    
                    // Á endanum bæti ég við þessum nýja brick í this.bricks fylkið
                    this.bricks.push(brick);
                } else {
                    //Do nothing
                }
            }
        }
    }
}