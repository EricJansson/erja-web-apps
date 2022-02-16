
// changes to fullBoard[] will change the whole program

var devmode = 0;

var fullBoard = [
    [1, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 1, 0, 1],
    [0, 1, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 1, 0],
    [1, 0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0, 0]
]


fullBoard = [
    [1, 1, 0, 0, 0, 0],
    [0, 0, 1, 0, 1, 0],
    [1, 1, 1, 0, 0, 0],
    [1, 0, 0, 0, 1, 1],
    [0, 1, 0, 1, 1, 0],
    [0, 0, 1, 1, 0, 0]
]



var LAMP_COUNT = fullBoard[0].length;
var LEVER_COUNT = fullBoard.length;

// must have same length as fullBoard[0]
var startboard = [1, 0, 1, 0, 0, 0, 1]
startboard = []

// startboard == empty -> fill startboard with 0s
if (startboard.length == 0) {
    for (let ii = 0; ii < fullBoard[0].length; ii++) {
        startboard.push(0); 
    }
}

var resultArr = [];
var activeNumbers = []



var board = document.getElementById("board");
var results = document.getElementById("boardResults");
var startLamps = document.getElementById("startLamps");



toggleLeverLamps = (x, y) => {
    // console.log("Switch" + (x + 1) + "x" + (y + 1) + "y");
    if (fullBoard[y][x] == 1) {
        fullBoard[y][x] = 0;
        document.getElementById("switch" + (x + 1) + "x" + (y + 1) + "y").classList.remove("filled");
    } else {
        fullBoard[y][x] = 1;
        document.getElementById("switch" + (x + 1) + "x" + (y + 1) + "y").classList.add("filled");
    }
}



setup_StartLamps = () => {
    startLamps.innerHTML = "<div class='number'></div>";
    for (let ii = 0; ii < LAMP_COUNT; ii++) {
        if (startboard[ii] == 1) {
            startLamps.innerHTML += "<div id='startlampNumber_" + (ii + 1) + "' class='active row'></div>";
        } else {
            startLamps.innerHTML += "<div id='startlampNumber_" + (ii + 1) + "' class='row'></div>";
        }
    }
    for (let ii = 0; ii < LAMP_COUNT; ii++) {
        document.getElementById("startlampNumber_" + (ii + 1)).addEventListener('click', () => {
            turnOnStartLamp(ii);
            updateResults();
        });
    }
}


devCheck = (arg) => {
    if (arg != 1 && devmode < 6) {
        devmode = 0;
        return;
    } else if (devmode >= 6) {
        document.getElementById("devmode").style.display = "block";
    }
    devmode++;
}


pressButton = (arg) => {
    var tempArr = [];
    devCheck(arg);
    if (!activeNumbers.includes(arg)) {
        tempArr.push(arg);
        document.getElementById("buttonNumber_" + arg).classList.add("activeLevers");
    } else {
        document.getElementById("buttonNumber_" + arg).classList.remove("activeLevers");
    }
    for (let ii = 0; ii < activeNumbers.length; ii++) {
        if (activeNumbers.includes(arg) & activeNumbers[ii] == arg) {
            continue
        }
        tempArr.push(activeNumbers[ii]);
    }
    activeNumbers = tempArr;
}



turnOnStartLamp = (arg) => {
    if (startboard[arg] > 0) {
        startboard[arg]--;
        document.getElementById("startlampNumber_" + (arg + 1)).classList.remove("active");
    } else {
        startboard[arg]++;
        document.getElementById("startlampNumber_" + (arg + 1)).classList.add("active");
    }
}



boardSetup = () => {
    for (let ii = 0; ii < LEVER_COUNT; ii++) {
        if (activeNumbers.includes(ii + 1)) {
            board.innerHTML += "<div id='buttonNumber_" + (ii + 1) + "' class='activeLevers levers'></div>";
        } else {
            board.innerHTML += "<div id='buttonNumber_" + (ii + 1) + "' class='levers'></div>";
        }
        for (let jj = 0; jj < LAMP_COUNT; jj++) {
            if (fullBoard[ii][jj] == 1) {
                board.innerHTML += "<div id='switch" + (jj + 1) + "x" + (ii + 1) + "y' class='filled row'></div>";
            } else {
                board.innerHTML += "<div id='switch" + (jj + 1) + "x" + (ii + 1) + "y' class='row'></div>";
            }
        }
        board.innerHTML += "<br>";
    }
    // Lever lamp switches EventListeners
    for (let yy = 0; yy < LEVER_COUNT; yy++) {
        for (let xx = 0; xx < LAMP_COUNT; xx++) {
            document.getElementById("switch" + (xx + 1) + "x" + (yy + 1) + "y").addEventListener('click', () => {
                toggleLeverLamps(xx, yy);
                updateResults();
            });
        }
    }
    // Lever EventListeners
    for (let ii = 0; ii < LEVER_COUNT; ii++) {
        document.getElementById("buttonNumber_" + (ii + 1)).addEventListener('click', () => {
            pressButton(ii + 1);
            updateResults();
            if (!resultArr.includes(0)) {
                setTimeout(() => {
                    console.log("Start lamps: " + startboard)
                    console.log("Win: " + activeNumbers)
                    // alert("Match found!");
                }, 10);
            }
        });
    }
}


updateResults = () => {
    results.innerHTML = "<br><div class='number'></div>";
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
            results.innerHTML += "<div class='row'></div>";
        } else {
            resultArr.push(1)
            results.innerHTML += "<div class='active row'></div>";
        }
    }
}


presetCombination = (startOutPutArr, leverActiveArr) => {
    // set start output
    for (let ii = 0; ii < startOutPutArr.length; ii++) {
        if (startOutPutArr[ii] > 0) {
            turnOnStartLamp(ii);
            // updateResults();
        }
    }
    // pull lever
    for (let jj = 0; jj < leverActiveArr.length; jj++) {
        pressButton(leverActiveArr[jj]);
    }
    updateResults();
}


resetLevers = () => {    
    for (let ii = 0; ii < startboard.length; ii++) {
        if (startboard[ii] > 0) {
            turnOnStartLamp(ii);
        }
        startboard[ii] = 0;
    }
    while (activeNumbers.length > 0) {
        // console.log("Pressed button = " + activeNumbers[0]);
        pressButton(activeNumbers[0]);
    }
    updateResults();
}


resetField = () => {
    resultArr = [];
    activeNumbers = [];
    startboard = [];
    for (let ii = 0; ii < fullBoard[0].length; ii++) {
        startboard.push(0); 
    }
    
    LAMP_COUNT = fullBoard[0].length;
    LEVER_COUNT = fullBoard.length;
    document.getElementById("board").innerHTML = "";
    setup_StartLamps();
    boardSetup();
    resetLevers(); // reset levers
    updateResults();
}



displayStats = () => {
    statisticsArray = [];
    listOfArrays = [];
    listOfCombinations = [];
    recurScan(LEVER_COUNT);
    calculateStats();
    findZeroCopies();
    updateResultsForStats();
    console.log(statisticsArray);
}

addLever = () => {
    fullBoard.push([]); // push Array
    while (fullBoard[fullBoard.length - 1].length < fullBoard[0].length) {
        fullBoard[fullBoard.length - 1].push(0); // fill Array
    }
}

removeLever = () => {
    fullBoard.pop(); // pop Array
}

changeLeverCount = () => {
    slctValue = document.getElementById("slctLeverCount").value;
    console.log("Number: " + slctValue)
    while (slctValue != fullBoard.length) {
        if (slctValue < fullBoard.length) {
            removeLever();
        } else {
            addLever();
        }
    }
    resetField();
}



addLamp = () => {
    startboard.push(0);
    resultArr.push(0);
    // add a lamp to all levers
    for (let ii = 0; ii < fullBoard.length; ii++) {
        fullBoard[ii].push(0); 
    }
}

removeLamp = () => {
    startboard.pop();
    resultArr.pop();
    // add a lamp to all levers
    for (let ii = 0; ii < fullBoard.length; ii++) {
        fullBoard[ii].pop(); 
    }
}

changeLampCount = () => {
    slctValue = document.getElementById("slctLampCount").value;
    console.log("Number: " + slctValue)
    while (slctValue != resultArr.length) {
        if (slctValue < resultArr.length) {
            removeLamp();
        } else {
            addLamp();
        }
    }
    resetField();
}


setup_StartLamps();
boardSetup();
updateResults();
