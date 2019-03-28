"use strict";

class Question {
  
  constructor(question, options, corrAnswer) {
    this.question = question;
    this.options = options;
    this.corrAnswer = corrAnswer;
    this.answered = false;
  }
}

let questions = [ 
  new Question("Hvað er 2 + 3?", ["3", "4", "5", "6"], 2), 
  new Question("Er Javascript skemmtilegt forritunarmál?", ["Já", "Nei"], 0)
];
let stage = 0;