const button_container = document.getElementById("button_container");
const start_button = document.getElementById("start_button");
const title = document.getElementById("title");
const squares = document.querySelectorAll(".square");

let next_player = "O";
let winner = null;
let initializedSquares = false;

document.addEventListener("DOMContentLoaded", () => {
    changeTitle("TicTacToe");
});

function changeTitle(newTitle) {
    title.innerHTML = "";
    for(let i = 0; i < newTitle.length; i++) {
        if(newTitle[i] === " ") {
            title.innerHTML += " ";
        } else {
            title.innerHTML += "<span>" + newTitle[i] + "</span>";
        }
    }
}

function makeSquaresClickable() {
    squares.forEach((square) => {
        square.classList.remove("unclickable");
    });
}

function makeSquaresUnclickable() {
    squares.forEach((square) => {
        square.classList.add("unclickable");
    });
}

function addEventListeners() {
    squares.forEach((square) => {
            square.addEventListener("click", () => {
                if(square.children[0].innerText !== "") return;
                doMove(square);
                if(checkWin() || checkDraw()) {
                    gameOver();
                }
                changePlayer();
            });
        }
    )
}

function initializeSquaresDelayed() {
    if(!initializedSquares) {
        addEventListeners();
        initializedSquares = true;
    }
    squares.forEach((square) => {
        if(square.children[0].innerText.length !== 0) {
            square.children[0].innerText = "";
            square.classList.remove("transparent");
        }
        square.children[0].classList.remove("transparent");
        square.style.cursor = "pointer";
    });
    makeSquaresClickable();
}

function initializeSquares() {
    squares.forEach((square) => {
        if(square.children[0].innerText.length !== 0) {
            square.classList.add("transparent");
        }
    })
    setTimeout(initializeSquaresDelayed, 1000);
}

function hideStartMenu() {
    button_container.classList.add("move-offscreen");

    button_container.classList.add("transparent");
    title.classList.add("transparent");
    start_button.classList.add("transparent");
}

function clearTitle() {
    title.innerHTML = "";
}

function transitionStartMenu() {
    start_button.classList.add("move-offscreenDown");
    title.classList.add("move-offscreenUp");

    start_button.classList.add("scale-down");
    title.classList.add("scale-down");
    setTimeout(clearTitle, 1000);
    button_container.classList.remove("blurred");
}

function startGame() {
    next_player = "O";
    winner = null;
    transitionStartMenu();
    initializeSquares();
    setTimeout(hideStartMenu, 1000);
}

function doMove(square) {

    square.children[0].classList.add("transparent");
    square.children[0].innerText = next_player;
    square.children[0].classList.remove("transparent");

    if(next_player === "X") {
        square.style.color = "red";
    } else {
        square.style.color = "#27ae60";
    }
}

function changePlayer() {
    if(next_player === "X") {
        next_player = "O";
    } else {
        next_player = "X";
    }
}

function checkWin() {
    for(let i = 0; i < 3; i++) {
        if(squares[i * 3].children[0].innerText === squares[1 + i * 3].children[0].innerText &&
            squares[1 + i * 3].children[0].innerText === squares[2 + i * 3].children[0].innerText &&
            squares[i * 3].children[0].innerText !== "") {
                winner = next_player;
                return true; //row
        }
        if(squares[i].children[0].innerText === squares[3 + i].children[0].innerText &&
            squares[3 + i].children[0].innerText === squares[6 + i].children[0].innerText &&
            squares[i].children[0].innerText !== "") {
                winner = next_player;
                return true; //column
        }
    }
    if(squares[4].children[0].innerText !== "" &&
        (squares[0].children[0].innerText === squares[4].children[0].innerText &&
        squares[4].children[0].innerText === squares[8].children[0].innerText ||
        squares[2].children[0].innerText === squares[4].children[0].innerText &&
        squares[4].children[0].innerText === squares[6].children[0].innerText)
    ) {
        winner = next_player;
        return true; //diagonals
    }
    return false;
}

function checkDraw() {
    for(let i = 0; i < 9; i++) {
        if(squares[i].children[0].innerText.length === 0) {
            return false;
        }
    }
    return !checkWin();
}

function gameOver() {
    if(winner === "X") {
        changeTitle("Player 2 won!");
        title.style.color = "red";
    } else if (winner === "O") {
        changeTitle("Player 1 won!");
        title.style.color = "#27ae60";
    } else {
        changeTitle("Draw!");
        title.style.color = "#ffffff";
    }
    makeSquaresUnclickable();
    button_container.classList.remove("move-offscreen");
    start_button.classList.remove("move-offscreenDown");
    title.classList.remove("move-offscreenUp");

    start_button.classList.remove("scale-down");
    title.classList.remove("scale-down");

    button_container.classList.add("blurred");

    title.classList.remove("transparent");
    start_button.classList.remove("transparent");
    button_container.classList.remove("transparent");
}