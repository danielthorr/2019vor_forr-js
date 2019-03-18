class FirstQuestion {

    constructor() {
        this.question = "Hvað er hvað er hvað?";
        this.options = ["Það er það", "segð þú mér", "bara eitthvað", "Hemmi Gunn"];
        this.corrAnswer = 1;
    }
}

class SecondQuestion {

    constructor() {
        this.question = "Hvað er hvað er hvað Í ANNAÐ SINN?";
        this.options = ["False", "True"];
        this.corrAnswer = 0;
    }
}

function create(el, root = false) {
    let tmpElement = document.createElement(el);
    if (root) {
        document.body.appendChild(tmpElement);
    }
    return tmpElement;
}

body = document.body;

mainDiv = create("div");
body.appendChild(mainDiv);

mainDivUpper = create("div");
mainDiv.appendChild(mainDivUpper);
mainDivTitle = create("h1");
mainDivUpper.appendChild(mainDivTitle);
titleNode = document.createTextNode("Spurningaleikur");
mainDivTitle.appendChild(titleNode);


mainDivLower = create("div");
mainDiv.appendChild(mainDivLower);

