// const Game = (() => {
//   let gameData = {
//     p1wins: 0,
//     p2wins: 0,
//     tie: 0,
//     currentWinner: "",
//     gameEnd: false,
//     boardFull: false,
//     isDraw: false,
//     totalSign: 0,
//   };

  

//   let flag = false;
//   const player1 = document.querySelector(".player1");
//   const player2 = document.querySelector(".player2");
//   const getCurrentSign = () => {
//     gameData.totalSign++;
//     flag = !flag;
    
//     if (flag) {
//       player1.classList.remove("current");
//       player2.classList.add("current");
//       return "X";
//     }
//     player2.classList.remove("current");
//     player1.classList.add("current");
//     return "O";
//   };

//   const checkWin = () => {
//     let arr = Gameboard.getBoard();
//     if (
//       (arr[0] == "X" && arr[1] == "X" && arr[2] == "X") ||
//       (arr[0] == "X" && arr[3] == "X" && arr[6] == "X") ||
//       (arr[2] == "X" && arr[4] == "X" && arr[6] == "X") ||
//       (arr[6] == "X" && arr[7] == "X" && arr[8] == "X") ||
//       (arr[2] == "X" && arr[5] == "X" && arr[8] == "X") ||
//       (arr[0] == "X" && arr[4] == "X" && arr[8] == "X") ||
//       (arr[1] == "X" && arr[4] == "X" && arr[7] == "X") ||
//       (arr[3] == "X" && arr[4] == "X" && arr[5] == "X") ||
//       (arr[2] == "X" && arr[4] == "X" && arr[6] == "X")
//     ) {
//       gameData.p1wins++;
//       gameData.gameEnd = true;
//       gameData.currentWinner = "p1";
//       return;
//     }
//     if (
//       (arr[0] == "O" && arr[1] == "O" && arr[2] == "O") ||
//       (arr[0] == "O" && arr[3] == "O" && arr[6] == "O") ||
//       (arr[2] == "O" && arr[4] == "O" && arr[6] == "O") ||
//       (arr[6] == "O" && arr[7] == "O" && arr[8] == "O") ||
//       (arr[2] == "O" && arr[5] == "O" && arr[8] == "O") ||
//       (arr[0] == "O" && arr[4] == "O" && arr[8] == "O") ||
//       (arr[1] == "O" && arr[4] == "O" && arr[7] == "O") ||
//       (arr[3] == "O" && arr[4] == "O" && arr[5] == "O") ||
//       (arr[2] == "O" && arr[4] == "O" && arr[6] == "O")
//     ) {
//       gameData.p2wins++;
//       gameData.gameEnd = true;
//       gameData.currentWinner = "p2";

//       return;
//     } else if (gameData.totalSign == 9) {
//       gameData.tie++;
//       gameData.gameEnd = true;
//       gameData.isDraw = true;
//       return;
//     }
//   };

//   return { getCurrentSign, checkWin, gameData };
// })();

// const Gameboard = (() => {
//   let gameBoard = [];
//   let getBoard = () => {
//     return gameBoard;
//   };

//   let setSign = (e) => {
//     let block = e.target;
//     let i = block.getAttribute("data-id");
//     if (!gameBoard[i] && !Game.gameData.gameEnd) {
//       let sign = Game.getCurrentSign();
//       gameBoard[i] = sign;
//       block.textContent=sign;
//     }
//   };
//   const resetGame = () => {
//     gameBoard = [];
//     Game.gameData.currentWinner = "";
//     Game.gameData.gameEnd = false;
//     Game.gameData.boardFull = false;
//     Game.gameData.totalSign = 0;
//     Game.gameData.isDraw = false;

//   };

//   return { setSign, getBoard, resetGame };
// })();

// const displayControl = (() => {
//   let blocks = document.querySelectorAll("[class*=block]");
//   const restartContainer = document.querySelector(".restart");
//   const greet = document.querySelector(".restart .greet");
//   const player1Count = document.querySelector(".player1-count");
//   const tieCount = document.querySelector('.tie-count');
//   const player2Count = document.querySelector(".player2-count");
//   const modeImg = document.querySelector(".mode-img img");
//   const modeName = document.querySelector(".mode-name");

//   blocks.forEach((b) => {
//     b.addEventListener("click", (e) => {
//       Gameboard.setSign(e);
//       Game.checkWin();
//       showWinner();
//     });
//   });


//   const showWinner = () => {
//     if (Game.gameData.gameEnd) {
//       restartContainer.style.display = "flex";
//       if (Game.gameData.isDraw) {
//         greet.textContent = "Draw .";
//         tieCount.textContent = Game.gameData.tie;
//         tieCount.classList.add('current');

//       } else if (Game.gameData.currentWinner == "p1") {
//         greet.textContent = "Player 1 won !";
//         player1Count.classList.add('current');

//         player1Count.textContent = Game.gameData.p1wins;
//       } else {
//         greet.textContent = "Player 2 won !";
//         player2Count.textContent = Game.gameData.p2wins;
//         player2Count.classList.add('current');
//       }
//     }
//   };

//   const resetBtn = document.querySelector(".restart #restart-btn");
//   resetBtn.onclick = () => {
//     Gameboard.resetGame();
//     restartContainer.style.display = "none";
//     blocks.forEach((b) => (b.textContent = ""));
//   };
// })();

// // player 1  tie , playehr 2 count



const mode_img = document.querySelector('.mode-img img');
const mode_name = document.querySelector('.mode-name');
const mode_data = document.querySelector('.mode-data');
let i = 0;
mode_name.addEventListener('click', () => {
  console.log("clicked");
  
  let states = ["2P", "AI-N", "AI-H"];
  let url = ["./icons/2p.png", "./icons/1p.png", "./icons/1p.png"];
  return function () {
    console.log(i);
    i = ++i % states.length;
    mode_img.setAttribute('src', url[i]);
    mode_name.textContent = states[i];
    
  }()
});