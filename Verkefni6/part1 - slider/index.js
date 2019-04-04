"use strict";

/************************************************************
 *          Initializing names and scores to work with      *
 ************************************************************/
// Simple class to handle the scores
class Score
{
    constructor(name, score) {
        this.name = name;
        this.score = score;
    }
}

// Create an array of scores
let scores = [
    new Score("Daníel", 230),
    new Score("Jónína", 670),
    new Score("Gunnlaugur", 460),
    new Score("Brútus", 890),
    new Score("Doktorinn", 60)
];
// Let's sort the scores in descending order by the score value
// Formula from javascript30.com - Array cardio day 1: 
// https://courses.wesbos.com/account/access/5c83a6b685f96c03c1e38776/view/194130346
scores = scores.sort((a, b) => {
    let lastScore = a.score;
    let nextScore = b.score;
    return lastScore > nextScore ? -1: 1;
});

/************************************************************
 *      Create all the HTML elements to use in the project  *
 ************************************************************/
/****** Initialize HTML wrapper and QoL function ******/
let body = document.querySelector("body");
// Simple function that creates an HTML element and appends 
// it to a parent element if the flag is set
function create(el, applyParent = false, parent=body) {
    let element = document.createElement(el);
    if (applyParent) {
        parent.appendChild(element);
    }
    return element;
}

/****** Create a wrapper around the whole project area ******/
let mainWrapper = create("div", true);
mainWrapper.style.cssText = "width:400px; margin: 0 auto;";

/****** Create the element that will be used as the slider ******/
let range = create("div", true, mainWrapper);
range.style.margin = "0 auto 40px";

/****** Make the labels to display the handle values ******/
let valLabelWrapper = create("div", true, mainWrapper);
valLabelWrapper.style.cssText = 
    "display:flex; justify-content:space-between;"+
    "margin: 0 auto;";

let valLabelLow = create("div", true, valLabelWrapper);
let valLabelHigh = create("div", true, valLabelWrapper);

let valLabelStyle = 
    "padding:2px 10px; border: 1px solid black; margin:0;";
valLabelLow.style.cssText = valLabelStyle;
valLabelHigh.style.cssText = valLabelStyle;

/****** Make the unordered list and list items ******/
let listEl = create("ul", true, mainWrapper);

// We use the map function to loop over the items in the scores
// array and return to a new array. This gives us a chance to
// work with the array before we return to the new array.
let listItems = scores.map((score) => {
    // Start by creating a li element and append it to 
    // the unordered list. We also create a data attribute to 
    // be able to filter based on it later.
    let li = create("li", true, listEl);
    li.setAttribute("data-score", `${score.score}`);
    // It's important to set the display here to none so that
    // we can toggle it on later.
    li.style.cssText = "list-style:none; display:none;";

    // This is completely optional, I just wanted to make it look nice
    // so I created a container for the name and score elements
    let innerContainer = create("div", true, li);
    innerContainer.style.cssText = 
        "display:flex;justify-content:space-between;"+
        "margin:0 auto; border-bottom: 1px solid black;"+
        "font-size: 18px;";
    // The score elements are placed in seperate span elements
    // so flexbox can space them out to opposite ends of the container
    let nameDisplay = create("span", true, innerContainer);
    let scoreDisplay = create("span", true, innerContainer);
    nameDisplay.innerHTML = `Name: ${score.name}`;
    scoreDisplay.innerHTML = `Score: ${score.score}`;

    // Finally we return the original li element that we created
    return li;
});

/************************************************************
 *          Use the slider library to create the slider     *
 ************************************************************/
// This function comes from the slider library. It targets an 
// html element and then creates the slider from that element
noUiSlider.create(range, {
    // Range, start and step are pretty self explanatory
    range: {"min": 0, "max": 1000},
    start: [100, 500],
    step: 50,
    // The handles cannot go closer to each other than the margin dictates
    margin: 100,
    // Behavior: https://refreshless.com/nouislider/behaviour-option/
    behaviour: "drag-tap-snap",
    // Connect fills the area between the handles with a color
    connect: true,
    direction: "ltr",
    orientation: "horizontal",
    // Pips are the small lines helping users see the values along the bar
    pips: {
        mode: "count",
        values: 11,
        stepped: true,
        density: 5
    }
});

// Property which returns the low and high handle values
// from the slider.
let sliderValues = {
    // range.noUiSlider.get() returns an array with the values,
    // we then get the appropriate index from the array and format it
    get low() {
        return range.noUiSlider.get()[0].split(".")[0];
    },
    get high() {
        return range.noUiSlider.get()[1].split(".")[0];
    }
}

/************************************************************
 *          Filter the items and update labels              *
 ************************************************************/
// This simple function returns true if an object's value is within 
// the values set by the slider
function FilterItems(item) {
    // We get the score of the item
    let score = parseInt(item.getAttribute("data-score"));

    // Then compare it to the slider values. If it is within
    // those values, we return and if not we return false
    if (score >= sliderValues.low && score <= sliderValues.high) {
        return true;
    }
    return false
}

// Whenever the handles on the slider are moved or there is 
// some sort of update on the slider we call this function
range.noUiSlider.on("update", function () {
    // Update the labels to display the currently selected values
    valLabelLow.innerHTML = sliderValues.low;
    valLabelHigh.innerHTML = sliderValues.high;

    // Filter through each of the items on the list and return
    // those who match the criteria back to a new array
    // which will then toggle the display to "inline"
    let displayItems = listItems.filter(item => FilterItems(item));
    displayItems.forEach(item => item.style.display = "inline");

    // Here we do the same thing, except we check for falsy
    // to get the elements that need to be hidden.
    let hideItems = listItems.filter(item => !FilterItems(item));
    // Then we toggle their display to "none"
    hideItems.forEach(item => item.style.display = "none");
});