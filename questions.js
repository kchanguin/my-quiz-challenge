const question = document.querySelector ('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion= {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = [0]


let questions = [
{
   question: "What are some primitive values?", 
    choice1:  "Elements, Attributes, Values",
    choice2: "Number, String, Boolean, Undefined, and Null",
    choice3: "Repositories, Git Clones, Git Commit, Git Push",
    choice4: "Data Structure, Respository Structure, Branch Structure",
    answer:   2,
},

{
    question: "JavaScript can",
     choice1: "store information",
     choice2: "manipulate the HTML",
     choice3: "respond to an evet and add decision making to your code",
     choice4: "All of the above",
     answer:   4,
},

{   question: "JavaScript is",
    choice1:  "heavy weight, interpreted theoretical language",
    choice2:  "Complementary to and intergrated with Java",
    choice3:  "A closed and static platform scripting language", 
    choice4:  "All of the above",
    answer:   2,
},

{   question: "What is hoisting?",
      choice1: "A JavaScript mechanism where variables and function declarations are moved to the top of their scope before code execution",
      choice2: "Functions that are assigned as a property to the object",
      choice3: "A method that defines functions with closed brackets",
      choice4: "Raise into a position.",
      answer:   1,

}

]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4
startGame = () => {
questionCounter= 0
score = 0
availableQuestions = [...questions]
getNewQuestion()
}

getNewQuestion = () => {
    if( availableQuestions.length === 0 || questionCounter> MAX_QUESTIONS) {
  localStorage.setItem('mostRecentScore', score)

  return window.location.assign('/end.html')
  }

  questionCounter++  
  progressText.innerText = 'Question ${questionCounter} of ${MAX_QUESTIONS}'
  progressBarFull.style.width = '${(questionCounter/MAX_QUESTIONS * 100} %'}

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
  currentQuestion = availableQuestions[questionsIndex]
  question.innerText = currentQuestion.question ['choice' + number]

choices.forEach(choice => {
    const number = choice.dataset['number']
    choice.innerText = currentQuestion ['choice' + number]
 })

 availableQuestions.splice(questionsIndex, 1)

 acceptingAnswers = true


choices.forEach(choice => {
choice.addEventListener('click', e => {
    if(!acceptingAnswers) return

acceptingAnswers = false
const selectedChoice= e.target
const selectedAnswer= selectedChoice.dataset['number']

let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
'incorrect'

if(classToApply === 'correct') {
    incrementScore(SCORE_POINTS)
}
selectedChoice.parentElement.classList.add(classToApply)

setTimeout(() => {
    selectedChoice.parentElement.classList.remove(classToApply)
    getNewQuestion()
}, 1000)
})

})
incrementScore = num => {
    score +=num
    scoreText.innerText = score
}
startGame()
