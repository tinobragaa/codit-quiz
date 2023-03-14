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
const correct_choice = 1;
const max_questions = 10;

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestion = [];

// Start Area Interface

/**
 * This function take's the user name.
 * This will be used again in different interfaces.
 */
function getInputValue(){
  var userName = document.getElementById("user-name").value;
};

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
    };
};

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
 * availableQuestion connects the questions options.
 * getNewQuestion it's another function called to bring the next question.
 */
startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestion = [ ... questions];
  console.log(availableQuestion);
  getNewQuestion();
};

/**
 * This function builds the structure alongside the startGame function.
 * Contains an if statement that when the maximum amount of questions (10) is reached it changes to the last interface.
 * It gets a random question in the questions options.
 * choice inner function that connects the answer to the data type.
 * For every question taken, it takes out of the array of questions so the same question doesn't repeat itself.
 */
getNewQuestion = () => {
  if (availableQuestion === 0 || questionCounter >= max_questions) {
    questionsArea.classList.add("hide");
    scoreArea.classList.remove("hide");
  };

  questionCounter++;
  const questionIndex = Math.floor(Math.random() * availableQuestion.length);
  currentQuestion = availableQuestion[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach( choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["answer" + number];
  });

  availableQuestion.splice(questionIndex, 1);

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
  
  const classToApply =
  selectedAnswer == currentQuestion.correct ? "correct" : "incorrect";
  selectedChoice.classList.add(classToApply);
  
  setTimeout(() => {
    selectedChoice.classList.remove(classToApply);
    getNewQuestion();
  }, 1200);
  });
});

startGame();

// Score Interface

// Start Again Button to Restart The Quiz
restartButton.addEventListener("click", () => {
  window.location.reload();
}
);