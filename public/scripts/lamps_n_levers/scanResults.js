
function Combo(result, combination, copies) {
    this.copies = copies;
    this.combinations = combination;
    this.result = result;
}

var statisticsArray = [];

// place one empty board in too...
var listOfArrays = [startboard];

// ... which has no combinations
var listOfCombinations = [
    []
];

var delayTime = 500;



updateResultsForStats = () => {
    resultArr = [];
    for (let ii = 0; ii < LAMP_COUNT; ii++) {
        var x = 0;
        x = startboard[ii];
        for (let qq = 0; qq < activeNumbers.length; qq++) {
            x += fullBoard[activeNumbers[qq] - 1][ii];
        }
        x %= 2;
        if (x == 0) {
            resultArr.push(0)
        } else {
            resultArr.push(1)
        }
    }
}

saveArrayStats = () => {
    listOfCombinations.push(activeNumbers);
    listOfArrays.push(resultArr);
}


scanOnes = (xx) => {
    if (xx > BUTTON_COUNT) {
        return;
    }
    // activate and save results
    pressButton(xx); // turn on btn
    updateResultsForStats(); // update result array
    saveArrayStats(); // save output
    pressButton(xx); // turn off btn
    // recursive call
    scanOnes(xx + 1);
}

scanTwos = (xx, zz) => {
    if (zz > BUTTON_COUNT) {
        return;
    } else if (xx > BUTTON_COUNT) {
        scanTwos(zz + 2, zz + 1);
        return;
    }
    pressButton(xx); // turn on 1st btn
    pressButton(zz); // turn on 2nd btn
    updateResultsForStats();
    saveArrayStats();
    pressButton(xx); // turn off 1st btn
    pressButton(zz); // turn off 2nd btn
    // recursive call
    scanTwos(xx + 1, zz);
}

scanThrees = (xx, zz, yy) => {
    if (yy > BUTTON_COUNT) {
        return;
    } else if (zz > BUTTON_COUNT) {
        scanThrees(yy + 3, yy + 2, yy + 1);
        return;
    } else if (xx > BUTTON_COUNT) {
        scanThrees(zz + 2, zz + 1, yy);
        return;
    }
    pressButton(xx); // turn on 1st btn
    pressButton(zz); // turn on 2nd btn
    pressButton(yy); // turn on 3rd btn
    updateResultsForStats();
    saveArrayStats();
    pressButton(xx); // turn off 1st btn
    pressButton(zz); // turn off 2nd btn
    pressButton(yy); // turn off 3rd btn
    // recursive call
    scanThrees(xx + 1, zz, yy);
}

scanFours = (xx, zz, yy, qq) => {
    if (qq > BUTTON_COUNT) {
        return;
    } else if (yy > BUTTON_COUNT) {
        scanFours(qq + 4, qq + 3, qq + 2, qq + 1);
        return;
    } else if (zz > BUTTON_COUNT) {
        scanFours(yy + 3, yy + 2, yy + 1, qq);
        return;
    } else if (xx > BUTTON_COUNT) {
        scanFours(zz + 2, zz + 1, yy, qq);
        return;
    }
    pressButton(xx); // turn on 1st btn
    pressButton(zz); // turn on 2nd btn
    pressButton(yy); // turn on 3rd btn
    pressButton(qq); // turn off 4th btn
    updateResultsForStats();
    saveArrayStats();
    pressButton(xx); // turn off 1st btn
    pressButton(zz); // turn off 2nd btn
    pressButton(yy); // turn off 3rd btn
    pressButton(qq); // turn off 4th btn
    // recursive call
    scanFours(xx + 1, zz, yy, qq);
}

scanFives = (xx, zz, yy, qq, ww) => {
    // console.log("xx = " + xx + ", zz = " + zz + ", yy = " + yy + ", qq = " + qq + ", ww = " + ww);
    if (ww > BUTTON_COUNT) {
        return;
    } else if (qq > BUTTON_COUNT) {
        scanFives(ww + 5, ww + 4, ww + 3, ww + 2, ww + 1);
        return;
    } else if (yy > BUTTON_COUNT) {
        scanFives(qq + 4, qq + 3, qq + 2, qq + 1, ww);
        return;
    } else if (zz > BUTTON_COUNT) {
        scanFives(yy + 3, yy + 2, yy + 1, qq, ww);
        return;
    } else if (xx > BUTTON_COUNT) {
        scanFives(zz + 2, zz + 1, yy, qq, ww);
        return;
    }
    pressButton(xx); // turn on 1st btn
    pressButton(zz); // turn on 2nd btn
    pressButton(yy); // turn on 3nd btn
    pressButton(qq); // turn on 4th btn
    pressButton(ww); // turn on 5th btn
    updateResultsForStats();
    saveArrayStats();
    pressButton(xx); // turn off 1st btn
    pressButton(zz); // turn off 2nd btn
    pressButton(yy); // turn off 3nd btn
    pressButton(qq); // turn off 4th btn
    pressButton(ww); // turn off 5th btn
    // recursive call
    scanFives(xx + 1, zz, yy, qq, ww);
}

scanSixes = (xx, zz, yy, qq, ww, uu) => {
    if (uu > BUTTON_COUNT) {
        return;
    } else if (ww > BUTTON_COUNT) {
        scanSixes(uu + 6, uu + 5, uu + 4, uu + 3, uu + 2, uu + 1);
        return;
    } else if (qq > BUTTON_COUNT) {
        scanSixes(ww + 5, ww + 4, ww + 3, ww + 2, ww + 1, uu);
        return;
    } else if (yy > BUTTON_COUNT) {
        scanSixes(qq + 4, qq + 3, qq + 2, qq + 1, ww, uu);
        return;
    } else if (zz > BUTTON_COUNT) {
        scanSixes(yy + 3, yy + 2, yy + 1, qq, ww, uu);
        return;
    } else if (xx > BUTTON_COUNT) {
        scanSixes(zz + 2, zz + 1, yy, qq, ww, uu);
        return;
    }
    pressButton(xx); // turn on 1st btn
    pressButton(zz); // turn on 2nd btn
    pressButton(yy); // turn on 3nd btn
    pressButton(qq); // turn on 4th btn
    pressButton(ww); // turn on 5th btn
    pressButton(uu); // turn on 6th btn
    updateResultsForStats();
    saveArrayStats();
    pressButton(xx); // turn off 1st btn
    pressButton(zz); // turn off 2nd btn
    pressButton(yy); // turn off 3nd btn
    pressButton(qq); // turn off 4th btn
    pressButton(ww); // turn off 5th btn
    pressButton(uu); // turn off 6th btn
    // recursive call
    scanSixes(xx + 1, zz, yy, qq, ww, uu);
}


scanResults = () => {
    scanOnes(1);
    if (BUTTON_COUNT > 1) {
        scanTwos(2, 1);
    }
    if (BUTTON_COUNT > 2) {
        scanThrees(3, 2, 1);
    }
    if (BUTTON_COUNT > 3) {
        scanFours(4, 3, 2, 1);
    }
    if (BUTTON_COUNT > 4) {
        scanFives(5, 4, 3, 2, 1);
    }
    if (BUTTON_COUNT > 5) {
        scanSixes(6, 5, 4, 3, 2, 1);
    }
    console.log("listOfArrays: ");
    console.log(listOfArrays);
}




console.log(statisticsArray);


// does listOfArrays[0] exist in statisticsArray?
// if (yes) -> find it, add the combo array, add 1 to copy
// if (no) -> create new Combo(), with new result etc. (add the combo array, add 1 to copy)

calculateStats = () => {
    var match;
    // for (let zz = 0; zz < 3; zz++) {
    for (let zz = 0; zz < listOfArrays.length; zz++) {
        match = false;
        for (let yy = 0; yy < statisticsArray.length; yy++) {
            if (compareArrays(statisticsArray[yy], listOfArrays[zz])) { // results already exists
                statisticsArray[yy].combinations.push(listOfCombinations[zz]);
                statisticsArray[yy].copies++;
                match = true;
                break;
            }
        }
        if (match == false) {
            statisticsArray.push(new Combo(listOfArrays[zz], [listOfCombinations[zz]], 1));
        }
    }
}

compareArrays = (minStatistikArray, listaMedArrays) => {
    for (let ii = 0; ii < LAMP_COUNT; ii++) {
        if (minStatistikArray.result[ii] != listaMedArrays[ii]) {
            return false;
        }
    }
    return true;
}

findZeroCopies = () => {
    for (let ii = 0; ii < statisticsArray.length; ii++) {
        if (statisticsArray[ii].copies == 1) {
            setTimeout(() => {
                // console.log("Found solution index = " + ii)
            }, 100);
            console.log("Only unique solutions!")
            break;
        } else {
            console.log("Copies på " + statisticsArray[ii].result + " = " + statisticsArray[ii].copies);
        }
    }
    console.log("Combinations: " + statisticsArray.length)
}


findMatch = (combinationArr, index) => {
    let matchFound = 0;
    for (let jj = 0; jj < combinationArr.length; jj++) {
        if (combinationArr[jj] == statisticsArray[index].result[jj]) {
            matchFound++;
        } else {
            continue;
        }
        if (matchFound == combinationArr.length) {
            // console.log("Result at index = " + index);
            return true;
        }
    }
    return false;
}

findCombination = (combinationArr) => {
    // statisticsArray
    for (let ii = 0; ii < statisticsArray.length; ii++) {
        if (findMatch(combinationArr, ii)) {
            return ii;
        }
    }
    return -1
}

// findCombination([0,0,1,0,1,0])


findSingleInverseCombination = (arrayCombination, display = true) => {
    // statisticsArray
    var tempInverseArr = [];
//    for (let ii = 0; ii < statisticsArray.length; ii++) { // gå igenom hela statArr
    for (let jj = 0; jj < LAMP_COUNT; jj++) { // invertera tempArr
        if (arrayCombination[jj] == 1) {
            tempInverseArr.push(0);
        } else {
            tempInverseArr.push(1);    
        }
    }
    if (display) {
        console.log("Looking for:")
        console.log(tempInverseArr)
    }
    for (let ii = 0; ii < 8; ii++) { // gå igenom hela statArr
        for (let kk = 0; kk < statisticsArray.length; kk++) {
            // jämför med hela statArr EFTER statArr[current]
            combIndex = findCombination(tempInverseArr);
            if (combIndex >= 0) {
                if (display) {
                    console.log("Found inverse at index: " + combIndex);
                }
                return true
            }
        }
    }
    if (display) {
        console.log("No inverse found.");
    }
    return false
}


search_non_reverseable = () => {
    for (let ii = 0; ii < statisticsArray.length; ii++) {
        foundInverse = findSingleInverseCombination(statisticsArray[ii].result, false);
        if (foundInverse) {
            continue;
        } else {
            console.log("Inverse missing! Index: " + ii);
            // return
        }
    }
}


scanResults();
calculateStats();
findZeroCopies();
updateResultsForStats();



/* unused OLD code 

scanPossibleOnes = () => {
    // activate and save results
    for (let ii = 0; ii < BUTTON_COUNT; ii++) {
        pressButton(ii + 1);
        updateResultsForStats(); // update result array
        saveArrayStats(); // save output
        pressButton(ii + 1); // reset
    }
}

scanPossibleSixes = () => {
    // Activate all btns
    for (let jj = 0; jj < BUTTON_COUNT; jj++) {
        pressButton(jj + 1);
    }
    updateResultsForStats();
    saveArrayStats();
    // DEactivate all btns
    for (let jj = 0; jj < BUTTON_COUNT; jj++) {
        pressButton(jj + 1);
    }
}
*/
