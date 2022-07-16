const Player = (mark) => {
    return { mark, winCount: 0 }
}

const Game = (() => {
    let p1 = Player('X');
    let p2 = Player('O');

    let gameData = {
        mode: "non-AI",
        tieCount: 0,
        totalMarks: 0,
        gameEnd: false,
        isDraw: false,
        currentPlayer: p1,
        winPos: [],
        winner: null

    };
    const togglePlayer = () => {
        if (gameData.currentPlayer == p1) {
            gameData.currentPlayer = p2;
        }
        else {
            gameData.currentPlayer = p1;
        }
    }
    const resetGame = () => {
        gameData.gameEnd = false;
        gameData.isDraw = false;
        gameData.totalMarks = 0;
        gameData.winPos = [],
            gameData.winner = null

    }
    const checkWinner = () => {
        if (
            (gameBoard.markArray[0] == "X" && gameBoard.markArray[1] == "X" && gameBoard.markArray[2] == "X" && gameData.winPos.push(0, 1, 2)) ||
            (gameBoard.markArray[0] == "X" && gameBoard.markArray[3] == "X" && gameBoard.markArray[6] == "X" && gameData.winPos.push(0, 3, 6)) ||
            (gameBoard.markArray[2] == "X" && gameBoard.markArray[4] == "X" && gameBoard.markArray[6] == "X" && gameData.winPos.push(2, 4, 6)) ||
            (gameBoard.markArray[6] == "X" && gameBoard.markArray[7] == "X" && gameBoard.markArray[8] == "X" && gameData.winPos.push(6, 7, 8)) ||
            (gameBoard.markArray[2] == "X" && gameBoard.markArray[5] == "X" && gameBoard.markArray[8] == "X" && gameData.winPos.push(2, 5, 8)) ||
            (gameBoard.markArray[0] == "X" && gameBoard.markArray[4] == "X" && gameBoard.markArray[8] == "X" && gameData.winPos.push(0, 4, 8)) ||
            (gameBoard.markArray[1] == "X" && gameBoard.markArray[4] == "X" && gameBoard.markArray[7] == "X" && gameData.winPos.push(1, 4, 7)) ||
            (gameBoard.markArray[3] == "X" && gameBoard.markArray[4] == "X" && gameBoard.markArray[5] == "X" && gameData.winPos.push(3, 4, 5)) ||
            (gameBoard.markArray[2] == "X" && gameBoard.markArray[4] == "X" && gameBoard.markArray[6] == "X" && gameData.winPos.push(2, 4, 6))
        ) {
            p1.winCount++;
            gameData.winner = "p1";
            gameData.gameEnd = true;
            return;
        }
        else if (
            (gameBoard.markArray[0] == "O" && gameBoard.markArray[1] == "O" && gameBoard.markArray[2] == "O" && gameData.winPos.push(0, 1, 2)) ||
            (gameBoard.markArray[0] == "O" && gameBoard.markArray[3] == "O" && gameBoard.markArray[6] == "O" && gameData.winPos.push(0, 3, 6)) ||
            (gameBoard.markArray[2] == "O" && gameBoard.markArray[4] == "O" && gameBoard.markArray[6] == "O" && gameData.winPos.push(2, 4, 6)) ||
            (gameBoard.markArray[6] == "O" && gameBoard.markArray[7] == "O" && gameBoard.markArray[8] == "O" && gameData.winPos.push(6, 7, 8)) ||
            (gameBoard.markArray[2] == "O" && gameBoard.markArray[5] == "O" && gameBoard.markArray[8] == "O" && gameData.winPos.push(2, 5, 8)) ||
            (gameBoard.markArray[0] == "O" && gameBoard.markArray[4] == "O" && gameBoard.markArray[8] == "O" && gameData.winPos.push(0, 4, 8)) ||
            (gameBoard.markArray[1] == "O" && gameBoard.markArray[4] == "O" && gameBoard.markArray[7] == "O" && gameData.winPos.push(1, 4, 7)) ||
            (gameBoard.markArray[3] == "O" && gameBoard.markArray[4] == "O" && gameBoard.markArray[5] == "O" && gameData.winPos.push(3, 4, 5)) ||
            (gameBoard.markArray[2] == "O" && gameBoard.markArray[4] == "O" && gameBoard.markArray[6] == "O" && gameData.winPos.push(2, 4, 6))
        ) {
            p2.winCount++;
            gameData.gameEnd = true;
            gameData.winner = "p2";

            return;
        } else if (gameData.totalMarks == 9) {
            gameData.tieCount++;
            gameData.gameEnd = true;
            gameData.isDraw = true;
            return;
        }
        togglePlayer();
    };


    return { checkWinner, gameData, resetGame, p1, p2 };
})();

const gameBoard = (() => {

    let markArray = [];
    let getBoard = () => markArray;
    let setMark = (e) => {
        let block = e.target;
        let i = block.getAttribute("data-id");
        
        if (!markArray[i]) {
            let mark = Game.gameData.currentPlayer.mark;
            markArray[i] = mark;
            console.log("working clicked at ",i);
            block.textContent = mark;

        }
    };
    let resetGameBoard = () => {
        markArray = [];
    }
    return { markArray, setMark, resetGameBoard }


})();

const displayControl = (() => {
    console.log("here");
    const greet = document.querySelector('.restart .greet');
    const restartContainer = document.querySelector(".restart");
    let blocks = document.querySelectorAll("[class*=block]");
    
    const player1 = document.querySelector(".player1");
    const player2 = document.querySelector('.player2');
    const tie = document.querySelector('.tie')
    const player1Count = document.querySelector(".player1-count");
    const player2Count = document.querySelector(".player2-count");
    const tieCount = document.querySelector('.tie-count');
    const modeImg = document.querySelector(".mode-img img");
    const modeName = document.querySelector(".mode-name");
    let toggleClass = () => {
        if (player1.classList.contains('current')) {
            player2.classList.add('current');
            player1.classList.remove('current');
        }
        else {
            player1.classList.add('current');
            player2.classList.remove('current');
        }


    }
    blocks.forEach((b) => {
        b.addEventListener("click", (e) => {
            gameBoard.setMark(e);
            console.log("herre  ");
            Game.checkWinner();
            toggleClass();
            showWinner();


        });
    });

    const showWinner = () => {
        if (Game.gameData.gameEnd) {
            restartContainer.style.display = "flex";
            if (Game.gameData.isDraw) {
                greet.textContent = "Draw .";
                tieCount.textContent = Game.gameData.tieCount;
                tie.classList.add("current");
                tieCount.classList.add("current");


            }
            else if (Game.gameData.currentWinner == Game.p1) {
                greet.textContent = "Player 1 won !";
                player1Count.classList.add('current');
                player1.classList.add('current');
                player1Count.textContent = Game.p1.winCount;
                for (let i = 0; i < Game.gameData.winPos; i++) {
                    let pos = Game.gameData.winPos[i];
                    blocks[i].classList.add("current");
                }
            }
            else {
                greet.textContent = "Player 2 won !";
                player2Count.textContent = Game.p2.winCount;
                player2Count.classList.add('current');
                player2.classList.add('current');
                for (let i = 0; i < Game.gameData.winPos; i++) {
                    let pos = Game.gameData.winPos[i];
                    blocks[i].classList.add("current");
                }
            }
        }
    };
    const resetBtn = document.querySelector(".restart #restart-btn");
    resetBtn.onclick = () => {
        gameBoard.resetGameBoard();
        Game.resetGame();
        restartContainer.style.display = "none";
        blocks.forEach((b) => (b.textContent = ""));
    };



})();








