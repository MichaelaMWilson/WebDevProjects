let rows, cols, mines;
let firstClick, board, clicked;
let gridDiv;
let diff;
let mineCounter, cellCounter;
let lose = new Audio("fail.mp3");

function difficulty(d){
    if(d === 1)
        diff = "Easy 9x9";
    else if(d === 2)
        diff = "Medium 16x16";
    else
        diff = "Expert 30x16";

    document.getElementById("btnGroupDrop1").innerHTML = diff;
}

function createArray(rows, cols, k){
    let arr = [];
    for(let i=0; i<rows;i++){
        arr[i] = [];
        for(let j =0; j < cols; j++){
            arr[i][j] = k;
        }
    }

    return arr;
}


//'rows' are actually the columns and vice versa everywhere
//I realized very late that this was swapped, and I don't want
//to ruin the functionality by trying to replace everything

function playNewGame() {

    //Sets the difficulty
    if(diff === "Easy 9x9"){
        rows = 9;
        cols = 9;
        mines = 10;
        mineCounter = 10;
        document.getElementById("mines").innerHTML = "Mines remaining: " + mineCounter;
        cellCounter = 71;
    }
    else if(diff === "Medium 16x16"){
        rows = 16;
        cols = 16;
        mines = 40;
        mineCounter = 40;
        document.getElementById("mines").innerHTML = "Mines remaining: " + mineCounter;
        cellCounter = 216;
    }
    else if(diff === "Expert 30x16"){
        rows = 30;
        cols = 16;
        mines = 99;
        mineCounter = 99;
        document.getElementById("mines").innerHTML = "Mines remaining: " + mineCounter;
        cellCounter = 381;

    }
    else{
        alert("Please select a difficulty!");
        return;
    }


    board = createArray(rows, cols, 0);
    clicked = createArray(rows, cols, false);

    //Creates and displays the new game board
    if(gridDiv !== undefined){
        document.getElementById("grid").parentNode.removeChild(document.getElementById("grid"));
    }
    gridDiv = document.createElement("div");
    gridDiv.style.padding = "15px";
    gridDiv.classList.add("vertical");
    for (let i = 0; i < rows; i++) {
        let div = document.createElement("div");
        div.classList.add("horizontal");
        for (let j = 0; j < cols; j++) {
            let cell = document.createElement("img");
            cell.src = "images/facingDown.png";
            cell.id = "cell_" + i + "_" + j;
            div.appendChild(cell);
            cell.onclick = revealSquare;
            cell.oncontextmenu = function (event) {
                event.preventDefault();

                if (clicked[i][j] === false) {
                    clicked[i][j] = true;
                    cell.src = "images/flagged.png";

                    mineCounter--;
                    document.getElementById("mines").innerHTML = "Mines remaining: " + mineCounter;
                } else {
                    if ($(cell).attr("src") === "images/flagged.png") {
                        clicked[i][j] = false;
                        cell.src = "images/facingDown.png";

                        mineCounter++;
                        document.getElementById("mines").innerHTML = "Mines remaining: " + mineCounter;
                    }
                }
            }
        }
        gridDiv.appendChild(div);
    }
    document.body.appendChild(gridDiv);
    gridDiv.id = "grid";
    gridDiv.style.marginBottom = "15px";
    document.getElementById("grid").classList.add("grid");

    firstClick = true;
}


function revealSquare(x, y){
    let btn_row, btn_col, btn;

    //button that was revealed as a result of another button
    if(typeof x === "number"){
        btn_row = x;
        btn_col = y;
        let btn_name = "cell_" + x + "_" + y;
        btn = document.getElementById(btn_name);
    }
    //button that was revealed as a result of user click
    else{
        btn = document.getElementById(this.id);
        btn_row = this.id.split("_")[1];
        btn_col = this.id.split("_")[2];
        btn_row = parseInt(btn_row);
        btn_col = parseInt(btn_col);
    }

    //set up the mine field if first click
    if(firstClick === true){
        createBoard(btn_row, btn_col);
        firstClick = false;
    }

    if(clicked[btn_row][btn_col] === true) return;

    let numberOfMines = board[btn_row][btn_col];

    clicked[btn_row][btn_col] = true;


    //if a mine, reveal all mines and end game
    if(board[btn_row][btn_col] === "mine") {
        btn.src = "images/bomb.png";

        revealMines();
    }

    //Reveal 0 square and all squares surrounding until the edges all have numbers
    else if(parseInt(numberOfMines) === 0) {
        btn.src = "images/0.png";
        cellCounter--;

        if(btn_row - 1 >= 0) {
            if(clicked[btn_row - 1][btn_col] === false) revealSquare(btn_row - 1, btn_col);
            if(btn_col - 1 >= 0) {
                if(clicked[btn_row - 1][btn_col - 1] === false) revealSquare(btn_row - 1, btn_col - 1);
            }
            if(btn_col + 1 < cols) {
                if(clicked[btn_row - 1][btn_col + 1] === false) revealSquare(btn_row - 1, btn_col + 1);
            }
        }
        if(clicked[btn_row][btn_col - 1] === false) {
            if(btn_col - 1 >= 0) revealSquare(btn_row, btn_col - 1);
        }
        if(clicked[btn_row][btn_col + 1] === false) {
            if(btn_col + 1 < cols) revealSquare(btn_row, btn_col + 1);
        }
        if(btn_row + 1 < rows) {
            if(clicked[btn_row + 1][btn_col] === false) revealSquare(btn_row + 1, btn_col);
            if(clicked[btn_row + 1][btn_col - 1] === false) {
                if(btn_col - 1 >= 0) revealSquare(btn_row + 1,btn_col - 1);
            }
            if(clicked[btn_row + 1][btn_col + 1] === false) {
                if(btn_col + 1 < cols) revealSquare(btn_row + 1, btn_col + 1);
            }
        }
    }
    else if(numberOfMines === 1){
        btn.src = "images/1.png";
        cellCounter--;
    }
    else if(numberOfMines === 2) {
        btn.src = "images/2.png";
        cellCounter--;
    }
    else if(numberOfMines === 3){
        btn.src = "images/3.png";
        cellCounter--;
    }
    else if(numberOfMines === 4){
        btn.src = "images/4.png";
        cellCounter--;
    }
    else if(numberOfMines === 5){
        btn.src = "images/5.png";
        cellCounter--;
    }
    else if(numberOfMines === 6){
        btn.src = "images/6.png";
        cellCounter--;
    }
    else if(numberOfMines === 7){
        btn.src = "images/7.png";
        cellCounter--;
    }
    else if(numberOfMines === 8){
        btn.src = "images/8.png";
        cellCounter--;
    }

    //Win alert
    if(cellCounter === 0){
        alert("You win!!!!");
    }
}

//places mines on the board
function createBoard(x, y){
    let mineNum = 0;

    while(mineNum < mines){
        let i = randNum(rows);
        let j = randNum(cols);

        if(i === x && j === y){} //do not plant if first click
        else if(board[i][j] !== "mine"){
            board[i][j] = "mine";

            //create a count for cells surrounding mines
            if(i - 1 >= 0) {
                if(board[i - 1][j] !== "mine") board[i - 1][j] = parseInt(board[i - 1][j]) + 1;
                if(j - 1 >= 0) {
                    if(board[i - 1][j - 1] !== "mine") board[i - 1][j - 1] = parseInt(board[i - 1][j - 1]) + 1;
                }
                if(j + 1 < cols) {
                    if(board[i - 1][j + 1] !== "mine") board[i - 1][j + 1] = parseInt(board[i - 1][j + 1]) + 1;
                }
            }
            if(j - 1 >= 0) {
                if (board[i][j - 1] !== "mine") board[i][j - 1] = parseInt(board[i][j - 1]) + 1;
            }
            if(j + 1 < cols) {
                if (board[i][j + 1] !== "mine") board[i][j + 1] = parseInt(board[i][j + 1]) + 1;
            }
            if(i + 1 < rows) {
                if(board[i + 1][j] !== "mine") board[i + 1][j] = parseInt(board[i + 1][j]) + 1;
                if(j - 1 >= 0) {
                    if(board[i + 1][j - 1] !== "mine") board[i + 1][j - 1] = parseInt(board[i + 1][j - 1]) + 1;
                }
                if(j + 1 < cols) {
                    if(board[i + 1][j + 1] !== "mine") board[i + 1][j + 1] = parseInt(board[i + 1][j + 1]) + 1;
                }
            }
            mineNum++;
        }
    }

    //allow this comment when you want to see the board configuration
    //console.log(board);
}

let lost = false;


//Reveals all of the mines
function revealMines(){
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++){
            if(board[i][j] === "mine" && clicked[i][j] === false){
                revealSquare(i, j);
            }
        }
    }

    //so you are only alerted once
    if(lost === false){
        lose.play();
        alert("You Lose :(");
        lost = true;
    }
}


//generate a random number between 0 and whatever the max is;
function randNum(max){
    return Math.floor((Math.random() * 1000) + 1) % max;
}
