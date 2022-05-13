
//      Keyboard functions (Control)         
document.addEventListener("keydown", keyDownTextField, false);
function keyDownTextField(e) {
    var keyCode = e.keyCode;
    if (keyCode == 38 || keyCode == 87) { 
        keyPressDirection(pacman, "up");
    }
    if (keyCode == 40 || keyCode == 83) { 
        keyPressDirection(pacman, "down");
    }
    if (keyCode == 37 || keyCode == 65) { 
        keyPressDirection(pacman, "left");
    }
    if (keyCode == 39 || keyCode == 68) { 
        keyPressDirection(pacman, "right");
    }
    // press E
    if (keyCode == 69) { myGameArea.stop(); }
}

keyPressDirection = (unit, direction) => {
    var uDir = unit.direction;
    if ( !(unit.stepX == 10 || unit.stepX == -1) && 
    ((uDir == "left" && direction == "right") || (uDir == "right" && direction == "left") ||
    (uDir == "up" && direction == "down") || (uDir == "down" && direction == "up")) ) {
        unit.hardTurn();
    } else {
        unit.pressedDirection = direction;
    }
}
