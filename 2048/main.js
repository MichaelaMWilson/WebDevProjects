new Vue({
    created: function () {
        window.addEventListener('keydown', this.onkey);
        spawnStart();
        spawnStart();
    },
    // define methods under the `methods` object
    methods: {
        onkey: function (event) {
            if (event.code === "ArrowUp") {
                event.preventDefault();
                moveUp();
            }
            if (event.code === "ArrowDown") {
                event.preventDefault();
                moveDown();
            }
            if (event.code === "ArrowLeft"){
                event.preventDefault();
                moveLeft();
            }
            if (event.code === "ArrowRight"){
                event.preventDefault();
                moveRight();
            }
        }
    }
})


new Vue({
    el: '#newGameBtn',
    data: {},
    // define methods under the `methods` object
    methods: {
        newGame: function () {
            for(let i = 1;i < 5;i++) {
                for(let j = 1; j < 5;j++) {
                    let cellName = "cell " +  i + "-" + j;
                    let cell = document.getElementById(cellName);
                    if(cell.innerHTML !== "") {
                        cell.removeChild(cell.firstChild);
                    }
                }
            }
            document.getElementById("loseScreen").style.display = "none";
            document.getElementById("highScores").style.display = "none";
            spawnStart();
            spawnStart();

            score.updateScore("reset");

            clearScores();
        }
    }
})

let score = new Vue({
    el: '#scoreField',
    data: {
        score: 0
    },
    methods: {
        updateScore: function(num){
            if(typeof num !== "number")
                this.score = 0;
            else
                this.score = this.score + num;
        }
    }
})

function moveUp(){
    //do not need to move the first row up for sure
    for(let i=2; i<5;i++){
        for(let j=1; j<5;j++){
            moveCellUp(i, j, i-1);
        }
    }

    for (let i = 1; i < 5; i++) {
        for (let j = 1; j < 5; j++) {
            let imgName = "img " + i + "-" + j;
            let img = document.getElementById(imgName);
            if(img !== null)
                img.classList.remove("replaced");
        }
    }

    spawnRandom();
    checkLost();
}

function moveCellUp(i, j, k){
    let imgName = "img " + i + "-" + j;
    let img = document.getElementById(imgName);
    let cellName = "cell " + i + "-" + j;
    let cell = document.getElementById(cellName);
    let cellAboveName = "cell " + k + "-" + j;
    let cellAbove = document.getElementById(cellAboveName);


    if(img !== null) {
        while(cellAbove.innerHTML === "") {
            img.id = "img " + k + "-" + j;
            cellAbove.appendChild(img);
            cellName = "cell " + k + "-" + j;
            cell = document.getElementById(cellName);

            k = k - 1;
            if(k === 0){
                break;
            }
            cellAboveName = "cell " + k + "-" + j;
            cellAbove = document.getElementById(cellAboveName);
        }

        if(k !== 0){
            let imgAboveName = "img " + k + "-" + j;
            let imgAbove = document.getElementById(imgAboveName);

            if(img.src === imgAbove.src){
                if (!imgAbove.classList.contains("replaced")) {
                    let url = img.src.replace(/^.*[\\\/]/, '');
                    let currNum = parseInt(url.substring(0, url.length - 4));
                    imgAbove.src = "images/" + 2 * currNum + ".png";
                    imgAbove.classList.add("replaced");
                    cell.removeChild(cell.firstChild);

                    //increment score by currNum
                    score.updateScore(currNum * 2);
                }
            }
        }
    }
}



function moveDown(){
    //do not need to move the last row down for sure
    for(let i=3; i>0;i--){
        for(let j=1; j<5;j++){
            moveCellDown(i, j, i+1);
        }
    }

    for (let i = 1; i < 5; i++) {
        for (let j = 1; j < 5; j++) {
            let imgName = "img " + i + "-" + j;
            let img = document.getElementById(imgName);
            if(img !== null)
                img.classList.remove("replaced");
        }
    }
    spawnRandom();
    checkLost();
}

function moveCellDown(i, j, k){
    let imgName = "img " + i + "-" + j;
    let img = document.getElementById(imgName);
    let cellName = "cell " + i + "-" + j;
    let cell = document.getElementById(cellName);
    let cellBelowName = "cell " + k + "-" + j;
    let cellBelow = document.getElementById(cellBelowName);


    if(img !== null) {
        while(cellBelow.innerHTML === "") {
            img.id = "img " + k + "-" + j;
            cellBelow.appendChild(img);
            cellName = "cell " + k + "-" + j;
            cell = document.getElementById(cellName);

            k = k + 1;
            if(k === 5){
                break;
            }
            cellBelowName = "cell " + k + "-" + j;
            cellBelow = document.getElementById(cellBelowName);
        }

        if(k !== 5){
            let imgBelowName = "img " + k + "-" + j;
            let imgBelow = document.getElementById(imgBelowName);

            if(img.src === imgBelow.src){
                if (!imgBelow.classList.contains("replaced")) {
                    let url = img.src.replace(/^.*[\\\/]/, '');
                    let currNum = parseInt(url.substring(0, url.length - 4));
                    imgBelow.src = "images/" + 2 * currNum + ".png";
                    imgBelow.classList.add("replaced");
                    cell.removeChild(cell.firstChild);

                    //increment score by currNum
                    score.updateScore(currNum * 2);
                }
            }
        }
    }
}

function moveLeft(){
    //do not need to move the leftmost row left for sure
    for(let i=1; i<5;i++){
        for(let j=2; j<5;j++){
            moveCellLeft(i, j, j-1);
        }
    }
    for (let i = 1; i < 5; i++) {
        for (let j = 1; j < 5; j++) {
            let imgName = "img " + i + "-" + j;
            let img = document.getElementById(imgName);
            if(img !== null)
                img.classList.remove("replaced");
        }
    }
    spawnRandom();
    checkLost();
}

function moveCellLeft(i, j, k){
    let imgName = "img " + i + "-" + j;
    let img = document.getElementById(imgName);
    let cellName = "cell " + i + "-" + j;
    let cell = document.getElementById(cellName);
    let cellLeftName = "cell " + i + "-" + k;
    let cellLeft = document.getElementById(cellLeftName);

    if(img !== null) {
        while(cellLeft.innerHTML === "") {
            img.id = "img " + i + "-" + k;
            cellLeft.appendChild(img);
            cellName = "cell " + i + "-" + k;
            cell = document.getElementById(cellName);

            k = k - 1;
            if(k === 0){
                break;
            }
            cellLeftName = "cell " + i + "-" + k;
            cellLeft = document.getElementById(cellLeftName);
        }

        if(k !== 0){
            let imgLeftName = "img " + i + "-" + k;
            let imgLeft = document.getElementById(imgLeftName);

            if(img.src === imgLeft.src) {
                if (!imgLeft.classList.contains("replaced")) {
                    let url = img.src.replace(/^.*[\\\/]/, '');
                    let currNum = parseInt(url.substring(0, url.length - 4));
                    imgLeft.src = "images/" + 2 * currNum + ".png";
                    imgLeft.classList.add("replaced");
                    cell.removeChild(cell.firstChild);

                    //increment score by currNum
                    score.updateScore(currNum * 2);
                }
            }
        }
    }
}


function moveRight(){
    //do not need to move the rightmost row right for sure
    for(let i=1; i<5;i++){
        for(let j=3; j>0;j--){
            moveCellRight(i, j, j+1);
        }
    }
    for (let i = 1; i < 5; i++) {
        for (let j = 1; j < 5; j++) {
            let imgName = "img " + i + "-" + j;
            let img = document.getElementById(imgName);
            if(img !== null)
                img.classList.remove("replaced");
        }
    }

    spawnRandom();
    checkLost();
}

function moveCellRight(i, j, k){
    let imgName = "img " + i + "-" + j;
    let img = document.getElementById(imgName);
    let cellName = "cell " + i + "-" + j;
    let cell = document.getElementById(cellName);
    let cellRightName = "cell " + i + "-" + k;
    let cellRight = document.getElementById(cellRightName);

    if(img !== null) {
        while(cellRight.innerHTML === "") {
            img.id = "img " + i + "-" + k;
            cellRight.appendChild(img);
            cellName = "cell " + i + "-" + k;
            cell = document.getElementById(cellName);

            k = k + 1;
            if(k === 5){
                break;
            }
            cellRightName = "cell " + i + "-" + k;
            cellRight = document.getElementById(cellRightName);
        }

        if(k !== 5){
            let imgRightName = "img " + i + "-" + k;
            let imgRight = document.getElementById(imgRightName);

            if(img.src === imgRight.src){
                if (!imgRight.classList.contains("replaced")) {
                    let url = img.src.replace(/^.*[\\\/]/, '');
                    let currNum = parseInt(url.substring(0, url.length - 4));
                    imgRight.src = "images/" + 2 * currNum + ".png";
                    imgRight.classList.add("replaced");
                    cell.removeChild(cell.firstChild);

                    score.updateScore(currNum * 2);
                }
            }
        }
    }
}

function getRandom(){
    return Math.floor(Math.random()* 4) + 1;
}

function spawnStart(){
    let cell = null;
    let x = 0;
    let y = 0;
    do {
        x = getRandom();
        y = getRandom();

        let cellName = "cell " + x + "-" + y;
        cell = document.getElementById(cellName);
    }while(cell === null || cell.innerHTML !== "");

    let img = document.createElement("img");
    img.src = "images/2.png";
    img.classList.add("cell");
    img.id = "img " + x + "-" + y;

    cell.appendChild(img);
}

//faster than getRandom once there are less squares to spawn in
function spawnRandom() {
    let cells = [];
    for (let i = 1; i < 5; i++) {
        for (let j = 1; j < 5; j++) {
            let cellName = "cell " + i + "-" + j;
            if (document.getElementById(cellName).innerHTML === "") {
                cells.push(cellName);
            }
        }
    }
    if(!(cells.length === 0)) {
        let selectedCell = cells[Math.floor(Math.random() * cells.length)];
        let x = selectedCell.substring(5, 6);
        let y = selectedCell.substring(7, 8);


        let img = document.createElement("img");
        img.src = "images/2.png";
        img.classList.add("cell");
        img.id = "img " + x + "-" + y;

        document.getElementById(selectedCell).appendChild(img);
    }
}

function checkLost(){
    let emptySpace = false;

    for(let i=1;i<=4;i++) {
        for(let j=1;j<=4;j++) {
            let cellName = "cell " + i + "-" + j;
            if(document.getElementById(cellName).innerHTML === "") {
                //there's a cell still open
                emptySpace = true;
                break;
            }
        }
    }

    if(!emptySpace){
        let lost = true;

        //check columns for matches
        for(let j = 1; j < 5; j++) {
            for(let i = 1; i < 4; i++) {
                let img1 = "img " + i + "-" + j;
                let img2 = "img " + (i+1) + "-" + j;

                let img1src = document.getElementById(img1).src;
                let img2src = document.getElementById(img2).src;
                if(img1src === img2src) {
                    lost = false;
                    break;
                }
            }
        }
        //check rows for matches
        if(lost) {
            for(let i = 1; i < 5; i++) {
                for(let j = 1; j < 4; j++) {
                    let img1 = "img " + i + "-" + j;
                    let img2 = "img " + i + "-" + (j+1);

                    let img1src = document.getElementById(img1).src;
                    let img2src = document.getElementById(img2).src;
                    if(img1src === img2src) {
                        lost = false;
                        break;
                    }
                }
            }
        }

        if(lost){
            document.getElementById("loseScreen").style.display = "initial";
            document.getElementById("scoreLose").innerHTML = "Final Score: " + score.score;
        }


    }
}
const form = document.getElementById("submitScore");
const ul = document.getElementById("scores_ul");
let span = document.getElementById("scores_span");

let today = new Date();
let day = today.getDate();
let month = today.getMonth() + 1;
let year = today.getFullYear();

form.addEventListener('submit', (e) => {
    e.preventDefault();

    db.collection("scores").add({
        name: form.name.value,
        date: month + "/" + day + "/" + year,
        score: score.score
    });

    form.name.value = '';

    // get data
    db.collection("scores").orderBy("score", "desc").get().then(
        snapshot => {
            snapshot.docs.forEach(
                doc => {
                    renderScores(doc);
                }
            )
        }
    );
    document.getElementById("loseScreen").style.display = "none";
    document.getElementById("highScores").style.display = "initial";
})

function renderScores(doc) {

    let li = document.createElement('li');
    li.setAttribute("data-id", doc.id);

    let name = document.createElement('p');
    name.classList.add("left");
    let score = document.createElement('p');
    score.classList.add("middle");
    let date = document.createElement('p');
    date.classList.add("right");

    name.textContent = doc.data().name;
    score.textContent = doc.data().score;
    date.textContent = doc.data().date;


    li.appendChild(name);
    li.appendChild(score);
    li.appendChild(date);
    span.appendChild(li);
}

function clearScores(){
    ul.removeChild(span);
    span = document.createElement('span');
    span.id = "scores_span";
    ul.appendChild(span);
}

