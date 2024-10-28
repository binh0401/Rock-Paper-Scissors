let score = JSON.parse(localStorage.getItem('score'));
if(score === null)
{
score = {
  wins: 0,
  loses: 0,
  ties:0
};
}

let computerMove = '';
let result ='';
let winsElement = document.querySelector('.wins');
let losesElement = document.querySelector('.losses');
let tiesElement = document.querySelector('.ties');
let resultElement = document.querySelector('.result');
let detailElement = document.querySelector('.detail');
let notificationElement = document.querySelector('.notification')

winsElement.innerHTML = `${score.wins}`;
losesElement.innerHTML = `${score.loses}`;
tiesElement.innerHTML = `${score.ties}`;

let autoPlayButtonElement = document.querySelector('.autoplaybutton');
autoPlayButtonElement.addEventListener('click', () => {
    autoplay();
})

document.body.addEventListener('keydown', (event) => {
  if(event.key === 'a') autoplay();
  else if(event.key === 'Backspace') resetScore();
})

let resetScoreButtonElement = document.querySelector('.resetbutton');
resetScoreButtonElement.addEventListener('click', () =>{

  resetScore();
})

function getComputerMove()
{
  let x = Math.random();
  if(0<=x && x<1/3) computerMove='Rock';
  else if(1/3<=x && x<2/3) computerMove='Paper';
  else computerMove = 'Scissors';
}

function updateScore()
{
  if(result === 'Tie') score.ties++;
  else if(result === 'Win') score.wins++;
  else score.loses++;
  localStorage.setItem('score',JSON.stringify(score));
  winsElement.innerHTML = `${score.wins}`;
  losesElement.innerHTML = `${score.loses}`;
  tiesElement.innerHTML = `${score.ties}`;
}

function play(playerMove)
{
    getComputerMove();

    if(playerMove === computerMove) result = 'Tie';
    else{
      if(playerMove === 'Rock')
    {
      if(computerMove === 'Paper') result = 'Lose';
      else result = 'Win';
    }

      else if(playerMove === 'Paper')
    {
      if(computerMove === 'Rock') result = 'Win';
      else result = 'Lose';
    }
      else 
    {
      if(computerMove === 'Rock') result='Lose';
      else result='Win';
    }
    }

    updateScore();
    notification(playerMove);
}

function resetScore()
{
  notificationElement.innerHTML = 'Are you sure you want to reset the score? <button class="yesbutton">Yes</button> <button class="nobutton">No</button>'
  let yesButtonElement = document.querySelector('.yesbutton');
  let nobuttonElement = document.querySelector('.nobutton');
  yesButtonElement.addEventListener('click', () => {
    notificationElement.innerHTML = '';
    score.wins=0;
    score.loses=0;
    score.ties=0;
    localStorage.removeItem('score');
    winsElement.innerHTML = `${score.wins}`;
    losesElement.innerHTML = `${score.loses}`;
    tiesElement.innerHTML = `${score.ties}`;
    resultElement.innerHTML = '';
    detailElement.innerHTML = '';
  })
  nobuttonElement.addEventListener('click', ()=>{
    notificationElement.innerHTML = '';
  })



  
}

function notification(playerMove)
{
    
    if(result === 'Tie')
    {
      resultElement.innerHTML = 'Tie.';
    }
    else{
      resultElement.innerHTML = `You ${result}.`;
    }

    detailElement.innerHTML = `You <img src="${playerMove}.png"> <img src="${computerMove}.png"> Computer`;

}

let isPlaying = false;
let intervalId;

function autoplay()
{
  if(isPlaying === false)
{
  intervalId = setInterval(function()
{
  let playermove = Math.random()
  if(playermove>=0 && playermove <=1/3) playermove = 'Rock';
  else if(playermove >1/3 && playermove <=2/3) playermove = 'Paper';
  else playermove = 'Scissors';
  play(playermove);
},1000);
  isPlaying = true;
  autoPlayButtonElement.innerHTML = 'Stop Playing';
}
  else{
    clearInterval(intervalId);
    isPlaying = false;
    autoPlayButtonElement.innerHTML = 'Auto Play';
  }       
}



