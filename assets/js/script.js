// Variables

const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("answers-text"));
const correct_choice = 1;
const max_questions = 10;
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestion = [];

// Start Game Function

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestion = [ ... questions];
    getNewQuestion();
};

// Randomly Get A New Question

getNewQuestion = () => {
    if (availableQuestion === 0 || questionCounter >= max_questions) {
        console.log(10);
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
      }, 1000);
    });
  });

startGame();