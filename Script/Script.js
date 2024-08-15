
const question = document.getElementById("question");
// document.getElementById("question") looks for the element with ID "question"
// const question is used to declare the constant variable and here the variable name is question

const choices = Array.from(document.getElementsByClassName("choice-text"));
// document.getElementsByClassName("choice-text") selects elements with the class choice-text and returns an HTMLCollection.
// Array.from() converts this HTMLCollection into an array, allowing for array methods to be used.
// const choices holds this array of elements, which can then be manipulated as needed.

let currentQuestion = {};
// currentQuestion: Stores the current question details.
let acceptingAnswer = true;
//  Manages whether answers are currently being accepted.
let score = 0;
//  Keeps track of the player's score.
let questionCounter = 0;
// questionCounter: Tracks the number of questions answered or the current question index.
let availableQuestion = [];
// availableQuestions: Holds the list of questions that are yet to be asked.

let questions = [
    {
        question: "Inside which HTML element do we put the javascript?",
        choice1: "<javascript>",
        choice2: "<script>",
        choice3: "<scripting>",
        choice4: "<js>",
        answer: 2
    },
    {
        question: "How do you link the CSS with the HTML?",
        choice1: "<style>",
        choice2: "<link href='_.css'>",
        choice3: "<link rel='stylesheet href='_.css'>",
        choice4: "<rel='_.css'>",
        answer: 3
    },
    {
        question: "How do you print the statement in Javascript?",
        choice1: "const statement",
        choice2: "const variable_name",
        choice3: "console.log",
        choice4: "console.log()",
        answer: 4
    }
]

// 
// CREATE CONSTANT
// 
const CORRECT_BONUS = 10;
// CORRECT_BONUS controls the points awarded for correct answers.
const MAX_QUESTION = 3;
// MAX_QUESTION defines the maximum number of questions in the quiz.

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestion = [...questions];
    // console.log(availableQuestion);
    getNewQuestion();
};
// startGame Function: Initializes the game, res8ets variables, and prepares the question pool. It then starts the game by calling getNewQuestion.
// getNewQuestion Function: Loads and displays a new question from the availableQuestions array.
// handleChoiceClick Function: Handles the user's choice, updates the score, and loads the next question.

getNewQuestion = () => {
    // The updated getNewQuestion function is designed to handle the selection of a new question and update the UI accordingly. It includes necessary checks, updates the question and choices, and handles the end of the quiz if there are no more questions available.
    if (availableQuestion.length === 0 || questionCounter >= MAX_QUESTION) {
        // go to the end page 
        return window.location.assign("/end.html");
    }

    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestion.length);
    // The line const questionIndex = Math.floor(Math.random() * availableQuestions.length); is a common technique used to select a random element from an array. It ensures that each question in the quiz is chosen randomly, providing a varied and engaging experience for the user.
    currentQuestion = availableQuestion[questionIndex];
    question.innerText = currentQuestion.question;
    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion["choice" + number];
    });
    // choices.forEach iterates over each choice element to update its text content based on the current question’s choices.
    // choice.dataset['number'] retrieves the number associated with each choice, which is used to access the correct choice text.
    // choice.innerText = currentQuestion["choice" + number] updates the text content of each choice element to display the corresponding choice.

    availableQuestion.splice(questionIndex, 1);
    acceptingAnswer = true;
    // availableQuestions.splice(questionIndex, 1); ensures that once a question is used, it is removed from the list of available questions, preventing it from being reused.
    // acceptingAnswer = true; enables the user to select an answer. 
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        // Event Listener: The addEventListener method is used to handle click events on each choice element.
        if (!acceptingAnswer) return;
        //  The if (!acceptingAnswer) return; line prevents multiple selections by checking the acceptingAnswer flag.
        acceptingAnswer = false;
        // acceptingAnswer = false; prevents further input until the next question.
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        // selectedChoice and selectedAnswer allow you to determine which choice was clicked and process it accordingly.

        // const classToApply = 'incorrect';
        // if (selectedAnswer == currentQuestion.answer){
        //     classToApply = 'correct';
        // }

        // Assuming classToApply is determined based on whether the answer is correct or incorrect
        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        // Add the class to the parent element to apply styling
        selectedChoice.parentElement.classList.add(classToApply);

        // Optionally, remove the class after some time (e.g., 1 second) to reset the state
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion(); // Load the next question
        }, 1000);

        // console.log(selectedAnswer == currentQuestion.answer)

    });
});

startGame();