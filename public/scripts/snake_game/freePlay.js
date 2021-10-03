
const freeplayBack = document.getElementById("freepBack");

freeplayBack.addEventListener("click", () => {
    if (backgroundUpgAnimActive === false) {
        toggleScreens();
        startNewGame("reset");
        missionplayAnim(false);
        quickplayAnim(false);
        toggleQuickplay("reset");
        if (mobile) {
            metas[0].content = "width=550px, minimum-scale=0.25, maximum-scale=0.9, user-scalable=no";
        }
    }
})


var freeplayFieldWidth = $('.child').width();
$('.child').css({ 'height': freeplayFieldWidth + 'px' });

var freeplayMode = false;

var freeplayHardwallActive = false;
var speedSlider = document.getElementById("startingSpeedSlider");
var accelerationSlider = document.getElementById("accelerationSlider");
var hardwallCheckbox = document.getElementById("freeplayWallCheckbox");

var freeplayDifficultySelected = "easy";

var sliderSpeedOutput = 400;
var sliderAcceleration = 0.96;

var speedSliderDifficulty = "easy";
var accelerationSliderDifficulty = "easy";

var freepDifficultySelectionDropdown = document.getElementById("freepDifficultySelectionDropdown");


function freeplayDifficultySelect(chosenDifficulty, forced) {
    var temporaryDifficultyCheck;
    // Check if all options match with either Easy (no hardwall) || Hard (with hardwall)
    if (accelerationSliderDifficulty == "easy" && speedSliderDifficulty == "easy" && !freeplayHardwallActive) {
        temporaryDifficultyCheck = "easy";
    } else if (accelerationSliderDifficulty == "hard" && speedSliderDifficulty == "hard" && freeplayHardwallActive) {
        temporaryDifficultyCheck = "hard"
    }
    // Show the appropriate highscorelist 
    if (temporaryDifficultyCheck == "easy" || temporaryDifficultyCheck == "hard" || forced) {
        if (chosenDifficulty == "easy") {
            speedSlider.value = "2";
            accelerationSlider.value = "1";
            freeplayHardwallActive = false;
            hardwallCheckbox.checked = false;
            freepDifficultySelectionDropdown.style.backgroundColor = "rgb(53, 170, 53)";
        } else if (chosenDifficulty == "hard") {
            speedSlider.value = "3";
            accelerationSlider.value = "3";
            freeplayHardwallActive = true;
            hardwallCheckbox.checked = true;
            freepDifficultySelectionDropdown.style.backgroundColor = "rgb(79, 152, 212)";
        } else {
            throw "You must submit the first parameter: freeplayDifficultySelectTwo('easy', true)"
        }
        // Needed incase the function is 'forced'
        speedSliderDifficulty = chosenDifficulty;
        accelerationSliderDifficulty = chosenDifficulty;
        // hide the "Note: ..." text
        freepDifficultySelectionDropdown.value = chosenDifficulty;
        document.getElementById("freeplayGamemodeAddedText").style.display = "none";
        // Remove "none" from list 
        freepDifficultySelectionDropdown.remove(2);
        // Apply the current difficulty
        freeplayDifficultySelected = chosenDifficulty;
    } else {
        if (freepDifficultySelectionDropdown.length < 3) {
            // Add "none" to list 
            var noneOption = document.createElement("option");
            noneOption.value = "none";
            noneOption.text = "None";
            freepDifficultySelectionDropdown.add(noneOption);
            freepDifficultySelectionDropdown.style.backgroundColor = "rgb(179 179 179)";
            freepDifficultySelectionDropdown.value = "none";
            freeplayDifficultySelected = "custom";
        }
        document.getElementById("freeplayGamemodeAddedText").style.display = "block";
    }
}







function freeplayDifficultySelectOLD(chosenDifficulty, forced) {
    if (accelerationSliderDifficulty == speedSliderDifficulty || forced) {
        if (chosenDifficulty == "easy" || chosenDifficulty == "hard") {
            // hide the "Note: ..." text
            freepDifficultySelectionDropdown.value = chosenDifficulty;
            document.getElementById("freeplayGamemodeAddedText").style.display = "none";
            // Remove "none" from list 
            freepDifficultySelectionDropdown.remove(2);

            freeplayDifficultySelected = chosenDifficulty;
            if (chosenDifficulty == "easy") {
                speedSlider.value = "2";
                accelerationSlider.value = "1";
                freepDifficultySelectionDropdown.style.backgroundColor = "rgb(53, 170, 53)";
            } else {
                speedSlider.value = "3";
                accelerationSlider.value = "3";
                freepDifficultySelectionDropdown.style.backgroundColor = "rgb(79, 152, 212)";
            }
            speedSliderDifficulty = chosenDifficulty;
            accelerationSliderDifficulty = chosenDifficulty;
        }
    } else {
        if (freepDifficultySelectionDropdown.length < 3) {
            // Add "none" to list 
            var noneOption = document.createElement("option");
            noneOption.value = "none";
            noneOption.text = "None";
            freepDifficultySelectionDropdown.add(noneOption);
            freepDifficultySelectionDropdown.style.backgroundColor = "rgb(179 179 179)";
            freepDifficultySelectionDropdown.value = "none";
            freeplayDifficultySelected = "custom";
        }
        document.getElementById("freeplayGamemodeAddedText").style.display = "block";
    }
}


freepDifficultySelectionDropdown.oninput = function () {
    freeplayDifficultySelect(this.value, true);
}


function freeplayHardwallOptionClicked() {
    freeplayHardwallActive = hardwallCheckbox.checked;
    if (!freeplayHardwallActive) {
        freeplayDifficultySelect("easy");
    } else if (freeplayHardwallActive) {
        freeplayDifficultySelect("hard");
    }
}


speedSlider.oninput = function () {
    settingsValue = this.value;
    switch (this.value) {
        case "1":
            sliderSpeedOutput = 550;
            speedSliderDifficulty = "none";
            break;
        case "2":
            sliderSpeedOutput = 400;
            speedSliderDifficulty = "easy";
            settingsValue += " (Easy)";
            break;
        case "3":
            sliderSpeedOutput = 250;
            speedSliderDifficulty = "hard";
            settingsValue += " (Hard)";
            break;
        case "4":
            sliderSpeedOutput = 167;
            speedSliderDifficulty = "none";
            break;
        case "5":
            sliderSpeedOutput = 100;
            speedSliderDifficulty = "none";
            break;
        default:
            throw "Slider Error: Starting speed"
    }
    document.getElementById("customModeValueSpeed").innerText = settingsValue;
    freeplayDifficultySelect(speedSliderDifficulty);
}


accelerationSlider.oninput = function () {
    settingsValue = this.value;
    switch (this.value) {
        case "0":
            sliderAcceleration = 1;
            accelerationSliderDifficulty = "none";
            break;
        case "1":
            sliderAcceleration = 0.96;
            accelerationSliderDifficulty = "easy";
            settingsValue += " (Easy)";
            break;
        case "2":
            sliderAcceleration = 0.94;
            accelerationSliderDifficulty = "none";
            break;
        case "3":
            sliderAcceleration = 0.92;
            accelerationSliderDifficulty = "hard";
            settingsValue += " (Hard)";
            break;
        case "4":
            sliderAcceleration = 0.88;
            accelerationSliderDifficulty = "none";
            break;
        default:
            throw "Slider Error: Starting speed"
    }
    document.getElementById("customModeValueAccel").innerText = settingsValue;
    freeplayDifficultySelect(accelerationSliderDifficulty);
}




var freeplayBodySkin = document.getElementById("freepSkinBodyDropdown");
var freeplayFoodSkin = document.getElementById("freepSkinFoodDropdown");
var freeplayBackgroundSkin = document.getElementById("freepSkinBackgroundDropdown");

var cssRoot = document.querySelector(':root');

freeplayBodySkin.oninput = function () {
    cssRoot.style.setProperty('--freeplayBody', 'url(/images/snake_game/img_' + this.value + '.png)');
}

freeplayFoodSkin.oninput = function () {
    cssRoot.style.setProperty('--freeplayFood', 'url(/images/snake_game/food' + this.value + '.png)');
}

freeplayBackgroundSkin.oninput = function () {
    cssRoot.style.setProperty('--freeplayBackground', 'url(/images/snake_game/background' + this.value + '.png)');
}


hideFeatureAvailableAnimation = (target) => {
    document.getElementById("newSkinAvailable" + target).style.display = "none";
}

freeplayBodySkin.addEventListener("click", () => { hideFeatureAvailableAnimation("Body") })
freeplayFoodSkin.addEventListener("click", () => { hideFeatureAvailableAnimation("Food") })
freeplayBackgroundSkin.addEventListener("click", () => { hideFeatureAvailableAnimation("Background") })



function freeplayStartGame() {
    freeplayMode = true;
    bigBlock.classList.remove(backgroundImg);
    if (freeplayDifficultySelected == "easy") {
        mode = "easy";
        hardwall = false;
        pointsAdder = 4;
        speed = 400;
        speedAdder = 0.96;
    } else if (freeplayDifficultySelected == "hard") {
        mode = "hard";
        hardwall = true;
        pointsAdder = 7;
        speed = 250;
        speedAdder = 0.92;
    } else if (freeplayDifficultySelected == "custom") {
        pointsAdder = 1;
        speed = sliderSpeedOutput;
        speedAdder = sliderAcceleration;
        hardwall = freeplayHardwallActive;
        // Change "Points:" with "Food eaten:"
        document.getElementById("pointsText").innerText = "Food eaten: ";
        // Hide 'Food eaten' block below
        document.getElementById("scoreboard").style.display = "none"
        // show custom menu stats
        document.getElementById("customModeSettingsBlock").style.display = "grid"
        mode = "custom";
    } else {
        throw "Error: No freeplay game mode selected."
    }
    // Use selected skin in freeplay menu
    backgroundImg = freeplayBackgroundSkin.value.toLowerCase();
    foodImg = freeplayFoodSkin.value.toLowerCase();
    skinSelected = freeplayBodySkin.value;
    // Stop NenuWalk after clicking on "HardMenu"
    stopEasy();
    stopHard();
    stopopts();
    //  Add HARDWALL
    if (hardwall) {
        bigBlock.style.border = "6px solid rgb(255, 0, 0)";
        document.getElementById("bigBlock").style.animationName = "flimmer";
        document.getElementById("bigBlockBorder").style.display = "block";
        //  Remove HARDWALL
    } else /* if (mode === "easy") */ {
        document.getElementById("bigBlockBorder").style.display = "none";
        bigBlock.style.border = "6px solid black";
    }
    // set proper gameover screen (Mission or Hard/Easy-quickplay?)
    toggleScorescreenHighscore();
    // HARDSET arrow key to point to EAST
    arrowMoveDirection(1);
    // set background
    bigBlock.classList.add(backgroundImg);
    startVariables();
    // Reset the menu animations
    startNewGame("reset");
    // Set starting location and snaketype
    startScreen();
    // Remove menu and go to playing field
    toggleScreens("gotoPlayingField");
    // Countdown and start
    countdownAndAutomove("newGame");
}


function changeSettings() {
    quitGame();
    toggleScreens("gotoFreeplayField");
}





var dropdownCountFood = 0;
var dropdownCountBody = 0;
var dropdownCountBackground = 0;

var fpAdderBody = 2;
var fpAdderFood = 2;
var fpAdderBackground = 2;





var freeplaySkinUpdater = 1

var bodySelect = document.getElementById("freepSkinBodyDropdown")
var foodSelect = document.getElementById("freepSkinFoodDropdown")
var backgroundSelect = document.getElementById("freepSkinBackgroundDropdown")

freeplaySkinCheck = () => {
    addSkin = (levelCompleted) => {
        var newOption = document.createElement("option");
        var addBody = false;
        var addFood = false;
        var addBackground = false;
        // Bodies
        if (levelCompleted == 10) {
            newOption.text = "Wobble"
            newOption.value = "wobble"
            addBody = true;
        } else if (levelCompleted == 15) {
            newOption.text = "Straight"
            newOption.value = "straight"
            addBody = true;
        } else if (levelCompleted == 20) {
            newOption.text = "Centipede"
            newOption.value = "centipede"
            addBody = true;
        } else if (levelCompleted == 25) {
            newOption.text = "Space suit"
            newOption.value = "spacesuit"
            addBody = true;
        }
        if (addBody) {
            bodySelect.add(newOption);
            document.getElementById("newSkinAvailableBody").style.display = "block"
        }

        newOption = document.createElement("option");
        // Food
        if (levelCompleted == 10) {
            newOption.text = "Cheese"
            newOption.value = "Cheese"
            addFood = true;
        } else if (levelCompleted == 15) {
            newOption.text = "Cookie"
            newOption.value = "Cookie"
            addFood = true;
        } else if (levelCompleted == 20) {
            newOption.text = "Mellon"
            newOption.value = "Mellon"
            addFood = true;
        } else if (levelCompleted == 25) {
            newOption.text = "Oxygen Tank"
            newOption.value = "Oxygentank"
            addFood = true;
        }
        if (addFood) {
            foodSelect.add(newOption);
            document.getElementById("newSkinAvailableFood").style.display = "block"
        }

        newOption = document.createElement("option");
        // Backgrounds
        if (levelCompleted == 10) {
            newOption.text = "Rock"
            newOption.value = "Rock"
            addBackground = true;
        } else if (levelCompleted == 15) {
            newOption.text = "Snow"
            newOption.value = "Snow"
            addBackground = true;
        } else if (levelCompleted == 20) {
            newOption.text = "Desert"
            newOption.value = "Desert"
            addBackground = true;
        } else if (levelCompleted == 25) {
            newOption.text = "Space"
            newOption.value = "Space"
            addBackground = true;
        }
        if (addBackground) {
            backgroundSelect.add(newOption)
            document.getElementById("newSkinAvailableBackground").style.display = "block"
        }
    }

    while (freeplaySkinUpdater < newLevel) {
        addSkin(freeplaySkinUpdater)
        // console.log("Skin updating... " + freeplaySkinUpdater)
        freeplaySkinUpdater++;
    }

}













