var startButton = document.querySelector(".start-button");
var questionEl = document.querySelector("#question")
var midSection = document.querySelector(".mid-section")
var instruction = document.querySelector(".instruction")
var answerBox = document.querySelector("#answerBox");
var questionBox = document.querySelector("#questionBox");
var wrongAnswers = document.querySelectorAll(".wrong")
var timerCount = document.querySelector(".timer-count");
var gameOverBox = document.querySelector("#userInput");

var timerInterval;
var timer = 75;
var questionNumber = 0;
var hasGameEnded = false;
var score = 0;
var highScoreArray = [];

// Questions (array of objects)
var questions = [
  {
    question: "1+1?",
    choices: [0, 2, 5, "banana"],
    answer: 2
  },
  {
    question: "11+2?",
    choices: ["correct", "wrong", "wrong", "wrong"],
    answer: "correct"
  },
  {
    question: "3+1?",
    choices: ["correct", "wrong", "wrong", "wrong"],
    answer:"correct"
  }
]

startButton.addEventListener("click", startGame);
// answerBox.addEventListener("click", function(event){
//   if(event.target.matches(".answer")){
//     nextQuestion();
//   }
// });
// answerOne.addEventListener("click", increaseScore);


// https://www.codeinwp.com/snippets/add-event-listener-to-multiple-elements-with-javascript/#gref
// for (i of wrongAnswers) {
//   i.addEventListener("click", function(){
//     timer -= 10;
//   });
// }



function startGame() {
  // console.log("Game has been started");
  midSection.classList.add('hide')
  questionBox.classList.remove('hide')

  // Reset timer to 75 (For multi-play functionality)
  // Start count down
  countDownTimer();
  nextQuestion();
}


function countDownTimer() {
  // console.log("Timer has started")
  // Sets interval in variable
  timerInterval = setInterval(function () {
    timer--;
    // Display time on screen

    timerCount.textContent = timer;

    if (timer <= 0) {

      endGame();
    }
  }, 1000)
}


function nextQuestion() {
  questionEl.textContent = questions[questionNumber].question;

  answerBox.innerHTML = ''

  for (var i = 0; i < questions[questionNumber].choices.length; i++) {
    // create the button 
    var button = document.createElement("button");
    // add the text content of the button 
    button.textContent = questions[questionNumber].choices[i];
    button.addEventListener('click', increaseScore)

    // append the button to the answerBox
    answerBox.append(button);

  }

}

function increaseScore() {
  //  console.log(this.textContent);

  if (this.textContent !== questions[questionNumber].answer) {
    timer -= 10;
  }

  questionNumber++;

  if(questionNumber === questions.length){
    endGame()
  }else {
    nextQuestion()
  }
}


function endGame() {
  clearInterval(timerInterval);
  questionBox.classList.add('hide')
  gameOverBox.classList.remove('hide')

  // hasGameEnded === true;
  // answerBox.style.visibility = "hidden";
  // document.querySelector(".timerDiv").style.visibility = "hidden";
  // instruction.textContent = `Score: ${score}`

  // question.textContent = "GAME OVER";

  // Create an input element for initials
  var initials = document.createElement("input");
  initials.setAttribute("type", "text");
  initials.setAttribute("id", "initials");
  initials.setAttribute("placeholder", "Enter Initials");

  // Create a submit button
  var submitBtn = document.createElement("input");
  submitBtn.setAttribute("type", "submit");
  submitBtn.setAttribute("value", "Submit");
  submitBtn.setAttribute("id", "player-initials");
  submitBtn.addEventListener("click", function () {
    console.log(`Player ${initials.value} had a score of ${score}`);
    highScoreArray.push({ player: initials.value, score: score });
    console.log(highScoreArray);
  }
  )

  // Append initial input and submit button to page
  gameOverBox.append(initials, submitBtn);


}

// Display High Score Table
// function displayHighScore