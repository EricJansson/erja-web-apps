
var crossScore = 0;
var circleScore = 0;
var gameover = false;
var yourTurn = false;
var showDiffs = false;
var restart = document.getElementById("btnRestart");
var textStyle = document.getElementById("text");
var text = document.getElementById("status");
var circleScoreboard = document.getElementById("circleScore");
var crossScoreboard = document.getElementById("crossScore");
var textOpacity = document.getElementById("status");


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










/*                                   */
/*              BUTTON 1             */
/*                                   */

function boxClick1() {
pickO("1");
    f.o1 = true;
    f.f1 = true;
    yourTurn = false;
    checkFor3in1Row();
    opponentsPlay();
    hoverCheck();
    if (f.o1 && gameover) {
    document.getElementById("box1Owin").style.animation = "circleWinAnimate 2s";
    }

}



/*                                   */
/*              BUTTON 2             */
/*                                   */

function boxClick2() {
pickO("2");
    f.o2 = true;
    f.f2 = true;
    yourTurn = false;
    checkFor3in1Row();
    opponentsPlay();
    hoverCheck();
    if (f.o2 && gameover) {
    document.getElementById("box2Owin").style.animation = "circleWinAnimate 2s";
    }

}



/*                                   */
/*              BUTTON 3             */
/*                                   */

function boxClick3() {
pickO("3");
    f.o3 = true;
    f.f3 = true;
    yourTurn = false;
    checkFor3in1Row();
    opponentsPlay();
    hoverCheck();
    if (f.o3 && gameover) {
    document.getElementById("box3Owin").style.animation = "circleWinAnimate 2s";
    }

}



/*                                   */
/*              BUTTON 4             */
/*                                   */

function boxClick4() {
pickO("4");
    f.o4 = true;
    f.f4 = true;
    yourTurn = false;
    checkFor3in1Row();
    opponentsPlay();
    hoverCheck();
    if (f.o4 && gameover) {
    document.getElementById("box4Owin").style.animation = "circleWinAnimate 2s";
    }

}



/*                                   */
/*              BUTTON 5             */
/*                                   */

function boxClick5() {
pickO("5");
    f.o5 = true;
    f.f5 = true;
    yourTurn = false;
    checkFor3in1Row();
    opponentsPlay();
    hoverCheck();
    if (f.o5 && gameover) {
    document.getElementById("box5Owin").style.animation = "circleWinAnimate 2s";
    }

}



/*                                   */
/*              BUTTON 6             */
/*                                   */

function boxClick6() {
pickO("6");
    f.o6 = true;
    f.f6 = true;
    yourTurn = false;
    checkFor3in1Row();
    opponentsPlay();
    hoverCheck();
    if (f.o6 && gameover) {
    document.getElementById("box6Owin").style.animation = "circleWinAnimate 2s";
    }

}



/*                                   */
/*              BUTTON 7             */
/*                                   */


function boxClick7() { 

pickO("7");
    f.o7 = true;
    f.f7 = true;
    yourTurn = false;
    checkFor3in1Row();
    opponentsPlay();
    hoverCheck();
    if (f.o7 && gameover) {
    document.getElementById("box7Owin").style.animation = "circleWinAnimate 2s";
    }
}



/*                                   */
/*              BUTTON 8             */
/*                                   */


function boxClick8() {
pickO("8");
    f.o8 = true; 
    f.f8 = true;
    yourTurn = false;
    checkFor3in1Row();
    opponentsPlay();
    hoverCheck();
    if (f.o8 && gameover) {
    document.getElementById("box8Owin").style.animation = "circleWinAnimate 2s";
    }

}



/*                                   */
/*              BUTTON 9             */
/*                                   */

function boxClick9() {
pickO("9");
    f.o9 = true;
    f.f9 = true;
    yourTurn = false;
    checkFor3in1Row();
    opponentsPlay();
    hoverCheck();
    if (f.o9 && gameover) {
    document.getElementById("box9Owin").style.animation = "circleWinAnimate 2s";
    }

}






    

/*  /*  /*  /*  /*  /*  /*  /*  /*  /*  /*   */    

/*  /*  /*  /*  /*  /*  /*  /*  /*  /*  /*   */   

/*  /*  /*  /*  /*  /*  /*  /*  /*  /*  /*   */   

/*  /*  /*  /*  /*  /*  /*  /*  /*  /*  /*   */   

/*  /*  /*  /*  /*  /*  /*  /*  /*  /*  /*   */   

/*  /*  /*  /*  /*  /*  /*  /*  /*  /*  /*   */         






/* Opponents turn after you select a box */


function opponentsPlay() {
    if (!gameover) {
    text.innerHTML = "Circle's turn.";
/*    checkGamestarted(); */
    checkFor3in1Row();
    checkFor2XmarksRow();
    checkFor2Circles();
    randomPick();
    checkGameover();

    }
}


/* The technicalities   (if 3 in a row you win/lose)
                        (if 2X in a row opponent picks last box and you lose)
*/


function checkFor2Circles() {
    /*    om 2 fields irad är circle &&   2 av 3 fields är fyllda   */
    if (((f.o1 + f.o2 + f.o3) === 2) && ((f.f1 + f.f2 + f.f3) === 2) && !yourTurn) {
        /*      fyll den rutan som inte är fylld      */
        twoOrow(f.o1, f.o2, f.o3, f.f1, f.f2, f.f3, "1", "2", "3"); 
        /*      om ruta 1 var tom, markera den som fylld    */
        if (!f.o1) { f.x1 = true; }
        if (!f.o2) { f.x2 = true; }
        if (!f.o3) { f.x3 = true; }
        /*  alla 3 fields irad är fyllda med X och O    */
        f.f1 = true;
        f.f2 = true;
        f.f3 = true;
        
    }
    if (((f.o1 + f.o4 + f.o7) === 2) && ((f.f1 + f.f4 + f.f7) === 2) && !yourTurn) {
        twoOrow(f.o1, f.o4, f.o7, f.f1, f.f4, f.f7, "1", "4", "7"); 
        if (!f.o1) { f.x1 = true; }
        if (!f.o4) { f.x4 = true; }
        if (!f.o7) { f.x7 = true; }
        f.f1 = true;
        f.f4 = true;
        f.f7 = true;
    }
    if (((f.o4 + f.o5 + f.o6) === 2) && ((f.f4 + f.f5 + f.f6) === 2) && !yourTurn) {
        twoOrow(f.o4, f.o5, f.o6, f.f4, f.f5, f.f6, "4", "5", "6"); 
        if (!f.o4) { f.x4 = true; }
        if (!f.o5) { f.x5 = true; }
        if (!f.o6) { f.x6 = true; }
        f.f4 = true;
        f.f5 = true;
        f.f6 = true;
    }
    if (((f.o7 + f.o8 + f.o9) === 2) && ((f.f7 + f.f8 + f.f9) === 2) && !yourTurn) {
        twoOrow(f.o7, f.o8, f.o9, f.f7, f.f8, f.f9, "7", "8", "9"); 
        if (!f.o7) { f.x7 = true; }
        if (!f.o8) { f.x8 = true; }
        if (!f.o9) { f.x9 = true; }
        f.f7 = true;
        f.f8 = true;
        f.f9 = true;
    }
    if (((f.o3 + f.o6 + f.o9) === 2) && ((f.f3 + f.f6 + f.f9) === 2) && !yourTurn) {
        twoOrow(f.o3, f.o6, f.o9, f.f3, f.f6, f.f9, "3", "6", "9"); 
        if (!f.o3) { f.x3 = true; }
        if (!f.o6) { f.x6 = true; }
        if (!f.o9) { f.x9 = true; }
        f.f3 = true;
        f.f6 = true;
        f.f9 = true;
    }
    
    if (((f.o2 + f.o5 + f.o8) === 2) && ((f.f2 + f.f5 + f.f8) === 2) && !yourTurn) {
        twoOrow(f.o2, f.o5, f.o8, f.f2, f.f5, f.f8, "2", "5", "8"); 
        if (!f.o2) { f.x2 = true; }
        if (!f.o5) { f.x5 = true; }
        if (!f.o8) { f.x8 = true; }
        f.f2 = true;
        f.f5 = true;
        f.f8 = true;
    } 
    if (((f.o1 + f.o5 + f.o9) === 2) && ((f.f1 + f.f5 + f.f9) === 2) && !yourTurn) {
        twoOrow(f.o1, f.o5, f.o9, f.f1, f.f5, f.f9, "1", "5", "9"); 
        if (!f.o1) { f.x1 = true; }
        if (!f.o5) { f.x5 = true; }
        if (!f.o9) { f.x9 = true; }
        f.f1 = true;
        f.f5 = true;
        f.f9 = true;
    }
    if (((f.o3 + f.o5 + f.o7) === 2) && ((f.f3 + f.f5 + f.f7) === 2) && !yourTurn) {
        twoOrow(f.o7, f.o5, f.o3, f.f7, f.f5, f.f3, "7", "5", "3"); 
        if (!f.o3) { f.x3 = true; }
        if (!f.o5) { f.x5 = true; }
        if (!f.o7) { f.x7 = true; }
        f.f3 = true;
        f.f5 = true;
        f.f7 = true;
    }
}



function checkGameover() {
    if (f.f1 + f.f2 + f.f3 + f.f4 + f.f5 + f.f6 + f.f7 + f.f8 + f.f9 === 9) {
        text.innerHTML = "It's a tie.";
        restart.innerHTML = "Rematch";
    }
}

function checkFor2XmarksRow() {
    twoXrow(f.x1, f.x2, f.x3, f.f1, f.f2, f.f3, "1", "2", "3"); 
    twoXrow(f.x4, f.x5, f.x6, f.f4, f.f5, f.f6, "4", "5", "6");
    twoXrow(f.x7, f.x8, f.x9, f.f7, f.f8, f.f9, "7", "8", "9");
    twoXrow(f.x3, f.x6, f.x9, f.f3, f.f6, f.f9, "3", "6", "9");
    twoXrow(f.x2, f.x5, f.x8, f.f2, f.f5, f.f8, "2", "5", "8");
    twoXrow(f.x1, f.x4, f.x7, f.f1, f.f4, f.f7, "1", "4", "7");
    twoXrow(f.x1, f.x5, f.x9, f.f1, f.f5, f.f9, "1", "5", "9");
    twoXrow(f.x3, f.x5, f.x7, f.f3, f.f5, f.f7, "3", "5", "7");
}

function checkFor3in1Row() {

    threeRowCircle(f.o1, f.o2, f.o3, "1", "2", "3");
    threeRowCircle(f.o4, f.o5, f.o6, "4", "5", "6");
    threeRowCircle(f.o7, f.o8, f.o9, "7", "8", "9");
    threeRowCircle(f.o3, f.o6, f.o9, "3", "6", "9");
    threeRowCircle(f.o2, f.o5, f.o8, "2", "5", "8");
    threeRowCircle(f.o1, f.o4, f.o7, "1", "4", "7");
    threeRowCircle(f.o1, f.o5, f.o9, "1", "5", "9");
    threeRowCircle(f.o3, f.o5, f.o7, "3", "5", "7");

}



function twoXrow(a, b, c, fieldvarA, fieldvarB, fieldvarC, rutaId1, rutaId2, rutaId3) {
    if (((a + b + c) === 2) && ((fieldvarA + fieldvarB + fieldvarC) === 2) && !yourTurn && !gameover) {
        replaceX(rutaId1, "X");
        replaceX(rutaId2, "X");
        replaceX(rutaId3, "X");
        
        if (!fieldvarA) {
            document.getElementById("box" + rutaId1 + "Xwin").style.animation = "crossWinAnimate 1s";
        }
        if (!fieldvarB) {
            document.getElementById("box" + rutaId2 + "Xwin").style.animation = "crossWinAnimate 1s";
        }
        if (!fieldvarC) {
            document.getElementById("box" + rutaId3 + "Xwin").style.animation = "crossWinAnimate 1s";
        }

        pickXwin(rutaId1);
        pickXwin(rutaId2);
        pickXwin(rutaId3);

        youLose();
        return yourTurn = true;
    }
}

function twoOrow(a, b, c, fieldA, fieldB, fieldC, rutaId1, rutaId2, rutaId3) {
    if (((a + b + c) === 2) && ((fieldA + fieldB + fieldC) === 2) && !yourTurn && !gameover) {

        if (!fieldA) {
        pickX(rutaId1); }
        if (!fieldB) {
        pickX(rutaId2); }
        if (!fieldC) {
        pickX(rutaId3); }
        
        return yourTurn = true;
    }
}


function threeRowCircle(a, b, c, ruta1, ruta2, ruta3) {
    if ((a + b + c) === 3) {

        replaceX(ruta1, "O");
        replaceX(ruta2, "O");
        replaceX(ruta3, "O");

        pickOwin(ruta1);
        pickOwin(ruta2);
        pickOwin(ruta3);

        youWin();
        return gameover = true;
    }
}



/* Pick playingfield box */

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
    document.getElementById("box" + a + "X").style.animation = "crossAnimate 1s";
}

function pickXwin(a) {
    show("box" + a + "Xwin");
    ezDis("btn" + a);
}

function pickOwin(a) {
    show("box" + a + "Owin");
    ezDis("btn" + a);
}



/* Hover playing field Btns */

function disHover(fieldX, a) {
    if (fieldX) {
    document.getElementById("btn" + a).classList.remove("hoverOEffect");
    }
}

function enableHover(fieldX, a) {
    if (fieldX) {
    document.getElementById("btn" + a).classList.add("hoverOEffect");
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
    function removeHover(a) {
        document.getElementById("btn" + a).classList.remove("hoverOEffect");
    }
    removeHover("1");
    removeHover("2");
    removeHover("3");
    removeHover("4");
    removeHover("5");
    removeHover("6");
    removeHover("7");
    removeHover("8");
    removeHover("9");
}

function hoverReset() {
    function addHover(a) {
        document.getElementById("btn" + a).classList.add("hoverOEffect");
    }
    addHover("1");
    addHover("2");
    addHover("3");
    addHover("4");
    addHover("5");
    addHover("6");
    addHover("7");
    addHover("8");
    addHover("9");
}





/* Disable click-ability for Btns */

function disRefresh() {
    ezDis("btn1")
    ezDis("btn2")
    ezDis("btn3")
    ezDis("btn4")
    ezDis("btn5")
    ezDis("btn6")
    ezDis("btn7")
    ezDis("btn8")
    ezDis("btn9")
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


/*  Open difficulty tab  */

function openDiffTab() {
    if (showDiffs) {
    document.getElementById("diffHard").style.marginLeft = "-144px";
    document.getElementById("diffUnbeatable").style.marginLeft = "-144px";
    document.getElementById("diffArrow").innerHTML = ">";
    document.getElementById("diffHard").style.animation = "diffTabAnimationOn 1s";
    document.getElementById("diffUnbeatable").style.animation = "diffTabAnimationOn 1s";
    return showDiffs = false;
    }
    if (!showDiffs) {
    document.getElementById("diffHard").style.marginLeft = "0px";
    document.getElementById("diffUnbeatable").style.marginLeft = "0px";
    document.getElementById("diffArrow").innerHTML = "<";
    document.getElementById("diffHard").style.animation = "diffTabAnimationOff 1s";
    document.getElementById("diffUnbeatable").style.animation = "diffTabAnimationOff 1s";
    return showDiffs = true;
    }
}


/* If CURRENT difficulty is selected, close tab */

function diffCorrect() {
    if (showDiffs) {
    document.getElementById("diffHard").style.marginLeft = "-144px";
    document.getElementById("diffUnbeatable").style.marginLeft = "-144px";
    document.getElementById("diffArrow").innerHTML = ">";
    document.getElementById("diffHard").style.animation = "diffTabAnimationOn 0.2s";
    document.getElementById("diffUnbeatable").style.animation = "diffTabAnimationOn 0.2s";
    return showDiffs = false;
    }
}













/* Win lose functions */

function youLose() {
    crossScore++;
    crossScoreboard.innerHTML = crossScore;
    youLoseText();
    restartBtnChange();

    hoverDisable();
    disRefresh();
}


function youWin() {
    circleScore++;
    circleScoreboard.innerHTML = circleScore;
/*    document.getElementById("").style.animation = "youwinzoom 1s";*/
    youWinText();
    restartBtnChange();

    hoverDisable();
    disRefresh();
}

function youWinText() {
    text.innerHTML = "You win!";
    textStyle.style.color = "blue";

    textStyle.style.fontFamily = "Arial, Helvetica, sans-serif";
    textStyle.style.fontWeight = "bold";
    textStyle.style.textShadow = "3px 2px 10px black";
}

function youLoseText() {
    text.innerHTML = "You lose.";
    textStyle.style.color = "red";

    textStyle.style.fontFamily = "Arial, Helvetica, sans-serif";
    textStyle.style.fontWeight = "bold";
    textStyle.style.textShadow = "3px 2px 10px black";
}


function restartBtnChange() {
    restart.innerHTML = "Rematch";
    document.getElementById("btnRestart").style.backgroundColor = "black";
    document.getElementById("btnRestart").style.color = "white";
}

function restartBtnResetColor() {
    restart.innerHTML = "Restart";
    document.getElementById("btnRestart").style.backgroundColor = "white";
    document.getElementById("btnRestart").style.color = "black";
}


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


/*      Rematch and/or Restart      */

function rematch() {
    gameover = false;

    hoverReset();
    resetWinAnimation();
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
    
    ezEnable("btn1");
    ezEnable("btn2");
    ezEnable("btn3");
    ezEnable("btn4");
    ezEnable("btn5");
    ezEnable("btn6");
    ezEnable("btn7");
    ezEnable("btn8");
    ezEnable("btn9");

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
    text.innerHTML = "Circle start.";
    restartBtnResetColor();
    
    textStyle.style.fontFamily = "Times New Roman, Times, serif";
    textStyle.style.fontWeight = "initial";
    textStyle.style.textShadow = "initial";
}

