const Game = (() => {
  p1wins = 0;
  p2Wins = 0;
  tie = 0;
  gameEnd = false;
  flag = false;
  player1 = document.querySelector(".player1");
  player2 = document.querySelector(".player2");
  const getCurrentSign = () => {
    flag = !flag;
    if (flag) {
      player1.classList.remove("current");
      player2.classList.add("current");
      return "X";
    }
    player2.classList.remove("current");
    player1.classList.add("current");
    return "O";
  };

  const checkWin = () => {};
  return { getCurrentSign };
})();

const Gameboard = (() => {
  let gameBoard = [];

  let setSign = (e) => {
    let block = e.target;
    let i = block.getAttribute("data-id");
    if (!gameBoard[i]) {
      let sign = Game.getCurrentSign();
      gameBoard[i] = sign;
      block.textContent = sign;
    }
  };

  return { setSign, gameBoard };
})();

const displayControl = (() => {
  let blocks = document.querySelectorAll("[class*=block]");
  blocks.forEach((b) => {
    b.addEventListener("click", (e) => {
      Gameboard.setSign(e);
    });
  });
})();
