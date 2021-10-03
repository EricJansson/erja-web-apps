
currentLevel = 1;

// START
$(document).ready(() => {
    $(".allStartSquares").on({
        mouseenter: function () {
            $(this).attr("fill-opacity", "1");
            startLevel(currentLevel);
        },
        mouseleave: function () {
            $(this).attr("fill-opacity", "0.6")
        }
    })
})

// PLAY
$(document).ready(() => {
    $(".gamePaths").on({
        // mouseenter: function(){
        //     $(this).attr("fill","white");
        // },  
        mouseleave: function () {
            $(this).attr("fill", "gray")
            gameOver();
        }
    })
})


// FINISH
$(document).ready(() => {
    $(".allFinishSquares").on({
        mouseenter: function () {
            $(this).attr("fill-opacity", "1");
            nextLevel();
        },
        mouseleave: function () {
            $(this).attr("fill-opacity", "0.6")
        }
    })
})


startLevel = (levelNum) => {
    console.log("Level " + levelNum + " started.")
    $("#startSquare" + levelNum).hide();
    $("#path" + levelNum).show();
    $("#finishSquare" + levelNum).show();
    showObstacles(levelNum);
}


gameOver = () => {
    console.log("GAME OVER.")
    $("#startSquare" + currentLevel).show();
    $("#path" + currentLevel).hide();
    $("#finishSquare" + currentLevel).hide();
    hideObstacles(currentLevel);
}


nextLevel = () => {
    console.log("Level complete!")
    $("#game_status").text("Level " + currentLevel)
    $("#startSquare" + currentLevel).hide();
    $("#path" + currentLevel).hide();
    // hide obstacles from last level before incrementing the counter
    hideObstacles(currentLevel);
    currentLevel++;
    startLevel(currentLevel);
}





showObstacles = (pathNum) => {
    if (pathNum == 3) {
        toggleObstacleAutoMovePath3(true)
        $('#path3obs1').show();
        $('#path3obs2').show();
        $('#path3obs3').show();
    }
}

hideObstacles = (pathNum) => {
    if (pathNum == 3) {
        toggleObstacleAutoMovePath3(false)
        $('#path3obs1').hide();
        $('#path3obs2').hide();
        $('#path3obs3').hide();
    }
}






toggleObstacleAutoMovePath3 = (on_off) => {
    path3obs1newYcoordinate = 270;
    path3obs2newYcoordinate = 170;
    path3obs3newYcoordinate = 370;
    p3adder1 = 2;
    p3adder2 = 2;
    p3adder3 = 2;
    if (on_off) {
        autoStart = setInterval(() => {
            moveObstacles(1);
            moveObstacles(2);
            moveObstacles(3);
        }, 10);
    } else if (!on_off) {
        // reset their locations
        moveObstacles(1);
        moveObstacles(2);
        moveObstacles(3);
        clearInterval(autoStart)
    }
    moveObstacles = (obstacleIDnum) => {
        var obstacle = window["path3obs" + obstacleIDnum + "newYcoordinate"]
        var curAdder = window["p3adder" + obstacleIDnum]
        window["path3obs" + obstacleIDnum + "newYcoordinate"] += curAdder;
        if (obstacle < 170 && curAdder < 0) {
            window["p3adder" + obstacleIDnum] *= -1;
        } else if (obstacle > 370 && curAdder > 0) {
            window["p3adder" + obstacleIDnum] *= -1;
        }
        $('#path3obs' + obstacleIDnum).attr("y", obstacle);
    }
}












// DEV box
$(document).ready(() => {
    $("#finishSquareDev").on({
        mouseleave: () => {
            gameOver();
        }
    })
})






/*

const path1 = document.querySelector("#path1");

var newUpperYcoordinate = 0;
var newLowerYcoordinate = 0;
var adder = 3;

distortTrack = () => {
    if (newLowerYcoordinate < -95 && adder < 0) {
        adder = 2;
    } else if (newUpperYcoordinate > 95 && adder > 0) {
        adder = -2;
    }
    newLowerYcoordinate += adder;
    newUpperYcoordinate += adder;
    coordinates = $("#path1").attr("d");                                        // (   V  ) (   V  )
 // $("#path1").attr("d","M50 350 L50 400 L400 400 L400 250 L100 250 L100 150 L400 150 L400 100 L50 100 L50 300 L350 300 L350 350 Z")
    $("#path1").attr("d","M50 350 L50 400 L400 400 L400 250 L100 250 L100 150 L350 " + (150 + newUpperYcoordinate) + " L400 " + (150 + newUpperYcoordinate) + " L400 " + (100 + newLowerYcoordinate) + " L350 " + (100 + newLowerYcoordinate) + " L100 100 L50 100 L50 300 L350 300 L350 350 Z")
}

autoDistort = (on_off) => {
    if (on_off) {
        autoStart = setInterval(distortTrack, 10);
    } else if (!on_off) {
        clearInterval(autoStart)
    }
}

*/