

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


var listOfArrays = [
    [0, 0, 0, 0, 0, 0, 0]
];

var listOfCombinations = [
    []
];

saveArrayStats = () => {
    listOfCombinations.push(activeNumbers);
    listOfArrays.push(resultArr);
}

var index = 0;
var indexZ = 0;
var indexY = 0;
var delayTime = 500;

displayOnes = () => {            //  create a loop function
    if (index < BUTTON_COUNT & index != 0) {
        pressButton(index); // reset
    } else if (index == BUTTON_COUNT) {
        pressButton(index); // reset
        index = 0;
        // run next check
        setTimeout(() => {
            displayTwos();
        }, delayTime)
        return;
    }
    pressButton(index + 1);
    updateResultsForStats(); // update result array
    saveArrayStats(); // save output
    setTimeout(() => {        //  call a 3s setTimeout when the loop is called
        index++;                    //  increment the counter
        displayOnes();             //  ..  again which will trigger another 
    }, delayTime)
}

displayTwos = () => { // DOES NOT WORK!!
    console.log("index = " + index);
    if (index < BUTTON_COUNT & index != 0) {
        pressButton(index); // reset
    } else if (index == BUTTON_COUNT) {
        pressButton(index);
        // DONE 
        console.log(listOfArrays);
        return;
    }

    if (indexZ == 0) {
        pressButton(index + 1);
    }

    updateResultsForStats(); // update result array
    saveArrayStats(); // save output

    setTimeout(() => {        //  call a 3s setTimeout when the loop is called
        if (index < BUTTON_COUNT) {
            indexZ++;
        } else {
            indexZ = 0;
        }
        index++;                    //  increment the counter
        displayTwos();             //  ..  again which will trigger another 
    }, delayTime)
}

setTimeout(() => {
    // displayOnes();
}, delayTime);






scanPossibleOnes = () => {
    // activate and save results
    for (let ii = 0; ii < BUTTON_COUNT; ii++) {
        pressButton(ii + 1);
        updateResultsForStats(); // update result array
        saveArrayStats(); // save output
        pressButton(ii + 1); // reset
    }
}

scanPossibleTwos = () => {
    for (let ii = 0; ii < BUTTON_COUNT; ii++) {
        pressButton(ii + 1);
        for (let zz = ii + 1; zz < BUTTON_COUNT; zz++) {
            pressButton(zz + 1);
            updateResultsForStats();
            saveArrayStats();
            pressButton(zz + 1);
        }
        pressButton(ii + 1);
    }
}

scanPossibleThrees = () => {
    for (let ii = 0; ii < BUTTON_COUNT; ii++) {
        pressButton(ii + 1);
        for (let zz = ii + 1; zz < BUTTON_COUNT; zz++) {
            pressButton(zz + 1);
            for (let xx = zz + 1; xx < BUTTON_COUNT; xx++) {
                pressButton(xx + 1);
                updateResultsForStats();
                saveArrayStats();
                pressButton(xx + 1);
            }
            pressButton(zz + 1);
        }
        pressButton(ii + 1);
    }
}

scanPossibleFours = () => {  // copy of scanPossibleTwos but inverted
    // activate all btns
    for (let jj = 0; jj < BUTTON_COUNT; jj++) {
        pressButton(jj + 1);
    }
    for (let ii = 0; ii < BUTTON_COUNT; ii++) {
        pressButton(ii + 1);
        for (let zz = ii + 1; zz < BUTTON_COUNT; zz++) {
            pressButton(zz + 1);
            updateResultsForStats(); // update result array
            saveArrayStats(); // save output
            pressButton(zz + 1); // reset
        }
        pressButton(ii + 1);
    }
    // deactivate all btns
    for (let jj = 0; jj < BUTTON_COUNT; jj++) {
        pressButton(jj + 1);
    }
}

scanPossibleFives = () => {  // copy of scanPossibleOnes but inverted
    // activate all btns
    for (let jj = 0; jj < BUTTON_COUNT; jj++) {
        pressButton(jj + 1);
    }
    for (let ii = 0; ii < BUTTON_COUNT; ii++) {
        pressButton(ii + 1);
        updateResultsForStats();
        saveArrayStats();
        pressButton(ii + 1);
    }
    // deactivate all btns
    for (let jj = 0; jj < BUTTON_COUNT; jj++) {
        pressButton(jj + 1);
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

scanResults = () => {
    scanPossibleOnes();
    if (BUTTON_COUNT > 1) {
        scanPossibleTwos();
    }
    if (BUTTON_COUNT > 2) {
        scanPossibleThrees();
    }
    if (BUTTON_COUNT > 3) {
        scanPossibleFours();
    }
    if (BUTTON_COUNT > 4) {
        scanPossibleFives();
    }
    if (BUTTON_COUNT > 5) {
        scanPossibleSixes();
    }
    console.log("listOfArrays: ");
    console.log(listOfArrays);
}

scanResults();



function Combo(result, combination, copies) {
    this.result = result;
    this.combinations = combination;
    this.copies = copies;
}

var statisticsArray = [];

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
                console.log("Found solution index = " + ii)
            }, 100);
        } else {
            console.log("Copies på " + statisticsArray[ii].result + " = " + statisticsArray[ii].copies);
        }
    }
    console.log("Combinations: " + statisticsArray.length)
}


findMatch = (combinationArr, index) => {
    let matchFound;
    matchFound = 0;
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
            return true;
        }
    }
    return false
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
            if (findCombination(tempInverseArr)) {
                if (display) {console.log("Found inverse at index: " + ii);}
                return true
            }
        }
    }
    console.log("No inverse found.");
    return false
}




search_non_reverseable = () => {
    for (let ii = 0; ii < statisticsArray.length; ii++) {
        if (findSingleInverseCombination(statisticsArray[ii].result, false)) {
            continue;
        } else {
            console.log("Inverse missing! Index: " + ii);
            // return
        }
    }
}


calculateStats();
findZeroCopies();
updateResultsForStats();
