
const FIELD = document.getElementById("field");
const FIELDSIZE = 100;
var higherNumberLessWalls = 8;
// solver[i][0] == X         solver[i][1] == Y
var solver = [
    [0, 0]
];

const field1 = [
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

const field2 = [
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

const field3 = [
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
    [], [], [], [], [], [], [], [], [], [-1]
]


function randomFieldGenerator() {
    randomField = [
        [], [], [], [], [], [], [], [], [], [2]
    ]
    var currentTileRow = 0;
    for (let i = 0; i < FIELDSIZE - 1; i++) {
        if (i % 10 === 0 && i != 0) {
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
}

function newRandomField() {
    var randomizerSpin = setInterval(function () {
        randomFieldGenerator()
        fieldRoute = randomField;
        // make permanent starting tile == [0][0]
        randomField[0][0] = 2;
        startup()
        setTimeout(function () {
            clearInterval(randomizerSpin)
        }, 1000)
    }, 100);
}

// SELECT STARTING FIELD!!
var fieldRoute = field3;

function selectField(params) {
    fieldRoute = params
    startup()
}

function startup() {
    FIELD.innerHTML = ""
    var currentTileRow = 0;
    var tileNumberOnCurrentRow = 0;
    for (let i = 0; i < FIELDSIZE; i++) {
        var tile = document.createElement('div')

        // if i is dividable with 10, start a new row to make tiles
        if (i % 10 === 0 && i != 0) {
            currentTileRow++;
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
        if (i === 0) {
            tile.setAttribute('class', 'tiles solvertiles')
            fieldRoute[0][0] = 2;
        }

        // make the tile
        FIELD.appendChild(tile)
    }
}


var stepEast = 0
var stepWest = 0
var stepNorth = 0
var stepSouth = 0
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


function step() {
    // solver[i][0] = X coordinate
    // solver[i][1] = Y coordinate

    // save current tile coordinates
    currentTileX = solver[solver.length - 1][0]
    currentRowY = solver[solver.length - 1][1]
    if (currentTileX === 9 && currentRowY === 9) {
        throw "WIN!"
    }


    // check for available directions

    // NEW FUNCTION IN script.js
    function directionCheckOLD() {
        // stepEast = solver[solver.length - 1][0] + 1
        // stepSouth = solver[solver.length - 1][1] + 1
        // stepWest = solver[solver.length - 1][0] - 1
        // stepNorth = solver[solver.length - 1][1] - 1

        stepNorth = stepDirection.north.coordinate[1] = currentRowY - 1
        stepSouth = stepDirection.south.coordinate[1] = currentRowY + 1
        stepWest = stepDirection.west.coordinate[0] = currentTileX - 1
        stepEast = stepDirection.east.coordinate[0] = currentTileX + 1

        // CHECK EAST!!
        // is the next step within the field?
        if (stepEast >= 0 && stepEast < 10) {
            // is the next step blocked by a wall?
            if (fieldRoute[currentRowY][stepEast] <= 0) {
                console.log("East not blocked!")
            } else if (fieldRoute[currentRowY][stepEast] >= 1) {
                console.log("East Wall Blocked...")
            }
        } else {
            console.log("East OUTSIDE the field")
        }

        // CHECK WEST!!
        // is the next step within the field?
        if (stepWest >= 0 && stepWest < 10) {
            // is the next step blocked by a wall?
            if (fieldRoute[currentRowY][stepWest] <= 0) {
                console.log("West not blocked!")
            } else if (fieldRoute[currentRowY][stepWest] >= 1) {
                console.log("West Wall Blocked...")
            }
        } else {
            console.log("West OUTSIDE the field")
        }

        // CHECK NORTH!!
        // is the next step within the field?
        if (stepNorth >= 0 && stepNorth < 10) {
            // is the next step blocked by a wall?
            if (fieldRoute[stepNorth][currentTileX] <= 0) {
                console.log("North not blocked!")
            } else if (fieldRoute[stepNorth][currentTileX] >= 1) {
                console.log("North Wall Blocked...")
            }
        } else {
            console.log("North OUTSIDE the field")
        }

        // CHECK SOUTH!!
        // is the next step within the field?
        if (stepSouth >= 0 && stepSouth < 10) {
            // is the next step blocked by a wall?
            if (fieldRoute[stepSouth][currentTileX] <= 0) {
                console.log("South not blocked!")
            } else if (fieldRoute[stepSouth][currentTileX] >= 1) {
                console.log("South Wall Blocked...")
            }
        } else {
            console.log("South OUTSIDE the field")
        }
    }

    // direction();

    function direction(params) {
        // randomize direction
        chooseDirection = Math.floor(Math.random() * 4);
        // select direction based on the random number given
        // also set the next step coordinate for selected direction
        if (chooseDirection === 0) {
            chooseDirection = "east"
        } else if (chooseDirection === 1) {
            chooseDirection = "south"
        } else if (chooseDirection === 2) {
            chooseDirection = "west"
        } else if (chooseDirection === 3) {
            chooseDirection = "north"
        }
        console.log(chooseDirection)
    }
    // if fieldTileX === solverNextTile, try another
    if (fieldRoute[1] === solver[0][1]) {
    }
    document.getElementById("tile_x" + solver[solver.length - 1][0] + "_y" + solver[solver.length - 1][1]).classList.add("solvertiles")
}



randomFieldGenerator()
startup()
step()

// fieldRoute[2][5]
// FIELD.classList.add














// SAVE JUST INCASE <3


/*
// NEW FUNCTION IN script.js
function directionCheckOLD() {
    // stepEast = solver[solver.length - 1][0] + 1
    // stepSouth = solver[solver.length - 1][1] + 1
    // stepWest = solver[solver.length - 1][0] - 1
    // stepNorth = solver[solver.length - 1][1] - 1

    stepNorth = stepDirection.north.coordinate[1] = currentRowY - 1
    stepSouth = stepDirection.south.coordinate[1] = currentRowY + 1
    stepWest = stepDirection.west.coordinate[0] = currentTileX - 1
    stepEast = stepDirection.east.coordinate[0] = currentTileX + 1

    // CHECK EAST!!
    // is the next step within the field?
    if (stepEast >= 0 && stepEast < 10) {
        // is the next step blocked by a wall?
        if (fieldRoute[currentRowY][stepEast] <= 0) {
            console.log("East not blocked!")
        } else if (fieldRoute[currentRowY][stepEast] >= 1) {
            console.log("East Wall Blocked...")
        }
    } else {
        console.log("East OUTSIDE the field")
    }

    // CHECK WEST!!
    // is the next step within the field?
    if (stepWest >= 0 && stepWest < 10) {
        // is the next step blocked by a wall?
        if (fieldRoute[currentRowY][stepWest] <= 0) {
            console.log("West not blocked!")
        } else if (fieldRoute[currentRowY][stepWest] >= 1) {
            console.log("West Wall Blocked...")
        }
    } else {
        console.log("West OUTSIDE the field")
    }

    // CHECK NORTH!!
    // is the next step within the field?
    if (stepNorth >= 0 && stepNorth < 10) {
        // is the next step blocked by a wall?
        if (fieldRoute[stepNorth][currentTileX] <= 0) {
            console.log("North not blocked!")
        } else if (fieldRoute[stepNorth][currentTileX] >= 1) {
            console.log("North Wall Blocked...")
        }
    } else {
        console.log("North OUTSIDE the field")
    }

    // CHECK SOUTH!!
    // is the next step within the field?
    if (stepSouth >= 0 && stepSouth < 10) {
        // is the next step blocked by a wall?
        if (fieldRoute[stepSouth][currentTileX] <= 0) {
            console.log("South not blocked!")
        } else if (fieldRoute[stepSouth][currentTileX] >= 1) {
            console.log("South Wall Blocked...")
        }
    } else {
        console.log("South OUTSIDE the field")
    }
}
*/

/*
    // direction();

    function directionOLD(params) {
        // randomize direction
        chooseDirection = Math.floor(Math.random() * 4);
        // select direction based on the random number given
        // also set the next step coordinate for selected direction
        if (chooseDirection === 0) {
            chooseDirection = "east"
        } else if (chooseDirection === 1) {
            chooseDirection = "south"
        } else if (chooseDirection === 2) {
            chooseDirection = "west"
        } else if (chooseDirection === 3) {
            chooseDirection = "north"
        }
        console.log(chooseDirection)
    }
*/

/* 
function step() {
    // solver[i][0] = X coordinate
    // solver[i][1] = Y coordinate

    // save current tile coordinates
    currentTileX = solver[solver.length - 1][0]
    currentRowY = solver[solver.length - 1][1]
    // if Goal is entered => win  && stop autowalk
    if (currentTileX === 9 && currentRowY === 9) {
        clearInterval(walk)
        clearInterval(run)
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
    function directionCheck(directionToCheck, directionYouWantToStep, currRowY, currTileX) {
        // CHECK Direction!!
        // is the next step within the field?
        if (directionYouWantToStep >= 0 && directionYouWantToStep < 10) {
            // is the next step blocked by a wall? i.e. is it 1?
            if (fieldRoute[currRowY][currTileX] <= 0) {
                console.log(directionToCheck + " is OK!")
                stepDirection[directionToCheck].available = true
            } else if (fieldRoute[currRowY][currTileX] === 1) {
                console.log(directionToCheck + " Wall Blocked...")
                stepDirection[directionToCheck].available = false
            } else {
                console.log(directionToCheck + " is START")
                stepDirection[directionToCheck].available = false
            }
        } else {
            console.log(directionToCheck + " OUTSIDE the field")
            stepDirection[directionToCheck].available = false
        }
    }
    // Fill array with available directions
    var directionsAvailable = []
    if (stepDirection.north.available) {
        directionsAvailable.push("north")
    }
    if (stepDirection.south.available) {
        directionsAvailable.push("south")
    }
    if (stepDirection.east.available) {
        directionsAvailable.push("east")
    }
    if (stepDirection.west.available) {
        directionsAvailable.push("west")
    }


    // display available AMOUNT
    console.log("directionsAvailable: " + directionsAvailable.length)
    // display the available OPTIONS in the log
    // directionsAvailable.forEach(function (e) { console.log(e) });

    console.log(directionsAvailable)


    directionSelect(directionsAvailable);

    function directionSelect(arrayParameter) {
        // randomize direction. Only use numbers == number of directions available
        chooseDirection = Math.floor(Math.random() * directionsAvailable.length);
        // select direction based on the random number given
        // also set the next step coordinate for selected direction
        if (chooseDirection === 0) {
            chooseDirection = arrayParameter[0]
            console.log("Direction selected: 0 " + chooseDirection)
        } else if (chooseDirection === 1) {
            chooseDirection = arrayParameter[1]
            console.log("Direction selected: 1 " + chooseDirection)
        } else if (chooseDirection === 2) {
            chooseDirection = arrayParameter[2]
            console.log("Direction selected: 2 " + chooseDirection)
        } else if (chooseDirection === 3) {
            chooseDirection = arrayParameter[3]
            console.log("Direction selected: 3 " + chooseDirection)
        }
    }
    // step to selected direction
    // push coordinate on nextstep to solverArray
    // solver.push(["xCoordinate", "yCoordinate"])

    var xCoor = -1;
    var yCoor = -1;
    var nextCoor = []

        // if east || west (only change the X coordinate) 
    if (chooseDirection === "west" || chooseDirection === "east") {
        xCoor = window["step" + chooseDirection]
        // set next coordinate
        nextCoor = [xCoor, solver[solver.length - 1][1]];
        console.log("xCoordinate: " + xCoor)
        // else if north || south (only change the Y coordinate)
    } else if (chooseDirection === "north" || chooseDirection === "south") {
        yCoor = window["step" + chooseDirection]
        // set next coordinate
        nextCoor = [solver[solver.length - 1][0], yCoor];
        console.log("yCoordinate: " + yCoor)
    } else {
        throw "ChooseDirection is not defined?"
    }

    // remove current tile background color (remove class)
    document.getElementById("tile_x" + solver[solver.length - 1][0] + "_y" + solver[solver.length - 1][1]).classList.remove("solvertiles")
    solver.push(nextCoor);
    // add next tile background color (add class)
    document.getElementById("tile_x" + solver[solver.length - 1][0] + "_y" + solver[solver.length - 1][1]).classList.add("solvertiles")
}
*/


/*
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
    var randomizerSpin = setInterval(function () {
        randomFieldGenerator()
        fieldRoute = randomField;
        // make permanent starting tile == [0][0]
        randomField[0][0] = 2;
        startup()
        setTimeout(function () {
            clearInterval(randomizerSpin)
        }, 1000)
    }, 100);
}
*/

