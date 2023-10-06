// Element Queries
var startBoxEl = document.querySelector("#startBox");
var questionBoxEl = document.querySelector("#question-box");
var feedbackBoxEl = document.querySelector("#feedback-box");
var userInputBoxEl = document.querySelector("#user-input-box");
var highScoreBoxEl = document.querySelector("#high-score-box");
var startBtnEl = document.querySelector("#start-button");
var timerCountEl = document.querySelector("#time-count");
var questionEl = document.querySelector("#question");
var answerBoxEl = document.querySelector("#answer-box");
var highScoreBtnEl = document.querySelector("#high-score-button");
var headerEl = document.querySelector("header");
var correctOrWrongEl = document.querySelector("#correct-or-wrong");


// Global Variables
var timerInterval;
var timer = 75;
var qNumber = 0;
var score = 0;

// Global Arrays
var highScoreArray = loadHighScoreArray();
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

// Functions
function startGame() {
  startBoxEl.classList.add("hide");
  questionBoxEl.classList.remove("hide");
  countDownTimer();
  displayQuestion();
}


function countDownTimer() {
  timerInterval = setInterval(function () {
    // Subtract 1 from timer
    timer--;

    // Display time on screen
    timerCountEl.textContent = timer;

    // End Game if timer hits zero OR goes below zero because the player gets a 10 second penalty with less then 10 seconds left, causing timer to go below 0.
    if (timer <= 0) {
      timerCountEl.textContent = "0"
      endGame();
    }
  }, 1000)
}


function displayQuestion() {
  // Sets <h2> to display current question
  questionEl.textContent = questions[qNumber].question;

  // clears answers (if any)
  answerBoxEl.innerHTML = "";

  // adds a button for each answer from the "choice" array for said question
  // when a button is clicked, the cycleQuestion function is called
  for (var i = 0; i < questions[qNumber].choices.length; i++) {
    var button = document.createElement("button");

    // add the text content of the button 
    button.textContent = questions[qNumber].choices[i];
    button.addEventListener('click', cycleQuestion)

    // append the button to the answerBox
    answerBoxEl.append(button);
  }
}


function cycleQuestion() {
  // Check if the wrong answer was selected and hand out 10 second penalty if so
  if (this.textContent !== questions[qNumber].answer) {
    timer -= 10;
    correctOrWrongEl.textContent = "WRONG"
  } else {
    score += 10;
    correctOrWrongEl.textContent = "CORRECT"
  }

  // Increase question number to index to the next question
  qNumber++;

  // If the last question was answered, end the game, otherwise display the next question
  if(qNumber === questions.length){
    endGame()
  } else {
    displayQuestion()
  }
}


function endGame() {
  // Cancels timer
  clearInterval(timerInterval);

  // Hide question box and show user input box
  questionBoxEl.classList.add("hide");
  userInputBoxEl.classList.remove("hide");

  // Create <h4> with users final score
  var userScore = document.createElement("h4");
  userScore.textContent = `Score: ${score}`;

  // Create input for user to submit initials
  var initialInputField = document.createElement("input");
  initialInputField.setAttribute("type", "text");
  initialInputField.setAttribute("placeholder", "Enter Initials");

  // Create submit button
  var submitBtn = document.createElement("input");
  submitBtn.setAttribute("type", "submit");

  // Append to userInputBox
  userInputBoxEl.append(userScore, initialInputField, submitBtn);

  // Event listener for initals submission button
  submitBtn.addEventListener("click", function () {

    // console.log(`Player ${initialInputField.value} had a score of ${score} and was added to highScoreArray`);
    highScoreArray.push({ player: initialInputField.value, score: score });

    // Save high score data to local storage
    saveHighScoreArray();

    // Display High Score Table;
    highScoreDisplay();
  })
}


function highScoreDisplay () {
  // Hide userInput box OR startBox OR QuestionBox depending on where user is navigating from
  // Show high score box
  userInputBoxEl.classList.add("hide");
  startBoxEl.classList.add("hide");
  questionBoxEl.classList.add("hide");
  headerEl.classList.add("hide");
  highScoreBoxEl.classList.remove("hide");

  // Cancels timer in the event the user clicked mid game
  clearInterval(timerInterval);

  // Sort scoreboard by highest score
  filterArrayOfObjects();

  // Create Table Element
  var highScoreTable = document.createElement("table");

  // Create table header
  var tableHeaderRow = document.createElement("tr");
  var tableHeaderPlayer = document.createElement("th");
  tableHeaderPlayer.textContent = "PLAYER";
  var tableHeaderScore = document.createElement("th");
  tableHeaderScore.textContent = "SCORE";
  tableHeaderRow.append(tableHeaderPlayer, tableHeaderScore);
  highScoreTable.append(tableHeaderRow);

  // create table rows with cell data
  for (var i = 0; i < highScoreArray.length; i++){
    // pull values from objects in array
    var values = Object.values(highScoreArray);

    // create row
    var row = document.createElement("tr");

    // create player cell and populate
    var playerCell = document.createElement("td");
    playerCell.textContent = values[i].player;

    // create score cell and populate
    var scoreCell = document.createElement("td");
    scoreCell.textContent = values[i].score;

    // append cells to row and row to table
    row.append(playerCell, scoreCell);
    highScoreTable.append(row);
  }
  // append table to high score box
  highScoreBoxEl.append(highScoreTable);


  // create buttons for return
  var returnBtn = document.createElement("button")
  returnBtn.textContent = "Go Back";
  returnBtn.addEventListener("click", function(){
    location.reload()
  })
  highScoreBoxEl.append(returnBtn);

  // create buttons for clearing high score
  var clearScoresBtn = document.createElement("button")
  clearScoresBtn.textContent = "Clear Highscores";
  clearScoresBtn.addEventListener("click", function() {
    localStorage.removeItem("High-Score-Array")
    // highScoreArray = [];
    location.reload();
  })
  highScoreBoxEl.append(clearScoresBtn);
}


function filterArrayOfObjects() {
  highScoreArray.sort(function(a,b) {
    if(a.score > b.score){
      return -1;
    }
  })
}


function saveHighScoreArray() {
  localStorage.setItem("High-Score-Array", JSON.stringify(highScoreArray));
}

function loadHighScoreArray() {
  highScoreArray = JSON.parse(localStorage.getItem("High-Score-Array"));
  if (highScoreArray === null){
    return [];
  } else {
  return highScoreArray;
  }
}

startBtnEl.addEventListener("click", startGame);
highScoreBtnEl.addEventListener("click", highScoreDisplay);