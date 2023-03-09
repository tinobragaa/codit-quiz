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