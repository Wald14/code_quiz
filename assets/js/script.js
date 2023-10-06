// Element Queries
var startBoxEl = document.querySelector("#startBox");
var questionBoxEl = document.querySelector("#question-box");
var userInputBoxEl = document.querySelector("#user-input-box");
var highScoreBoxEl = document.querySelector("#high-score-box");
var startBtnEl = document.querySelector("#start-button");
var timerCountEl = document.querySelector("#time-count");
var questionEl = document.querySelector("#question");
var answerBoxEl = document.querySelector("#answer-box");


// Global Variables
var timerInterval;
var timer = 75;
var qNumber = 0;


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

  countDownTimer();
  cycleQuestions();
}


function countDownTimer() {
  timerInterval = setInterval(function () {
    // Subtract 1 from timer
    timer--;
    // Display time on screen
    timerCountEl.textContent = timer;
    // End Game if timer hits zero OR goes below zero because the player gets a 10 second penalty with less then 10 seconds left, causing timer to go below 0.
    if (timer <= 0) {
      endGame();
    }
  }, 1000)
}


function cycleQuestions() {
  // Sets <h2> to display current question
  questionEl.textContent = questions[qNumber].question;
  console.log(questions[qNumber].question);
  // clears answers (if any)
  answerBoxEl.innerHTML = "";

  // adds a button for each answer from the "choice" array for said question
  for (var i = 0; i < questions[qNumber].choices.length; i++) {
    var button = document.createElement("button");
    // add the text content of the button 
    button.textContent = questions[qNumber].choices[i];
    button.addEventListener('click', increaseScore)
    // append the button to the answerBox
    answerBoxEl.append(button);
  }
}

function increaseScore() {

}


function endGame() {

}



startBtnEl.addEventListener("click", startGame);