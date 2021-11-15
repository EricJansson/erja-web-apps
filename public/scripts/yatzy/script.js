
const cheatActive = false;

var totalSum = 0;
var lastSum = 0;
var turn = -1;
var bonus = 0;
var gameFinished = true;

var dice = [
    0,
    0,
    0,
    0,
    0
]


var turnChoosen = [
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1
]

var currentTurnValues = [
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1
]

var diceSelected = [
    false,
    false,
    false,
    false,
    false
]

// If true => select where to put your points
var turnOver = true;
var rollDice;
var diceAreRolling = false;
const DIE_ROLL_TIME = 1000;
const DIE_ROLL_SPEED = 50;


function startGame() {
    gameFinished = false;
    turn = 0;
    document.getElementById("startGameBtn").style.display = "none";
    document.getElementById("diceField").style.display = "block";
    document.getElementById("diceRollOne").style.display = "block";
    // Hide start, show slå tärning
}


function runDevCheats() {
    if (cheatActive) {
        document.getElementById("cheatBox").style.display = "block"
    }
}

runDevCheats()

function cheatGame() {
    if (cheatActive & !gameFinished) {
        if (turn == -1) {
            startGame()
        }
        for (let cheatii = 1; cheatii < 15; cheatii++) {
            rollDiceTurns(1)
            document.getElementById("statTurn" + cheatii).classList.remove("selectAble");
            nextTurn(cheatii - 1);
            if (gameFinished) {
                break;
            }
        }

    }
}


function rollDiceTurns(turn) {
    if (diceAreRolling) {
        return
    }

    document.getElementById("diceRollOne").style.display = "none";
    document.getElementById("diceRollTwo").style.display = "none";
    document.getElementById("diceRollThree").style.display = "none";

    switch (turn) {
        case 1:
            document.getElementById("diceRollTwo").style.display = "block";
            document.getElementById("numberOfRollsLeft").innerText = "II"
            break;
        case 2:
            document.getElementById("diceRollThree").style.display = "block";
            document.getElementById("numberOfRollsLeft").innerText = "I"
            break;
        case 3:
            document.getElementById("numberOfRollsLeft").innerText = ""
            break;
        default:
            throw "Error time!"
    }

    if (cheatActive) {
        diceRoll()
        diceAreRolling = false;
        return;
    }

    // random dices unselected
    rollDice = setInterval(diceRoll, DIE_ROLL_SPEED)
    setTimeout(function () {
        clearTimeout(rollDice)
        diceAreRolling = false;
    }, DIE_ROLL_TIME)
}




resetGame = () => {
    if (!gameFinished) {
        console.log("Can't reset game when it's not over.")
        return
    }
    // reset text from scoreboard
    document.getElementById("turnBonus").innerText = 0;
    document.getElementById("turnSumma1").innerText =  "0 (63 poäng för bonus)";
    document.getElementById("turnSumma2").innerText = 0;
    for (let ii = 1; ii < 16; ii++) {
        document.getElementById("turn" + ii).innerText = 0;
        // reset all game score values
        turnChoosen[ii] = -1;
        currentTurnValues[ii] = -1;
    }
    totalSum = 0;
    lastSum = 0;
    turn = -1;
    bonus = 0;
    // Reset dice images to default
    resetDiceImages();

    
    document.getElementById("diceRollOne").style.display = "none";
    document.getElementById("diceRollTwo").style.display = "none";
    document.getElementById("diceRollThree").style.display = "none";
    
    // if game over, don't show next round button + text
    document.getElementById("numberOfRollsLeft").innerHTML = "Starta ett nytt spel!";
    document.getElementById("startGameBtn").style.display = "block";
    document.getElementById("diceField").style.display = "none";
    console.log("Game reset");

}



hoverActive = true;

function nextTurn(indexNumber) {
    if (hoverActive == false) {
        return;
    } else if (gameFinished) {
        return;
    }
    checkAllStats()
    turnChoosen[indexNumber] = currentTurnValues[indexNumber];
    // if selected index has a value over 0, print it
    if (currentTurnValues[indexNumber] > 0) {
        document.getElementById("turn" + (indexNumber + 1)).innerText = currentTurnValues[indexNumber];
    } else {
        document.getElementById("turn" + (indexNumber + 1)).innerText = "-";
    }
    turn++;

    // add top section to firstSum
    firstSum = 0;
    for (let i = 0; i < 6; i++) {
        if (turnChoosen[i] != -1) {
            firstSum += turnChoosen[i];
        }
    }
    document.getElementById("turnSumma1").innerText = firstSum + " (63 poäng för bonus)";
    if (firstSum >= 63) {
        bonus = 50
        document.getElementById("turnBonus").innerText = bonus;
    }

    // add all turnChoosen[i] to totalSum
    totalSum = 0;
    for (let i = 0; i < turnChoosen.length; i++) {
        if (turnChoosen[i] != -1) {
            totalSum += turnChoosen[i];
        }
    }
    totalSum += bonus;

    document.getElementById("turnSumma2").innerText = totalSum;
    // Remove images from dice
    resetDiceImages();
    document.getElementById("diceRollTwo").style.display = "none";
    document.getElementById("diceRollThree").style.display = "none";
    if (turn == turnChoosen.length) {
        gameFinished = true;
    }
    if (turn == turnChoosen.length) {
        // if game over, don't show next round button + text
        document.getElementById("diceRollOne").style.display = "none";
        document.getElementById("numberOfRollsLeft").innerHTML = "Game finished! <br>Your total score is: " + totalSum;
        console.log("Game over");
    } else {
        // Reset round, put back "Turn x" buttons + text
        document.getElementById("diceRollOne").style.display = "block";
        document.getElementById("numberOfRollsLeft").innerText = "III"
    }
}

resetDiceImages = () => {
    for (let i = 0; i < dice.length; i++) {
        for (let ii = 0; ii < 6; ii++) {
            // remove ALL dice numbers from EACH saved dice
            document.getElementById("diceSaved-" + i).classList.remove("dice_pic" + (ii + 1))
        }
        document.getElementById("dice-" + i).classList.remove("diceSelected")
        // unlock all dices
        diceSelected[i] = false;
        // remove dice pictures
        document.getElementById("dice-" + i).classList.remove("dice_pic" + dice[i])
        // hide saved dices and show the others
        document.getElementById("diceSaved-" + i).style.display = "none"
        document.getElementById("dice-" + i).style.display = "inline-block"
        // reset all dices
        dice[i] = 0;
    }
}

function diceRoll() {
    diceAreRolling = true;
    // remove all classes(remove all pictures) 

    for (let i = 0; i < dice.length; i++) {
        if (diceSelected[i] == true) {
            continue;
        }

        document.getElementById("diceSaved-" + i).classList.remove("dice_pic" + dice[i])
        document.getElementById("dice-" + i).classList.remove("dice_pic" + dice[i])
        // random number 1-6
        dice[i] = Math.floor(Math.random() * 6 + 1)
        // document.getElementById("dice" + i).innerHTML = dice[i]
        document.getElementById("diceSaved-" + i).classList.add("dice_pic" + dice[i])
        document.getElementById("dice-" + i).classList.add("dice_pic" + dice[i])
    }
}

function diceSelect(diceIndexNumber) {
    if (dice[diceIndexNumber] == 0) {
        console.log("Game hasn't started yet.")
        return
    } else if (diceAreRolling) {
        console.log("Dice are rolling.")
        return
    }
    if (diceSelected[diceIndexNumber] == false) {
        diceSelected[diceIndexNumber] = true;
        document.getElementById("dice-" + diceIndexNumber).style.display = "none"
        document.getElementById("diceSaved-" + diceIndexNumber).style.display = "inline-block"

        document.getElementById("dice-" + diceIndexNumber).classList.add("diceSelected")
    } else {
        diceSelected[diceIndexNumber] = false;
        document.getElementById("dice-" + diceIndexNumber).style.display = "inline-block"
        document.getElementById("diceSaved-" + diceIndexNumber).style.display = "none"

        document.getElementById("dice-" + diceIndexNumber).classList.remove("diceSelected")
    }
}

function diceDeSelect(diceIndexNumber) {
    if (dice[diceIndexNumber] == 0) {
        console.log("Game hasn't started yet.")
        return
    } else if (diceAreRolling) {
        console.log("Dice are rolling.")
        return
    }
    if (diceSelected[diceIndexNumber] == false) {
        diceSelected[diceIndexNumber] = true;
        document.getElementById("dice-" + diceIndexNumber).classList.add("diceSelected")
    } else {
        diceSelected[diceIndexNumber] = false;
        document.getElementById("dice-" + diceIndexNumber).style.display = "inline-block"
        document.getElementById("diceSaved-" + diceIndexNumber).style.display = "none"

        document.getElementById("dice-" + diceIndexNumber).classList.remove("diceSelected")
    }
}





document.getElementById("dice-0").addEventListener("click", function () { diceSelect(0) });
document.getElementById("dice-1").addEventListener("click", function () { diceSelect(1) });
document.getElementById("dice-2").addEventListener("click", function () { diceSelect(2) });
document.getElementById("dice-3").addEventListener("click", function () { diceSelect(3) });
document.getElementById("dice-4").addEventListener("click", function () { diceSelect(4) });


document.getElementById("diceSaved-0").addEventListener("click", function () { diceDeSelect(0) });
document.getElementById("diceSaved-1").addEventListener("click", function () { diceDeSelect(1) });
document.getElementById("diceSaved-2").addEventListener("click", function () { diceDeSelect(2) });
document.getElementById("diceSaved-3").addEventListener("click", function () { diceDeSelect(3) });
document.getElementById("diceSaved-4").addEventListener("click", function () { diceDeSelect(4) });


// all event listeners
for (let k = 1; k <= 15; k++) {
    document.getElementById("statTurn" + k).addEventListener("mouseover", function () { mouseOver(k) });
    document.getElementById("statTurn" + k).addEventListener("mouseout", function () { mouseOut(k) });
    document.getElementById("statTurn" + k).addEventListener("click", function () {
        if (turnChoosen[k - 1] == -1 && dice[0] != 0 && diceAreRolling == false) {
            document.getElementById("statTurn" + k).classList.remove("selectAble");
            nextTurn(k - 1);
        }
    });
}

// document.getElementById("statTurn9").addEventListener("mouseover", function () { mouseOver(9) });
// document.getElementById("statTurn9").addEventListener("mouseout", function () { mouseOut(9) });

// document.getElementById("statTurn10").addEventListener("mouseover", function () { mouseOver(10) });
// document.getElementById("statTurn10").addEventListener("mouseout", function () { mouseOut(10) });


function checkForPairs(numberOfPairsToSubmit) {
    var numberOfPairs = 0;
    var numberOfHighestPair = 0;
    var numberOfSecondGivenPair = 0;
    for (let m = 6; m > 0; m--) {
        // reset V
        var numberOfNums = 0;
        // check all dices for duplicates
        for (let i = 0; i < dice.length; i++) {
            // if dice contains m, tell me how many m's there are
            if (dice[i] == m) {
                numberOfNums++;
            }
        }
        // if no pairs already found...
        if (numberOfPairs == 0) {
            // if 2 pairs (4x the same number)
            if (numberOfNums >= 4) {
                numberOfPairs = 2;
                numberOfHighestPair = m;
                numberOfSecondGivenPair = m;
                // if a pair is found, save its number
            } else if (numberOfNums >= 2) {
                numberOfPairs++;
                numberOfHighestPair = m;
            }
        } else if (numberOfPairs == 1) {
            if (numberOfNums >= 2) {
                numberOfPairs++;
                numberOfSecondGivenPair = m;
            }
        }
        // if ENOUGH pairs found => stop looking for more.
        if (numberOfPairs >= numberOfPairsToSubmit) {
            break
        }
    }
    // number of pairs to return (return sum)
    if (numberOfPairs >= numberOfPairsToSubmit && numberOfPairsToSubmit == 1) {
        return numberOfHighestPair * 2;
    } else if (numberOfPairs >= numberOfPairsToSubmit && numberOfPairsToSubmit == 2) {
        return (numberOfHighestPair * 2 + numberOfSecondGivenPair * 2)
    } else {
        return 0
    }
}

function checkForDuplicates(numberOfWantedDuplicates) {
    // check all dices for duplicates
    var givenNumberOfTheDuplicates = 0;
    for (let m = 6; m >= 1; m--) {
        var numberOfNums = 0;
        // if dice contains m, tell me how many m's there are
        for (let i = 0; i < dice.length; i++) {
            if (dice[i] == m) {
                numberOfNums++;
            }
        }
        if (numberOfNums >= numberOfWantedDuplicates) {
            givenNumberOfTheDuplicates = m;
            break
        }
    }
    var duplicateSum;
    if (numberOfNums >= numberOfWantedDuplicates) {
        duplicateSum = givenNumberOfTheDuplicates * numberOfWantedDuplicates;
        return duplicateSum
    } else {
        return 0;
    }
}

function checkForStege(highOrLow) {
    if (dice.includes(2) && dice.includes(3) && dice.includes(4) && dice.includes(5)) {
        if (dice.includes(1) && highOrLow == "low") {
            return 15;
        } else if (dice.includes(6) && highOrLow == "high") {
            return 20;
        }
    }
    return 0;
}

function checkFullHouse() {
    var numbersOfPair = 0;
    var numbersOfTriplets = 0;
    for (let m = 6; m >= 1; m--) {
        // reset V
        var numberOfNums = 0;
        // check all dices for duplicates
        for (let i = 0; i < dice.length; i++) {
            // if dice contains m, tell me how many m's there are
            if (dice[i] == m) {
                numberOfNums++;
            }
        }
        // if 2 pairs (4x the same number)
        if (numberOfNums == 3) {
            numbersOfTriplets = m;
            // if a pair is found, save its number
        } else if (numberOfNums == 2 && numbersOfPair == 0) {
            numbersOfPair = m;
        }
    }
    // if the numbers of the pair AND the numbers of the triplets are MORE than 0 => fullhouse achieved 
    if (numbersOfPair > 0 && numbersOfTriplets > 0) {
        return numbersOfPair * 2 + numbersOfTriplets * 3
    } else {
        return 0;
    }
}

function checkChance() {
    chance = 0;
    dice.forEach((value) => {
        chance += value;
    });
    return chance;
}

function checkYatzy() {
    yatzy = dice.every((compareDice) => {
        // check if all dice are same as the first one (more than 0 denies yatzy from before dice throw)
        return compareDice == dice[0] && dice[0] > 0;
    })
    if (yatzy) {
        return 50;
    } else {
        return 0;
    }
}



function checkAllStats() {
    // reset array values
    for (let ii = 0; ii < currentTurnValues.length; ii++) {
        currentTurnValues[ii] = 0;
    }
    // compute sum of numbers 1-6, in corresponding index
    for (let ii = 0; ii < 6; ii++) {
        currentTurnValues[dice[ii] - 1] += dice[ii];
    }
    // ett par
    currentTurnValues[6] = checkForPairs(1);
    // två par
    currentTurnValues[7] = checkForPairs(2);
    // triss
    currentTurnValues[8] = checkForDuplicates(3);
    // triss
    currentTurnValues[9] = checkForDuplicates(4);
    // liten stege
    currentTurnValues[10] = checkForStege("low");
    // stor stege
    currentTurnValues[11] = checkForStege("high");
    // kåk
    currentTurnValues[12] = checkFullHouse();
    // chans
    currentTurnValues[13] = checkChance();
    // yatzy
    currentTurnValues[14] = checkYatzy();
}








// first section == (ettor <-> sexor)
function mouseOver(indexNumberActiveTurn) {
    // don't show results if diveAreRolling
    if (diceAreRolling) {
        return;
    }
    // if "ettor" already taken dont do shiet
    if (turnChoosen[indexNumberActiveTurn - 1] != -1 || dice[0] == 0) {
        return
    }
    checkAllStats();
    // if value is more than 0 print it, otherwise print "-"
    if (currentTurnValues[(indexNumberActiveTurn - 1)] > 0) {
        document.getElementById("turn" + indexNumberActiveTurn).innerText = currentTurnValues[(indexNumberActiveTurn - 1)];
    } else if (currentTurnValues[(indexNumberActiveTurn - 1)] < 1) {
        document.getElementById("turn" + indexNumberActiveTurn).innerText = "-";
    } else {
        throw "sum is weird. (sum != 0 or above)"
    }
}






function mouseOut(indexNumberActiveTurn) {
    if (turnChoosen[indexNumberActiveTurn - 1] != -1) {
        return
    }
    document.getElementById("turn" + indexNumberActiveTurn).innerText = 0;
}










/*
1or
2or
3or
4or
5or
6or
Bonus (if points > 63) => bonus 50 points
Sum

1 Pair
2 Pair
Triss
Fyrtal
Liten
Stor
Kåk
Chans
Yatzy
Sum

*/




