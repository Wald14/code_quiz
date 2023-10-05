var startButton = document.querySelector(".start-button");
var question = document.querySelector(".question")
var instruction = document.querySelector(".instruction")
var answerBox = document.querySelector(".answerBox")
var answerOne = document.querySelector("#answerOne");
var answerTwo = document.querySelector("#answerTwo");
var answerThree = document.querySelector("#answerThree");
var answerFour = document.querySelector("#answerFour");
var wrongAnswers = document.querySelectorAll(".wrong")

var timer;
var questionNumber = 0;
var hasGameEnded = false;
var score = 0;

// Questions (array of objects)
var questions = [ 
  { question: "This is question one?", answer1: "correct", answer2: "wrong", answer3: "wrong", answer4: "wrong"},
  { question: "This is question two?", answer1: "correct again", answer2: "wrong again", answer3: "wrong again", answer4: "wrong again"},
  { question: "This is question three?", answer1: "correct yet again", answer2: "wrong yet again", answer3: "wrong yet again", answer4: "wrong yet again"}
]

startButton.addEventListener("click", startGame);
answerBox.addEventListener("click", nextQuestion);
answerOne.addEventListener("click", increaseScore);
// https://www.codeinwp.com/snippets/add-event-listener-to-multiple-elements-with-javascript/#gref
for (i of wrongAnswers) {
  i.addEventListener("click", function(){
    timer -= 10;
  });
}


function startGame() {
  console.log("Game has been started");
  startButton.style.visibility = "hidden";
  instruction.textContent = "";
  answerBox.style.visibility = "visible";
  // Reset timer to 75 (For multi-play functionality)
  // TODO: MOVE ME TO REST WHEN BACK TO MAIN SCREEN
  timer = 75;
  // Start count down
  countDownTimer();
  nextQuestion();
}


function countDownTimer() {
  console.log("Timer has started")
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    timer--;
    // Display time on screen
    var timerCount = document.querySelector(".timer-count");
    timerCount.textContent = timer;
    if (timer === 0 || hasGameEnded === true) {
      clearInterval(timerInterval);
      endGame()
    }
  }, 1000)
}


function nextQuestion() {
  if (questionNumber < (questions.length)) {
    question.textContent = questions[questionNumber].question;
    answerOne.textContent = questions[questionNumber].answer1;
    answerTwo.textContent = questions[questionNumber].answer2;
    answerThree.textContent = questions[questionNumber].answer3;
    answerFour.textContent = questions[questionNumber].answer4;
    questionNumber++;
  } else {
    endGame()
  }
}


function endGame() {
  hasGameEnded === true;
  answerBox.style.visibility = "hidden";
  document.querySelector(".timerDiv").style.visibility = "hidden";
  instruction.textContent = `Score: ${score}`

  question.textContent = "GAME OVER";

  // https://www.geeksforgeeks.org/how-to-create-a-form-dynamically-with-the-javascript/
  var form = document.createElement("form");

  // Create an input element for initials
  var initials = document.createElement("input");
  initials.setAttribute("type", "text");
  initials.setAttribute("name", "initials");
  initials.setAttribute("placeholder", "Enter Initials");

  // Create a submit button
  var submitBtn = document.createElement("input");
  submitBtn.setAttribute("type", "submit");
  submitBtn.setAttribute("value", "Submit");

  // Append the initals input to the form
  form.append(initials); 
 
  // Append the button to the form
  form.append(submitBtn); 

  document.getElementsByTagName("body")[0]
 .appendChild(form);
}


function increaseScore() {
  score += 10;
}