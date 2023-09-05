// The Event Listener acts when I click the start button, it moves over to my quiz and starts the questions/timer. Nothing will start until the start quiz button is clicked.

const quizContainer = document.querySelector(".app");
const startButton = document.getElementById("start-button");


quizContainer.style.display = "none";

startButton.addEventListener("click", () => {
  startButton.style.display = "none";
  quizContainer.style.display = "block";
  startQuiz();
  startTimer();
});

// Below are all the questions that I have set up in various arrays. Each to trigger one after the other.

const questions = [
  {
    question: " Commonly used data types DO NOT include:",
    answers: [
      {text: "1. Strings", correct: false},
      {text: "2. Booleans", correct: false},
      {text: "3. Numbers", correct: false},
      {text: "4. Alerts", correct: true},
    ]
  },
  {
    question: " The condition in an if / else statement is enclosed with _______.",
    answers: [
      {text: "1. quotes", correct: false},
      {text: "2. curly brackets", correct: false},
      {text: "3. parenthesis", correct: true},
      {text: "4. square brackets", correct: false},
    ] 
  },
  {
    question: "Arrays in JavaScript can be used to store ______.",
    answers: [
      {text: "numbers and strings", correct: false},
      {text: "other arrays", correct: false},
      {text: "booleans", correct: false},
      {text: "all of the above", correct: true},
    ]
  },
  {
    question: "String values must be enclosed within _____ when being assigned to variables.",
    answers: [
      {text: "commas", correct: false},
      {text: "curly brackets", correct: false},
      {text: "quotes", correct: true},
      {text: "parenthesis", correct: false},
    ] 
  },
  {
    question: "A very useful tool used during development and debugging for printing content to the debugger is: ",
    answers: [
      {text: "JavaScript", correct: false},
      {text: "terminal/bash", correct: false},
      {text: "for loops", correct: false},
      {text: "console", correct: true},
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButton = document.querySelector(".answer_button");
const nextButton = document.querySelector(".next_button");
const totalQuestions = questions.length;

let currentQuestionIndex = 0;
let score = 0;
let timerRunning = false;
let timer;

// My functions are all pretty self explanitory in their names

function startQuiz(){
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion(){
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + "." + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("button");
    answerButton.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct
    }
    button.addEventListener("click", selectAnswer);
  })
}

function resetState(){
  nextButton.style.display = "none";
  while(answerButton.firstChild){
    answerButton.removeChild(answerButton.firstChild);
  }
}

function selectAnswer(e){
  const selectedButton = e.target;
  const isCorrect = selectedButton.dataset.correct === "true";
  if(isCorrect){
    selectedButton.classList.add("correct");
    score++;
  }else{
    selectedButton.classList.add("incorrect");
  }
  Array.from(answerButton.children).forEach(button => {
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();}
    else{
      showScore();
    }
  }


var timeLeft = 60;

function startTimer() { 
  if (!timerRunning) {
  timerRunning = true; // Start the timer
  const timerEl = document.getElementById("timer-container");
  timer = setInterval(function () {
    timerEl.innerHTML = "Time Left: " + timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      showScore();
    }
    timeLeft--;
  }, 1000);
}
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  }
});

function selectAnswer(e) {
  if (!timerRunning) {
    timerRunning = true; // Start the timer if it's not running already
  }

  const selectedButton = e.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  if (isCorrect) {
    selectedButton.classList.add("correct");
    score += timeLeft; // Increment score based on remaining time
  } else {
    selectedButton.classList.add("incorrect");
    timeLeft -= 5; // Deduct 5 seconds for incorrect answers
  }

  Array.from(answerButton.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextButton.style.display = "block";
  
}

function showScore() {
  clearInterval(timer);
  resetState();
  const calculatedScore = timeLeft + 1; // I was having issues with the score being off by a second every time i.e. the timer saying 39 and the score saying 38, so I just added an extra second.
  questionElement.innerHTML = `You scored ${calculatedScore} out of 60!`; // 60 being the total time given.
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
  nextButton.addEventListener("click", () => {
    location.reload();
  });
}