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

// Get User Name
function getInputValue(){
  var userName = document.getElementById("user-name").value;
  console.log(userName);
}

// Submit Button to Load Rules Interface
submitButton.addEventListener("click", () => {
  startArea.classList.add("hide");
  rulesArea.classList.remove("hide");
}
);

submitButton.disabled = true; 
formInput.addEventListener("keyup", buttonState);

// Disable the buttons until the the user fill the input field
function buttonState() {
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
}
);

// Start Game Function
startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestion = [ ... questions];
  console.log(availableQuestion);
  getNewQuestion();
};

// Randomly Get A New Question
getNewQuestion = () => {
    if (availableQuestion === 0 || questionCounter >= max_questions) {
      questionsArea.classList.add("hide");
      scoreArea.classList.remove("hide");
    }
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

// Move To Next Question When Clicked
choices.forEach(choice => {
    choice.addEventListener("click", e => {
      if (!acceptingAnswers) return;
  
      acceptingAnswers = false;
      const selectedChoice = e.target;
      const selectedAnswer = selectedChoice.dataset["number"];
      console.log(selectedAnswer);
      console.log(selectedChoice);
      console.log(currentQuestion.answer);
  
      const classToApply =
        selectedAnswer == currentQuestion.correct ? "correct" : "incorrect";
        console.log(classToApply);
  
      selectedChoice.classList.add(classToApply);
  
      setTimeout(() => {
        selectedChoice.classList.remove(classToApply);
        getNewQuestion();
      }, 1);
    });
  });

startGame();

// Score Interface

// Start Again Button to Restart The Quiz
restartButton.addEventListener("click", () => {
  window.location.reload();
}
);