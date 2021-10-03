
var toggle = false;



function pveBtn() {
    if (!toggle) {
    document.getElementById("testbtn1").style.animation = "showPVEbtns1 1s";
    document.getElementById("testbtn2").style.animation = "showPVEbtns2 1s";
    document.getElementById("testbtn3").style.animation = "showPVEbtns3 1s";    
    document.getElementById("btnMenu2").style.animation = "pushBigbtnMenu 1s";
    
    document.getElementById("testbtn1").style.paddingTop = "50px";
    document.getElementById("testbtn2").style.paddingTop = "95px";
    document.getElementById("testbtn3").style.paddingTop = "140px";
    document.getElementById("btnMenu2").style.marginTop = "120px";    

    return toggle = true;
    }

    if (toggle) {
    document.getElementById("testbtn1").style.animation = "hidePVEbtns1 1s";
    document.getElementById("testbtn2").style.animation = "hidePVEbtns2 1s";
    document.getElementById("testbtn3").style.animation = "hidePVEbtns3 1s";    
    document.getElementById("btnMenu2").style.animation = "pullBigbtnMenu 1s";    

    document.getElementById("testbtn1").style.paddingTop = "8px";
    document.getElementById("testbtn2").style.paddingTop = "8px";
    document.getElementById("testbtn3").style.paddingTop = "8px";
    document.getElementById("btnMenu2").style.marginTop = "0px";    

    return toggle = false;
    }
}






