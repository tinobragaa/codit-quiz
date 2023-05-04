// Code reference from https://www.youtube.com/watch?v=u98ROZjBWy8&list=PLDlWc9AfQBfZIkdVaOQXi1tizJeNJipEx
// Code reference from https://stackdiary.com/enable-disable-button-javascript/

// Variables
const startArea = document.getElementById("start-area");
const rulesArea = document.getElementById("rules-area");
const questionsArea = document.getElementById("questions-area");
const scoreArea = document.getElementById("score-area");
const submitButton = document.getElementById("user-submit");
const formInput = document.querySelector(".form-input");
const startQuiz = document.getElementById("start-quiz-btn");
const restartButton = document.getElementById("restart-btn");
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("answers-text"));
const correctAnswer = 10;
const totalQuestions = 10;
const counterDisplay = document.getElementById("questionCounter");
const scoreDisplay = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let questionsSet = [];
let userName = document.getElementById("user-name").value;

// Start Area Interface

/**
 * This function takes the user's name from the start interface and applies it to the rules and score interface.
 */
function getUserName() {
  let userNameInput = document.getElementById("user-name");
  let userName = userNameInput.value.trim();
  let rulesText = document.getElementById("rules-text");
  let scoreText = document.getElementById("score-text");
  let errorMessage = document.getElementById("error-message");

  if (userName === "" || userName.length < 3 || userName.length > 10 || /\d/.test(userName)) {
    userNameInput.value = "";
    submitButton.disabled = true;
    errorMessage.textContent = "Please enter a valid name (3-10 letters and no numbers)";
    errorMessage.style.display = "block";
    return;
  } else {
    errorMessage.style.display = "none";
  }

  rulesText.innerText = `So, ${userName}, the rules are pretty simple. This test contains 10 questions and you'll have to answer between a, b, c and d. In the end you will see how many you got it right.`;
  scoreText.innerText = `Good job, ${userName}, you did it!`;

  submitButton.disabled = false;
  errorMessage.style.display = "none";
}

// Submit Button to Load Rules Interface
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
    }
}

// Rules Interface

// Start Quiz Button to Load Quiz Interface
startQuiz.addEventListener("click", () => {
  rulesArea.classList.add("hide");
  questionsArea.classList.remove("hide");
});

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
  questionsSet = [ ... questions];
  getNewQuestion();
};

/**
 * This function builds the structure alongside the runQuiz function.
 * Contains an if statement that when the maximum amount of questions (10) is reached it changes to the last interface.
 * It gets a random question in the questions options.
 * choice inner function that connects the answer to the data type.
 * For every question taken, it takes out of the array of questions so the same question doesn't repeat itself.
 */
getNewQuestion = () => {
  if (questionsSet === 0 || questionCounter >= totalQuestions) {
    questionsArea.classList.add("hide");
    scoreArea.classList.remove("hide");
  }

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
};

/**
 * This function adds an event click to the answers buttons.
 * If correct or incorrect, it applies the corresponding class to change the background colour of the button.
 * It sets a time after the question is answered to go to the next one.
 */
choices.forEach(choice => {
  choice.addEventListener("click", e => {
  if (!acceptingAnswers) return;
  
  acceptingAnswers = false;
  const selectedChoice = e.target;
  const selectedAnswer = selectedChoice.dataset["number"];
  
  const addClass =
  selectedAnswer == currentQuestion.correct ? "correct" : "incorrect";

  if (addClass === "correct") {
    incrementScore(correctAnswer);
  }

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

// Score Interface

// Start Again Button to Restart The Quiz
restartButton.addEventListener("click", () => {
  window.location.reload();
});