// Variables
const startArea = document.getElementById("start-area");
const nameInput = document.getElementById("user-name");
const rulesArea = document.getElementById("rules-area");
const questionsArea = document.getElementById("questions-area");
const scoreArea = document.getElementById("score-area");
const submitButton = document.getElementById("user-submit");
const formInput = document.querySelector(".form-input");
const startQuiz = document.getElementById("start-quiz-btn");
const restartButton = document.getElementById("restart-btn");
const answerButton1 = document.getElementById("answer-btn-1");
const answerButton2 = document.getElementById("answer-btn-2");
const answerButton3 = document.getElementById("answer-btn-3");
const answerButton4 = document.getElementById("answer-btn-4");
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("answers-text"));
const correctAnswer = 10;
const totalQuestions = 10;
const counterDisplay = document.getElementById("questionCounter");
const scoreDisplay = document.getElementById("score");
const timerElement = document.getElementById("timer");
const saveButton = document.getElementById("save-btn");
const scoreboardArea = document.getElementById("scoreboard-area");
const playButton = document.getElementById("play-again-btn");
const scoreboardList = JSON.parse(localStorage.getItem("scores")) || [];
const scoreboardDisplay = document.getElementById("scoreboard-display");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let questionsSet = [];
let userName = null
let timeLeft;
let timer;

// Start Area Interface

/**
 * This function takes the user's name from the start interface and applies it to the rules and score interface.
 */
function getUserName() {
  let userNameInput = document.getElementById("user-name");
  userName = userNameInput.value.trim();
  let rulesText = document.getElementById("rules-text");
  let scoreText = document.getElementById("score-text");
  let errorMessage = document.getElementById("error-message");

  // Code to enable/disable buttons, credit:
  // https://stackdiary.com/enable-disable-button-javascript/
  if (userName === "" || userName.length < 3 || userName.length > 10 || /\d/.test(userName)) {
    userNameInput.value = "";
    submitButton.disabled = true;
    errorMessage.textContent = "Please enter a valid name (3-10 letters and no numbers)";
    errorMessage.style.display = "block";
    return;
  } else {
    errorMessage.style.display = "none";
  };

  rulesText.innerText = `So, ${userName}, the rules are pretty simple. 
  This test contains 10 questions and you'll have to select one option among the four options provided.
  In the end you will see how many you got it right.`;

  scoreText.innerText = `Good job, ${userName}, you did it!`;

  submitButton.disabled = false;
  errorMessage.style.display = "none";
};

// Submit button to load rules interface
submitButton.addEventListener("click", () => {
  startArea.classList.add("hide");
  rulesArea.classList.remove("hide");
});

submitButton.disabled = true; 
formInput.addEventListener("keyup", setButtonState);

/**
 * This function prevents the user to continue the game without filling in the input field.
 * When the user clicks without filling in the input field, an alert message shows up.
 */
function setButtonState() {
    if (document.querySelector(".form-input").value === "") {
        submitButton.disabled = true;
    } else {
        submitButton.disabled = false;
    };
};

/**
 * This function resets the user name input to default state.
 */
function resetInputField() {
  nameInput.value = ""; // Set the value to an empty string
}

// Rules Interface

// Start quiz button to load quiz interface
startQuiz.addEventListener("click", () => {
  rulesArea.classList.add("hide");
  questionsArea.classList.remove("hide");
  startTimer();
});

// Questions Interface

// Code to build main function, credit: 
// https://www.youtube.com/watch?v=u98ROZjBWy8&list=PLDlWc9AfQBfZIkdVaOQXi1tizJeNJipEx
/**
 * This function establishes the structure of the quiz.
 * questionCounter counts in which question the users are on. In the beginning, it starts at 0.
 * score counts how many correct answers the user has.
 * questionsSet connects the questions options.
 * getNewQuestion it's another function called to bring the next question.
 */
runQuiz = () => {
  questionCounter = 0;
  score = 0;
  scoreDisplay.innerText = score;
  questionsSet = [ ... questions];
  getNewQuestion();
  stopTimer();
};

/**
 * This function builds the structure alongside the runQuiz function.
 * Contains an if statement that when the maximum amount of questions (10) is reached it changes to the last interface.
 * It gets a random question in the questions options.
 * choice inner function that connects the answer to the data type.
 * For every question taken, it takes out of the array of questions so the same question doesn't repeat itself.
 */
getNewQuestion = () => {
  stopTimer();
  answerButton1.removeAttribute("disabled", "disabled");
  answerButton2.removeAttribute("disabled", "disabled");
  answerButton3.removeAttribute("disabled", "disabled");
  answerButton4.removeAttribute("disabled", "disabled");
  answerButton1.classList.add("hover");
  answerButton2.classList.add("hover");
  answerButton3.classList.add("hover");
  answerButton4.classList.add("hover");
  answerButton1.classList.remove("red-background");
  answerButton2.classList.remove("red-background");
  answerButton3.classList.remove("red-background");
  answerButton4.classList.remove("red-background");
  if (questionsSet === 0 || questionCounter >= totalQuestions) {
    return showScore();
  };

  questionCounter++;
  counterDisplay.innerText = `${questionCounter}/${totalQuestions}`;

  const questionIndex = Math.floor(Math.random() * questionsSet.length);
  currentQuestion = questionsSet[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach( choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["answer" + number];
  });

  questionsSet.splice(questionIndex, 1);

  acceptingAnswers = true;

  timeLeft = 30;
  timerElement.innerText = timeLeft;
  startTimer();
};

/**
 * This function adds an event click to the answers buttons.
 * If correct or incorrect, it applies the corresponding class to change the background colour of the button.
 * It sets a time after the question is answered to go to the next one.
 */
choices.forEach(choice => {
  choice.addEventListener("click", e => {
  stopTimer()
  if (!acceptingAnswers) return;
  acceptingAnswers = false;
  const selectedChoice = e.target;
  const selectedAnswer = selectedChoice.dataset["number"];
  
  const addClass =
  selectedAnswer == currentQuestion.correct ? "correct" : "incorrect";

  if (addClass === "correct") {
    incrementScore(correctAnswer);
  };

  selectedChoice.classList.add(addClass);
  
  setTimeout(() => {
    selectedChoice.classList.remove(addClass);
    getNewQuestion();
  }, 1200);
  });
});


/** 
* This function increaser the user's score for every correct 
*/
incrementScore = num => {
  score += num;
  scoreDisplay.innerText = score;

  let resultDisplay = document.getElementById("result-display");
  resultDisplay.innerText = score;
};

runQuiz();

/** 
* This function sets timer to 30 seconds.
*/
function startTimer() {
  timer = setInterval(function () {
      countdown();
      timerElement.innerText = timeLeft;
  }, 1000);
};


/** 
* This function Counts down from 30 seconds on each question, prevents users 
* from clicking answer buttons once timer reaches 0 and boldens nextButton.
*/
function countdown() {
  if (timeLeft === 0) {
      stopTimer();
      answerButton1.setAttribute("disabled", "disabled");
      answerButton2.setAttribute("disabled", "disabled");
      answerButton3.setAttribute("disabled", "disabled");
      answerButton4.setAttribute("disabled", "disabled");
      answerButton1.classList.remove("hover");
      answerButton2.classList.remove("hover");
      answerButton3.classList.remove("hover");
      answerButton4.classList.remove("hover");
      answerButton1.classList.add("red-background");
      answerButton2.classList.add("red-background");
      answerButton3.classList.add("red-background");
      answerButton4.classList.add("red-background");
      setTimeout(() => {
        getNewQuestion();
      }, 2800);
  } else {
      timeLeft--;
  };
};

choices.disabled = true;

/** 
* This function stops the timer.
*/
function stopTimer() {
  clearInterval(timer);
};


/** 
* This function shows the scoreArea.
*/
function showScore() {
  questionsArea.classList.add("hide");
  scoreArea.classList.remove("hide");
};

// Score Interface

// Start again button to restart the quiz
restartButton.addEventListener("click", () => {
  window.location.reload();
});

// Save score button to load scoreboard interface
saveButton.addEventListener("click", () => {
  scoreArea.classList.add("hide");
  scoreboardArea.classList.remove("hide");

  const userScore = {
    name: userName,
    score: score,
    date: new Date().toLocaleDateString(),
  };

  scoreboardList.push(userScore);

  localStorage.setItem("scoreboardList", JSON.stringify(scoreboardList));

  const lastFiveScores = scoreboardList.slice(-5); // Get the last 5 scores

  scoreboardDisplay.innerHTML = lastFiveScores.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
  }).join('');
});

// Scoreboard Interface

// Play again button to restart the quiz
playButton.addEventListener("click", () => {
  restartQuiz();
});

/** 
* This function restarts the game.
*/
function restartQuiz() {
  scoreboardArea.classList.add("hide");
  startArea.classList.remove("hide");
  stopTimer();
  runQuiz();
  stopTimer();
  resetInputField();
};