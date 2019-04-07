"use strict";

/************************************************************
 *            Create a class to easily create images        *
 ************************************************************/
class ImgClass
{
  constructor(name, src, tags = []) {
    this.name = name;
    this.src = src;
    this.tags = tags;

    this.height = 200;
    this.img = new Image();
    this.img.src = this.src;
    this.img.height = this.height;

    this.AddDataAttribute();
  }

  // This data attribute was never used but I decided to keep it just in case
  AddDataAttribute(){
    // We loop through the tags array with an Array.map() function to return
    // a new array, but we apply join() on it to return it as a string.
    let arrToString = this.tags.map(tag => {return tag;}).join();
    this.img.setAttribute("data-tags", arrToString);
  }
}

/************************************************************
 *  Fill an array with images, using the image class        *
 ************************************************************/
let images = [
  new ImgClass("Architecture 1", "images/architecture1.jpg", ["Architecture", "Tree", "Modern"]),
  new ImgClass("Architecture 2", "images/architecture2.jpg", ["Architecture", "Tree", "Nature"]),
  new ImgClass("Architecture 3", "images/architecture3.jpg", ["Architecture", "Modern", "Highrise"]),
  new ImgClass("Forest 1", "images/forest1.jpg", ["Nature", "Tree", "Forest"]),
  new ImgClass("Forest 2", "images/forest2.jpg", ["Nature", "Tree", "Sun"]),
  new ImgClass("Forest 3", "images/forest3.jpg", ["Nature", "Rock", "Tree"]),
  new ImgClass("Forest 4", "images/forest4.jpg", ["Nature", "Tree", "Birds Eye"]),
  new ImgClass("Rock 1", "images/rock1.jpg", ["Tree", "Nature", "Rock"]),
  new ImgClass("Rock 2", "images/rock2.jpg", ["Rock", "Sea", "Birds Eye"]),
  new ImgClass("Sea 1", "images/sea1.jpg", ["Sea", "Beach", "Sun"]),
  new ImgClass("Sea 2", "images/sea2.jpg", ["Sea", "Beach", "Tree"]),
  new ImgClass("Sea 3", "images/sea3.jpg", ["Sea", "Beach", "Birds Eye"])
];

/************************************************************
 *        Work with arrays to get the data we need          *
 ************************************************************/
/****** Fill an array with all of the tags we have available ******/
let tags = [];
images.forEach((img) => {
  img.tags.forEach(tag => {
    tags.push(tag);
  });
});

/****** Filter out duplicates from the tags array and sort it  ******/
// Filter solution found here: 
// https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
tags = tags.filter((t, i, self) => self.indexOf(t) === i);
// Sort tags alphabetically
tags = tags.sort((a, b) => a>b ? 1 : -1);