"use strict";

/************************************************************
 *            Make some functions for convenience           *
 ************************************************************/
// Add a function to the element prototype to simplify adding classes
// it's a little bit pointless but I wanted to see if I could make it work
Element.prototype.addClass = function(c) {
  this.classList.add(c);
}

/****** Create an element, optionally append it to parent and add a class  ******/
function create(el, parent=undefined, c=undefined) {
  let tmpEl = document.createElement(el);
  if (parent !== undefined) {
    parent.appendChild(tmpEl);
  }
  if (c !== undefined) {
    tmpEl.addClass(c);
  }
  return tmpEl;
}

/************************************************************
 *          Creating HTML elements for the project          *
 ************************************************************/
let mainWrapper = create("div", document.body, "mainWrapper");
let buttonArea = create("div", mainWrapper, "buttonArea");
let imageArea = create("div", mainWrapper, "imageArea");

let button = create("div", buttonArea, "tagButton");
button.innerHTML = "Show all";
let buttons = [button];

tags.forEach(tag => {
  let button = create("div", buttonArea, "tagButton");
  button.innerHTML = tag;
  buttons.push(button);
});

images.forEach(image => {
  imageArea.appendChild(image.img);
});

/************************************************************
 *          Make an event listener for the buttons          *
 *           and create the method for the event            *
 ************************************************************/
// I added the event listener to the buttonArea which contains all the buttons
// I wanted to try out event delegation so that if more buttons were added during
// runtime, they could also be clicked
buttonArea.addEventListener("click", FilterImages);

function FilterImages(e) {
  // For the event delegation to work we need to make sure that we're clicking on
  // the right element so if it isn't the button we simply return
  if (e.target.classList[0] !== "tagButton") { return; }
  
  // Here we check if an element has the class "active" on it and then remove it
  buttons.forEach(btn => {
    if (btn.classList.contains("active")){
      btn.classList.remove("active");
      return;
    }
  });

  // If the button clicked is "Show all", we simply loop over 
  // all the images and show them then we return
  if (e.target.innerHTML === "Show all") {
    images.forEach(image => { image.img.style.display = "inline"; });
    e.target.addClass("active");
    return;
  }

  images.forEach(img => {
    // We loop over each image in the array, then we loops over each tag of
    // the item in the array and filter those who match our selected tag
    // then we compare the length of the array returned and if it's higher than 0,
    // that is if any of the tags returned then we display it
    if (img.tags.filter(tag => (tag === e.target.innerHTML)).length > 0) {
      img.img.style.display = "inline";
      e.target.addClass("active");
    } else {
      img.img.style.display = "none";
    }
  });
}
