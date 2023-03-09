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

// Questions and Answers

let questions = [
    {
        question: "The snippet that has to be used to check if 'a' is not equal to 'null' is",
        answer1: "if(a!null)",
        answer2: "if(a!=null)",
        answer3: "if (!a)",
        answer4: "if(a!==null)",
        correct: 4
    },
    {
        question: "JavaScript code is written inside file having extension:",
        answer1: ".jvs",
        answer2: ".js",
        answer3: ".jsc",
        answer4: ".javascript",
        correct: 2
    },
    {
        question: "Arrays in JavaScript are defined by which of the following statements?",
        answer1: "Ordered list of values",
        answer2: "Ordered list of objects",
        answer3: "Ordered list of strings",
        answer4: "Ordered list of functions",
        correct: 1
    },
    {
        question: "The expression of calling (or executing) a function or method in JavaScript is called:",
        answer1: "Primary Expression",
        answer2: "Functional Expression",
        answer3: "Invocation Expression",
        answer4: "Property Access Expression",
        correct: 3
    },
    {
        question: "We can declare all type of variables in JavaScript with the keyword:",
        answer1: "var",
        answer2: "obj",
        answer3: "jvar",
        answer4: "cre",
        correct: 1
    },
    {
        question: "JavaScript code can be called by using:",
        answer1: "RMI",
        answer2: "Preprocessor",
        answer3: "Function or Method",
        answer4: "Array",
        correct: 3
    },
    {
        question: "Multiple Declarations of variables are separated by _____ symbol.",
        answer1: "Colon",
        answer2: "Semicolon",
        answer3: "Asterisk",
        answer4: "Comma",
        correct: 4
    },
    {
        question: "Add and Assignment operator is shown by which of the following symbol?",
        answer1: "+==",
        answer2: "+=",
        answer3: "=+",
        answer4: "==+",
        correct: 2
    },
    {
        question: "Which is the function used to loop in an array to view all the values?",
        answer1: "each()",
        answer2: "all()",
        answer3: "loop()",
        answer4: "while()",
        correct: 1
    },
    {
        question: "How do you find the number with the highest value of x and y?",
        answer1: "Math.ceil(x,y)",
        answer2: "ceil(x,y)",
        answer3: "top(x,y)",
        answer4: "Math.max(x,y)",
        correct: 4
    },
    {
        question: "Which of the following is the assignment operator?",
        answer1: "=",
        answer2: "===",
        answer3: "->",
        answer4: "<-",
        correct: 1
    },
    {
        question: "How many reserved words are there in JavaScript?",
        answer1: "94",
        answer2: "63",
        answer3: "48",
        answer4: "37",
        correct: 2
    },
    {
        question: "The unordered collection of properties, each of which has a name and a value is called:",
        answer1: "Object",
        answer2: "String",
        answer3: "Serialized Object",
        answer4: "Array",
        correct: 1
    },
    {
        question: "What is the significance of scripting?",
        answer1: "Convenient",
        answer2: "Static",
        answer3: "Dynamic",
        answer4: "Reachable",
        correct: 3
    },
    {
        question: "How to assign the image source in JavaScript?",
        answer1: "image.src = 'url'",
        answer2: "image = 'url'",
        answer3: "source('url')",
        answer4: "img = src=''",
        correct: 1
    },
    {
        question: "Which event handler is triggered when the user mouse moves onto a link?",
        answer1: "onMouseOnto",
        answer2: "onMouse",
        answer3: "onMouseOut",
        answer4: "onMouseOver",
        correct: 4
    },
    {
        question: "How to find the index of a particular string?",
        answer1: "indexOf()",
        answer2: "position()",
        answer3: "index()",
        answer4: "getElementByIndex()",
        correct: 1
    },
    {
        question: "How do you focus a particular part of the HTML page in JavaScript?",
        answer1: "on()",
        answer2: "hover()",
        answer3: "focus()",
        answer4: "active()",
        correct: 3
    },
    {
        question: "JavaScript is a _____ language.",
        answer1: "Object-Based",
        answer2: "Assembly-language",
        answer3: "High-level",
        answer4: "Object-Oriented",
        correct: 1
    },
    {
        question: "Which of the following Attribute is used to include External JS code inside your HTML Document:",
        answer1: "link",
        answer2: "script",
        answer3: "src",
        answer4: "ext",
        correct: 3
    }
]

// Start Game Function

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestion = [ ... questions];
    console.log(availableQuestion);
    getNewQuestion();
};