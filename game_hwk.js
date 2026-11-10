//on page load -> generate game board;
//on page load -> generate game board;
window.onload = () => {
    console.log("Page Loaded");
    setRandomTileOrder(12);
    setTiles();
};

//global variables
let i = 0;
let clicks=0;
let timeScore;

/*start button initiates game and starts counter
initiates game start on button press*/
const startButton = document.getElementById("startGame");

const startGame = () => {
    randomOrderArray = [];
    i = 0;
    clicks = 0;
    n = 0;
    tileIcons = [];
    tileIds = [];

    setRandomTileOrder(12);
    setTiles();

    tiles.forEach(tile => tile.addEventListener("click", displayTile));

    resetTiles();

    startButton.disabled = true;
    startTimer();
};

startButton.addEventListener("click", startGame);

//end button stops the game

const endGame = () => {
    const endTimer = () => {
        timeScore = document.getElementById("timer").innerText;
        console.log(timeScore);
        clearInterval(timer);
    };

    randomOrderArray = [];
    startButton.innerText = "New Game";
    startButton.disabled = false;
    endTimer();
    calculateScore();
};
document.getElementById("endGame").addEventListener("click", endGame);

/* createRandom number function
creates random number which will later be assigned an icon
creates an array of 12 random numbers*/
// Create random number array
let randomOrderArray = [];

const setRandomTileOrder = (numberOfTiles) => {
    while (randomOrderArray.length < numberOfTiles) {
        let randomNum = Math.random();
        randomNum = randomNum * (numberOfTiles - 1);
        randomNum = Math.round(randomNum) + 1;

        if (randomOrderArray.includes(randomNum)) {
            continue;
        } else {
            randomOrderArray.push(randomNum);
        }
    }
};

// Set tiles variable for use throughout code
const tiles = document.querySelectorAll(".gametile");

const setTiles = () => {
    for (const tile of tiles) {
        tile.innerHTML = randomOrderArray[i];
        i++;

        // Replace numerical values with icon pairs
        if (tile.innerText < 3) {
            tile.innerHTML = rocket;
            tile.setAttribute("icon", "rocket");
        } else if (tile.innerHTML < 5) {
            tile.innerHTML = bacteria;
            tile.setAttribute("icon", "bacteria");
        } else if (tile.innerHTML < 7) {
            tile.innerHTML = cocktail;
            tile.setAttribute("icon", "cocktail");
        } else if (tile.innerHTML < 9) {
            tile.innerHTML = football;
            tile.setAttribute("icon", "football");
        } else if (tile.innerHTML < 11) {
            tile.innerHTML = pizza;
            tile.setAttribute("icon", "pizza");
        } else if (tile.innerHTML < 13) {
            tile.innerHTML = kiwi;
            tile.setAttribute("icon", "kiwi");
        } else {
            console.log("Error: too many tiles");
        }
    }
};

//Timer Function -> starts timer when game is started end when game is compvare or game is cancelled.
// Timer Function
let count;
let timer;

const startTimer = () => {
    clearInterval(timer);

    count = 0;

    timer = setInterval(() => {
        document.getElementById("timer").firstChild.innerText = count++;

        // End timer when it reaches 60 seconds
        if (count === 60) {
            clearInterval(timer);
            document.getElementById("timer").firstChild.innerText = "Game Over";
        }
    }, 1000);
};

/* icon assign function -> replaces random numbers with icon pairs
when icon assigned, tile is also assigned an attribute icon variables */
/* Icon assignment variables */

const football = `<i class="fas fa-football-ball"></i>`;
const mask = `<i class="fas fa-ufo"></i>`;
const pizza = `<i class="fas fa-pizza-slice"></i>`;
const lightning = `<i class="far fa-bolt"></i>`;
const bulb = `<i class="fal fa-lightbulb"></i>`;
const rocket = `<i class="fas fa-rocket"></i>`;
const bacteria = `<i class="fas fa-bacterium"></i>`;
const kiwi = `<i class="fas fa-kiwi-bird"></i>`;
const cocktail = `<i class="fas fa-cocktail"></i>`;

let selectedTile = '';
let tileIcon;
let tileIcons = [];
let tileIds = [];


//displayTile -> function which listens for click event and displays tile value on click
//tiles.forEach(tile => tile.addEventListener("click", displayTile));
// var n = 0;

// Display tile when clicked
let n = 0;

const displayTile = (e) => {

    e.currentTarget.classList.remove("hideTile");
    e.currentTarget.classList.add("displayTile");

    tileIcon = e.currentTarget.getAttribute("icon");
    tileIcons.push(tileIcon);

    const tileId = e.currentTarget.getAttribute("id");
    tileIds.push(tileId);

    countMoves();

    if (tileIcons.length % 2 === 0) {
        checkMatch(tileIcons, tileIds, n);
        n = n + 2;
    }
};

const checkMatch = (tileIcons, tileIds, n) => {

    console.log(n);
    console.log(n + 1);

    if (tileIcons[n] !== tileIcons[n + 1]) {

        console.log("no match");

        setTimeout(() => {
            document.getElementById(tileIds[n + 1]).classList.remove("displayTile");
            document.getElementById(tileIds[n]).classList.remove("displayTile");
        }, 1000);

    } else {

        console.log("match");
        console.log(n);

        document.getElementById(tileIds[n]).style.backgroundColor = "green";
        document.getElementById(tileIds[n + 1]).style.backgroundColor = "green";

        document.getElementById(tileIds[n]).setAttribute("guess", "correct");
        document.getElementById(tileIds[n + 1]).setAttribute("guess", "correct");

        document.getElementById(tileIds[n]).removeEventListener("click", displayTile);
        document.getElementById(tileIds[n + 1]).removeEventListener("click", displayTile);
    }
};




//countClicks -> calculates number of user clicks -> needed to calculate score
// Count user clicks
const countMoves = () => {
    clicks++;
    document.getElementById("clicks").firstChild.innerHTML = clicks;
};
// Clear tiles when a new game starts
const clearTiles = () => {
    for (let n = 0; n < tiles.length; n++) {
        tiles[n].style.fontSize = "0em";
        tiles[n].style.backgroundColor = "#44445a";
    }
};

// Calculate score


/*match tiles -> when one tile is clicked and displayed, check if next tile clicked has the same attribute value
if match icons remain displayed and correctly guessed tiles become disabled. */

//countCorrectAnswers -> count the number of tiles with value correct. each time a pair of tiles are matched, add 1 to the coundCorrectAnswers value;

//compvareGAme -> When the number of correct answers == the number of cells the game can end.

//calculateScore -> adds number of clicks and elapsed time to calculate score & displays score upon game compvarion. 

const calculateScore = () => {
    timeScore = parseInt(timeScore);

    const calculatedScore = timeScore + clicks;

    console.log(calculatedScore);

    document.querySelector("#score").firstChild.innerHTML = calculatedScore;
};
//refresh/reset -> click button, invokes endGame() the reset tiles values, and return their default styling.

//additional levels of difficulty

let newRGB;

const generateRGBVal = () => {

    const generateRandomColor = () => {
        let r = Math.random();
        r = r * 255;
        r = Math.round(r);
        return r;
    };

    const rgbValue = [];

    for (let i = 0; i <= 2; i++) {
        const singleVal = generateRandomColor();
        rgbValue.push(singleVal);
    }

    newRGB = `rgb(${rgbValue[0]},${rgbValue[1]},${rgbValue[2]})`;

    return newRGB;
};

//additional iterations/Future development
// publish leaderboard;
//use api to generate random icon or picture
const resetTiles = () => {
    for (const tile of tiles) {
        tile.style.backgroundColor = "#44445a";
        tile.removeAttribute("state");
        tile.classList.remove("hideTile");
        tile.classList.remove("displayTile");
    }
};