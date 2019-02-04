let animals = ['cat', 'dog', 'mouse', 'horse', 'zebra', 'pterodactyl', 'elephant', 'orangutan'];
let food = ['spaghetti', 'hummus', 'pepperoni', 'cheesesteak', 'guacamole', 'garlic'];
let rand = ['zephyr', 'onomatopoeia', 'alphabetize', 'xylophone', 'excalibur'];
let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

let word;
let guessTxt = document.getElementById("guessTxt");
let hangmanImg = document.getElementById("hangmanImg");
let categoryChosen = false;
let count = 0;
let canLose = true;
let canWin = true;

function category(c){
    let animalsBtn = document.getElementById("animals");
    let foodBtn = document.getElementById("food");
    let randomBtn = document.getElementById("random");
    canWin = true;
    canLose = true;

    //make the chosen category a different style and reset others
    if(c === 'animals'){
        categoryChosen = true;
        word = animals[Math.floor(Math.random()*animals.length)];

        animalsBtn.style.backgroundColor = "#6495ED";
        animalsBtn.style.color = "#FFFFFF";

        foodBtn.style.backgroundColor = "#FFFFFF";
        foodBtn.style.color = "#6495ED";
        randomBtn.style.backgroundColor = "#FFFFFF";
        randomBtn.style.color = "#6495ED";
    }
    else if(c === 'food'){
        categoryChosen = true;
        word = food[Math.floor(Math.random()*food.length)];

        foodBtn.style.backgroundColor = "#6495ED";
        foodBtn.style.color = "#FFFFFF";

        animalsBtn.style.backgroundColor = "#FFFFFF";
        animalsBtn.style.color = "#6495ED";
        randomBtn.style.backgroundColor = "#FFFFFF";
        randomBtn.style.color = "#6495ED";
    }
    else if(c === 'random'){
        categoryChosen = true;
        word = rand[Math.floor(Math.random()*rand.length)];

        randomBtn.style.backgroundColor = "#6495ED";
        randomBtn.style.color = "#FFFFFF";

        foodBtn.style.backgroundColor = "#FFFFFF";
        foodBtn.style.color = "#6495ED";
        animalsBtn.style.backgroundColor = "#FFFFFF";
        animalsBtn.style.color = "#6495ED";
    }
    else{
        word = "Choose a category to start";

        animalsBtn.style.backgroundColor = "#FFFFFF";
        animalsBtn.style.color = "#6495ED";
        foodBtn.style.backgroundColor = "#FFFFFF";
        foodBtn.style.color = "#6495ED";
        randomBtn.style.backgroundColor = "#FFFFFF";
        randomBtn.style.color = "#6495ED";

        document.getElementById("win").style.display = "none";
        document.getElementById("lose").style.display = "none";
    }

    //draw the word blanks
    if(word !== "Choose a category to start") {
        for (let i = 0; i < word.length; i++) {
            if (i === 0) {
                guessTxt.innerHTML = "_";
            } else {
                $("h2").append(" _");
            }
        }
    }
    //reset the word
    else{
        guessTxt.innerHTML = "Choose a category to start";
        categoryChosen = false;
    }

    //uncomment this to see what the chosen word is
    //console.log(word);

    //give buttons ids and start with beginning hangman image
    for(let j = 0; j < alphabet.length; j++){
        let btnName = alphabet[j] + "Btn";
        document.getElementById(btnName).disabled = false;
        count = 0;
        updateImg(0);
    }
}

let won = false;

function guess(c){
    let present = false;
    if(categoryChosen === false) return;
    if(canWin === false || canLose === false) return;
    let str = guessTxt.innerHTML;

    //show the guessed letter
    for(let i = 0; i < word.length; i++) {
        if (c === word[i]) {

            str = str.substring(0,2*i) + c + str.substring(2*i+1);
            guessTxt.innerHTML = str;

            present = true;
        }
    }

    //update hangman image
    if(present === false){
        count++;
        updateImg(count);
    }

    //check if they've won
    for(let j = 0; j < word.length; j++){
        won = ("_" !== str[2*j]);
        if(won === false) break;
    }

    //disable guessed letter
    let btnName = c + "Btn";
    document.getElementById(btnName).disabled = true;

    if(won === true) hasWon();
}

//display win sign
function hasWon(){
    document.getElementById("win").style.display = "block";
    canLose = false;
}


//display lose sign
function hasLost(){
    hangmanImg.src = "images/11.jpg";
    document.getElementById("lose").style.display = "block";
    canWin = false;
}

//update hangman status
function updateImg(c){
    if(c > 10){
        hasLost();
        return;
    }
    hangmanImg.src = "images/" + c + ".jpg";
}

//reveal the word
function reveal(){
    canWin = false;
    canLose = false;

    let wordReveal = "";
    if(word !== "Choose a category to start") {
        for (let i = 0; i < word.length; i++) {
            wordReveal += word[i] + " ";
        }
        guessTxt.innerHTML = wordReveal;
    }
    else{
        guessTxt.innerHTML = "Choose a category to start";
    }


}