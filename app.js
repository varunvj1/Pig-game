/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var roundScore, scores, activePlayer, gamePlaying;
init();

/******************* ROLL DICE BUTTON *********************/
document.querySelector(".btn-roll").addEventListener("click", () => {
  if (gamePlaying) {
    //Set the code for returning random number between 1 and 6
    var dice = Math.floor(Math.random() * 6) + 1;

    //Display the number on the dice
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = `dice-${dice}.png`;

    //Set the dice result to the ROUND score board
    if (dice !== 1) {
      //Calculate round score and display it on the sceen
      roundScore += dice;
      document.getElementById(
        `current-${activePlayer}`
      ).textContent = roundScore;
    } else {
      //Next player
      nextPlayer();
    }
  }
});

/******************* HOLD BUTTON *********************/
document.querySelector(".btn-hold").addEventListener("click", () => {
  if (gamePlaying) {
    //Update the global score
    scores[activePlayer] += roundScore;

    //Update the UI
    document.getElementById(`score-${activePlayer}`).textContent =
      scores[activePlayer];

    //Check if the player won the game
    if (scores[activePlayer] >= 100) {
      //Set the text 'Winner" on screen
      document.getElementById(`name-${activePlayer}`).textContent = "Winner!";

      playerPanelDOM = document.querySelector(`.player-${activePlayer}-panel`);
      //Set the winner class to the active player
      playerPanelDOM.classList.add("winner");

      // //Remove the active class from the current player
      playerPanelDOM.classList.remove("active");

      //Hide the dice
      document.querySelector(".dice").style.display = "none";

      //Set the gamePlaying to false to stop the game
      gamePlaying = false;
    } else {
      //Switch the player
      nextPlayer();
    }
  }
});

function nextPlayer() {
  //Set the round score to zero and display it on the screen
  document.getElementById(`current-${activePlayer}`).textContent = 0;
  roundScore = 0;

  //Remove the 'active' class from the existing player
  document
    .querySelector(`.player-${activePlayer}-panel`)
    .classList.remove("active");

  //Switch the player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

  //Add 'active' class to the switched player to change the background and other styling
  document
    .querySelector(`.player-${activePlayer}-panel`)
    .classList.add("active");

  //Hide the dice on getting one
  document.querySelector(".dice").style.display = "none";

  // /**************************************** OR ************************************************/
  // activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  // roundScore = 0;
  // document.getElementById("current-0").textContent = "0";
  // document.getElementById("current-1").textContent = "0";

  // document.querySelector(".player-0-panel").classList.toggle("active");
  // document.querySelector(".player-1-panel").classList.toggle("active");

  // document.querySelector(".dice").style.display = 'hide';
  /********************************************* ***************************************************/
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  //Set the initial values of the score display to zero
  document.getElementById("score-0").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 0";
  document.getElementById("name-1").textContent = "Player 1";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");

  //This line hides the dice when the page loads
  document.querySelector(".dice").style.display = "none";
}
