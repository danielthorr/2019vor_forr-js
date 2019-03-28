let body = document.body;

//Just a small helper function to create simple elements
function create(el) {
    let tmpElement = document.createElement(el);
    return tmpElement;
}

//Switching stages
function nextStage() {
    // We remove the entire tree and then we create the whole thing again
    body.removeChild(document.querySelector(".mainWrapper"));
    stage++;
    template(questions[stage]);
}

// This gets called when an option is clicked on
function revealAnswer(e) {
    // We only one the player to have one guess for each question
    if (!questions[stage].answered) {
        questions[stage].answered = true;

        // We assign a color variable to red for wrong answers and change it to green
        // if the option clicked has the correct "question id"
        let color = "red";
        if (e.target.getAttribute("data-qid") == questions[stage].corrAnswer) {
            color = "green";
        } 
        e.target.style.backgroundColor = color;

        // We compare stage to (questions.length-1) to find out if we need to show the "continue button"
        if (stage < (questions.length-1)) {
            let contButton = create("a");
            contButton.innerHTML = "Continue";
            contButton.href = "#";
            contButton.style.cssText = "display:block; align-self:center; width: 100px; padding:30 10; margin:40px; border: 1px solid black;"
            document.querySelector(".mainWrapper").appendChild(contButton);

            // add an event listener to the "continue button"
            contButton.addEventListener("click", nextStage);
        }
    }
}

function template(currStage) {

    // We have the elements mainDiv which has three child elements called sectionUpper, sectionMiddle, sectionLower
    // sectionUpper contains the title - sectionMiddle contains the question and sectionLower contains the options
    let mainDivStyle = 
        "display:flex; flex-direction:column; justify-content: center; text-align:center;";

    let mainDiv = create("div");
    mainDiv.classList.add("mainWrapper");
    mainDiv.style.cssText = mainDivStyle;
    body.appendChild(mainDiv);

    function add(el) {
        mainDiv.appendChild(el);
    }

    let sectionUpper = create("div");
    sectionUpper.classList.add("upper");
    add(sectionUpper);

    let mainTitle = create("h1");
    mainTitle.style.borderBottom = "2px solid black";
    sectionUpper.appendChild(mainTitle);
    let titleNode = document.createTextNode("Spurningaleikur");
    mainTitle.appendChild(titleNode);

    let sectionMiddle = create("div");
    sectionMiddle.classList.add("middle");
    sectionMiddle.style.cssText = "font-size:24px; text-align:center; padding:20px;"
    add(sectionMiddle);

    let questionNode = document.createTextNode(currStage.question);
    sectionMiddle.appendChild(questionNode);

    let sectionLower = create("div");
    sectionLower.classList.add("lower");
    sectionLower.style.cssText = "display:flex; flex-direction:row; justify-content:center;";
    add(sectionLower);
    
    // Make a temporary counter to use while we loop through the options
    let i = 0;
    for (let option of currStage.options) {
        // Create an <a> element, give it a data-qid attribute and assign our counter to it
        let answDiv = create("a");
        answDiv.href = "#";
        answDiv.setAttribute("data-qid", i)
        answDiv.style.cssText = 
            "display:block; padding:15px; margin:5px; border:1px solid black;" +
            "text-decoration: none; color: black;";
        let answNode = document.createTextNode(option);
        answDiv.appendChild(answNode);
        sectionLower.appendChild(answDiv);

        // Add an event listener that will fire when an option is clicked
        answDiv.addEventListener("click", revealAnswer);
        i++;
    }
}


template(questions[stage]);