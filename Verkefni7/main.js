"use strict";


/*******************************************************
 *                                                     *
 *                    Project outline:                 *
 *        - Variables                                  *
 *        - Functions                                  *
 *        - Fetching api and class                     *
 *        - Creating HTML elements                     *
 *        - Event listeners                            *
 *                                                     *
 *******************************************************/


/************************************************************
 *          Declare variables for the project               *
 ************************************************************/

// Array that stores objects from the concert api
let eventElements = [];
// I use the curDate with the date picker and this is the format it accepts
let curDate = moment().format("YYYY MM Do");
let monthAhead = moment(curDate).add(1, "Month");


/************************************************************
 *          Declaring functions for the project             *
 ************************************************************/

/****** Create an element, optionally append it to parent and add a class  ******/
// c = class
function createEl(el, parent=undefined, c=undefined) {
  let tmpEl = document.createElement(el);
  if (parent !== undefined) { parent.appendChild(tmpEl); }
  if (c !== undefined)      { tmpEl.classList.add(c); }
  return tmpEl;
}

/****** This function shows or hides an element based on it's properties  ******/
function showAndHide(el) {
  // We compare the properties to false, if the property is positive, it means that it's disabled
  if      (!el.disabled.date && searchInp.value == "")  el.cont.style.display = "flex";
  else if (!el.disabled.date && !el.disabled.search)    el.cont.style.display = "flex";
  else el.cont.style.display = "none";
}

/****** Update the range for the calendar and checks if an element should be hidden or shown  ******/
function updatedDateRange(fromDate, endDate) {
  // Update the date that is displayed on the calendar.
  datePicker.setDateRange(new Date(fromDate), new Date(endDate));

  // Loop through the elements and compare its' date to the calendar from/end dates
  eventElements.forEach(el => {
    if (moment(el.dateTime[0]).isSameOrAfter(fromDate, "day") 
      && moment(el.dateTime[0]).isSameOrBefore(endDate, "day")) {
        el.disabled.date = false;
    }
    else el.disabled.date = true;
    // Run the showAndHide() function to show or hide an element that may have updated
    showAndHide(el);
  });
}

/****** This is the function that checks whether the search input returns any results  ******/
function textSearch(event) {
  // We start by storing the value of the input, trim it and cast it to lowercase
  let val = searchInp.value.trim().toLowerCase();

  // Short helper function that checks whether the variable "val" occurs in the parameter "compString"
  function compare(compString) { return true ? compString.toLowerCase().indexOf(val) > -1 : false; }

  // If val is empty, which means the input field is empty, then we don't need to hide anything
  if (val == "") eventElements.forEach(el => el.disabled.search = false);

  // Loop through all of our elements and set the hide or display based on val (input)
  eventElements.forEach(el => {
    if (compare(el.title)) {
      el.disabled.search = false;
    }
    else if (compare(el.subTitle)) {
      el.disabled.search = false;
    }
    else if (compare(el.location)) {
      el.disabled.search = false;
    }
    else if (compare(el.host)) {
      el.disabled.search = false;
    }
    else {
      el.disabled.search = true;
    }
    // Every loop we check if we should show or hide the element with the showAndHide() function
    showAndHide(el);
  });
}


/******************************************************************
 *  Fetching data from the api and storing it as class instances  *
 ******************************************************************/

/******  We fetch the api from apis.is  ******/
fetch("https://apis.is/concerts")
  .then((resp) => resp.json()) // Transform the data into json
  .then(function(data) {
    let concertObjs = data.results;
    // We loop through the data we got back from apis.is and create a class instance for each one
    concertObjs.forEach(el => {
      eventElements.push(new EventElement(contentCont, el))
    });
    // We update the date range to start today and end 1 month from now
    updatedDateRange(curDate, monthAhead);
  })
  .catch(function(error) {
  });

/******  This is the class that creates all the elements from the api  ******/
class EventElement
{
  // We take in the parent of the element and the object to be used as parameters
  constructor(parent, concertObj = {}) {
    // this.disabled handles showing and hiding. We use two booleans so that
    // the search function and date function can work together
    this.disabled = {search: false, date:false}

    // Main container, we use this one to hide or show the element
    this.cont = createEl("div", parent, "eventContainer");

    
    /* **************************************************************
     *  Everything below this comment follows the same format       *
     *  first we store some value. Then we create an element,       *
     *  using the values' name with "El" (element) appended to it.  *
     *  Then we work with the data.                                 *
     * **************************************************************/
    this.title = concertObj.name;
    this.titleEl = createEl("h3", this.cont);
    this.titleEl.innerHTML = this.title;

    //Datetime is a bit of an exception because we want to split the date and time
    this.dateTime = concertObj.dateOfShow.split("T");
    
    this.dateEl = createEl("p", this.cont);
    this.dateEl.innerHTML = moment(this.dateTime[0]).format("LLLL").slice(0,-9);

    this.subCont = createEl("div", this.cont);

    this.subTitle = concertObj.eventDateName;
    this.subTitleEl = createEl("p", this.cont);
    this.subTitleEl.innerHTML = this.subTitle;

    this.location = concertObj.eventHallName;
    this.locationEl = createEl("p", this.cont);
    this.locationEl.innerHTML = this.location;

    this.timeEl = createEl("p", this.subCont);
    this.timeEl.innerHTML = this.dateTime[1].slice(0, -3);

    this.host = concertObj.userGroupName;
    this.hostEl = createEl("p", this.subCont);
    this.hostEl.innerHTML = this.host;

    // We store the image to use as a background to an element
    this.image = concertObj.imageSource;

    this.subCont.style.backgroundImage =  `url("${this.image}")`;
    this.subCont.style.backgroundSize = "cover";
  }
}


/***********************************************************************
 *  Creating HTML elements and implementing the calendar date picker   *
 ***********************************************************************/

/******  We start by creating the containers, then their children  ******/
let mainDiv = createEl("div", document.querySelector("body"), "mainDiv");

// cont = container
let navCont = createEl("section", mainDiv, "navCont");

let searchLbl = createEl("label", navCont);
searchLbl.innerHTML = "Search:";

let searchInp = createEl("input", navCont);
searchInp.type = "search";

// dateFrom and dateTo will connected to the calendar
let dateFrom = createEl("input", navCont, "dateInp");
let dateTo = createEl("input", navCont, "dateInp");

let contentCont = createEl("section", mainDiv, "contentCont");

let resetDate = createEl("button", navCont);
resetDate.innerHTML = "Reset";

/******  Here we implement the calendar. We use its' onClose() function to update the results  ******/
const datePicker = new Lightpick({
  // Compressing the options a little
  field: dateFrom, secondField: dateTo, singleDate: false,
  language: moment.locale(), firstDay: 1, format: "ll",
  dropdowns: { years: false, months: true },
  numberOfMonths: 2,
  // When the user has finished selecting dates, the onClose() function fires and we parse the input
  onClose: function() {updatedDateRange(this.getStartDate(), this.getEndDate())}
});


/*********************************************************************
 *  Event listener for the project. "Click", "input" and "keydown"   *
 *********************************************************************/

/******  The button in the top left resets the date to current date + 1 month  ******/
resetDate.addEventListener("click", e => updatedDateRange(curDate, monthAhead));

/******  event listener for the search input field ******/
searchInp.addEventListener("input", textSearch);

/******  Small fallback to ensure that you can search with enter as well - probably not needed  ******/
searchInp.addEventListener("keydown", e => { 
  if (e.keyCode == 13) textSearch(e)
});