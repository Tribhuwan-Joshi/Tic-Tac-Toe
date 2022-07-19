
// Gameboard

const Gameboard = (() => {
  let arr = [];
  let marks = 0;
  const setMarkAt = (mark, i) => {
    arr[i] = mark;
    marks++;
  }
  const getMarkAt = i => arr[i]
  const getBoard = () => arr;

  const isFull = () => marks == 9;
  const reset = () => {

    arr = [];
    marks = 0;
  }
  return { setMarkAt, getMarkAt, getBoard, isFull, reset };


})();



// Player factory function

const Player = (n, m) => {


  let mark = m;
  let name = n;




  const getMark = () => mark;
  const getName = () => name;


  return { getMark, getName };

};



// DisplayController

const displayControl = (() => {
  const blocks = document.querySelectorAll('[class*=block]');

  blocks.forEach(b => {
    b.addEventListener('click', e => setMarkAt(e));
  });
  let setMarkAt = (e) => {
    let mark = Game.getCurrentPlayer().getMark();

    let id = e.target.getAttribute('data-id');
    if (Game.isGameEnd()) {

      return;
    }
    if (!Gameboard.getMarkAt(id)) {
      Gameboard.setMarkAt(mark, id);


      e.target.textContent = mark;
      Game.checkWinner();

    }



  }

  // points
  const player1 = document.querySelector('.player1');
  const player1Count = document.querySelector(".player1-count");
  const tie = document.querySelector('.tie');
  const tieCount = document.querySelector('.tie-count');
  const player2 = document.querySelector('.player2');
  const player2Count = document.querySelector(".player2-count");

  const toggleCurrent = () => {
    let name = Game.getCurrentPlayer().getName();
    if (name == 'Player 1') {
      player1.classList.remove('current');
      player2.classList.add('current');

    }
    else {
      player2.classList.remove('current');
      player1.classList.add('current');
    }
  }


  let reset = () => {
    blocks.forEach(b => b.textContent = '');
    restart.style.display = 'none';
    greet.textContent = "";
    tie.classList.remove('current');
    tieCount.classList.remove('current');
    player1.classList.remove('current');
    player1Count.classList.remove('current');
    player2.classList.remove('current');
    player2Count.classList.remove('current');
    toggleCurrent();
    Game.reset();
    Gameboard.reset();

  }


  // Restart
  let restart = document.querySelector('.restart');
  let greet = document.querySelector('.restart .greet');
  let restartBtn = document.querySelector('button#restart-btn');
  restartBtn.addEventListener('click', reset);

  const result = () => {
    let winner = Game.getWinner();
    restart.style.display = 'flex';
    if (winner == 'Draw') {
      greet.textContent = "Draw";
      tieCount.textContent = ++tieCount.textContent;
      tie.classList.add('current');
      tieCount.classList.add('current');
      let winner = Game.getCurrentPlayer().getName();
      if (winner == 'Player 1')
        player1.classList.remove('current');
      else
        player2.classList.remove('current');
    }

    else {
      greet.textContent = `${winner.getName()} win`;
      if (winner.getName() == 'Player 1') {
        player1Count.textContent = ++player1Count.textContent;
        player1.classList.add('current');
        player1Count.classList.add('current');
      }

      else {
        player2Count.textContent = ++player2Count.textContent;
        player2.classList.add('current');
        player2Count.classList.add('current');
      }
    }

  }


  // mode - driver

  const mode_img = document.querySelector('.mode-img img');
  const mode_name = document.querySelector('.mode-name');
  const mode_data = document.querySelector('.mode-data');
  let i = 0;
  mode_img.addEventListener('click', () => {


    let states = ["2P", "AI-N", "AI-H"];
    let url = ["./icons/2p.png", "./icons/AIN.png", "./icons/AIH.png"];

    return function () {

      i = ++i % states.length;
      mode_img.setAttribute('src', url[i]);
      mode_name.textContent = states[i];

    }()
  });

  return { reset, setMarkAt, result, toggleCurrent };


})();



// Game 

const Game = (() => {
  let p1 = Player('Player 1', 'X');
  let p2 = Player('Player 2', 'O');
  let currentPlayer = p1;

  let winner = null;
  let gameEnd = false;


  const getWinner = () => winner;
  const isGameEnd = () => gameEnd;
  const getCurrentPlayer = () => currentPlayer;
  const toggleCurrentPlayer = () => {
    if (currentPlayer == p1) {
      currentPlayer = p2;

    }
    else

      currentPlayer = p1;

  };
  const reset = () => {
    winner = '';
    gameEnd = false;
    toggleCurrentPlayer();

  }

  const checkWinner = () => {

    let arr = Gameboard.getBoard();
    if (
      (arr[0] == "X" && arr[1] == "X" && arr[2] == "X") ||
      (arr[0] == "X" && arr[3] == "X" && arr[6] == "X") ||
      (arr[2] == "X" && arr[4] == "X" && arr[6] == "X") ||
      (arr[6] == "X" && arr[7] == "X" && arr[8] == "X") ||
      (arr[2] == "X" && arr[5] == "X" && arr[8] == "X") ||
      (arr[0] == "X" && arr[4] == "X" && arr[8] == "X") ||
      (arr[1] == "X" && arr[4] == "X" && arr[7] == "X") ||
      (arr[3] == "X" && arr[4] == "X" && arr[5] == "X") ||
      (arr[2] == "X" && arr[4] == "X" && arr[6] == "X")
    ) {
      winner = p1;

      gameEnd = true;
      displayControl.result();


    }
    else if (
      (arr[0] == "O" && arr[1] == "O" && arr[2] == "O") ||
      (arr[0] == "O" && arr[3] == "O" && arr[6] == "O") ||
      (arr[2] == "O" && arr[4] == "O" && arr[6] == "O") ||
      (arr[6] == "O" && arr[7] == "O" && arr[8] == "O") ||
      (arr[2] == "O" && arr[5] == "O" && arr[8] == "O") ||
      (arr[0] == "O" && arr[4] == "O" && arr[8] == "O") ||
      (arr[1] == "O" && arr[4] == "O" && arr[7] == "O") ||
      (arr[3] == "O" && arr[4] == "O" && arr[5] == "O") ||
      (arr[2] == "O" && arr[4] == "O" && arr[6] == "O")
    ) {
      winner = p2;

      gameEnd = true;
      displayControl.result();
    }
    else if (Gameboard.isFull()) {
      winner = 'Draw';
      gameEnd = true;
      displayControl.result();

    }
    else {

      displayControl.toggleCurrent();
      toggleCurrentPlayer();
    }

  }

  return { getCurrentPlayer, toggleCurrentPlayer, checkWinner, getWinner, isGameEnd, reset };


})();













