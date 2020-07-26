const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const timerContainerElement = document.getElementById('timer')
const answerButtonsElement = document.getElementById('answer-buttons')
const timerElement =document.getElementById('seconds')
let shuffledQuestions, currentQuestionIndex

var secondsElapsed = 0;
var totalSeconds = 0;
var status = "working";
var interval;

getTimePreferences();

function getFormattedSeconds() {
    var secondsLeft = (totalSeconds - secondsElapsed) % 60;

    var formattedSeconds;

    if(secondsLeft < 10) {
        formattedSeconds = "0" + secondsLeft
    }
}


startButton.addEventListener("click", startGame, startTimer)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})


function startTimer() {
    setTime();
    if (totalSeconds > 0) {
        interval = setInterval(function() {
            secondsElapsed++;
            renderTime();
        } 1000);
    } else {
        alert("you've run out of time!");
    }
}

function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    timerContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])

}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while(answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
    }

}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    }   else {
        startButton.innerText = 'restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    }   else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
        element.classList.remove('correct')
        element.classList.remove('wrong')
}


const questions = [
    {
        question: 'what is 2 + 2',
        answers: [
            { text: '4', correct: true},
            { text: '22', correct: false}
        ]
    },
    {
        question: 'what is apple',
        answers: [
            { text: 'apple', correct: true},
            { text: 'bear', correct: false}
        ]
    },
    {
        question: 'what is banana',
        answers: [
            { text: 'fruit', correct: true},
            { text: 'fat', correct: false}
        ]
    },
        {
        question: 'what is france',
        answers: [
            { text: 'country', correct: true},
            { text: 'penny', correct: false}
        ]
    }
]