var startButton = document.querySelector(".start-button");

var timer;

startButton.addEventListener("click", startGame);

function startGame() {
  console.log("Game has been started");

  // Reset timer to 75 (For multi-play functionality)
  timer = 75;

  // Start count down
  countDownTimer();
}


function countDownTimer() {

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

console.log("JavaScript Loaded")