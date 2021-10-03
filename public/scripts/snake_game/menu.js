
var newLevel = 1;
var lvlStarVal = [":)", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var lvlVal = [":)", -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
var lvlValReq = [":)", 15, 17, 19, 21, 25, 30, 36, 42, 48, 56, 45, 57, 69, 84, 96, 25, 30, 35, 40, 50, 66, 78, 90, 102, 120, 1, 1, 1, 1, 1]
const lastLevel = 30;

const lvlCurTextId = document.getElementById("levelAcceptHS");
const lvlCurScoreId = document.getElementById("levelAcceptHScurrent");
const lvlWinReqId = document.getElementById("levelAcceptReqScorecurrent");
const backgroundPosition = document.getElementById("levelSelectBox");
const innerlevelSelect = document.getElementById("innerlevelSelect");
const winorloseCheatingBlock = document.getElementById("winOrLoseCheating");
const startgame = document.getElementById("levelAccept");
const scoreLvlUpReqBlock = document.getElementById("scoreLvlUpReq");
const postGameWinReq = document.getElementById("scoreLvlUpReqNum");
const starPosition = document.getElementById("curLvlStarImage");
const missionPostScreen = document.getElementById("curLvlBlock");
const currentLvl = document.getElementById("curLvlNum");

const lvlStars = ["0px 0px", "0px -61px", "0ox -122px", "0px -183px", "0px -244px", "0px -305px"];
const lvlStarsHalf = ["-252px 0px", "-252px -61px", "-252ox -122px", "-252px -183px", "-252px -244px"];

var levelSelectedId = [1]
// levelSelectedId[0] = 1; This number is the highest level the player has available.
for (let i = 1; i <= lastLevel; i++) {
  levelSelectedId.push(document.getElementById("number" + i));
}


var arrowScroll = [
  1,
  document.getElementById("arrowScrollRight1"),
  document.getElementById("arrowScrollRight2"),
  document.getElementById("arrowScrollRight3"),
  document.getElementById("arrowScrollRight4"),
  document.getElementById("arrowScrollRight5"),
  document.getElementById("arrowScrollRight6")
]
var worlds = [
  1,
  document.getElementById("worldOne"),
  document.getElementById("worldTwo"),
  document.getElementById("worldThree"),
  document.getElementById("worldFour"),
  document.getElementById("worldFive"),
  document.getElementById("worldSix")
]




function selectLevel(param, levelSelectOrNot) {
  if (levelSelectOrNot === true) {
    menuSelectMissionPlay[2].style.height = "320px";
  }
  if (param > newLevel) {
    // clicking invisible level 5 before unlucked
    throw "You are trying to select a locked level! You can't access it yet.";
  } else if (param === "DeSelect") {
    for (let i = 1; i < levelSelectedId.length; i++) {
      levelSelectedId[i].classList.remove("lvlActivated");
    }
    return startgame.style.display = "none";
  }
  // make all other buttons red again
  for (let i = 1; i < levelSelectedId.length; i++) {
    levelSelectedId[i].classList.remove("lvlActivated");
  }
  // levelSelectedId = number clicked
  levelSelectedId[0] = param;
  // make button yellow
  levelSelectedId[levelSelectedId[0]].classList.add("lvlActivated");
  // show "start game"
  startgame.style.display = "inline-block";
  if (lvlVal[param] === -1) {
    lvlCurTextId.style.display = "none";
    lvlCurScoreId.style.display = "none";
  } else {
    lvlCurTextId.style.display = "block";
    lvlCurScoreId.style.display = "block";
    lvlCurScoreId.innerHTML = lvlVal[param] + " points";
  }
  lvlWinReqId.innerHTML = lvlValReq[param] + " points";
  postGameWinReq.innerHTML = lvlValReq[param] + " points";
}

function worldSelect(param) {
  // hide all worlds
  for (let i = 1; i < worlds.length; i++) {
    worlds[i].style.display = "none";
  }
  worlds[param].style.display = "inline-block";
  if (param === 1) {
    backgroundPosition.style.backgroundPosition = "0px";
  } else if (param === 2) {
    backgroundPosition.style.backgroundPosition = "-500px";
  } else if (param === 3) {
    backgroundPosition.style.backgroundPosition = "-1000px";
  } else if (param === 4) {
    backgroundPosition.style.backgroundPosition = "-1500px";
  } else if (param === 5) {
    backgroundPosition.style.backgroundPosition = "-2000px";
  } else if (param === 6) {
    backgroundPosition.style.backgroundPosition = "-2500px";
  } else {
    throw "Menu block doesnt have selected world. (check worldSelect)"
  }
}



function levelUP() {
  if (levelSelectedId[0] === newLevel) {
    if (newLevel === lastLevel) {
      gameCompletedWindow("show");
      return console.log("LAST LEVEL");
    }
    // if (newLevel === 5 || newLevel === 10 || newLevel === 15 || newLevel === 20) {
    if (newLevel % 5 === 0) {

      arrowScroll[arrowScroll[0]].style.display = "inline-flex";
      arrowScroll[0]++;
    }
    levelSelectedId[levelSelectedId[0] + 1].style.display = "inline-flex";
    newLevel++;
    // hide NEXT LEVEL: 20 points <<
  }
  endscreenContinue.style.display = "block";
  scoreLvlUpReqBlock.style.display = "none";
}



function playGame() {
  mode = "";
  endscreenContinue.style.display = "none";
  startVariables();
  lvlCheck();
  // reset the menu animations
  startNewGame("reset");
  // Hide HardHighscore + Show EasyHighscore
  toggleScorescreenHighscore();
  // Set starting location and snaketype
  startScreen();
  // Remove menu and go to playing field
  toggleScreens("gotoPlayingField");
  // Countdown and start
  countdownAndAutomove("newGame");
  console.log("MISSION MODE");
}

function cheatinggameWon() {
  // make all "levelselects red"         hide startbox and show next level
  endscreenContinue.style.display = "none";
  levelUP();
  selectLevel(newLevel);
}

function cheatinggameLost() {
  if (cheatActive === true) {
    endscreenContinue.style.display = "none";
  }
}

function cheatingHiddenBtn() {
  if (cheatActive === true) {
    console.log("Wait how did you find me!?");
    // select last world
    worldSelect(worlds.length - 1);
  }
}

function go() {
  if (cheatActive === true) {
    for (i = 1; i < 30; i++) {
      cheatinggameWon();
    }
  }
}

go();

function lvlCheck() {
  bigBlock.classList.remove(backgroundImg);
  // insert all classnames for specific snake part,
  // for the corresponding difficulty V

  if (levelSelectedId[0] == 1) {
    lvlvalues(300, 2, 1); // 222 * 15
    // localSkinSelect("betaEasy", "grass", "apple");
    localSkinSelect("betaEasy", "grass", "apple");
  } else if (levelSelectedId[0] == 2) {
    lvlvalues(310, 2, 1); // 220 * 17
    localSkinSelect("betaEasy", "grass", "apple");
  } else if (levelSelectedId[0] === 3) {
    lvlvalues(320, 2, 1); // 218 * 19
    localSkinSelect("betaEasy", "grass", "apple");
  } else if (levelSelectedId[0] === 4) {
    lvlvalues(330, 2, 1); // 216 * 21
    localSkinSelect("betaEasy", "grass", "apple");
  } else if (levelSelectedId[0] === 5) {
    lvlvalues(340, 2, 1); // 205 * 25
    localSkinSelect("betaHard", "grass", "apple");

  } else if (levelSelectedId[0] === 6) {
    lvlvalues(260, 2, 2); // 192 * 15
    localSkinSelect("betaHard", "water", "fish");
  } else if (levelSelectedId[0] === 7) {
    lvlvalues(270, 2, 2); // 188 * 18
    localSkinSelect("betaHard", "water", "fish");
  } else if (levelSelectedId[0] === 8) {
    lvlvalues(280, 2, 2); // 183 * 21
    localSkinSelect("betaHard", "water", "fish");
  } else if (levelSelectedId[0] === 9) {
    lvlvalues(290, 2, 2); // 179 * 24
    localSkinSelect("betaHard", "water", "fish");
  } else if (levelSelectedId[0] === 10) {
    lvlvalues(300, 2, 2); // 170 * 28
    localSkinSelect("betaHard", "water", "fish");

  } else if (levelSelectedId[0] === 11) {
    lvlvalues(230, 2, 3); // 170 * 15
    localSkinSelect("wobble", "rock", "cheese");
  } else if (levelSelectedId[0] === 12) {
    lvlvalues(270, 2, 3); // 184 * 19
    localSkinSelect("wobble", "rock", "cheese");
  } else if (levelSelectedId[0] === 13) {
    lvlvalues(280, 2, 3); // 176 * 23
    localSkinSelect("wobble", "rock", "cheese");
  } else if (levelSelectedId[0] === 14) {
    lvlvalues(290, 2, 3); // 165 * 28
    localSkinSelect("wobble", "rock", "cheese");
  } else if (levelSelectedId[0] === 15) {
    lvlvalues(300, 2, 3); // 157 * 32
    localSkinSelect("wobble", "rock", "cheese");

  } else if (levelSelectedId[0] === 16) {
    lvlvalues(200, -8, 1); // 400 * 25
    localSkinSelect("wobbleblue", "snow", "cookie");
  } else if (levelSelectedId[0] === 17) {
    lvlvalues(200, -7, 1); // 410 * 30
    localSkinSelect("wobbleblue", "snow", "cookie");
  } else if (levelSelectedId[0] === 18) {
    lvlvalues(200, -6, 1); // 410 * 35
    localSkinSelect("wobbleblue", "snow", "cookie");
  } else if (levelSelectedId[0] === 19) {
    lvlvalues(200, -5, 1); // 400 * 40
    localSkinSelect("wobbleblue", "snow", "cookie");
  } else if (levelSelectedId[0] === 20) {
    lvlvalues(200, -4, 1); // 400 * 50
    localSkinSelect("wobbleblue", "snow", "cookie");

  } else if (levelSelectedId[0] === 21) {
    lvlvalues(100, 0, 6); // 100 * 11
    localSkinSelect("centipede", "desert", "mellon");
  } else if (levelSelectedId[0] === 22) {
    lvlvalues(95, 0, 6); // 95 * 13
    localSkinSelect("centipede", "desert", "mellon");
  } else if (levelSelectedId[0] === 23) {
    lvlvalues(90, 0, 6); // 90 * 15 
    localSkinSelect("centipede", "desert", "mellon"); // change food
  } else if (levelSelectedId[0] === 24) {
    lvlvalues(95, 0, 6); // 95 * 17
    localSkinSelect("centipede", "desert", "mellon"); // change food
  } else if (levelSelectedId[0] === 25) {
    lvlvalues(100, 0, 6); // 100 * 20
    localSkinSelect("centipede", "desert", "mellon"); // change food

  } else if (levelSelectedId[0] === 26) {
    lvlvalues(300, 2, 1, "wall");
    localSkinSelect("spacesuit", "space", "oxygentank"); // change food
  } else if (levelSelectedId[0] === 27) {
    lvlvalues(300, 2, 1, "wall");
    localSkinSelect("spacesuit", "space", "oxygentank"); // change food
  } else if (levelSelectedId[0] === 28) {
    lvlvalues(300, 2, 1, "wall");
    localSkinSelect("spacesuit", "space", "oxygentank");
  } else if (levelSelectedId[0] === 29) {
    lvlvalues(300, 2, 1, "wall");
    localSkinSelect("spacesuit", "space", "oxygentank");
  } else if (levelSelectedId[0] === 30) {
    lvlvalues(300, 2, 1, "wall");
    localSkinSelect("spacesuit", "space", "oxygentank");
  } else {
    throw "Level selected doesn't have any values yet. Also look at lvlCheck()"
  }

  function lvlvalues(startingSpeed, speedMultiplier, pointAdderPerFoodEaten, isWallONorOFF) {
    speed = startingSpeed;
    // convert speedMultiplier from ex: 10% increase -> to 0.9
    if (speedMultiplier >= 0) {
      speedAdder = (100 - speedMultiplier) / 100;
    } else if (speedMultiplier < 0) {
      speedAdder = speedMultiplier;
    }
    pointsAdder = pointAdderPerFoodEaten;

    if (isWallONorOFF == "wall") {
      hardwall = true;
    } else {
      hardwall = false;
    }
  }

  function localSkinSelect(skinName, backgroundName, foodName) {
    for (let i = 0; i < allTiles.length; i++) {
      allTiles[i].classList.remove(skinSelected);
    }
    bigBlock.classList.remove(backgroundImg);
    // insert all classnames for specific snake part,
    // for the corresponding difficulty V
    skinSelected = skinName;
    backgroundImg = backgroundName;
    foodImg = foodName;
    // set background
    bigBlock.classList.add(backgroundImg);
  }

  if (hardwall) {  //  ADD Hardwall
    bigBlock.style.border = "6px solid rgb(255, 0, 0)";
    document.getElementById("bigBlock").style.animationName = "flimmer";
    document.getElementById("bigBlockBorder").style.display = "block";
  } else {  //  REMOVE Hardwall
    document.getElementById("bigBlockBorder").style.display = "none";
    bigBlock.style.border = "6px solid black";
  }
  // HARDSET arrow key to point to EAST
  arrowMoveDirection(1);
}





//    Testing overflow and animation


const menuSelectMissionPlay = [
  document.getElementById("menuSubBoxPlay"),
  document.getElementById("menuHiddenBoxPlay"),
  document.getElementById("menuMainBoxPlay")
]

const menuSelectQuickPlay = [
  document.getElementById("menuSubBoxQuickPlay"),
  document.getElementById("menuSubBoxE"),
  document.getElementById("menuSubBoxH"),
  document.getElementById("menuSubBoxBack"),
  document.getElementById("menuHiddenBoxQuickPlay"),
  document.getElementById("menuMainBoxQuickplay")
]

menuSelectMissionPlay[2].addEventListener("mouseenter", startEasy);
menuSelectMissionPlay[2].addEventListener("mouseleave", stopEasyHover);

menuSelectQuickPlay[5].addEventListener("mouseenter", function () { if (quickplayEnabled) { startHard(); } });
menuSelectQuickPlay[5].addEventListener("mouseleave", function () { stopHardHover(); });

// Play Main button
menuSelectMissionPlay[0].addEventListener("click", function () { missionplayAnim(true); stopEasyHover(); quickplayAnim(false); toggleQuickplay("showMissions"); quickplayEnabled = true; startNewGame(true); });

// Quickplay Main button
menuSelectQuickPlay[0].addEventListener("click", function () { missionplayAnim(false); quickplayAnim(true); stopHardHover(); toggleQuickplay("showEasyHard"); quickplayEnabled = false; startNewGame(false); });
// // Quickplay Easy button
// menuSelectQuickPlay[1].addEventListener("click", function () { quickplayAnim(false); toggleQuickplay("reset"); quickplayEnabled = true; selectEasymode(); });
// // Quickplay Hard button
// menuSelectQuickPlay[2].addEventListener("click", function () { quickplayAnim(false); toggleQuickplay("reset"); quickplayEnabled = true; selectHardmode(); });

// Quickplay Easy button
menuSelectQuickPlay[1].addEventListener("click", function () { quickplayAnim(false); toggleQuickplay("reset"); quickplayEnabled = true; selectGameMode("easy"); });
// Quickplay Hard button
menuSelectQuickPlay[2].addEventListener("click", function () { quickplayAnim(false); toggleQuickplay("reset"); quickplayEnabled = true; selectGameMode("hard"); });

// Quickplay back button
menuSelectQuickPlay[3].addEventListener("click", function () { quickplayAnim(false); toggleQuickplay("showMissions"); quickplayEnabled = true; });



function missionplayAnim(param) {
  if (param) {
    menuSelectMissionPlay[0].style.width = "490px";
    menuSelectMissionPlay[2].style.width = "490px";
    menuSelectMissionPlay[2].style.height = "80px";
    menuSelectMissionPlay[2].style.marginLeft = "-245px";
    menuSelectMissionPlay[2].style.border = "3px solid black";
    menuSelectMissionPlay[2].style.borderRadius = "0px";
  } else if (!param && !mobile) {
    menuSelectMissionPlay[0].style.width = "";
    menuSelectMissionPlay[2].style.width = "";
    menuSelectMissionPlay[2].style.height = "";
    menuSelectMissionPlay[2].style.marginLeft = "";
    menuSelectMissionPlay[2].style.border = "";
    menuSelectMissionPlay[2].style.borderRadius = "";
  }
}


function quickplayAnim(param) {
  if (param) {
    menuSelectQuickPlay[0].style.width = "490px";
    menuSelectQuickPlay[5].style.width = "490px";
    menuSelectQuickPlay[5].style.height = "120px";
    menuSelectQuickPlay[5].style.marginLeft = "-245px";
    menuSelectQuickPlay[5].style.border = "3px solid black";
    menuSelectQuickPlay[5].style.borderRadius = "0px";
  } else if (!param && !mobile) {
    menuSelectQuickPlay[0].style.width = "";
    menuSelectQuickPlay[0].style.height = "";
    menuSelectQuickPlay[5].style.width = "";
    menuSelectQuickPlay[5].style.height = "";
    menuSelectQuickPlay[5].style.marginLeft = "";
    menuSelectQuickPlay[5].style.border = "";
    menuSelectQuickPlay[5].style.borderRadius = "";
  }
  if (!param && mobile) {
    menuSelectQuickPlay[5].style.height = "80px";
  }
}

function toggleQuickplay(param) {
  if (param === "showEasyHard") {
    menuSelectQuickPlay[4].style.animationName = "hideQuickplay";
    menuSelectQuickPlay[4].style.marginTop = "-84px";
    // lock menu skin

  } else if (param === "showMissions") {
    if (menuSelectQuickPlay[4].style.animationName != "e") {
      menuSelectQuickPlay[4].style.animationName = "showMissions";
    }
    menuSelectQuickPlay[4].style.marginTop = "0px";
  } else if (param === "reset") {
    menuSelectQuickPlay[4].style.animationName = "e";
    menuSelectQuickPlay[4].style.marginTop = "0px";
  }
}


if (menuSelectMissionPlay[1].style.animationName === "hideMissionplay") {
  menuSelectMissionPlay[1].style.animationName = "showMissionplay";
}
menuSelectMissionPlay[1].style.marginTop = "0px";
if (!mobile) {
  menuSelectMissionPlay[2].style.height = "";
} else {
  menuSelectMissionPlay[2].style.height = "80px";
}




const menuSelecting = document.getElementById("menuSelecting");
const levelSelectId = document.getElementById("levelSelectMain");
const missionPlayToggle = document.getElementById("menuHiddenBoxPlay");

// Ugly, shit function
function startNewGame(param) {
  // hide Main menu "missions + quickgame + options"
  // show "Level selecter"
  if (param === true) {
    menuSelectMissionPlay[1].style.animationName = "hideMissionplay";
    menuSelectMissionPlay[1].style.marginTop = "-84px";
    menuSelectMissionPlay[2].style.height = "200px";

    selectLevel("DeSelect");
  } else if (!param) {
    if (menuSelectMissionPlay[1].style.animationName === "hideMissionplay") {
      menuSelectMissionPlay[1].style.animationName = "showMissionplay";
    }
    menuSelectMissionPlay[1].style.marginTop = "0px";
    if (!mobile) {
      menuSelectMissionPlay[2].style.height = "";
    } else {
      menuSelectMissionPlay[2].style.height = "80px";
    }

  } else if (param === "reset") {
    menuSelectQuickPlay[4].style.animationName = "e";
    menuSelectMissionPlay[1].style.animationName = "e";
    menuSelectMissionPlay[1].style.marginTop = "0px";
    if (!mobile) {
      menuSelectMissionPlay[2].style.height = "";
    } else {
      menuSelectMissionPlay[2].style.height = "80px";
    }

  } else {
    throw "check startNewGame(param)"
  }
}


//    Testing overflow and animation


freePlayMenu.addEventListener("click", () => { toggleScreens("gotoFreeplayField"); });
freePlayMenu.addEventListener("mouseenter", startFreeplay);
freePlayMenu.addEventListener("mouseleave", stopFreeplay);




