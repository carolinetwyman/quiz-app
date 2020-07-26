const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const timerContainerElement = document.getElementById('timer')
const answerButtonsElement = document.getElementById('answer-buttons')
const timerElement =document.getElementById('seconds')
var score = 0
let shuffledQuestions, currentQuestionIndex

var counter = 0


startButton.addEventListener("click", startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

var intervalState;
var seconds = 30;
timer.textContent = seconds;

function startGame() {
    //console.log("it works")
    intervalState = setInterval(function(){
        seconds = seconds - 1;
        timer.textContent = seconds;
        if(seconds <= 0) {
            clearInterval(intervalState)
            alert("Time's up!")
        }
    }, 1000)
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
    const wrong = selectedButton.dataset.wrong
    setStatusClass(document.body, correct)
    score++;
    scoreboard.textContent = score
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    }   else {
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
        question: 'HTML is to Noun as Javascript is to:',
        answers: [
            { text: 'Verb', correct: true},
            { text: 'Adjective', correct: false},
            { text: 'Adverb', correct: false},
            { text: 'Mnemonic', correct: false}
        ]
    },
    {
        question: 'The most widely used CSS Styles can be found in',
        answers: [
            { text: 'Wikipedia', correct: false},
            { text: 'Bootstrap', correct: true},
            { text: 'Font Awesome', correct: false},
            { text: 'Photobucket', correct: false}
        ]
    },
    {
        question: 'JQuery is an auxiliary language of',
        answers: [
            { text: 'CSS', correct: false},
            { text: 'JSON', correct: false},
            { text: 'Javascript', correct: true},
            { text: 'Ajax', correct: false}
        ]
    },
        {
        question: '__ Web design changes with the size of the viewport',
        answers: [
            { text: 'Responsible', correct: false},
            { text: 'Responsive', correct: true},
            { text: 'Repository', correct: false},
            { text: 'Refractory', correct: false}
        ]
    }
]