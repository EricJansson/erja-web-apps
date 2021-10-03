

const FIELD = document.getElementById("field");
const fieldwidth = 80;
const fieldheight = 44;
const winTileRandomY = fieldheight - 5;
const winTileRandomX = fieldwidth - 5;
var FIELDSIZE = fieldwidth * fieldheight;

// Chance for a wall is 1 / (var below)
var higherNumberLessWalls = 6;
// solver[i][0] == X         solver[i][1] == Y
var coorXY = 5

var solver = [
    [coorXY, coorXY]
]

var field1 = [
    [0, 1, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 0, 1, 0, 1, 0],
    [0, 1, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 1, 0, 1, 1, 1, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 1, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 0, 1, 0, 1, 0, 1, 1],
    [0, 0, 0, 1, 0, 0, 1, 0, 0, -1]
]

var field2 = [
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
    [0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 0],
    [0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [0, 1, 0, 0, 0, 1, 0, 0, 0, -1]
]

var field3 = [
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, -1]
]

var randomField = [
    []
]


// SELECT STARTING FIELD!!
var fieldRoute = randomField; // = field3;

function randomFieldGenerator() {
    randomField = [
        []
    ]
    var currentTileRow = 0;
    for (let k = 1; k < fieldheight; k++) {
        randomField.unshift([])
    }
    for (let i = 0; i < FIELDSIZE; i++) {
        if (i % fieldwidth === 0 && i != 0) {
            currentTileRow++;
        }
        var number = Math.floor(Math.random() * higherNumberLessWalls);
        if (number <= 1) {
            number = 1
        } else {
            number = 0
        }
        randomField[currentTileRow].unshift(number)
    }
    randomField[winTileRandomY][winTileRandomX] = -1;
    fieldRoute = randomField
}


function newRandomField() {
    // FIELD.style.minWidth = 20 * fieldwidth + 20 + "px"
    solver = [
        [coorXY, coorXY]
    ];
    randomFieldActive = true;
    randomFieldGenerator()
    fieldRoute = randomField;
    // make permanent starting tile == [0][0]
    randomField[coorXY][coorXY] = 2;
    startup()
}


function selectField(params) {
    var premadeFieldSize = 10;
    // FIELD.style.minWidth = 20 * premadeFieldSize + 20 + "px"
    fieldRoute = params
    randomFieldActive = false;
    solver = [
        [0, 0]
    ];
    startup("premade")
}



function startup(fieldIsPremade) {
    FIELD.innerHTML = ""
    var currentTileRow = 0;
    var tileNumberOnCurrentRow = 0;
    if (fieldIsPremade === "premade") {
        for (let i = 0; i < 100; i++) {
            var tile = document.createElement('div')

            // if i is dividable with 10, start a new row to make tiles
            if (i % 10 === 0 && i != 0) {
                currentTileRow++;
                FIELD.innerHTML += "<br>"
                tileNumberOnCurrentRow = 0;
            }
            tile.setAttribute('id', 'tile_x' + tileNumberOnCurrentRow + "_y" + currentTileRow)
            tile.setAttribute('class', 'tiles')
            // if fieldRoute coordinate is "1", make it into a wall
            if (fieldRoute[currentTileRow][tileNumberOnCurrentRow] === 1) {
                tile.setAttribute('class', 'blockedtiles')
            }
            // number of the tile on current row
            tileNumberOnCurrentRow++;
            // make exception for the first tile (permanent starting tile)

            // make the tile
            FIELD.appendChild(tile)
        }
        document.getElementById("tile_x0_y0").classList.add("solvertiles")
        document.getElementById("tile_x9_y9").classList.add("wintile")
        fieldBorderX = 10;
        fieldBorderY = 9;
        fieldRoute[9][9] = -2
        fieldRoute[0][0] = 2
        winTile = 9;
        return;
    }
    for (let i = 0; i < FIELDSIZE; i++) {
        var tile = document.createElement('div')

        // if i is dividable with 10, start a new row to make tiles
        if (i % fieldwidth === 0 && i != 0) {
            currentTileRow++;
            FIELD.innerHTML += "<br>"
            tileNumberOnCurrentRow = 0;
        }
        tile.setAttribute('id', 'tile_x' + tileNumberOnCurrentRow + "_y" + currentTileRow)
        tile.setAttribute('class', 'tiles')
        // if fieldRoute coordinate is "1", make it into a wall
        if (fieldRoute[currentTileRow][tileNumberOnCurrentRow] === 1) {
            tile.setAttribute('class', 'blockedtiles')
        }
        // number of the tile on current row
        tileNumberOnCurrentRow++;
        // make exception for the first tile (permanent starting tile)
        if (tileNumberOnCurrentRow === coorXY + 1 && currentTileRow === coorXY) {
            tile.setAttribute('class', 'tiles solvertiles')
            fieldRoute[coorXY][coorXY] = 2;
        }

        // make the tile
        FIELD.appendChild(tile)
    }
    fieldBorderX = fieldwidth - 1;
    fieldBorderY = fieldheight - 1;
    fieldRoute[winTileRandomY][winTileRandomX] = -1;

    document.getElementById("tile_x" + winTileRandomX + "_y" + winTileRandomY).classList.add("wintile")
}




var stepeast = 0
var stepwest = 0
var stepnorth = 0
var stepsouth = 0
var chooseDirection = -1


var stepDirection = {
    selected: -1,
    east: {
        available: true,
        coordinate: [0, 0]
    },
    west: {
        available: true,
        coordinate: [0, 0]
    },
    north: {
        available: true,
        coordinate: [0, 0]
    },
    south: {
        available: true,
        coordinate: [0, 0]
    }
}


var currentTileX = 0;
var currentRowY = 0;
var wins = 0;
var losses = 0;
var randomFieldActive = false;

var fieldBorder;
var winTile;
var maxSteps = 1;
var minSteps = 100000;

function step() {
    // solver[i][0] = X coordinate
    // solver[i][1] = Y coordinate
    if (solver.length === 0) {
        losses++;
        console.log("Losses : " + losses)
        clearInterval(walking)
        clearInterval(running)
        console.log("Goal not reachable")
        // if AUTO is active make new random field and run. 
        // (wait 3 seconds => make new field => wait 3 more seconds => run)
        if (autoActive) {
            setTimeout(function () {
                newRandomField()
                setTimeout(function () {
                    run()
                }, 3000)
            }, 3000)
        }
        throw "Game Over"
    }
    // save current tile coordinates
    currentTileX = solver[solver.length - 1][0]
    currentRowY = solver[solver.length - 1][1]
    // if Goal is entered => win  && stop autowalk
    if (currentTileX === winTile && currentRowY === winTile && !randomFieldActive) {
        wins++;
        if (solver.length > maxSteps) {
            maxSteps = solver.length;
            console.log("New maximum step record: " + maxSteps)
        }
        if (solver.length < minSteps) {
            minSteps = solver.length;
            console.log("New minimum step record: " + minSteps)
        }
        console.log("Steps taken: " + solver.length)
        console.log("Wins: " + wins)
        clearInterval(walking)
        clearInterval(running)
        throw "WIN!"
    } else if (currentTileX === winTileRandomX && currentRowY === winTileRandomY && randomFieldActive) {
        wins++;
        if (solver.length > maxSteps) {
            maxSteps = solver.length;
            console.log("New maximum step record: " + maxSteps)
        }
        if (solver.length < minSteps) {
            minSteps = solver.length;
            console.log("New minimum step record: " + minSteps)
        }
        console.log("Steps taken: " + solver.length)
        console.log("Wins: " + wins)
        clearInterval(walking)
        clearInterval(running)
        // if AUTO is active make new random field and run. 
        // (wait 3 seconds => make new field => wait 3 more seconds => run)
        if (autoActive) {
            setTimeout(function () {
                newRandomField()
                setTimeout(function () {
                    run()
                }, 3000)
            }, 3000)
        }
        throw "WIN!"
    }
    // check for available directions (with smart function!)
    stepnorth = stepDirection.north.coordinate[1] = currentRowY - 1
    stepsouth = stepDirection.south.coordinate[1] = currentRowY + 1
    stepwest = stepDirection.west.coordinate[0] = currentTileX - 1
    stepeast = stepDirection.east.coordinate[0] = currentTileX + 1
    directionCheck("east", stepeast, currentRowY, stepeast);
    directionCheck("west", stepwest, currentRowY, stepwest);
    directionCheck("north", stepnorth, stepnorth, currentTileX);
    directionCheck("south", stepsouth, stepsouth, currentTileX);

    // full function available in scriptOLD.js
    // CHECK Direction!!
    function directionCheck(directionToCheck, directionYouWantToStep, currRowY, currTileX) {
        // is the next step within the field?
        // if directionToCheck is east or south, check border radius as max value
        if (directionToCheck === "east" && directionYouWantToStep > fieldBorderX) {
            return stepDirection[directionToCheck].available = false
        } else if (directionToCheck === "south" && directionYouWantToStep > fieldBorderY) {
            return stepDirection[directionToCheck].available = false
        }
        // if X/Y Coordinate has a value less than 0 => outside the field
        if (directionYouWantToStep >= 0) {
            // is the next step blocked by a wall? i.e. is it 1?
            if (fieldRoute[currRowY][currTileX] <= 0) {
                // console.log(directionToCheck + " is OK!")
                stepDirection[directionToCheck].available = true
            } else if (fieldRoute[currRowY][currTileX] >= 1) {
                // console.log(directionToCheck + " Wall Blocked...")
                stepDirection[directionToCheck].available = false
            } else {
                // console.log(directionToCheck + " is START")
                stepDirection[directionToCheck].available = false
            }
        } else {
            // console.log(directionToCheck + " OUTSIDE the field")
            stepDirection[directionToCheck].available = false
        }
    }
    // Fill array with available directions
    var directionsAvailable = []
    if (stepDirection.east.available) {
        directionsAvailable.push("east")
    }
    if (stepDirection.south.available) {
        directionsAvailable.push("south")
    }
    if (stepDirection.west.available) {
        directionsAvailable.push("west")
    }
    if (stepDirection.north.available) {
        directionsAvailable.push("north")
    }
    // check if there is NO direction available
    if (directionsAvailable.length === 0) {
        // make Solver go back 1 tile
        document.getElementById("tile_x" + solver[solver.length - 1][0] + "_y" + solver[solver.length - 1][1]).classList.remove("solverheadtiles")
        document.getElementById("tile_x" + solver[solver.length - 1][0] + "_y" + solver[solver.length - 1][1]).classList.remove("solvertiles")
        solver.pop()

        return

        // throw "IM STUCK!! :<"
    }

    // display available AMOUNT
    // console.log("directionsAvailable: " + directionsAvailable.length)
    // display the available OPTIONS in the log
    // directionsAvailable.forEach(function (e) { console.log(e) });

    directionSelect(directionsAvailable);

    function directionSelect(arrayParameter) {
        // randomize direction. Only use numbers == number of directions available


        chooseDirection = Math.floor(Math.random() * directionsAvailable.length);


        // select direction based on the random number given
        // also set the next step coordinate for selected direction
        // chooseDirection = 0;
        if (chooseDirection === 0) {
            chooseDirection = arrayParameter[0]
        } else if (chooseDirection === 1) {
            chooseDirection = arrayParameter[1]
        } else if (chooseDirection === 2) {
            chooseDirection = arrayParameter[2]
        } else if (chooseDirection === 3) {
            chooseDirection = arrayParameter[3]
        }
    }
    // step to selected direction
    // push coordinate on nextstep to solverArray

    var xCoor = -1;
    var yCoor = -1;
    var nextCoor = []

    currentTileX = 0;
    currentRowY = 0;

    // if east || west (only change the X coordinate) 
    if (chooseDirection === "west" || chooseDirection === "east") {
        xCoor = window["step" + chooseDirection]
        fieldRoute[solver[solver.length - 1][1]][xCoor] = 3;
        // set next coordinate
        nextCoor = [xCoor, solver[solver.length - 1][1]];
        // else if north || south (only change the Y coordinate)
    } else if (chooseDirection === "north" || chooseDirection === "south") {
        yCoor = window["step" + chooseDirection]
        // fill field route NEXT TILE with number 3
        fieldRoute[yCoor][solver[solver.length - 1][0]] = 3;
        // set next coordinate
        nextCoor = [solver[solver.length - 1][0], yCoor];
    } else {
        throw "ChooseDirection is not defined?"
    }
    // remove current tile background color (remove class)
    document.getElementById("tile_x" + solver[solver.length - 1][0] + "_y" + solver[solver.length - 1][1]).classList.remove("solverheadtiles")
    document.getElementById("tile_x" + solver[solver.length - 1][0] + "_y" + solver[solver.length - 1][1]).classList.add("solvertiles")
    solver.push(nextCoor);
    // add next tile background color (add class)
    document.getElementById("tile_x" + solver[solver.length - 1][0] + "_y" + solver[solver.length - 1][1]).classList.add("solverheadtiles")
}

var walking; // auto walk
var running; // auto run

function walk() {
    clearInterval(walking)
    clearInterval(running)
    walking = setInterval(function () {
        step()
    }, 100);
}

function run() {
    clearInterval(walking)
    clearInterval(running)
    running = setInterval(function () {
        step()
    }, 10);
}

var autoActive = false;

function auto() {
    autoActive = true;
    document.body.style.backgroundColor = "black"
    document.getElementById("stop_btn_block").style.display = "block";
    document.getElementById("all_btns").style.display = "none";
    newRandomField()
    setTimeout(function () {
        run();
    }, 3000)
}

function stopAuto() {
    document.getElementById("all_btns").style.display = "block";
    document.getElementById("stop_btn_block").style.display = "none";
    clearInterval(walking)
    clearInterval(running)
    autoActive = false;
}

// randomFieldGenerator()
// startup()

selectField(field1)

// step()

// fieldRoute[2][5]
// FIELD.classList.add


