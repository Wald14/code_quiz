var startButton = document.querySelector(".start-button");
var question = document.querySelector(".question")
var instruction = document.querySelector(".instruction")

var timer;

// Questions (array of objects)
var questions = [ 
  {
    question: "This is question one",
    answer1: "correct",
    answer2: "wrong",
    answer3: "correct",
    answer4: "wrong"
  },
  {
    question: "This is question two",
    answer1: "correct again",
    answer2: "wrong again",
    answer3: "wrong again",
    answer4: "wrong again"
  },
  {
    question: "This is question three",
    answer1: "correct yet again",
    answer2: "wrong yet again",
    answer3: "wrong yet again",
    answer4: "wrong yet again"
  }
]

startButton.addEventListener("click", startGame);


function startGame() {
  console.log("Game has been started");
  startButton.style.visibility = "hidden";
  instruction.style.visibility = "hidden";
  // Reset timer to 75 (For multi-play functionality)
  // TODO: MOVE ME TO REST WHEN BACK TO MAIN SCREEN
  timer = 75;
  // Start count down
  countDownTimer();
  askQuestions();
}


function countDownTimer() {
  console.log("Timer has started")
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    timer--;
    // Display time on screen
    var timerCount = document.querySelector(".timer-count");
    timerCount.textContent = timer;
    if (timer === 0) {
      clearInterval(timerInterval);
      // TODO: FUNCTION TO END GAME
    }
  }, 1000)
}


function askQuestions() {
  console.log("askQuestions function started")
  question.textContent = questions[0].question;

  // https://www.w3schools.com/jsref/dom_obj_pushbutton.asp
  var buttonA = document.createElement("BUTTON");
  buttonA.appendChild(document.createTextNode(questions[0].answer1));
  document.body.appendChild(buttonA);

  
}