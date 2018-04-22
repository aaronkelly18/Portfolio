let card = document.getElementsByClassName('card');
let cards = [...card];
let deck = document.querySelector('.deck');
let openedCards = [];
let changeMovesNumber = document.getElementById('moves');
let matchCount =0;
const button = document.getElementById('play-again');
let starN=0;
let time = '00:00'
let seconds = 0;
let minutes = 0;
let timeTiger= 0;
let t;
const timer = document.getElementById('timer');
const modal = document.getElementById('MModal');
const modalHeading = document.querySelector('#modal-heading');
let modalMessage='';

window.onload = function() {
 newGame();
};

/* Restars the game */
let restartClick = document.getElementById('restartClick');
restartClick.addEventListener('click', newGame);

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function newCards(){
    let shuffleCards = shuffle(cards);
    for (let i = 0; i < shuffleCards.length; i++) {
    shuffleCards[i].classList.remove('show', 'open', 'match', 'trick');
    deck.appendChild(shuffleCards[i]);
    }
  for (let shuffleCard of shuffleCards) {
  shuffleCard.addEventListener('click', clickedCards);
  }
}

function newGame() {
    resetMovesCount();
    resetStarRating();
    matchCount = 0;
    timeTiger= 0;
    resetTimer();
    openedCards = [];
    modalMessage.innerHTML = '';
    newCards();
}

function clickedCards (){
  showCard();
  addToOpenCards();
  timeTiger++
  if(timeTiger === 1){
    startTimer();
  }
  if (openedCards.length === 2){
    addMoves();
    if (openedCards[0].innerHTML === openedCards[1].innerHTML){
      matchCount++;
      console.log(matchCount);
      stopClock();
      match();
    } else {
        notMatch();
      }
  }

function showCard (){
  console.log(event.target.tagName);
  const cardTagName = event.target
  if (cardTagName.tagName === 'LI'){
     if (openedCards.length < 2){
  event.target.classList.add('open', 'show');
    console.log(event.target);
     }
  }
}

function addToOpenCards () {
  openedCards.push(event.target);
    // if (openedCards.length < 2);
}

function match(){
  openedCards[0].classList.add('match', 'trick');
  event.target.classList.add('match', 'trick');
  openedCards[0].classList.remove('show', 'open');
  event.target.classList.remove('show', 'open');
  openedCards = [];
 }

function notMatch (){
    setTimeout(function(){
    openedCards[0].classList.remove('open', 'show');
    openedCards[1].classList.remove('open', 'show');
    openedCards = [];
       }, 500);
}
};

function addMoves(){
  moves++;
  console.log(moves);
  changeMovesNumber.textContent =  moves;
  starRating();
}

function resetMovesCount(){
  moves = 0;
  changeMovesNumber.textContent =  moves;
}

function starRating (){
  if (moves > 8 && moves < 21){
    starN = 3;
  }
  if (moves > 20 && moves < 30 ) {
    document.getElementById('one').innerHTML ='<i class="fa fa-star-o"></i>';
    starN = 2;
  } if (moves > 30) {
    document.getElementById('one').innerHTML ='<i class="fa fa-star-o"></i>';
    document.getElementById('two').innerHTML ='<i class="fa fa-star-o"></i>';
    starN = 1;
  }
}

function resetStarRating (){
  document.getElementById('one').innerHTML ='<i class="fa fa-star"></i>';
  document.getElementById('two').innerHTML ='<i class="fa fa-star"></i>';
}

function startTimer() {
       clearInterval(t);
      t = setInterval(buildTimer,1000);
  }

timer.textContent = time;
function buildTimer () {
    seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
            if (minutes === 60) {
                minutes = 0;
                seconds = 0;
            }
        }
timer.textContent = (minutes < 10 ? "0" + minutes.toString(): minutes) + ":" + (seconds < 10 ? "0" + seconds.toString(): seconds);
}

function stopClock () {
   if (matchCount === 8){
     clearInterval(t);
   gameEnd();
   }
}

function resetTimer () {
  clearInterval(t);
  seconds = 0;
  minutes = 0;
  timer.textContent = time;
 }

function gameEnd () {
  modalMessage = document.createElement('p');
  modalMessage.innerHTML = '<p>Your time '+ timer.textContent + ', '+ moves + ' Moves and ' + starN + ' Stars !</br> WOOO!</p>';
  modalMessage.classList.add('modal-text');
  modalHeading.appendChild(modalMessage);
  modal.style.display = 'block';
}

button.onclick = function() {
    modal.style.display = 'none';
    scoreRepository();
    newGame();
};

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
    newGame();
    resetTimer();
  }
};


 function scoreRepository() {
   localStorage.setItem('moves', moves);
   localStorage.setItem('star_number', starN);
   localStorage.setItem('timer', timer.textContent);

   const addResults = document.getElementById('result');
   let resultTextToAdd = 'Your time '+ timer.textContent + ', '+ moves + ' Moves and ' + starN + ' Stars</ br></p>';
  addResults.insertAdjacentHTML('afterend', resultTextToAdd);
  }
