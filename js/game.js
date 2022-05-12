const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswer = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
  {
    question: 'Angela is 2 years old and her mother is 20 years older than her, how old is her older half brother who is half her fathers age, who is twice her mothers age?',
    choice1:'14',
    choice2:'22',
    choice3:'20',
    choice4:'18',
    answer: 3,
  },
  {
    question: 'If 10 assassins are murdered by 5 ordinary civilians how many assassins are there?',
    choice1:'5',
    choice2:'0',
    choice3:'15',
    choice4:'10',
    answer:3,
  },
  {
    question: 'What was the first touch-screen phone?',
    choice1:'IBM Simon',
    choice2:'Apple',
    choice3:'Nokia',
    choice4:'Xiaomi',
    answer:1,
  },
  {
    question: 'When days are 4 years old?',
    choice1:'1461',
    choice2:'2022',
    choice3:'1022',
    choice4:'1300',
    answer:1,
  },
  {
    question: 'Your father is the great-grandfather of whose son?',
    choice1:'Of Me',
    choice2:'My Son',
    choice3:'My girlfriend',
    choice4:'My Sons Son',
    answer:4,
  },
  {
    question: 'How much is half a dozen to two dozen?',
    choice1:'6',
    choice2:'0',
    choice3:'9',
    choice4:'12',
    answer:1,
  },
  {
    question: 'Which social network is responsible for storing the most diverse videos in the world?',
    choice1:'Twitch',
    choice2:'YouTube',
    choice3:'Facebook',
    choice4:'Drive',
    answer:2,
  },
    {
    question: 'Bacon is taken from which animal originally?',
    choice1:'Cow',
    choice2:'Chicken',
    choice3:'Pig',
    choice4:'Fish',
    answer:3,
  },
  {
    question: 'If the duck loses its leg, is it a widow or a cripple?',
    choice1:'Lame',
    choice2:'Crippled',
    choice3:'Widower',
    choice4:'Dead',
    answer:2,
  },
  {
    question: 'Who is the biggest billionaire in the world?',
    choice1:'Jeff Bezos',
    choice2:'Elon Musk',
    choice3:'Warren Buffet',
    choice4:'Bill Gates',
    answer:2,
  }
]

const score_points = 100
const max_questions = 10

startGame = () => {
  questionCounter = 0
  score = 0
  availableQuestions = [...questions]
  getNewQuestion()
}

getNewQuestion = () => {
  if(availableQuestions.length === 0 || questionCounter > max_questions) {
    localStorage.setItem('mostRecentScore', score)

    return window.location.assign('end.html')
  }

  questionCounter++
  progressText.innerText = `Question ${questionCounter} of ${max_questions}`
  progressBarFull.style.width = `${(questionCounter/max_questions) * 100}%`

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
  currentQuestion = availableQuestions[questionsIndex]
  question.innerText = currentQuestion.question

  choices.forEach(choice => {
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number ]
  })

  availableQuestions.splice(questionsIndex, 1)

  acceptingAnswer = true
}

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if(!acceptingAnswer) return

    acceptingAnswer = false
    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset['number']

    let classToAplly = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

    if(classToAplly === 'correct') {
      incrementScore(score_points)
    }

    selectedChoice.parentElement.classList.add(classToAplly)

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToAplly)
      getNewQuestion()
    }, 1000)
  })
})

incrementScore = num => {
  score += num 
  scoreText.innerText = score
}

startGame()