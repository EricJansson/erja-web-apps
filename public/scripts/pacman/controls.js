
//      Keyboard functions (Control)         
document.addEventListener("keydown", keyDownTextField, false);
function keyDownTextField(e) {
    var keyCode = e.keyCode;
    herolist = component.prototype.hero
    for (let ii = 0; ii < herolist.length; ii++) {
        if (keyCode == 38 || keyCode == 87) { 
            keyPressDirection(herolist[ii], "up");
        }
        if (keyCode == 40 || keyCode == 83) { 
            keyPressDirection(herolist[ii], "down");
        }
        if (keyCode == 37 || keyCode == 65) { 
            keyPressDirection(herolist[ii], "left");
        }
        if (keyCode == 39 || keyCode == 68) { 
            keyPressDirection(herolist[ii], "right");
        }
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


btnPressDirection = (direction) => {
    let herolist = component.prototype.hero;
    for (let ii = 0; ii < herolist.length; ii++) {
        keyPressDirection(herolist[ii], direction);
    }
}
