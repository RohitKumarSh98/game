'use strict'; // Selecting Elements

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

var player0El = document.querySelector('.player--0');
var player1El = document.querySelector('.player--1');
var score0El = document.querySelector('#score--0');
var score1El = document.getElementById('score--1');
var current0El = document.getElementById('current--0');
var current1El = document.getElementById('current--1');
var diceEl = document.querySelector('.dice');
var btnNew = document.querySelector('.btn--new');
var btnRoll = document.querySelector('.btn--roll');
var btnHold = document.querySelector('.btn--hold'); // Starting conditions

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
var scores = [0, 0];
var currentScore = 0;
var activePlayer = 0;
var playing = true;

var switchPlayer = function switchPlayer() {
  document.getElementById("current--".concat(activePlayer)).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}; //ROlling dice Functionality


btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. generating a random dice roll
    var dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice); //2. Display dice

    diceEl.classList.remove('hidden');
    diceEl.src = "dice-".concat(dice, ".png"); //3. Check for rolled 1: if true, switch to next player

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById("current--".concat(activePlayer)).textContent = currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById("score--".concat(activePlayer)).textContent = scores[activePlayer]; //2.check if Player's score is >= 100

    if (scores[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add('hidden');
      document.querySelector(".player--".concat(activePlayer)).classList.add('player--winner');
      document.querySelector(".player--".concat(activePlayer)).classList.remove('player--active');
    } else {
      switchPlayer();
    }
  } //Finish
  //Switch to the next player

});
btnNew.addEventListener('click', function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  document.getElementById("current--".concat(activePlayer)).textContent = 0;
  scores = (_readOnlyError("scores"), [0, 0]);
  currentScore = 0;
  activePlayer = 0;
  playing = true;
});