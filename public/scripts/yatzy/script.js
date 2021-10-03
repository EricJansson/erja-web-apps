
// var summa = 0;
// testArr.forEach(function (value) { summa += value })
// console.log(summa)

var totalSum = 0;
var lastSum = 0;
var turn = 0;
var bonus = 0;

var dice = [
    0,
    0,
    0,
    0,
    0
]


var testArr = [
    34,
    12,
    2,
    100,
    9
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
    turn = 0;
    document.getElementById("startGameBtn").style.display = "none";
    document.getElementById("diceField").style.display = "block";
    document.getElementById("diceRollOne").style.display = "block";
    // Hide start, show slå tärning
}

function rollOne() {
    if (diceAreRolling) {
        return
    }
    document.getElementById("diceRollOne").style.display = "none";
    document.getElementById("diceRollTwo").style.display = "block";
    // number of rolls left
    document.getElementById("numberOfRollsLeft").innerHTML = "II"
    // random dices unselected
    rollDice = setInterval(diceRoll, DIE_ROLL_SPEED)
    setTimeout(function () {
        clearTimeout(rollDice)
        diceAreRolling = false;
    }, DIE_ROLL_TIME)
}

function rollTwo() {
    if (diceAreRolling) {
        return
    }
    document.getElementById("diceRollTwo").style.display = "none";
    document.getElementById("diceRollThree").style.display = "block";
    // number of rolls left
    document.getElementById("numberOfRollsLeft").innerHTML = "I"
    rollDice = setInterval(diceRoll, DIE_ROLL_SPEED)
    setTimeout(function () {
        clearTimeout(rollDice)
        diceAreRolling = false;
    }, DIE_ROLL_TIME)
}

function rollThree() {
    if (diceAreRolling) {
        return
    }
    document.getElementById("diceRollThree").style.display = "none";
    // number of rolls left
    document.getElementById("numberOfRollsLeft").innerHTML = ""
    rollDice = setInterval(diceRoll, DIE_ROLL_SPEED)
    setTimeout(function () {
        clearTimeout(rollDice)
        // 
        diceAreRolling = false;
        turnOver = true;
    }, DIE_ROLL_TIME)
}


function nextTurn(indexNumber) {
    if (hoverActive === false) {
        return;
    }
    turnChoosen[indexNumber] = lastSum;

    document.getElementById("diceRollTwo").style.display = "none";
    document.getElementById("diceRollThree").style.display = "none";
    document.getElementById("diceRollOne").style.display = "block";
    document.getElementById("numberOfRollsLeft").innerHTML = "III"
    turn++;

    // add top section to firstSum
    firstSum = 0;
    for (let i = 0; i < 6; i++) {
        if (turnChoosen[i] != -1) {
            firstSum += turnChoosen[i];
        }
    }
    document.getElementById("turnSumma1").innerHTML = firstSum + " (63 poäng för bonus)";
    if (firstSum >= 63) {
        bonus = 50
        document.getElementById("turnBonus").innerHTML = bonus;
    }

    // add all turnChoosen[i] to totalSum
    totalSum = 0;
    for (let i = 0; i < turnChoosen.length; i++) {
        if (turnChoosen[i] != -1) {
            totalSum += turnChoosen[i];
        }
    }
    totalSum += bonus;

    document.getElementById("turnSumma2").innerHTML = totalSum;

    for (let i = 0; i < dice.length; i++) {
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
        // document.getElementById("dice" + i).innerHTML = "x"
    }
    if (turn === turnChoosen.length) {
        console.log("Game over");
    }
}


function diceRoll() {
    diceAreRolling = true;
    // remove all classes(remove all pictures) 

    for (let i = 0; i < dice.length; i++) {
        if (diceSelected[i] === true) {
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
    if (dice[diceIndexNumber] === 0) {
        console.log("Game hasn't started yet.")
        return
    } else if (diceAreRolling) {
        console.log("Dice are rolling.")
        return
    }
    if (diceSelected[diceIndexNumber] === false) {
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
    if (dice[diceIndexNumber] === 0) {
        console.log("Game hasn't started yet.")
        return
    } else if (diceAreRolling) {
        console.log("Dice are rolling.")
        return
    }
    if (diceSelected[diceIndexNumber] === false) {
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
        if (turnChoosen[k - 1] === -1 && dice[0] != 0 && diceAreRolling == false) {
            document.getElementById("statTurn" + k).classList.remove("selectAble");
            turnChoosen[k - 1] = lastSum;
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
            if (dice[i] === m) {
                numberOfNums++;
            }
        }
        // if no pairs already found...
        if (numberOfPairs === 0) {
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
        } else if (numberOfPairs === 1) {
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
    if (numberOfPairs >= numberOfPairsToSubmit && numberOfPairsToSubmit === 1) {
        return numberOfHighestPair * 2;
    } else if (numberOfPairs >= numberOfPairsToSubmit && numberOfPairsToSubmit === 2) {
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
            if (dice[i] === m) {
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

function checkForStege(oneMeansLowTwoMeansHigh) {
    if (dice.includes(2) && dice.includes(3) && dice.includes(4) && dice.includes(5)) {
        if (dice.includes(1) && oneMeansLowTwoMeansHigh === 1) {
            return 15;
        } else if (dice.includes(6) && oneMeansLowTwoMeansHigh === 2) {
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
            if (dice[i] === m) {
                numberOfNums++;
            }
        }
        // if 2 pairs (4x the same number)
        if (numberOfNums === 3) {
            numbersOfTriplets = m;
            // if a pair is found, save its number
        } else if (numberOfNums === 2 && numbersOfPair === 0) {
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



function checkYatzy(value) {
    if (value === dice[0]) {    // if all values are the same as the first dice, YATZY
        return 50;
    }
    return 0;
}



// first section === (ettor <-> sexor)
function mouseOver(indexNumberActiveTurn) {
    // don't show results if diveAreRolling
    if (diceAreRolling) {
        return;
    }  
    // if "ettor" already taken dont do shiet
    if (turnChoosen[indexNumberActiveTurn - 1] != -1 || dice[0] === 0) {
        return
    }
    lastSum = 0;
    // if PARAMETER 1-6
    if (indexNumberActiveTurn >= 1 && indexNumberActiveTurn <= 6) {
        // add all dice numbers containing PARAMETER
        for (let i = 0; i < dice.length; i++) {
            if (dice[i] === indexNumberActiveTurn) {
                lastSum += dice[i]
            }
        }
        // if PARAMETER wants to check for pair/2 pairs
    } else if (indexNumberActiveTurn >= 7 && indexNumberActiveTurn <= 8) {
        lastSum = checkForPairs(indexNumberActiveTurn - 6)
        // if PARAMETER wants to check for triss or fyrtal
    } else if (indexNumberActiveTurn >= 9 && indexNumberActiveTurn <= 10) {
        lastSum = checkForDuplicates(indexNumberActiveTurn - 6);
        // if PARAMETER wants to check for triss or fyrtal
    } else if (indexNumberActiveTurn >= 11 && indexNumberActiveTurn <= 12) {
        lastSum = checkForStege(indexNumberActiveTurn - 10);
    } else if (indexNumberActiveTurn === 13) {
        lastSum = checkFullHouse();
    } else if (indexNumberActiveTurn === 14) {
        for (let i = 0; i < dice.length; i++) {
            lastSum += dice[i]  // chans
        }
    } else if (indexNumberActiveTurn === 15) {  // YATZY  // if all values are the same as the first dice
        if (dice.every(checkYatzy)) { lastSum = 50 } else { lastSum = 0 }
    }
    // if sum of all dice are more than 0 print sum, otherwise print "-"
    if (lastSum > 0) {
        document.getElementById("turn" + indexNumberActiveTurn).innerHTML = lastSum;
    } else if (lastSum === 0) {
        document.getElementById("turn" + indexNumberActiveTurn).innerHTML = "-";
    } else {
        throw "sum is weird. (sum != 0 or above)"
    }
}






function mouseOut(indexNumberActiveTurn) {
    if (turnChoosen[indexNumberActiveTurn - 1] != -1) {
        return
    }
    document.getElementById("turn" + indexNumberActiveTurn).innerHTML = 0;
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




