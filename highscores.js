const highScoresList = document.querySelector('#highScoresList')
const highscores =JSON.parse(localStorage.getitem('highScores')) || []

highScoresList.innerHTML =
highScores.map(score=> {
    return '<li class="high-score">${score.name} = ${score.score}' </li>
}.join('')