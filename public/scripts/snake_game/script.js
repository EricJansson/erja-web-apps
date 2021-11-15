
const cheatActive = false;

// cheatActive = true;

window.onload = () => {
    setTimeout(loadStorage, 0)
    if (cheatActive) {
        setTimeout(cheatForProgramming, 100)
    }
}

function cheatForProgramming() {
    if (cheatActive === true) {
        document.getElementById("winOrLoseCheating").style.display = "block";
        autosaveON = false;
        newLevel = lastLevel;
    }
}

function showPlayCheat() {
    winorloseCheatingBlock.style.display = "block";
}


const noBody = "0px 0px";

const turnNW = "-106px -159px";
const turnNE = "-106px -53px";
const turnSW = "-106px -106px";
const turnSE = "-106px 0px";

const tailN = "-159px 0px";
const tailE = "-159px -53px";
const tailS = "-159px -106px";
const tailW = "-159px -159px";

const headN = "-53px 0px";
const headE = "-53px -53px";
const headS = "-53px -106px";
const headW = "-53px -159px";

const bodyL = "0px -106px";
const bodyV = "0px -53px";


var bigBlock = document.getElementById("bigBlock");
var backgroundImg;
var points;
var pointsAdder;
var foodEaten;
var directionSelected;
var directionPressed;
var foodPosition;
var allTiles = [];
var allTilesSecond = [];
var snakeBody;
var snakeBodyDirections;
var speed;
var speedAdder;
var foodValue;
var mode = "easy";
var hardwall = false;
var gameoverscreen;
var autosaveON = true;
var firstQuit = false;
var freeplaySelected = false;


//  experimental testing 
var reverseMode = false;
//  experimental testing 
var gameover = false;
var gameactive = false;
var restartBtn = document.getElementById("restartBlock");
var foodEatenText = document.getElementById("foodEaten");
var pointsValue = document.getElementById("pointsValue");
var showStartMenu = document.getElementById("startMenu");
var freePlayMenu = document.getElementById("freePlay");
var optionsBack = document.getElementById("optionsBack");
var gameFade = document.getElementById("gameFade");
var currentHighscore = 0;
var pointHighscoreEasy = [0, 0, 0];
var pointHighscoreHard = [0, 0, 0];
var foodHighscoreEasy = [0, 0, 0];
var foodHighscoreHard = [0, 0, 0];



var skinSelected;

function startVariables() {
    directionSelected = directionPressed = "east";

    points = 0;
    foodEaten = 0;

    // push allTiles + allTilesSecond IDs 0-99          (thank god for removing 230 lines of code :D)
    for (let i = 0; i < 100; i++) {
        idnum = i;
        if (idnum < 10) {
            idnum = "0" + i;
        }
        allTiles.push(document.getElementById("f" + idnum))
        allTilesSecond.push(document.getElementById("d" + idnum))
    }

    snakeBody = [
        43, 42, 41, 40
    ];

    snakeBodyDirections = [
        "east",
        "east",
        "east",
        "east"
    ];
}

startVariables();



// show snake at "snakeBody" location and "snakeBodyDirections" direction
function startScreen() {
    for (let i = 0; i < allTiles.length; i++) {
        allTiles[i].classList.add(skinSelected);
    }
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeBodyDirections[i] === snakeBodyDirections[i + 1]) {
            if (snakeBodyDirections[i] === "east" || snakeBodyDirections[i] === "west") {
                allTiles[snakeBody[i]].style.backgroundPosition = bodyV;
            } else if (snakeBodyDirections[i] === "north" || snakeBodyDirections[i] === "south") {
                allTiles[snakeBody[i]].style.backgroundPosition = bodyL;
            }
        }
    }
    snakeImageLoader();
}


function goWest() {
    if (directionSelected != "east" && gameactive) {
        directionPressed = "west";
        arrowMoveDirection(0);
    }
}

function goEast() {
    if (directionSelected != "west" && gameactive) {
        directionPressed = "east";
        arrowMoveDirection(1);
    }
}

function goNorth() {
    if (directionSelected != "south" && gameactive) {
        directionPressed = "north";
        arrowMoveDirection(2);
    }
}

function goSouth() {
    if (directionSelected != "north" && gameactive) {
        directionPressed = "south";
        arrowMoveDirection(3);
    }
}



function snakeImageLoader() {
    //  Show body and correct rotation
    if (snakeBodyDirections[0] === snakeBodyDirections[1]) {
        if (snakeBodyDirections[1] === "west" || snakeBodyDirections[1] === "east") {
            allTiles[snakeBody[1]].style.backgroundPosition = bodyV;
        } else if (snakeBodyDirections[1] === "north" || snakeBodyDirections[1] === "south") {
            allTiles[snakeBody[1]].style.backgroundPosition = bodyL;
        }
    }

    //  Show turning image and correct rotation
    if (snakeBodyDirections[0] != snakeBodyDirections[1]) {
        if (snakeBodyDirections[0] === "north") {
            if (snakeBodyDirections[1] === "east") {
                allTiles[snakeBody[1]].style.backgroundPosition = turnNW;
            } else {
                allTiles[snakeBody[1]].style.backgroundPosition = turnNE;
            }
        } else if (snakeBodyDirections[0] === "east") {
            if (snakeBodyDirections[1] === "south") {
                allTiles[snakeBody[1]].style.backgroundPosition = turnNE;
            } else {
                allTiles[snakeBody[1]].style.backgroundPosition = turnSE;
            }
        } else if (snakeBodyDirections[0] === "south") {
            if (snakeBodyDirections[1] === "west") {
                allTiles[snakeBody[1]].style.backgroundPosition = turnSE;
            } else {
                allTiles[snakeBody[1]].style.backgroundPosition = turnSW;
            }
        } else if (snakeBodyDirections[0] === "west") {
            if (snakeBodyDirections[1] === "north") {
                allTiles[snakeBody[1]].style.backgroundPosition = turnSW;
            } else {
                allTiles[snakeBody[1]].style.backgroundPosition = turnNW;
            }
        }
    }

    var amIdead = false;
    for (let i = 1; i < snakeBody.length; i++) {
        if (snakeBody[0] != snakeBody[i]) {
            continue;
        } else {
            amIdead = true;
            break;
        }
    }

    // Show Head image and correct rotation
    if (!amIdead) {
        if (snakeBodyDirections[0] === "north") {
            allTiles[snakeBody[0]].style.backgroundPosition = headN;
        } else if (snakeBodyDirections[0] === "east") {
            allTiles[snakeBody[0]].style.backgroundPosition = headE;
        } else if (snakeBodyDirections[0] === "south") {
            allTiles[snakeBody[0]].style.backgroundPosition = headS;
        } else if (snakeBodyDirections[0] === "west") {
            allTiles[snakeBody[0]].style.backgroundPosition = headW;
        }
    }

    // set tail direction to lastbodytile (thats not the same TileValue as tail)
    var lastBodyTile = snakeBody.length - 2;
    // when snake tail tile value   ===  lastBody, look for the next tile thats not the same 
    // (used incase food is eaten)
    while (snakeBody[snakeBody.length - 1] === snakeBody[lastBodyTile]) {
        lastBodyTile--;
    }
    snakeBodyDirections[snakeBody.length - 1] = snakeBodyDirections[lastBodyTile];

    if (snakeBodyDirections[lastBodyTile] === "north") {
        allTiles[snakeBody[snakeBody.length - 1]].style.backgroundPosition = tailN;
    } else if (snakeBodyDirections[lastBodyTile] === "east") {
        allTiles[snakeBody[snakeBody.length - 1]].style.backgroundPosition = tailE;
    } else if (snakeBodyDirections[lastBodyTile] === "south") {
        allTiles[snakeBody[snakeBody.length - 1]].style.backgroundPosition = tailS;
    } else if (snakeBodyDirections[lastBodyTile] === "west") {
        allTiles[snakeBody[snakeBody.length - 1]].style.backgroundPosition = tailW;
    }
}


function snakeStep() {
    // Next head position
    function snakeHeadNextStepPosition() {
        var remainder = 0;
        if (directionSelected === "east") {
            remainder = (snakeBody[0] - 9) % 10;
            if (remainder === 0) {
                if (hardwall) {
                    crash("forced");
                    return;
                } else {
                    return snakeBody[0] - 9;
                }
            } else {
                return snakeBody[0] + 1;
            }
        }
        if (directionSelected === "south") {
            if (snakeBody[0] >= 90) {
                if (hardwall) {
                    crash("forced");
                    return;
                } else {
                    return snakeBody[0] - 90;
                }
            } else {
                return snakeBody[0] + 10;
            }
        }
        if (directionSelected === "west") {
            remainder = snakeBody[0] % 10;
            if (remainder === 0) {
                if (hardwall) {
                    crash("forced");
                    return;
                } else {
                    return snakeBody[0] + 9;
                }
            } else {
                return snakeBody[0] - 1;
            }
        }
        if (directionSelected === "north") {
            if (snakeBody[0] <= 9) {
                if (hardwall) {
                    crash("forced");
                    return;
                } else {
                    return snakeBody[0] + 90;
                }
            } else {
                return snakeBody[0] - 10;
            }
        }
    }

    directionSelected = directionPressed;
    // snakeHeadNextStep... called to check if a wall is present before moving the snake
    var snakeHeadPosition = snakeHeadNextStepPosition();

    if (snakeBody[snakeBody.length - 1] != snakeBody[snakeBody.length - 2]) {
        // allTiles[snakeBody[snakeBody.length-1]].classList.remove(skinSelected);
        allTiles[snakeBody[snakeBody.length - 1]].style.backgroundPosition = noBody;
    }

    snakeBodyDirections.pop();
    snakeBodyDirections.unshift(directionSelected);

    snakeBody.unshift(snakeHeadPosition);
    snakeBody.pop();

    snakeImageLoader();
    crash();
    eatFood();
}








var goAuto = setInterval(snakeStep, speed);

clearInterval(goAuto);

function autoMove() {
    goAuto = setInterval(snakeStep, speed);
}

// if (forceCrash === "forced") game will be forced to quit without collision 
function crash(forceCrash) {
    for (let i = 1; i < snakeBody.length; i++) {
        if (snakeBody[0] === snakeBody[i]) /* || forceCrash === "forced") */ {
            allTilesSecond[snakeBody[0]].classList.add(skinSelected);
            if (snakeBodyDirections[0] === "north") {
                allTilesSecond[snakeBody[0]].style.backgroundPosition = headN;
            } else if (snakeBodyDirections[0] === "east") {
                allTilesSecond[snakeBody[0]].style.backgroundPosition = headE;
            } else if (snakeBodyDirections[0] === "south") {
                allTilesSecond[snakeBody[0]].style.backgroundPosition = headS;
            } else if (snakeBodyDirections[0] === "west") {
                allTilesSecond[snakeBody[0]].style.backgroundPosition = headW;
            }
        }
        if (snakeBody[0] === snakeBody[i] || forceCrash === "forced") {
            clearTimeout(goAuto);
            gameover = true;
            gameactive = false;
            // show food eaten in scorescreen
            foodEatenText.innerHTML = foodEaten;
            // IF MISSION -> Set correct stars
            endscreenContinue.style.display = "none";
            scoreLvlUpReqBlock.style.display = "block";
            currentLvl.innerHTML = levelSelectedId[0];

            // Cheating code!
            if (cheatActive) {
                foodEndScreen();
            } else {
                // fancy blinking
                snakeOpacityBackandForth();
                // after 3 seconds go to scorescreen
                setTimeout(foodEndScreen, 3000);
            }
            throw "BOOM BANG!";
        }
    }
}




function toggleScorescreenHighscore() {
    hardHighscorePostgame.style.display = "none";
    hardHighscorePregame.style.display = "none";
    easyHighscorePostgame.style.display = "none";
    easyHighscorePregame.style.display = "none";
    highscoreScreen.style.display = "block";
    missionPostScreen.style.display = "none";
    if (mode === "easy") {
        if (mobile || toggleClickControl) {
            toggleClickField("showClick");
            //    highscoreScreen.style.display = "none";
        }
        easyHighscorePostgame.style.display = "block";
        easyHighscorePregame.style.display = "block";
    } else if (mode === "hard") {
        if (mobile || toggleClickControl) {
            toggleClickField("showClick");
            //    highscoreScreen.style.display = "none";
        }
        hardHighscorePostgame.style.display = "block";
        hardHighscorePregame.style.display = "block";
    } else if (mode === "custom") {
        highscoreScreen.style.display = "none";
        return // dont show any postgame highscores
    } else {
        if (mobile || toggleClickControl) {
            toggleClickField("showClick");
            //    highscoreScreen.style.display = "none";
        }
        // if mode != easy/hard remove scoreboard
        highscoreScreen.style.display = "none";
        missionPostScreen.style.display = "block";
    }
}


//    Phone settings    mobile!

window.mobilecheck = function () {
    var check = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);

    return check;
};

var mobile = window.mobilecheck();
// Testing the mobile features

// mobile = true;



function arrowMoveDirection(btnNumber) {

    function reset(btnToReset) {
        btnToReset.style.backgroundSize = "";
        btnToReset.style.backgroundPosition = "";
        btnToReset.style.backgroundColor = "";
        btnToReset.style.border = "";
    }
    for (let i = 0; i < moveBtn.length; i++) {
        reset(moveBtn[i]);
    }

    moveBtn[btnNumber].style.backgroundSize = "320px 80px";
    // if btnNumber is 2, both arrays are synced
    moveBtn[btnNumber].style.backgroundPosition = moveBtnPositions[btnNumber];
    moveBtn[btnNumber].style.backgroundColor = "rgb(133, 19, 19)";
    moveBtn[btnNumber].style.borderTop = "5px solid rgb(90, 90, 90)";
    moveBtn[btnNumber].style.borderLeft = "5px solid rgb(90, 90, 90)";
}


//      Keyboard functions (Control)         

document.addEventListener("keydown", keyDownTextField, false);

//      Disable scrolling with keyboard     
window.addEventListener("keydown", function (e) {
    // space and arrow keys -> disable default
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);


function keyDownTextField(e) {
    var keyCode = e.keyCode;
    if (!gameover) {
        // Press Space OR Escape to PAUSE or UNPAUSE 
        if (keyCode == 32 || keyCode == 27) {
            if (gameactive && !quickOptionsActive) {
                console.log("Space DELAYED");
                keyDelay = true;
                pauseGame();
                setTimeout(function () { keyDelay = false; }, 1000);
            } else if (!gameactive && quickOptionsActive && !keyDelay) {
                console.log("SPACE countdown");
                unpauseGame();
            }
        }
        if (keyCode == 38 || keyCode == 87) {
            goNorth();
        }
        if (keyCode == 37 || keyCode == 65) {
            goWest();
        }
        if (keyCode == 39 || keyCode == 68) {
            goEast();
        }
        if (keyCode == 40 || keyCode == 83) {
            goSouth();
        }
    }
    // if (cheatActive) {
    if (cheatActive) {
        // Press K to KILL "K"
        if (keyCode == 75) {
            if (gameactive) {
                console.log("You are dead.")
                crash("forced");
            }
        }
        // Press P to PAUSE "P"
        if (keyCode == 80) {
            clearTimeout(goAuto);
            console.log("STOP... Hammertime")
        }
        // Press M to MOVE 1 SnakeStep "M" 
        if (keyCode == 77) {
            snakeStep();
        }
        // Press E to EAT FOOD "E"
        if (keyCode == 69) {
            if (gameactive) {
                eatFood(true);
            }
        }
        // Press N to CHANGE Map "N"
        if (keyCode == 78) {
            toggleScreens("gotoPlayingField");
            isCountdownFinished = false;
            foggyOverlay.style.display = "none";
            countdownBlock.style.display = "none";
        }
    }
}



const moveBtn = [
    document.getElementById("clickMoveLeft"),
    document.getElementById("clickMoveRight"),
    document.getElementById("clickMoveUp"),
    document.getElementById("clickMoveDown")
]

const moveBtnPositions = [
    "-4px -4px",
    "-84px -4px",
    "-164px -4px",
    "-244px -4px"
]

var moveUpBtn = document.getElementById("clickMoveUp");
var moveLeftBtn = document.getElementById("clickMoveLeft");
var moveDownBtn = document.getElementById("clickMoveDown");
var moveRightBtn = document.getElementById("clickMoveRight");

moveBtn[0].addEventListener("click", goWest);
moveBtn[1].addEventListener("click", goEast);
moveBtn[2].addEventListener("click", goNorth);
moveBtn[3].addEventListener("click", goSouth);

moveBtn[0].addEventListener("touchstart", goWest);
moveBtn[1].addEventListener("touchstart", goEast);
moveBtn[2].addEventListener("touchstart", goNorth);
moveBtn[3].addEventListener("touchstart", goSouth);


var metas = document.getElementsByTagName('meta');

/*
// document.addEventListener("gesturestart", gestureStart, false);

function andra() {
    metas[0].content = "width=550px, minimum-scale=0.25, maximum-scale=1.1, user-scalable=no";
}
andra();

var metas = document.getElementsByTagName('meta');

function grnsuisrgn() {
    metas.content = 'width=device-width, minimum-scale=0.1, maximum-scale=0.1, initial-scale=0.1';
}
*/



//    Difficulty selection, easy or hard

var innerBorder = document.getElementById("innerBorder");
var foggyOverlay = document.getElementById("foggyOverlay");

/*
    all modes are: "easy" + "hard" + "betaEasy" + "betaHard" + "straight"
    gamemode select     select gamemode
*/



function selectGameMode(quickplayHARDorEASY) {
    if (quickplayHARDorEASY == "easy") {
        mode = "easy";
        hardwall = false;
        changeImages("easymode");
        // easy shit
        skinSelected = "betaEasy";
        speed = 400;
        speedAdder = 0.96;
    } else if (quickplayHARDorEASY == "hard") {
        mode = "hard";
        hardwall = true;
        changeImages("hardmode");
        // hard shit
        skinSelected = "wobbleblue";
        speed = 250;
        speedAdder = 0.92;
    } else {
        throw "selectGameMode function is buggy."
    }
    startVariables();
    // Reset the menu animations
    startNewGame("reset");
    // Stop NenuWalk after clicking on "HardMenu"
    stopEasy();
    stopHard();
    stopopts();
    // set proper gameover screen (Mission or Hard/Easy-quickplay?)
    toggleScorescreenHighscore();
    // Set starting location and snaketype
    startScreen();
    // Remove menu and go to playing field
    toggleScreens("gotoPlayingField");
    // Countdown and start
    countdownAndAutomove("newGame");
}


var isCountdownFinished = false;
var countdownNumber = 4;
var countdownBlock = document.getElementById("countdownBlock");
var blackWhite = document.getElementById("blackWhite");


function countdownAndAutomove(param) {
    foggyOverlay.style.display = "block";
    blackWhite.style.display = "block";
    countdownBlock.style.display = "block";
    blackWhite.style.animationName = "flimmer";
    // code until comment is just for programming assistance



    // Cheating code!
    if (cheatActive) {
        autoMove();
        gameactive = true;
        blackWhite.style.display = "none";
        countdownBlock.style.display = "none";
        foggyOverlay.style.display = "none";
    } else {
        autoCountdownVariable = setInterval(countdown, 1000);
    }

    if (param === "newGame") {
        generateNewFood();
    }
    function countdown() {
        if (!isCountdownFinished) {
            countdownNumber--;
            if (countdownNumber >= 1) {
                countdownBlock.innerHTML = countdownNumber;
            } else if (countdownNumber === 0) {

                countdownBlock.style.animationName = "countdownGO";
                countdownBlock.innerHTML = "GO!";
            } else if (countdownNumber < 0) {
                blackWhite.style.display = "none";
                countdownBlock.style.display = "none";
                isCountdownFinished = true;
                if (isCountdownFinished) {
                    document.getElementById("bigBlock").style.animationName = "e";
                    //innerBorder.style.animationName = "e";
                    clearInterval(autoCountdownVariable);
                    isCountdownFinished = false;
                    countdownNumber = 4;
                    countdownBlock.innerHTML = "Ready?";

                    countdownBlock.style.animationName = "e";
                    blackWhite.style.animationName = "e";
                    foggyOverlay.style.display = "none";
                    gameactive = true;
                    autoMove();
                }
            }
        }
    }
}


function selectOptions() {
    toggleScreens("gotoOptions");

    // if mobile, change viewport to fit the screen. EXPERIMENTAL!
    if (mobile) {
        metas[0].content = "width=700px, minimum-scale=0.25, maximum-scale=1.6, user-scalable=no";
    }
    // if highscore > required use animation
    startNewGame("reset");
    missionplayAnim(false);
    quickplayAnim(false);
    toggleQuickplay("reset");
    quickplayEnabled = true;
    backgroundUpgradeLockToggle();

    curhsreq.innerHTML = "Quickplay Highscore: " + currentHighscore;

    // NEEDS A REWORK F3
}


var field = [document.getElementById("playingField"), false];
var showOptionField = document.getElementById("optionField");
var freeplayField = document.getElementById("freeplayField");
var header = document.getElementById("header");
var hardHighscorePostgame = document.getElementById("scoreboardHardHighscoreBox");
var easyHighscorePostgame = document.getElementById("scoreboardEasyHighscoreBox");
var hardHighscorePregame = document.getElementById("scoreboardHardHighscore");
var easyHighscorePregame = document.getElementById("scoreboardEasyHighscore");



function toggleScreens(goToMenu) {
    quickOptionsActive = false;
    stopEasy();
    stopHard();
    stopFreeplay();
    stopopts();
    // go to Options
    if (goToMenu === "gotoOptions") {
        // jump to top incase screen is scrolled
        scroll(0, 0);
        showOptionField.style.display = "block";
        header.style.display = "none";

        field[0].style.display = "none";
        showStartMenu.style.display = "none";
        // go to Playing Field
    } else if (goToMenu === "gotoFreeplayField") {
        // jump to top incase screen is scrolled
        scroll(0, 0);
        freeplayField.style.display = "block";
        freePlayIntroduction(freeplayIntro_SlideNumber)

        header.style.display = "none";
        field[0].style.display = "none";
        showStartMenu.style.display = "none";
        // go to Menu
    } else if (goToMenu === "gotoPlayingField") {
        // jump to top incase screen is scrolled
        scroll(0, 0);
        field[0].style.display = "grid";

        header.style.display = "none";
        pauseBlock.style.display = "none";
        freeplayField.style.display = "none";
        showStartMenu.style.display = "none";
        showOptionField.style.display = "none";
        // go to Menu
    } else {
        if (mobile) {
            startHard();
            startEasy();
            startFreeplay();
            startopts();
        }
        showStartMenu.style.display = "block";
        header.style.display = "flex";

        freeplayField.style.display = "none";
        field[0].style.display = "none";
        showOptionField.style.display = "none";
    }
}


// NEW HIGHSCORE!


const highscoreRequired = document.getElementById("hsreq");
const newhighscoreText = document.getElementById("newhighscoreText");

const highscoreEasy = [
    [document.getElementById("hsEasy1"), document.getElementById("appleHs1")],
    [document.getElementById("hsEasy2"), document.getElementById("appleHs2")],
    [document.getElementById("hsEasy3"), document.getElementById("appleHs3")]
]

const highscoreEasyBox = [
    [document.getElementById("hsEasy1box"), document.getElementById("appleHsBox1")],
    [document.getElementById("hsEasy2box"), document.getElementById("appleHsBox2")],
    [document.getElementById("hsEasy3box"), document.getElementById("appleHsBox3")]
]

const highscoreEasyopts = [
    [document.getElementById("hsEasy1opts"), document.getElementById("appleHs1opts")],
    [document.getElementById("hsEasy2opts"), document.getElementById("appleHs2opts")],
    [document.getElementById("hsEasy3opts"), document.getElementById("appleHs3opts")]
]




const highscoreHard = [
    [document.getElementById("hsHard1"), document.getElementById("fishHs1")],
    [document.getElementById("hsHard2"), document.getElementById("fishHs2")],
    [document.getElementById("hsHard3"), document.getElementById("fishHs3")]
]

const highscoreHardBox = [
    [document.getElementById("hsHard1box"), document.getElementById("fishHsBox1")],
    [document.getElementById("hsHard2box"), document.getElementById("fishHsBox2")],
    [document.getElementById("hsHard3box"), document.getElementById("fishHsBox3")]
]

const highscoreHardopts = [
    [document.getElementById("hsHard1opts"), document.getElementById("fishHs1opts")],
    [document.getElementById("hsHard2opts"), document.getElementById("fishHs2opts")],
    [document.getElementById("hsHard3opts"), document.getElementById("fishHs3opts")]
]

const highscoreRowEasyAnimation = [
    document.getElementById("hsrow1easy"),
    document.getElementById("hsrow2easy"),
    document.getElementById("hsrow3easy")
]

const highscoreRowHardAnimation = [
    document.getElementById("hsrow1hard"),
    document.getElementById("hsrow2hard"),
    document.getElementById("hsrow3hard")
]

const highscoreRowEasyAnimationopts = [
    document.getElementById("hsrow1easyopts"),
    document.getElementById("hsrow2easyopts"),
    document.getElementById("hsrow3easyopts")
]

const highscoreRowHardAnimationopts = [
    document.getElementById("hsrow1hardopts"),
    document.getElementById("hsrow2hardopts"),
    document.getElementById("hsrow3hardopts")
]






function newHighscoreAnimation(AnimationTrueOrResetFalse, placement, difficulty) {

    if (AnimationTrueOrResetFalse === "animation") {
        if (difficulty === "easy") {
            highscoreRowEasyAnimation[(placement - 1)].style.animation = "highscoreAnimation 0.5s infinite";
        } else if (difficulty === "hard") {
            highscoreRowHardAnimation[(placement - 1)].style.animation = "highscoreAnimation 0.5s infinite";
        }
    }

    if (AnimationTrueOrResetFalse === "reset") {
        for (i = 0; i < highscoreRowEasyAnimation.length; i++) {
            highscoreRowEasyAnimation[i].style.animation = "e";
            highscoreRowHardAnimation[i].style.animation = "e";
        }
    }
}

function setNewhighscore() {
    if (pointHighscoreEasy[0] >= pointHighscoreHard[0]) {
        currentHighscore = pointHighscoreEasy[0];
    } else if (pointHighscoreHard[0] > pointHighscoreEasy[0]) {
        currentHighscore = pointHighscoreHard[0];
    }
}



function newHighscore() {
    if (mode === "easy") {

        //   Easy 1st place
        if (points > pointHighscoreEasy[0]) {
            pointHighscoreEasy.unshift(points);
            pointHighscoreEasy.pop();


            foodHighscoreEasy.unshift(foodEaten);
            foodHighscoreEasy.pop();

            newhighscoreText.style.display = "block";
            newHighscoreAnimation("animation", 1, "easy");

            //   Easy 2nd place
        } else if (points > pointHighscoreEasy[1]) {

            pointHighscoreEasy[2] = pointHighscoreEasy[1];
            pointHighscoreEasy[1] = points;

            foodHighscoreEasy[2] = foodHighscoreEasy[1];
            foodHighscoreEasy[1] = foodEaten;

            newHighscoreAnimation("animation", 2, "easy");
            //   Easy 3rd place
        } else if (points > pointHighscoreEasy[2]) {

            pointHighscoreEasy.pop();
            pointHighscoreEasy.push(points);


            foodHighscoreEasy.pop();
            foodHighscoreEasy.push(foodEaten);

            newHighscoreAnimation("animation", 3, "easy");
        }

    } else if (mode === "hard") {

        //   Hard 1st place
        if (points > pointHighscoreHard[0]) {
            pointHighscoreHard.unshift(points);
            pointHighscoreHard.pop();


            foodHighscoreHard.unshift(foodEaten);
            foodHighscoreHard.pop();

            // setTimeout(function () { newhighscoreText.style.display = "block"; }, 400)
            newhighscoreText.style.display = "block";
            newHighscoreAnimation("animation", 1, "hard");

            //   Hard 2nd place 
        } else if (points > pointHighscoreHard[1]) {

            pointHighscoreHard[2] = pointHighscoreHard[1];
            pointHighscoreHard[1] = points;

            foodHighscoreHard[2] = foodHighscoreHard[1];
            foodHighscoreHard[1] = foodEaten;


            newHighscoreAnimation("animation", 2, "hard");


            //   Hard 3rd place
        } else if (points > pointHighscoreHard[2]) {

            pointHighscoreHard.pop();
            pointHighscoreHard.push(points);

            foodHighscoreHard.pop();
            foodHighscoreHard.push(foodEaten);

            newHighscoreAnimation("animation", 3, "hard");
        }
    } else if (freeplayMode) {
        console.log("'freeplayMode', don't show highscores.")
        return
    } else {
        if (lvlVal[levelSelectedId[0]] < points) {
            lvlVal[levelSelectedId[0]] = points;
        }
        // set Number of stars in endscreen (Mission only.)
        var tempHs = lvlValReq[levelSelectedId[0]];

        document.getElementById("fiveStarImage").style.display = "none";

        if (points >= tempHs * 1.25) {
            starPosition.style.backgroundPosition = lvlStars[5];
            // 5 stars opacity Flimmer
            document.getElementById("fiveStarImage").style.display = "block";
            //    ADD some 5 star achievements of some sort, 
            //    maybe a star on the level Selected?
        } else if (points >= tempHs * 1.125) {
            starPosition.style.backgroundPosition = lvlStarsHalf[4];
        } else if (points >= tempHs) {
            starPosition.style.backgroundPosition = lvlStars[4];
        } else if (points >= tempHs * 0.875) {
            starPosition.style.backgroundPosition = lvlStarsHalf[3];
        } else if (points >= tempHs * 0.75) {
            starPosition.style.backgroundPosition = lvlStars[3];
        } else if (points >= tempHs * 0.625) {
            starPosition.style.backgroundPosition = lvlStarsHalf[2];
        } else if (points >= tempHs * 0.5) {
            starPosition.style.backgroundPosition = lvlStars[2];
        } else if (points >= tempHs * 0.375) {
            starPosition.style.backgroundPosition = lvlStarsHalf[1];
        } else if (points >= tempHs * 0.25) {
            starPosition.style.backgroundPosition = lvlStars[1];
        } else if (points >= tempHs * 0.125) {
            starPosition.style.backgroundPosition = lvlStarsHalf[0];
        } else if (points < tempHs * 0.125) {
            starPosition.style.backgroundPosition = lvlStars[0];
        }

        if (points >= lvlValReq[levelSelectedId[0]]) {
            levelUP();
            selectLevel("DeSelect");
        }

    }

    for (i = 0; i < 3; i++) {

        // Hard Highscore list
        // Point Highscore
        highscoreHard[i][0].innerHTML = pointHighscoreHard[i] + " Points";
        highscoreHardBox[i][0].innerHTML = pointHighscoreHard[i] + " Points";
        highscoreHardopts[i][0].innerHTML = pointHighscoreHard[i] + " Points";
        // Food Highscore
        highscoreHard[i][1].innerHTML = foodHighscoreHard[i] + "x";
        highscoreHardBox[i][1].innerHTML = foodHighscoreHard[i] + "x";
        highscoreHardopts[i][1].innerHTML = foodHighscoreHard[i] + "x";
        // Easy Highscore list
        // Point Highscore
        highscoreEasy[i][0].innerHTML = pointHighscoreEasy[i] + " Points";
        highscoreEasyBox[i][0].innerHTML = pointHighscoreEasy[i] + " Points";
        highscoreEasyopts[i][0].innerHTML = pointHighscoreEasy[i] + " Points";
        // Food Highscore
        highscoreEasy[i][1].innerHTML = foodHighscoreEasy[i] + "x";
        highscoreEasyBox[i][1].innerHTML = foodHighscoreEasy[i] + "x";
        highscoreEasyopts[i][1].innerHTML = foodHighscoreEasy[i] + "x";

    }
    setNewhighscore();
}


function allDataFullReset() {
    // Reset all data
    localStorage.removeItem("save1");
    setTimeout(() => {
        location.reload();
    }, 100);
}


function highscoreFullReset(areYouSure) {
    function showYesAndNo(areYouSure) {
        if (areYouSure === true) {
            document.getElementById("optsHSresetAll").style.display = "none";
            document.getElementById("optsHSresetYes").style.display = "inline-block";
            document.getElementById("optsHSresetNo").style.display = "inline-block";
            document.getElementById("optsHSresetText").style.display = "block";
        } else if (areYouSure === false) {
            document.getElementById("optsHSresetAll").style.display = "inline-block";
            document.getElementById("optsHSresetYes").style.display = "none";
            document.getElementById("optsHSresetNo").style.display = "none";
            document.getElementById("optsHSresetText").style.display = "none";
        }
    }
    if (areYouSure) {
        currentHighscore = 0;
        pointHighscoreEasy = [0, 0, 0];
        pointHighscoreHard = [0, 0, 0];
        foodHighscoreEasy = [0, 0, 0];
        foodHighscoreHard = [0, 0, 0];
        newHighscore();
        curhsreq.innerHTML = "Current Highscore: " + currentHighscore;
        backgroundUpgradeLockToggle();
        console.log("Highscores reset.");
        // hide button, "yes or no"
        showYesAndNo(false);
        saveStorage();
    } else if (areYouSure === false) {
        // hide button, "yes or no"
        showYesAndNo(false);
    } else {
        console.log("Are you sure?");
        // show button, "yes or no"
        showYesAndNo(true);
    }
}


// NEW HIGHSCORE!

var scorescreen = document.getElementById("scoreboardBox");
var highscoreScreen = document.getElementById("scoreboardHighscoreOuterBorder");

var scoreboardVisible = false;


// if (param === false) hide scorescreen
function scorescreenToggle(param) {
    // Hide scorescreen
    if (!param) {
        scorescreen.style.animationName = "e";

        highscoreScreen.style.opacity = "1";
        newhighscoreText.style.display = "none";

        // Remove highscore animation 
        newHighscoreAnimation("reset");

        scoreboardVisible = false;

        // Show scorescreen
    } else if (param) {
        scorescreen.style.animationName = "scorescreenPC";

        highscoreScreen.style.opacity = "0";
        scoreboardVisible = true;
    }
}


// stop rotation, reset rotation and remove all food 

function foodEndScreen(param) {
    if (param) {
        clearInterval(gameoverscreen);
        for (i = 0; i < allTiles.length; i++) {
            allTilesSecond[i].style.transform = "rotate(0deg)";
            allTilesSecond[i].style.backgroundPosition = "0px 0px";
            allTilesSecond[i].classList.remove(foodImg);
        }
        return;
    }
    if (mode === "") {
        console.log("Missions selected");
    } else {
        console.log("Missions not selected???");
    }
    scorescreenToggle(true);
    newHighscore();

    // If autosave TRUE: save
    if (autosaveON) {
        saveStorage();
    }

    for (let i = 0; i < allTiles.length; i++) {
        allTiles[i].classList.remove(skinSelected);
        allTilesSecond[i].classList.remove(skinSelected);
        allTilesSecond[i].style.backgroundPosition = "0px 0px";

        allTilesSecond[i].classList.add(foodImg);
    }
    var spin = 0;
    function gameoverSpin() {
        if (gameover) {
            if (spin === 1) {
                for (i = 0; i < allTiles.length; i++) {
                    allTilesSecond[i].style.transform = "rotate(270deg)";
                }
                return spin = 2;
            } else if (spin === 2) {
                for (i = 0; i < allTiles.length; i++) {
                    allTilesSecond[i].style.transform = "rotate(180deg)";
                }
                return spin = 3;
            } else if (spin === 3) {
                for (i = 0; i < allTiles.length; i++) {
                    allTilesSecond[i].style.transform = "rotate(90deg)";
                }
                return spin = 0;
            } else {
                for (i = 0; i < allTiles.length; i++) {
                    allTilesSecond[i].style.transform = "rotate(0deg)";
                }
                return spin = 1;
            }
        }
    }
    // Make all food look up by calling function once
    gameoverSpin();
    gameoverscreen = setInterval(gameoverSpin, 400);
}


function snakeOpacityBackandForth() {
    for (let i = 0; i < snakeBody.length; i++) {
        allTiles[snakeBody[i]].style.animation = "deadSnake 3s linear";
        allTilesSecond[snakeBody[i]].style.animation = "deadSnake 3s linear";

        setTimeout(() => {
            allTiles[snakeBody[i]].style.animation = "e";
            allTilesSecond[snakeBody[i]].style.animation = "e";
        }, 3000);
    }
}


// ALL FOOD FUNCTIONS

function generateNewFood() {
    if (snakeBody.length > 98) {
        // if snake is this long, dont make new food.
        return;
    }
    foodValue = Math.floor((Math.random() * 100));
    for (let i = 0; i < snakeBody.length; i++) {
        // if foodvalue is on snakebody reroll (make i = 0;)
        if (foodValue === snakeBody[i]) {
            newFoodTile();
            i = 0;
        } else if (foodValue === snakeBody[0]) {
            newFoodTile();
            i = 0;
        }
    }
    allTilesSecond[foodValue].classList.add(foodImg);

    function newFoodTile() {
        foodValue = Math.floor((Math.random() * 100));
    }
    if (foodValue === snakeBody[0]) {
        throw "FOOD IS HEAD!?!?!?!?"
    }
}


function eatFood(forceFunction) {
    //  if snakeHead is on food, eat it
    if (snakeBody[0] === foodValue || forceFunction) {

        //  When food eaten remove image 
        allTilesSecond[foodValue].classList.remove(foodImg);

        // Make new food
        generateNewFood();

        //  Points and foodeaten
        points += pointsAdder;
        foodEaten++;

        // Show new points
        pointsValue.innerHTML = points;

        //  Make body 1 tile longer, extend it on the tile you ate the food
        snakeBody.unshift(snakeBody[0]);
        snakeBodyDirections.unshift(directionSelected);

        // Speed up++ and reset interval
        clearTimeout(goAuto);
        if (speedAdder > 0) {
            speed *= speedAdder;
        } else if (speedAdder < 0) {
            speed += -speedAdder;
        }
        console.log(speed)
        goAuto = setInterval(snakeStep, speed);
    }
}


//   Pause! functions (game paused)

var pauseBlock = document.getElementById("pauseBlock");
var quickOptionsField = document.getElementById("quickOptionsField");

var keyDelay = false;
var quickOptionsActive = false;

quickOptionsField.addEventListener("click", pauseGame);

function pauseGame() {
    if (!gameactive || gameover) {
        console.log("Game is not active");
    } else if (gameactive) {
        if (mobile) {
            //    toggleClickField("showHS");
        }
        foggyOverlay.style.display = "block";
        pauseBlock.style.display = "block";
        clearInterval(goAuto);
        gameactive = false;
        quickOptionsActive = true;
    }
}


function unpauseGame() {
    if (mobile) {
        //    toggleClickField("showClick");
    }
    quickOptionsActive = false;
    pauseBlock.style.display = "none";
    countdownAndAutomove();
}

function quickOptionsExit() {
    if (mobile) {
        startEasy();
        startHard();
        toggleClickField("showClick");
    }
    gameactive = false;
    quitGame();
    /*
    restartGame(true);
    toggleScreens();
    */
}


var pauseText = document.getElementById("pauseText");
var clickplayfield = document.getElementById("clickPlayField");
var toggleClickControl = mobile;

function toggleClickField(showClickORHighscore) {
    function showClickField() {
        highscoreScreen.style.display = "none";
        document.getElementById("clickFieldRangeRegulator").style.display = "block";
        clickplayfield.style.display = "grid";
    }
    function showHighscoreField() {
        if (mode != "") {
            highscoreScreen.style.display = "block";
        }
        clickplayfield.style.display = "none";
        document.getElementById("clickFieldRangeRegulator").style.display = "none";
    }

    if (showClickORHighscore === "showClick") {
        showClickField();
    } else if (showClickORHighscore === "showHS") {
        showHighscoreField();
    }

    if (!toggleClickControl) {
        showClickField();
        toggleClickControl = true;

    } else if (toggleClickControl) {
        showHighscoreField();
        toggleClickControl = false;

    }
}



// StartMenu / Menu / startScreenMobile

var menuBlocks = [
    [document.getElementById("hard0"), document.getElementById("easy0"), 1],
    [document.getElementById("hard1"), document.getElementById("easy1"), 1],
    [document.getElementById("hard2"), document.getElementById("easy2"), 1],
    [document.getElementById("hard3"), document.getElementById("easy3"), 1],
    [document.getElementById("hard4"), document.getElementById("easy4"), 1],
    [document.getElementById("hard5"), document.getElementById("easy5"), 1],
    [document.getElementById("hard6"), document.getElementById("easy6"), 1],
    [document.getElementById("hard7"), document.getElementById("easy7"), 1],
    [document.getElementById("hard8"), document.getElementById("easy8"), 1],
    [document.getElementById("hard9"), document.getElementById("easy9"), 1]
]



//    posMenu[0] = hard  //  posMenu[1] = easy   
var posMenu = [-1, -1];
var curMenu = [-1, -1, -1, -1];



//  MENU BUTTONS ANIMATION
function menuSnakeStep(hard0easy1, oneOrTwo, bodyId, headId) {
    if (posMenu[oneOrTwo] === (hard0easy1) && hard0easy1 <= 8) {
        menuBlocks[(hard0easy1 + 1)][oneOrTwo].classList.add(headId);
        if (posMenu[oneOrTwo] <= 8 && posMenu[oneOrTwo] >= 0) {
            menuBlocks[(hard0easy1)][oneOrTwo].classList.remove(headId);
        }
    }
    if (posMenu[oneOrTwo] >= 9) {
        menuBlocks[9][oneOrTwo].classList.remove(headId);
        menuBlocks[0][oneOrTwo].classList.add(headId);
    }
    // move body +1
    if (posMenu[oneOrTwo] >= 0) {
        if (posMenu[oneOrTwo] === hard0easy1) {
            menuBlocks[hard0easy1][oneOrTwo].classList.add(bodyId);
            if (menuBlocks[0][2] === oneOrTwo) {

                // if this is     (  x  )  bodyLength is x+1
                if (posMenu[oneOrTwo] <= 3) {
                    // this is always hard0easy1+( x + y = 9 )
                    //                  (  y  )
                    menuBlocks[(hard0easy1 + 6)][oneOrTwo].classList.remove(bodyId);
                } else {
                    // this is always hard0easy1-(x+1)
                    // this is bodyLength(x+1)
                    menuBlocks[(hard0easy1 - 4)][oneOrTwo].classList.remove(bodyId);
                }
            } else {
                // This section is for the hardMenu button
                if (posMenu[oneOrTwo] <= 5) {
                    menuBlocks[(hard0easy1 + 4)][oneOrTwo].classList.remove(bodyId);
                } else {
                    menuBlocks[(hard0easy1 - 6)][oneOrTwo].classList.remove(bodyId);
                }
            }
        }
    }
    posMenu[oneOrTwo]++;
    curMenu[oneOrTwo]++;
}


function autoMenuHard() {
    hardAnim = setInterval(hardMenuWalk, 100);
}

function autoMenuEasy() {
    easyAnim = setInterval(easyMenuWalk, 250);
}


var delayedHardAnim;
var delayedEasyAnim;
autoMenuEasy();
autoMenuHard();
clearInterval(easyAnim);
clearInterval(hardAnim);


function easyMenuWalk() {
    if (curMenu[1] === 10) {
        curMenu[1] = curMenu[1] - 10;
        posMenu[1] = posMenu[1] - 10;
    }
    menuSnakeStep(curMenu[1], 1, "easyBody", "easyHead");
}


function hardMenuWalk() {
    if (curMenu[0] === 10) {
        curMenu[0] = curMenu[0] - 10;
        posMenu[0] = posMenu[0] - 10;
    }
    menuSnakeStep(curMenu[0], 0, "hardBody", "hardHead");
}


var easyActive = hardActive = optionsActive = false;


function startHard() {
    for (i = 0; i < menuBlocks.length; i++) {
        menuBlocks[i][0].style.display = "inline-block";
    }
    if (hardActive) {
        clearInterval(hardAnim);
        clearInterval(delayedHardAnim);
    }
    delayedHardAnim = setTimeout(autoMenuHard, 400);
    hardActive = true;
}

function stopHardHover() {
    if (!mobile) {
        stopHard();
    }
}

function stopHard() {
    clearInterval(delayedHardAnim);
    clearInterval(hardAnim);

    curMenu[0] = -1;
    posMenu[0] = -1;
    for (i = 0; i < menuBlocks.length; i++) {
        menuBlocks[i][0].classList.remove("hardBody");
        menuBlocks[i][0].classList.remove("hardHead");
        menuBlocks[i][0].style.display = "none";
    }
}


function startEasy() {
    for (i = 0; i < menuBlocks.length; i++) {
        menuBlocks[i][1].style.display = "inline-block";
    }
    if (easyActive) {
        clearInterval(easyAnim);
        clearInterval(delayedEasyAnim);
    }
    delayedEasyAnim = setTimeout(autoMenuEasy, 400);
    easyActive = true;
}

function stopEasyHover() {
    if (mobile === false) {
        stopEasy();
    }
}

function stopEasy() {
    clearInterval(delayedEasyAnim);
    clearInterval(easyAnim);

    curMenu[1] = -1;
    posMenu[1] = -1;
    for (i = 0; i < menuBlocks.length; i++) {
        menuBlocks[i][1].classList.remove("easyBody");
        menuBlocks[i][1].classList.remove("easyHead");
        menuBlocks[i][1].style.display = "none";
    }
}


var freeplayActive = false;

var freeplayMenuBlocks = [
    document.getElementById("freeP0"),
    document.getElementById("freeP1")
]

function autoMenuFreeplay() {
    freeplayAnim = setInterval(freeplayMenuWalk, 500);
}

autoMenuFreeplay();
clearInterval(freeplayAnim);

function startFreeplay() {
    if (freeplayActive) {
        clearInterval(freeplayAnim);
    }
    freeplayAnim = setInterval(freeplayMenuWalk, 500);
    freeplayActive = true;
}

function stopFreeplay() {
    if (!mobile) {
        clearInterval(freeplayAnim);

        curMenu[2] = -1;
        freeplayMenuBlocks[0].style.display = "none";
        freeplayMenuBlocks[1].style.display = "none";

        freeplayMenuBlocks[0].classList.remove("apple");
        freeplayMenuBlocks[1].classList.remove("apple");

        freeplayMenuBlocks[0].classList.remove("fish");
        freeplayMenuBlocks[1].classList.remove("fish");

        freeplayMenuBlocks[0].classList.remove("cheese");
        freeplayMenuBlocks[1].classList.remove("cheese");

        freeplayMenuBlocks[0].classList.remove("cookie");
        freeplayMenuBlocks[1].classList.remove("cookie");
    }
}

function freeplayMenuWalk() {
    // if position is laststep, reset it
    function foodSwapMenu(remove, add) {
        for (i = 0; i < freeplayMenuBlocks.length; i++) {
            freeplayMenuBlocks[i].classList.remove(remove);
            freeplayMenuBlocks[i].classList.add(add);
        }
    }
    if (curMenu[2] === -1) {

        freeplayMenuBlocks[0].style.display = "inline-block";
        freeplayMenuBlocks[1].style.display = "inline-block";
        // first cycle
        foodSwapMenu("apple", "apple");
    } else if (curMenu[2] === 0) {
        foodSwapMenu("apple", "fish");
    } else if (curMenu[2] === 1) {
        foodSwapMenu("fish", "cheese");
    } else if (curMenu[2] === 2) {
        foodSwapMenu("cheese", "cookie");
    } else {
        foodSwapMenu("cookie", "apple");
        // last image in the cycle
        return curMenu[2] = 0;
    }
    curMenu[2]++;
}


// TESTING OPTIONS ANIMATION BELOW!

var optsActive = false;

var optsMenuBlocks = [
    document.getElementById("ops0"),
    document.getElementById("ops1")
]

function autoMenuopts() {
    optsAnim = setInterval(optsMenuWalk, 500);
}

autoMenuopts();
clearInterval(optsAnim);

function startopts() {
    if (optsActive) {
        clearInterval(optsAnim);
    }
    optsAnim = setInterval(optsMenuWalk, 500);
    optsActive = true;
}

function stopoptsHover() {
    if (!mobile) {
        stopopts();
    }
}

function stopopts() {
    clearInterval(optsAnim);

    curMenu[3] = -1;
    optsMenuBlocks[0].style.display = "none";
    optsMenuBlocks[1].style.display = "none";

    optsMenuBlocks[0].classList.remove("trophy1");
    optsMenuBlocks[1].classList.remove("trophy1");

    optsMenuBlocks[0].classList.remove("trophy2");
    optsMenuBlocks[1].classList.remove("trophy2");

    optsMenuBlocks[0].classList.remove("trophy3");
    optsMenuBlocks[1].classList.remove("trophy3");
}

function optsMenuWalk() {
    // if position is laststep, reset it
    function iconSwapmenu(remove, add) {
        for (i = 0; i < optsMenuBlocks.length; i++) {
            optsMenuBlocks[i].classList.remove(remove);
            optsMenuBlocks[i].classList.add(add);
        }
    }
    if (curMenu[3] === -1) {

        optsMenuBlocks[0].style.display = "inline-block";
        optsMenuBlocks[1].style.display = "inline-block";
        // first cycle
        iconSwapmenu("trophy3", "trophy3");
    } else if (curMenu[3] === 0) {
        iconSwapmenu("trophy3", "trophy2");
    } else if (curMenu[3] === 1) {
        iconSwapmenu("trophy2", "trophy1");
        //    } else if (curMenu[3] === 2) {
        //        iconSwapmenu("trophy3", "trophy1");
    } else {
        iconSwapmenu("trophy1", "trophy3");
        // last image in the cycle
        return curMenu[3] = 0;
    }
    curMenu[3]++;
}

// TESTING OPTIONS ANIMATION ABOVE!




var optionId = document.getElementById("options");
//  Used to change color to background color and also onclick eventlistener
var optionsUpgrade = document.getElementById("myOptionsUpgrade");

var fieldBackgroundAndBorder = document.getElementById("field");

var quickplayEnabled = true;




// Click "Options"
optionId.addEventListener("click", selectOptions);
optionId.addEventListener("mouseenter", startopts);
optionId.addEventListener("mouseleave", stopopts);
optionsUpgrade.addEventListener("click", myAdder);
optionsBack.addEventListener("click", () => {
    if (backgroundUpgAnimActive === false) {
        toggleScreens();
        highscoreFullReset(false);
        exportStorage('hide');
        importStorage('hide');
        if (mobile) {
            metas[0].content = "width=550px, minimum-scale=0.25, maximum-scale=0.9, user-scalable=no";
        }
    }
})


//   F3!    phone!   mobile! settings   


function startScreenMobile() {
    if (mobile === true) {
        startHard();
        startEasy();
        startFreeplay();
        startopts();
        // Hide Keyboard controls in options
        document.getElementById("keyboardControlsBlock").style.display = "none";

        metas[0].content = "width=550px, minimum-scale=0.25, maximum-scale=0.9, user-scalable=no";

        // Hide "Enable click control" Button
        document.getElementById("clickcheckbox").style.display = "none";
        document.getElementById("clickFieldRangeRegulator").style.display = "block";
        // document.getElementById("pauseTextBlock").style.display = "none";

        document.getElementById("clickcheckbox").checked = true;
        const quickplaySubMenu = document.getElementById("menuSubBoxQuickPlay").style;
        const quickplayMenu = document.getElementById("menuMainBoxQuickplay").style;

        const playSubMenu = document.getElementById("menuSubBoxPlay").style;
        const playMenu = document.getElementById("menuMainBoxPlay").style;

        const quickplayEasy = document.getElementById("menuSubBoxE").style;
        const quickplayHard = document.getElementById("menuSubBoxH").style;


        playMenu.fontWeight = quickplayMenu.fontWeight = playSubMenu.fontWeight = quickplaySubMenu.fontWeight = quickplayHard.fontWeight = quickplayEasy.fontWeight = "bold";
        playSubMenu.marginTop = quickplaySubMenu.marginTop = "0px";
        playSubMenu.width = playMenu.width = quickplaySubMenu.width = quickplayMenu.width = "490px";
        playMenu.height = quickplayMenu.height = "80px";
        playMenu.border = quickplayMenu.border = "3px solid black";
        playMenu.textShadow = quickplayMenu.textShadow = "2px 2px 1px white";
        playMenu.borderRadius = quickplayMenu.borderRadius = "0px";
        playMenu.marginLeft = quickplayMenu.marginLeft = "-245px";

        optionId.style.width = "320px";
        optionId.style.height = "60px";
        optionId.style.paddingTop = "20px";
        optionId.style.border = "3px solid black";
        optionId.style.fontWeight = "bold";
        optionId.style.borderRadius = "0px";
        optionId.style.marginLeft = "-160px";
        optionId.style.textShadow = "2px 2px 1px white";

        freePlayMenu.style.width = "224px";
        freePlayMenu.style.height = "50px";
        freePlayMenu.style.paddingTop = "20px";
        freePlayMenu.style.paddingLeft = "12px";
        freePlayMenu.style.border = "3px solid black";
        freePlayMenu.style.textShadow = "2px 2px 1px white";
        freePlayMenu.style.fontWeight = "bold";
        freePlayMenu.style.borderRadius = "0px";
        freePlayMenu.style.marginBottom = "8px";
        freePlayMenu.style.marginLeft = "-112px";

    }
}

startScreenMobile();


function changeImages(mode) {
    bigBlock.classList.remove(backgroundImg);
    if (mode == "easymode") {
        pointsAdder = 4;
        backgroundImg = "grass";
        foodImg = "apple";
    } else if (mode == "hardmode") {
        pointsAdder = 7;
        backgroundImg = "water";
        foodImg = "fish";
    }
    //  Add HARDWALL
    if (hardwall) {
        bigBlock.style.border = "6px solid rgb(255, 0, 0)";
        console.log("Hardwall active!");
        document.getElementById("bigBlock").style.animationName = "flimmer";
        document.getElementById("bigBlockBorder").style.display = "block";
        //  Remove HARDWALL
    } else /* if (mode === "easy") */ {
        document.getElementById("bigBlockBorder").style.display = "none";
        bigBlock.style.border = "6px solid black";
    }
    // HARDSET arrow key to point to EAST
    arrowMoveDirection(1);
    // set background
    bigBlock.classList.add(backgroundImg);
}

var backgroundUpgAnimActive = false;

function myAdder() {
    var option = document.createElement("option");

    if (optionAdder < backgroundUpgradeReq.length - 1) {
        optionSelected.add(option);
    } else {
        return console.log("No more backgrounds");
    }
    document.getElementById("newBackgroundAvailable").style.display = "block";
    optionAdder++;
    if (optionAdder === 2) {
        // if bkUpgReq is < currentHighscore, unlock
        backgroundUpgradeLockToggle();
        option.text = "Purple";
        optionSelected[optionAdder].id = "purple";
        highscoreRequired.innerHTML = "Highscore required: " + backgroundUpgradeReq[optionAdder];
    } else if (optionAdder === 3) {
        backgroundUpgradeLockToggle();
        option.text = "Yellow";
        optionSelected[optionAdder].id = "yellow";
        highscoreRequired.innerHTML = "Highscore required: " + backgroundUpgradeReq[optionAdder];
    } else if (optionAdder === 4) {
        backgroundUpgradeLockToggle();
        option.text = "Green";
        optionSelected[optionAdder].id = "green";
        highscoreRequired.innerHTML = "Highscore required: " + backgroundUpgradeReq[optionAdder];
    } else if (optionAdder === 5) {
        backgroundUpgradeLockToggle();
        option.text = "Red";
        optionSelected[optionAdder].id = "red";
        highscoreRequired.innerHTML = "Highscore required: " + backgroundUpgradeReq[optionAdder];
    } else if (optionAdder === 6) {
        backgroundUpgradeLockToggle();
        option.text = "Orange";
        optionSelected[optionAdder].id = "orange";
        highscoreRequired.innerHTML = "Highscore required: " + backgroundUpgradeReq[optionAdder];
    } else if (optionAdder === 7) {
        backgroundUpgradeLockToggle();
        option.text = "Teal";
        optionSelected[optionAdder].id = "teal";
        highscoreRequired.innerHTML = "No more backgrounds available.";
    } else {
        return console.log("Something went wrong with adding backgrounds");
    }
}

// This is about Background upgrades
var optionAdder = 1;

//  <select> Element id  
var optionSelected = document.getElementById("myOptions");

//  Body element, this uses its Id () 
var bodyColor = document.getElementsByTagName("BODY")[0];

//  Needed to make smooth transition between backgrounds 
var currentColor = selectedColor = "rgb(255, 200, 148)";

// most ineffective function ever
function htmlBackgroundSelect() {
    cssRoot = document.querySelector(':root');

    var currentBackgroundColor;

    cssRoot.style.setProperty('--background', 'rgb(255, 129, 129)');

    cssRoot.style.setProperty('--subBackground', 'white');

    function changeColor(param) {
        currentBackgroundColor = param;
        cssRoot.style.setProperty('--background', currentBackgroundColor);
        if (param === "rgb(20, 20, 20)") {
            cssRoot.style.setProperty('--changingTextColor', "white");
        } else {
            cssRoot.style.setProperty('--changingTextColor', "black");
        }
    }

    switch (optionSelected.selectedIndex) {
        case 0:
            changeColor("rgb(255, 200, 148)");
            // Original
            break;
        case 1:
            changeColor("rgb(20, 20, 20)");
            cssRoot.style.setProperty('--subBackground', "rgb(60, 60, 60)");
            // Darkula darkly darkmode
            break;
        case 2:
            changeColor("rgb(168, 121, 255)");
            // Purple
            break;
        case 3:
            changeColor("rgb(233, 233, 141)");
            // Yellow
            break;
        case 4:
            changeColor("rgb(105 206 102)");
            // Green
            break;
        case 5:
            changeColor("rgb(255, 129, 129)");
            // Red
            break;
        case 6:
            changeColor("rgb(255, 173, 96)");
            // Orange
            break;
        case 7:
            changeColor("rgb(98 202 202)");
            // Teal
            break;
        default:
            throw "htmlBackgroundSelect() ERROR: Something went wrong."
    }

}

// Restart game, reset game, end game (if "param === true" don't start countdown)
function restartGame(param) {
    // stop rotation, reset rotation and remove all food
    foodEndScreen(true);
    // reset snake"Tail/Body/Head" 
    resetSnake(param);
    // Remove scorescreen
    scorescreenToggle(false);
    if (param) {
        return;
    }
    // Reset Snake start position when game restarted
    if (mode === "") {
        lvlCheck();
    }
    startScreen();
    // HARDSET arrow key to point to EAST
    arrowMoveDirection(1);
    // Start new countdown and start game
    countdownAndAutomove("newGame");

    function resetSnake() {
        if (mode === "easy") {
            if (!freeplayMode) {
                skinSelected = "betaEasy";
            } else {
                skinSelected = freeplayBodySkin.value;
            }
            speed = 400;
            speedAdder = 0.96;
        } else if (mode === "hard") {
            if (!freeplayMode) {
                skinSelected = "wobbleblue";
            } else {
                skinSelected = freeplayBodySkin.value;
            }
            speed = 250;
            speedAdder = 0.92;
        } else if (mode == "custom") {
            speed = sliderSpeedOutput;
            speedAdder = sliderAcceleration;
            backgroundImg = freeplayBackgroundSkin.value.toLowerCase();
            foodImg = freeplayFoodSkin.value.toLowerCase();
            skinSelected = freeplayBodySkin.value;
        }
        startVariables();

        gameover = false;
        pointsValue.innerHTML = 0;

        for (let i = 0; i < allTiles.length; i++) {
            allTiles[i].classList.remove(skinSelected);
            allTiles[i].style.backgroundPosition = noBody;
            allTilesSecond[i].classList.remove(skinSelected);
        }
    }
}


























var freePlayIntro = false;

const showFreePlay = (gameloaded) => {
    if (firstQuit == true) {
        return;
    }
    if (!gameloaded) {
        optionId.style.marginTop = "50px";
        optionId.style.animationName = "enableFreePlayOptions";
        freePlayMenu.style.animationName = "enableFreePlay";
        freePlayMenu.style.display = "block";
        setTimeout(() => {
            optionId.style.animationName = "e";
            freePlayMenu.style.animationName = "e";
        }, 1000);
        console.log("free play first time")
        freePlayIntro = true;
    } else if (gameloaded) {
        optionId.style.marginTop = "50px";
        freePlayMenu.style.display = "block";

        freePlayIntro = true;
        // disable from here later

        console.log("free play on load")
    } else {
        throw "Something is weird with showFreePlay."
    }
    firstQuit = true;
}

var freeplayIntroBox = document.getElementById("freeplayIntroBox");
var freeplayIntro_SlideNumber = 1;

const freePlayIntroduction = (state) => {
    if (freePlayIntro) {
        if (state == 1) {
            freeplayIntroBox.innerHTML = `
                <b>Free Play</b> mode lets you play with different
                skins and still compete on the highscore list.
                <br>
                <button>Next</button>`;
            gameFade.style.display = "block";
            freeplayIntroBox.style.display = "block";
            document.getElementById("confirmDecisionBlock").style.display = "none";
            state++;
        } else if (state == 2) {   
            gameFade.style.top = "200px";
            

            state++;
        } else if (state == 3) {

            state++;
        } else if (state == 4) {

            state = 1;
        }
        console.log("state: "+ state)
    } else {
        gameFade.style.display = "none";
        document.getElementById("confirmDecisionBlock").style.display = "block"
        state = 1;
    }
}


// after
function quitGame(goToNextLevel) {
    freeplayMode = false;
    endscreenContinue.style.display = "none";
    // Change "Points:" with "Food eaten:"
    document.getElementById("pointsText").innerText = "Points: ";
    // Hide 'Food eaten' block below
    document.getElementById("scoreboard").style.display = "block"
    // show custom menu stats
    document.getElementById("customModeSettingsBlock").style.display = "none"

    // reset field to starting position
    restartGame(true);
    selectLevel(levelSelectedId[0]);
    // When game is over, show "Free Play" and move down Options slighly
    //              ( Only call this function ONCE )
    showFreePlay();

    // change back to Menu screen
    toggleScreens();
    // Update skins in freeplay
    freeplaySkinCheck();
    // if mobile start MenuWalk
    if (mobile) {
        startEasy();
        startHard();
    }
    if (goToNextLevel === "nextLvl") {
        // when Next Level is pressed, go to Stage select and select next level, no animation

        menuSelectMissionPlay[1].style.marginTop = "-84px";
        menuSelectMissionPlay[2].style.height = "200px";
        selectLevel(levelSelectedId[0] + 1, true);
        // playGame();
    } else {
        missionplayAnim(false);
        startNewGame(false);
    }
}


// Highscore lock functions (background lock) 


var fullLock = document.getElementById("fullLock");
var lockHammer = document.getElementById("lockHammer");
var lockBody = document.getElementById("lockBody");

var hideLockTimer = setTimeout(unlockAnim, 3000);
var hardHideLockTimer = setTimeout(lockHideDisplay, 1500);

clearTimeout(hideLockTimer);
clearTimeout(hardHideLockTimer);

function lockHideDisplay() {
    fullLock.style.display = "none";
    lockHammer.style.animation = "e";
    lockBody.style.animation = "e";
    // disable back when animation active
    backgroundUpgAnimActive = false;
}

function unlockAnim() {
    lockHammer.style.animation = "unlock 0.5s linear";
    lockHammer.style.animationFillMode = "forwards";
    fullLock.style.animation = "hideLocked 1.5s linear";
}



function newBackground() {
    document.getElementById("newBackgroundAvailable").style.display = "none";
}



const backgroundUpgradeReq = ["not used", 10, 20, 30, 40, 50, 60, 70]




var backgroundUpgIsLocked = true;



function backgroundUpgradeLockToggle() {
    // unlock button if 'upgradeReq' is lower than 'current Highscore'
    if (backgroundUpgradeReq[optionAdder] <= currentHighscore) {
        if (backgroundUpgIsLocked === true) {
            unlock();
            return backgroundUpgIsLocked = false;
        }
    }
    if (backgroundUpgradeReq[optionAdder] > currentHighscore) {
        if (backgroundUpgIsLocked === false) {
            lock();
            return backgroundUpgIsLocked = true;
        }
    }

    function lock() {
        clearTimeout(hideLockTimer);
        clearTimeout(hardHideLockTimer);
        fullLock.style.display = "block";
        lockHammer.style.animation = "e";
        lockBody.style.animation = "e";
        fullLock.style.animation = "e";
        backgroundUpgAnimActive = false;
    }
    function unlock() {
        if (backgroundUpgAnimActive === false) {
            // disable back when animation active
            backgroundUpgAnimActive = true;
            lockHammer.style.animation = "lockShake 3s linear";
            lockBody.style.animation = "lockShake 3s linear";
            lockHammer.style.animationFillMode = "forwards";
            lockBody.style.animationFillMode = "forwards";
            hideLockTimer = setTimeout(unlockAnim, 3000);
            hardHideLockTimer = setTimeout(lockHideDisplay, 4500);
        }
    }
}







function saveStorage() {
    mySuperObject = {
        lV: lvlVal,
        nL: newLevel,
        hE: pointHighscoreEasy,
        hH: pointHighscoreHard,
        fE: foodHighscoreEasy,
        fH: foodHighscoreHard
    }
    convertLvlValues(mySuperObject, "update");
    var mySuperObjectJSON = JSON.stringify(mySuperObject);
    localStorage.setItem('save1', mySuperObjectJSON);
    console.log("Game Saved");
}

function printStorage() {
    console.log("JSON.parse(localStorage.getItem('save1'))")
    console.log(JSON.parse(localStorage.getItem('save1')))
}

function loadStorage() {
    const loadgame_levelUP = () => {
        // add arrowScrolls between worlds
        const showArrowloadgame = (worldNumberToShow) => {
            if (worldNumberToShow > 0) {
                arrowScroll[worldNumberToShow].style.display = "inline-flex";
                return showArrowloadgame(worldNumberToShow - 1);
            } else {
                return;
            }
        }

        arrowScroll[0] = Math.floor(((newLevel - 1) / 5) + 1);
        showArrowloadgame(arrowScroll[0] - 1);
        for (let i = 0; i < newLevel; i++) {
            levelSelectedId[i + 1].style.display = "inline-flex";
        }
    }

    if (!localStorage.getItem('save1')) {
        return console.log("A save file never existed.")
    }
    var mySuperObjectParsed = JSON.parse(localStorage.getItem('save1'))
    lvlVal = mySuperObjectParsed.lV;
    newLevel = mySuperObjectParsed.nL;
    pointHighscoreEasy = mySuperObjectParsed.hE;
    pointHighscoreHard = mySuperObjectParsed.hH;
    foodHighscoreEasy = mySuperObjectParsed.fE;
    foodHighscoreHard = mySuperObjectParsed.fH;

    // load in all levels available / their highscores / and arrows to go between worlds
    loadgame_levelUP();
    // Add scores to both options and quickplay highscore list
    newHighscore();
    showFreePlay(true);
    freeplaySkinCheck();
    console.log("Game Loaded")
}






var clickFieldRange = document.getElementById("clickFieldRange");

clickFieldRange.oninput = function () {
    var x = clickFieldRange.value;
    // Set size number
    var sizeNumber = (x / 25) - 2;
    document.getElementById("clickFieldSize").innerHTML = "Size: " + sizeNumber;

    // rescale the "clickField"
    clickplayfield.style.transform = "scale(" + (x / 100) + ")";
    clickplayfield.style.top = x - 100 + "px";
}



function gameCompletedWindow(hideOrShow) {
    var gameCompletedBlock = document.getElementById("gameCompletedBlock");
    document.getElementById("confirmDecisionBlock").style.display = "none";
    if (hideOrShow === "show") {
        gameFade.style.display = "block";
        gameCompletedBlock.style.display = "block";
        gameCompletedBlock.style.animation = "gameWon 1s linear";
    } else if (hideOrShow === "hide") {
        gameCompletedBlock.style.animation = "gameWonRemove 1s linear";
        setTimeout(function () {
            gameCompletedBlock.style.display = "none";
            gameFade.style.display = "none";
        }, 950)
    }
}


const decisionChoice = (open, whatDecision) => {
    if (open == "open") {
        gameFade.style.display = "block";
        document.getElementById("confirmDecisionBlock").style.display = "block";
    } else {
        document.getElementById("confirmFullReset").style.display = "none";
        document.getElementById("confirmImport").style.display = "none";
        gameFade.style.display = "none";
        return
    }
    if (whatDecision == "full reset") {
        document.getElementById("confirmFullReset").style.display = "block";
    } else if (whatDecision == "import") {
        document.getElementById("confirmImport").style.display = "block";
    } else {
        console.log("Make your decision: Yes or No?")
    }
}










//   IE only functions

if (/MSIE 10/i.test(navigator.userAgent)) {
    // This is internet explorer 10
    console.log("Hello Internet Explorer");
    var ieLanes = document.getElementsByClassName("lanes");
    ieLanes[0].style.left = "5px";
}

if (/MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent)) {
    // This is internet explorer 9 or 11
    console.log("Hello Internet Explorer");
    var ieLanes = document.getElementsByClassName("lanes");
    i;
    for (i = 0; i < 10; i++) {
        ieLanes[i].style.left = "5px";
    }
}



/* NEXT STEP        COMING SOON!        TODO / To do
disable backgrounds/food/bodies for free play (need to finish certain lvls)
    fix "Enable arrow keys"
fix OPTIONS headers design
set realistic score requirements
set realistic speed and acceleration
add star to each level with 5 star rating
    ( make levels green when 5 star'ed? )
    Show "5 star score" minimum required
Add skins to freeplay after completeing a level
disable key hotkeys ( k=kill, p=pause etc... )
paint.net more skins, sneks + backgrounds + foods
*/




