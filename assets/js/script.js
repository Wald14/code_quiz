var startBoxEl = document.querySelector("#startBox");
var questionBoxEl = document.querySelector("#question-box");
var userInputBoxEl = document.querySelector("#user-input-box");
var highScoreBoxEl = document.querySelector("high-score-box");
var startBtnEl = document.querySelector("#start-button");

// Questions (array of objects)
var questions = [
  {
    question: "This is question one?",
    choices: ["wrong", "correct", "wrong", "wrong"],
    answer: "correct"
  },
  {
    question: "This is question two?",
    choices: ["wrong", "wrong", "wrong", "correct"],
    answer: "correct"
  },
  {
    question: "This is question three?",
    choices: ["correct", "wrong", "wrong", "wrong"],
    answer: "correct"
  }
]

function startGame() {
  startBoxEl.classList.add("hide");
  questionBoxEl.classList.remove("hide");

}

startBtnEl.addEventListener("click", startGame);