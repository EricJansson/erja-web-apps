
const NewGameObject = `{"lV":[":)",
-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
"nL":1,"hE":[0,0,0],"hH":[0,0,0],"fE":[0,0,0],"fH":[0,0,0],
"id":"-1d"}`

// var parsedObject = JSON.parse(myJSONObject)
// var parsedObject = JSON.parse(localStorage.getItem('save1'))

// convertLvlValues(JSON.parse(localStorage.getItem('save1')), "check");
const convertLvlValues = (objectToCheck, updateOrCheck) => {
    var foreachSum = 0;
    if (!objectToCheck) {
        return false;
    }
    objectToCheck.lV.forEach((int, index) => {
        if (index > 0) {
            foreachSum += int;
        }
    })
    objectToCheck.hE.forEach((int) => {
        foreachSum += int;
    })
    objectToCheck.fE.forEach((int) => {
        foreachSum += int;
    })
    objectToCheck.hH.forEach((int) => {
        foreachSum += int;
    })
    objectToCheck.fH.forEach((int) => {
        foreachSum += int;
    })
    foreachSum += objectToCheck.nL;
    var hexString = foreachSum.toString(16);
    if (updateOrCheck == "update") {
        objectToCheck.id = hexString;
    } else if (updateOrCheck == "check") {
        if (parseInt(objectToCheck.id, 16) == foreachSum) {
            // console.log("The hexcode matches")
            return true;
        } else {
            // console.log("The hexcode doesnt match")
            return false;
        }
    }
}


function importStorage(hide) {
    if (hide == "hide") {
        document.getElementById("optionsImportBlock").style.display = "none";
        return;
    } else {
        document.getElementById("invalidCode").innerHTML = "<br>"
        document.getElementById("optionsImportBlock").style.display = "block";
    }
}


function exportStorage(hide) {
    if (hide == "hide") {
        document.getElementById("optionsExportBlock").style.display = "none";
        return;
    } else if (convertLvlValues(JSON.parse(localStorage.getItem('save1')), "check")) {
        document.getElementById("optsExport").innerHTML = localStorage.getItem('save1');
        document.getElementById("optionsExportBlock").style.display = "block";
    } else if (localStorage.getItem('save1') == null) {
        document.getElementById("optsExport").innerHTML = "You haven't played the game yet. There is no code to extract.";
        document.getElementById("optionsExportBlock").style.display = "block";
    }
}


const copyExportText = () => {
    var copyText = document.getElementById("optsExport");
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
    document.execCommand("copy");
}


//  Import field

var parsedImportedJSON;

// search inputHandler
var inputHandler = (param) => {
    parsedImportedJSON = JSON.parse(param.target.value);
}

document.getElementById('optsImport').addEventListener('input', inputHandler);

var importData = (confirmed) => {
    if (!convertLvlValues(parsedImportedJSON, "check")) {
        // console.log("The imported text is invalid.");
        document.getElementById("invalidCode").innerText = "Your import code is invalid."
        return;
    } else if (parsedImportedJSON.lV.length != (lastLevel + 1)) {
        // console.log("Level data missing.");
        return;
    } else if (parsedImportedJSON.hE.length != 3 || parsedImportedJSON.hH.length != 3 || 
    parsedImportedJSON.fE.length != 3 || parsedImportedJSON.fH.length != 3) {
        // console.log("Quickplay data missing.");
        return;
    } else {
        // console.log("Data check: completed");
    }

    if (!confirmed) {
        decisionChoice('open', 'import');
        return
    }
    lvlVal = parsedImportedJSON.lV;
    newLevel = parsedImportedJSON.nL;
    pointHighscoreEasy = parsedImportedJSON.hE;
    pointHighscoreHard = parsedImportedJSON.hH;
    foodHighscoreEasy = parsedImportedJSON.fE;
    foodHighscoreHard = parsedImportedJSON.fH;
    
    saveStorage();
    console.log("Game file imported.")
    setTimeout(() => {
        location.reload();
    }, 500)
}


/*

{"lV":[":)",30,33,28,37,30,32,42,46,50,62,48,57,72,87,102,28,98,35,45,51,78,78,90,108,180,1,1,1,1,-1],
"nL":30,"hE":[4,0,0],"hH":[112,21,0],"fE":[1,0,0],"fH":[16,3,0],"id":"6c9"}

{"lV":[":)",30,33,28,37,30,32,42,46,50,62,48,57,72,87,102,28,98,35,45,51,78,78,90,108,180,1,1,1,1,-1],
"nL":30,"hE":[72,4,0],"hH":[112,21,0],"fE":[18,1,0],"fH":[16,3,0],"id":"723"}

*/
