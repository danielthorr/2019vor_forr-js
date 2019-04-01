"use strict";

let range = document.getElementById("range");

noUiSlider.create(range, {
    range: {"min": 5, "max": 100},

    step: 5,

    start: [10, 50],

    margin: 10,

    connect: true,

    direction: "rtl",
    orientation: "vertical",

    behavior: "tap-drag",
    tooltops: true,

    pips: {
        mode: "steps",
        stepped: true,
        density: 4
    }

    });