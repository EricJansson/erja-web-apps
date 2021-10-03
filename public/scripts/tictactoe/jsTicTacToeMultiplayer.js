

var disableRestart = true;
var crossScore = 0;
var circleScore = 0;
var gameover = false;
var circleTurn = true;
var restart = document.getElementById("btnRestart");
var textStyle = document.getElementById("text");
var circleScoreboard = document.getElementById("circleScore");
var crossScoreboard = document.getElementById("crossScore");

var f = {
    o1: false,
    o2: false,
    o3: false,
    o4: false,
    o5: false,
    o6: false,
    o7: false,
    o8: false,
    o9: false,
    x1: false,
    x2: false,
    x3: false,
    x4: false,
    x5: false,
    x6: false,
    x7: false,
    x8: false,
    x9: false,
    f1: false,
    f2: false,
    f3: false,
    f4: false,
    f5: false,
    f6: false,
    f7: false,
    f8: false,
    f9: false
}




/*  "Who starts?" functions */

function crossStart() {
    disableRestart = false;
    hoverResetX();
    enabledBtns();
    textStyle.innerHTML = "Cross start";
    return circleTurn = false;
}

function circleStart() {
    disableRestart = false;
    hoverResetO();
    enabledBtns();
    textStyle.innerHTML = "Circle start";
    return circleTurn = true;
}


/*  Disable buttons Pre "Who starts?"    */
    disRefresh();


/*                                   */
/*              BUTTON 1             */
/*                                   */

function boxClick1() {
    if (circleTurn) {
    pickO("1");
    f.o1 = true;
    f.f1 = true;
    checkFor3in1Row();
        if (f.o1 && gameover) {
        document.getElementById("box1Owin").style.animation = "circleWinAnimate 2s";
        }
    return circleTurn = false;
    }
    if (!circleTurn) {
    pickX("1");
    f.x1 = true;
    f.f1 = true;
    checkFor3in1Row();
        if (f.x1 && gameover) {
        document.getElementById("box1Xwin").style.animation = "crossWinAnimate 2s";
        }
    return circleTurn = true;
    }
}



/*                                   */
/*              BUTTON 2             */
/*                                   */

function boxClick2() {
    if (circleTurn) {
    pickO("2");
    f.o2 = true;
    f.f2 = true;
    checkFor3in1Row();
        if (f.o2 && gameover) {
        document.getElementById("box2Owin").style.animation = "circleWinAnimate 2s";
        }
    return circleTurn = false;
    }
    if (!circleTurn) {
    pickX("2");
    f.x2 = true;
    f.f2 = true;
    checkFor3in1Row();
        if (f.x2 && gameover) {
        document.getElementById("box2Xwin").style.animation = "crossWinAnimate 2s";
        }
    return circleTurn = true;
    }
}



/*                                   */
/*              BUTTON 3             */
/*                                   */

function boxClick3() {
    if (circleTurn) {
    pickO("3");
    f.o3 = true;
    f.f3 = true;
    checkFor3in1Row();
        if (f.o3 && gameover) {
        document.getElementById("box3Owin").style.animation = "circleWinAnimate 2s";
        }
    return circleTurn = false;
    }
    if (!circleTurn) {
    pickX("3");
    f.x3 = true;
    f.f3 = true;
    checkFor3in1Row();
        if (f.x3 && gameover) {
        document.getElementById("box3Xwin").style.animation = "crossWinAnimate 2s";
        }
    return circleTurn = true;
    }
}



/*                                   */
/*              BUTTON 4             */
/*                                   */

function boxClick4() {
    if (circleTurn) {
    pickO("4");
    f.o4 = true;
    f.f4 = true;
    checkFor3in1Row();
        if (f.o4 && gameover) {
        document.getElementById("box4Owin").style.animation = "circleWinAnimate 2s";
        }
    return circleTurn = false;
    }
    if (!circleTurn) {
    pickX("4");
    f.x4 = true;
    f.f4 = true;
    checkFor3in1Row();
        if (f.x4 && gameover) {
        document.getElementById("box4Xwin").style.animation = "crossWinAnimate 2s";
        }
    return circleTurn = true;
    }
}



/*                                   */
/*              BUTTON 5             */
/*                                   */

function boxClick5() {
    if (circleTurn) {
    pickO("5");
    f.o5 = true;
    f.f5 = true;
    checkFor3in1Row();
        if (f.o5 && gameover) {
        document.getElementById("box5Owin").style.animation = "circleWinAnimate 2s";
        }
    return circleTurn = false;
    }
    if (!circleTurn) {
    pickX("5");
    f.x5 = true;
    f.f5 = true;
    checkFor3in1Row();
        if (f.x5 && gameover) {
        document.getElementById("box5Xwin").style.animation = "crossWinAnimate 2s";
        }
    return circleTurn = true;
    }
}



/*                                   */
/*              BUTTON 6             */
/*                                   */

function boxClick6() {
    if (circleTurn) {
    pickO("6");
    f.o6 = true;
    f.f6 = true;
    checkFor3in1Row();
        if (f.o6 && gameover) {
        document.getElementById("box6Owin").style.animation = "circleWinAnimate 2s";
        }
    return circleTurn = false;
    }
    if (!circleTurn) {
    pickX("6");
    f.x6 = true;
    f.f6 = true;
    checkFor3in1Row();
        if (f.x6 && gameover) {
        document.getElementById("box6Xwin").style.animation = "crossWinAnimate 2s";
        }
    return circleTurn = true;
    }
}



/*                                   */
/*              BUTTON 7             */
/*                                   */

function boxClick7() {
    if (circleTurn) {
    pickO("7");
    f.o7 = true;
    f.f7 = true;
    checkFor3in1Row();
        if (f.o7 && gameover) {
        document.getElementById("box7Owin").style.animation = "circleWinAnimate 2s";
        }
    return circleTurn = false;
    }
    if (!circleTurn) {
    pickX("7");
    f.x7 = true;
    f.f7 = true;
    checkFor3in1Row();
        if (f.x7 && gameover) {
        document.getElementById("box7Xwin").style.animation = "crossWinAnimate 2s";
        }
    return circleTurn = true;
    }
}



/*                                   */
/*              BUTTON 8             */
/*                                   */

function boxClick8() {
    if (circleTurn) {
    pickO("8");
    f.o8 = true;
    f.f8 = true;
    checkFor3in1Row();
        if (f.o8 && gameover) {
        document.getElementById("box8Owin").style.animation = "circleWinAnimate 2s";
        }
    return circleTurn = false;
    }
    if (!circleTurn) {
    pickX("8");
    f.x8 = true;
    f.f8 = true;
    checkFor3in1Row();
        if (f.x8 && gameover) {
        document.getElementById("box8Xwin").style.animation = "crossWinAnimate 2s";
        }
    return circleTurn = true;
    }
}



/*                                   */
/*              BUTTON 9             */
/*                                   */

function boxClick9() {
    if (circleTurn) {
    pickO("9");
    f.o9 = true;
    f.f9 = true;
    checkFor3in1Row();
        if (f.o9 && gameover) {
        document.getElementById("box9Owin").style.animation = "circleWinAnimate 2s";
        }
    return circleTurn = false;
    }
    if (!circleTurn) {
    pickX("9");
    f.x9 = true;
    f.f9 = true;
    checkFor3in1Row();
        if (f.x9 && gameover) {
        document.getElementById("box9Xwin").style.animation = "crossWinAnimate 2s";
        }
    return circleTurn = true;
    }
}






    

/*  /*  /*  /*  /*  /*  /*  /*  /*  /*  /*   */    

/*  /*  /*  /*  /*  /*  /*  /*  /*  /*  /*   */   

/*  /*  /*  /*  /*  /*  /*  /*  /*  /*  /*   */   

/*  /*  /*  /*  /*  /*  /*  /*  /*  /*  /*   */   

/*  /*  /*  /*  /*  /*  /*  /*  /*  /*  /*   */   

/*  /*  /*  /*  /*  /*  /*  /*  /*  /*  /*   */         






/*           Switch turn settings               */
/* including switch turn, switch hover settings */

function switchTurn() {
    if (!circleTurn) {
        textStyle.innerHTML = "Circle's turn";
    }
    if (circleTurn) {
        textStyle.innerHTML = "Cross' turn";
    }
}

function turnDecide() {
    if (!circleTurn + (f.f1 + f.f2 + f.f3 + f.f4 + f.f5 + f.f6 + f.f7 + f.f8 + f.f9 !== 0)) {
        return textStyle.innerHTML = "Cross start";
    }
    if (circleTurn + (f.f1 + f.f2 + f.f3 + f.f4 + f.f5 + f.f6 + f.f7 + f.f8 + f.f9 !== 0)) {
        return textStyle.innerHTML = "Circle start";
    }
}

function switchHoverMode() {
    if (!circleTurn) {
        disHoverX("1"); enableHoverO("1"); 
        disHoverX("2"); enableHoverO("2"); 
        disHoverX("3"); enableHoverO("3"); 
        disHoverX("4"); enableHoverO("4"); 
        disHoverX("5"); enableHoverO("5"); 
        disHoverX("6"); enableHoverO("6"); 
        disHoverX("7"); enableHoverO("7"); 
        disHoverX("8"); enableHoverO("8"); 
        disHoverX("9"); enableHoverO("9"); 
    }
    
    if (circleTurn) {
        disHoverO("1"); enableHoverX("1");
        disHoverO("2"); enableHoverX("2");
        disHoverO("3"); enableHoverX("3");
        disHoverO("4"); enableHoverX("4");
        disHoverO("5"); enableHoverX("5");
        disHoverO("6"); enableHoverX("6");
        disHoverO("7"); enableHoverX("7");
        disHoverO("8"); enableHoverX("8");
        disHoverO("9"); enableHoverX("9");
    }
}


function checkGameover() {
    if (f.f1 + f.f2 + f.f3 + f.f4 + f.f5 + f.f6 + f.f7 + f.f8 + f.f9 === 9) {
        textStyle.innerHTML = "It's a tie.";
        restart.innerHTML = "Rematch";
    }
}


function checkFor3in1Row() {
    switchTurn();
    switchHoverMode();
    hoverCheck();
    checkGameover();
    threeRowCircle(f.o1, f.o2, f.o3, "1", "2", "3");
    threeRowCircle(f.o4, f.o5, f.o6, "4", "5", "6");
    threeRowCircle(f.o7, f.o8, f.o9, "7", "8", "9");
    threeRowCircle(f.o3, f.o6, f.o9, "3", "6", "9");
    threeRowCircle(f.o2, f.o5, f.o8, "2", "5", "8");
    threeRowCircle(f.o1, f.o4, f.o7, "1", "4", "7");
    threeRowCircle(f.o1, f.o5, f.o9, "1", "5", "9");
    threeRowCircle(f.o3, f.o5, f.o7, "3", "5", "7");

    threeRowXmark(f.x1, f.x2, f.x3, "1", "2", "3"); 
    threeRowXmark(f.x4, f.x5, f.x6, "4", "5", "6");
    threeRowXmark(f.x7, f.x8, f.x9, "7", "8", "9");
    threeRowXmark(f.x3, f.x6, f.x9, "3", "6", "9");
    threeRowXmark(f.x2, f.x5, f.x8, "2", "5", "8");
    threeRowXmark(f.x1, f.x4, f.x7, "1", "4", "7");
    threeRowXmark(f.x1, f.x5, f.x9, "1", "5", "9");
    threeRowXmark(f.x3, f.x5, f.x7, "3", "5", "7");
}


function threeRowXmark(a, b, c, ruta1, ruta2, ruta3) {
    if (((a + b + c) === 3) && !gameover) {

        replaceX(ruta1, "X");
        replaceX(ruta2, "X");
        replaceX(ruta3, "X");

        pickXwin(ruta1);
        pickXwin(ruta2);
        pickXwin(ruta3);

        crossWin();
        return gameover = true;
    }
}


function threeRowCircle(a, b, c, ruta1, ruta2, ruta3) {
    if (((a + b + c) === 3) && !gameover) {

        replaceX(ruta1, "O");
        replaceX(ruta2, "O");
        replaceX(ruta3, "O");

        pickOwin(ruta1);
        pickOwin(ruta2);
        pickOwin(ruta3);

        circleWin();
        return gameover = true;
    }
}

/*          Pick boxes / Hide boxes        */

function show(boxId) {
    document.getElementById(boxId).style.display = "initial";
    }

function hide(boxId) {
    document.getElementById(boxId).style.display = "none";
    }

function replaceX(boxNumber, circleOrXmark) { 
    hide("box" + boxNumber + circleOrXmark);
}

function pickO(a) {
    show("box" + a + "O");
    ezDis("btn" + a);
    document.getElementById("box" + a + "O").style.animation = "circleAnimate 1s";
}

function pickX(a) {
    show("box" + a + "X");
    ezDis("btn" + a);
    document.getElementById("box" + a + "X").style.animation = "crossAnimatePvP 1s";
}

function pickXwin(a) {
    show("box" + a + "Xwin");
    ezDis("btn" + a);
}

function pickOwin(a) {
    show("box" + a + "Owin");
    ezDis("btn" + a);
}



/*      Enable/disable "button hover" functions  */


function disHoverO(a) {
    document.getElementById("btn" + a).classList.remove("hoverOEffect");
}

function disHoverX(a) {
    document.getElementById("btn" + a).classList.remove("hoverXEffect");
}

function enableHoverO(a) {
    document.getElementById("btn" + a).classList.add("hoverOEffect");
}

function enableHoverX(a) {
    document.getElementById("btn" + a).classList.add("hoverXEffect");
}

function hoverResetX() {
    function addHoverX(a) {
        document.getElementById("btn" + a).classList.add("hoverXEffect");
    }
    addHoverX("1");
    addHoverX("2");
    addHoverX("3");
    addHoverX("4");
    addHoverX("5");
    addHoverX("6");
    addHoverX("7");
    addHoverX("8");
    addHoverX("9");
}

function hoverResetO() {
    function addHoverO(a) {
        document.getElementById("btn" + a).classList.add("hoverOEffect");
    }
    addHoverO("1");
    addHoverO("2");
    addHoverO("3");
    addHoverO("4");
    addHoverO("5");
    addHoverO("6");
    addHoverO("7");
    addHoverO("8");
    addHoverO("9");
}

function disHover(fieldX, a) {
    if (fieldX) {
    document.getElementById("btn" + a).classList.remove("hoverOEffect");
    document.getElementById("btn" + a).classList.remove("hoverXEffect");
    }
}

function hoverCheck() {
    disHover(f.f1, "1");
    disHover(f.f2, "2");
    disHover(f.f3, "3");
    disHover(f.f4, "4");
    disHover(f.f5, "5");
    disHover(f.f6, "6");
    disHover(f.f7, "7");
    disHover(f.f8, "8");
    disHover(f.f9, "9");
}

function hoverDisable() {
    function removeHover(a, y) {
        document.getElementById("btn" + a).classList.remove("hover" + y + "Effect");
    }
    removeHover("1", "X");
    removeHover("2", "X");
    removeHover("3", "X");
    removeHover("4", "X");
    removeHover("5", "X");
    removeHover("6", "X");
    removeHover("7", "X");
    removeHover("8", "X");
    removeHover("9", "X");
    removeHover("1", "O");
    removeHover("2", "O");
    removeHover("3", "O");
    removeHover("4", "O");
    removeHover("5", "O");
    removeHover("6", "O");
    removeHover("7", "O");
    removeHover("8", "O");
    removeHover("9", "O");
}


















/*                   STILL UNUSED                   */


/*      Fading buttons animation       */

function resetAnim(a) {
    document.getElementById("box" + a + "Xwin").style.animation = "none";
    document.getElementById("box" + a + "Owin").style.animation = "none";
}

function resetWinAnimation() {
    resetAnim("1");
    resetAnim("2");
    resetAnim("3");
    resetAnim("4");
    resetAnim("5");
    resetAnim("6");
    resetAnim("7");
    resetAnim("8");
    resetAnim("9");
}

/*                   STILL UNUSED                   */













/*      Disable / Enable button clickability         */

function disRefresh() {
    ezDis("btn1");
    ezDis("btn2");
    ezDis("btn3");
    ezDis("btn4");
    ezDis("btn5");
    ezDis("btn6");
    ezDis("btn7");
    ezDis("btn8");
    ezDis("btn9");
}

function dis(id, boxCheckX, boxCheckO) {
    if (boxCheckX || boxCheckO) {
        document.getElementById(id).disabled = true;
        }
    }

function ezEnable(id) {
    document.getElementById(id).disabled = false;  
}

function ezDis(id) {
    document.getElementById(id).disabled = true;    
}

function enabledBtns() {
    ezEnable("btn1");
    ezEnable("btn2");
    ezEnable("btn3");
    ezEnable("btn4");
    ezEnable("btn5");
    ezEnable("btn6");
    ezEnable("btn7");
    ezEnable("btn8");
    ezEnable("btn9");
}


function crossWin() {
    crossScore++;
    crossScoreboard.innerHTML = crossScore;
    textStyle.innerHTML = "Cross win!";
    textStyle.style.color = "red";
    textStyle.style.fontFamily = "Arial, Helvetica, sans-serif";
    textStyle.style.fontWeight = "bolder";
    textStyle.style.textShadow = "3px 2px 10px black";
    restart.innerHTML = "Rematch";
    hoverDisable();
    disRefresh();
}

function circleWin() {
    circleScore++;
    circleScoreboard.innerHTML = circleScore;
    textStyle.innerHTML = "Circle win!";
    textStyle.style.color = "blue";
    textStyle.style.fontFamily = "Arial, Helvetica, sans-serif";
    textStyle.style.fontWeight = "bold";
    textStyle.style.textShadow = "3px 2px 10px black";
    restart.innerHTML = "Rematch";
    hoverDisable();
    disRefresh();
}






/*      Rematch     */


function rematch() {
    if (!disableRestart) {
        if (circleTurn) {
            hoverResetO();
        }
        if (!circleTurn) {
            hoverResetX();
        }
    resetWinAnimation();
    gameover = false;

    f.o1 = false;
    f.o2 = false;
    f.o3 = false;
    f.o4 = false;
    f.o5 = false;
    f.o6 = false;
    f.o7 = false;
    f.o8 = false;
    f.o9 = false;
    f.x1 = false;
    f.x2 = false;
    f.x3 = false;
    f.x4 = false;
    f.x5 = false;
    f.x6 = false;
    f.x7 = false;
    f.x8 = false;
    f.x9 = false;
    f.f1 = false;
    f.f2 = false;
    f.f3 = false;
    f.f4 = false;
    f.f5 = false;
    f.f6 = false;
    f.f7 = false;
    f.f8 = false;
    f.f9 = false;

    /* buttons enabled */
    enabledBtns();

    /* hide all */

    replaceX("1", "X");
    replaceX("2", "X");
    replaceX("3", "X");
    replaceX("4", "X");
    replaceX("5", "X");
    replaceX("6", "X");
    replaceX("7", "X");
    replaceX("8", "X");
    replaceX("9", "X");
    replaceX("1", "O");
    replaceX("2", "O");
    replaceX("3", "O");
    replaceX("4", "O");
    replaceX("5", "O");
    replaceX("6", "O");
    replaceX("7", "O");
    replaceX("8", "O");
    replaceX("9", "O");

    replaceX("1", "Xwin");
    replaceX("2", "Xwin");
    replaceX("3", "Xwin");
    replaceX("4", "Xwin");
    replaceX("5", "Xwin");
    replaceX("6", "Xwin");
    replaceX("7", "Xwin");
    replaceX("8", "Xwin");
    replaceX("9", "Xwin");
    replaceX("1", "Owin");
    replaceX("2", "Owin");
    replaceX("3", "Owin");
    replaceX("4", "Owin");
    replaceX("5", "Owin");
    replaceX("6", "Owin");
    replaceX("7", "Owin");
    replaceX("8", "Owin");
    replaceX("9", "Owin");


    textStyle.style.color = "black";
    restart.innerHTML = "Restart";
    
    textStyle.style.fontFamily = "Times New Roman, Times, serif";
    textStyle.style.fontWeight = "initial";
    textStyle.style.textShadow = "initial";
    turnDecide();
    }
}

