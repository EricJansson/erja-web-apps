



var worldsList = ["oasis", "pirate", "ice", "sky", "limbo", "elf", "traveler"]


// 7 worlds

for (let i = 0; i < worldsList.length; i++) {
    document.getElementById("mainWorlds").innerHTML += '<div id="worldMapAndDataBlock-' + worldsList[i] + '"><div id="worldMap-' + worldsList[i] + '"><div id="worldMapGrid-' + worldsList[i] + '"></div></div><div class="worldData" id="worldData-' + worldsList[i] + '"></div></div>'
}








// Worlds


var worldNavbarId = [
    document.getElementById("worldNav-Oasis"),
    document.getElementById("worldNav-Pirate"),
    document.getElementById("worldNav-Ice"),
    document.getElementById("worldNav-Sky"),
    document.getElementById("worldNav-Limbo"),
    document.getElementById("worldNav-Elf"),
    document.getElementById("worldNav-Traveler")
]

var worldNavbarSelected;

function worldNavbar(param) {
    if (param === worldNavbarSelected) {
        return console.log(param + " is already selected");
    }
    for (let i = 0; i < worldNavbarId.length; i++) {
        worldNavbarId[i].classList.remove("nav-bar-active");
    }
    worldNavbarSelected = param;
    worldNavbarId[map.world.namelist.indexOf(param)].classList.add("nav-bar-active");
    console.log(param + " selected.");
    worldMapSelect(param);
}




var worldMapAndDataBlock = [
    document.getElementById("worldMapAndDataBlock-oasis"),
    document.getElementById("worldMapAndDataBlock-pirate"),
    document.getElementById("worldMapAndDataBlock-ice"),
    document.getElementById("worldMapAndDataBlock-sky"),
    document.getElementById("worldMapAndDataBlock-limbo"),
    document.getElementById("worldMapAndDataBlock-elf"),
    document.getElementById("worldMapAndDataBlock-traveler")
]



var worldMap = [
    document.getElementById("worldMap-oasis"),
    document.getElementById("worldMap-pirate"),
    document.getElementById("worldMap-ice"),
    document.getElementById("worldMap-sky"),
    document.getElementById("worldMap-limbo"),
    document.getElementById("worldMap-elf"),
    document.getElementById("worldMap-traveler")
]




var worldMapGrid = [
    document.querySelector("#worldMapGrid-oasis"),
    document.querySelector("#worldMapGrid-pirate"),
    document.querySelector("#worldMapGrid-ice"),
    document.querySelector("#worldMapGrid-sky"),
    document.querySelector("#worldMapGrid-limbo"),
    document.querySelector("#worldMapGrid-elf"),
    document.querySelector("#worldMapGrid-traveler")
]

var worldData = [
    document.querySelector("#worldData-oasis"),
    document.querySelector("#worldData-pirate"),
    document.querySelector("#worldData-ice"),
    document.querySelector("#worldData-sky"),
    document.querySelector("#worldData-limbo"),
    document.querySelector("#worldData-elf"),
    document.querySelector("#worldData-traveler")
]



// var worldsList = ["oasis", "pirate", "ice", "sky", "limbo", "elf", "traveler"]

var worldgridBlockAmount = [64, 64, 144, 144, 9, 36, 25]

var worldgridColumnAmount = [
    "auto auto auto auto auto auto auto auto",
    "auto auto auto auto auto auto auto auto",
    "auto auto auto auto auto auto auto auto auto auto auto auto",
    "auto auto auto auto auto auto auto auto auto auto auto auto",
    "auto auto auto",
    "auto auto auto auto auto auto",
    "auto auto auto auto auto"
]


function worldMapsGeneration() {
    // give the 7 world maps the number of gridTemplateColumns they should contain
    for (let i = 0; i < worldMapGrid.length; i++) {
        worldMapGrid[i].style.gridTemplateColumns = worldgridColumnAmount[i];
        // and also add all the tiles, each of them, should contain
        for (let k = 0; k < worldgridBlockAmount[i]; k++) {
            worldMapGrid[i].innerHTML += "<div id=\"world" + i + "Map" + k + "\" class=\"mapGridBlock\" onclick=\"selectWorldTile(" + k + ")\"></div> "
        }
    }
}

worldMapsGeneration()

function worldMapSelect(worldToSelect) {
    // convert the parameter string, into the correct indexNumber
    var worldIndex = worldsList.indexOf(worldToSelect.toLowerCase())
    for (let i = 0; i < worldMapAndDataBlock.length; i++) {
        worldMapAndDataBlock[i].style.display = "none";
    }
    worldMapAndDataBlock[worldIndex].style.display = "grid";
    console.log("World: " + worldToSelect + ", world index: " + worldIndex)
}


var worldTileSelected = [-1, -1, -1, -1, -1, -1, -1]

// Select a tile on a world map. show monster data and 
function selectWorldTile(tileNumber) {
    var world = worldNavbarSelected.toLowerCase();
    var worldIndex = worldsList.indexOf(world)

    var tileSelected = () => {
        // if tile selected => return
        if (tileNumber === worldTileSelected[worldIndex]) {
            return true
        }
        // remove all highlighted tiles
        for (let i = 0; i < worldgridBlockAmount[worldIndex]; i++) {
            var currentID = document.getElementById("world" + worldIndex + "Map" + i)
            currentID.classList.remove("monsterLocation");
        }
        // add monsterLocation on current world + selected tile
        document.getElementById("world" + worldIndex + "Map" + tileNumber).classList.add("monsterLocation");
        // remember selected tile
        worldTileSelected[worldIndex] = tileNumber;
    }
    // if tile already selected, dont print results again.
    if (tileSelected()) {
        return console.log("Tile: " + tileNumber + " is already selected");
    }

    // Reset selected tile monster data.
    worldData[worldIndex].innerHTML = ""
    // console.log(world + ": tile " + tileNumber) // just to see the world + tile number of clicked tile
    var numberOfMonstersOnSelectedTile = map.world[world].mLocation[tileNumber].length;
    if (numberOfMonstersOnSelectedTile === 0) {
        return worldData[worldIndex].innerHTML = '<div class="worldsNoMonsters">No monsters here.</div>'
    }
    //  use selected tiles, "amount of different monsters" as length
    for (let i = 0; i < map.world[world].mLocation[tileNumber].length; i++) {
        // the first loop, print "Monsters here: "
        if (i === 0) {
            worldData[worldIndex].innerHTML += '<div class="worldDataTopHeader">Monsters here:</div>'
        }

        // use this monsterJSONIndex number inside map.world[world].>mList< to select the correct monster
        var monsterJSONIndex = map.world[world].mLocation[tileNumber][i]
        if (monsterJSONIndex === "w") {
            // if there are only water monsters => dont start with a space (ALSO NOTE the innerHTML OVERWRITE, not add.)
            if (map.world[world].mLocation[tileNumber].length === 1) {
                worldData[worldIndex].innerHTML = '<div class="worldDataTopHeader">Found in water:</div>'
            } else {    // else => make a space from ground monsters
                worldData[worldIndex].innerHTML += '<div class="worldwaterList">Found in water:</div>'
            }
            // forEach monster in mWList => print its name
            map.world[world].mWList.forEach((monster) => {
                var monsterWaterLibraryIndex = lib.allM.indexOf(monster)
                var monsterCapitalization = lib[monster].name   // WATER SELECT below
                worldData[worldIndex].innerHTML += '<div class="monMaterials worldMaterials" onclick="worldsmonsterSelect(' + monsterWaterLibraryIndex + ')">' + monsterCapitalization + '</div>'
            });
        } else {    // if monster is not in water => print its name
            var monsterName = map.world[world].mList[monsterJSONIndex];
            var monsterLibraryIndex = lib.allM.indexOf(monsterName)
            var monsterCapitalization = lib[monsterName].name;  // NORMAL MONSTER below
            worldData[worldIndex].innerHTML += '<div class="monMaterials worldMaterials" onclick="worldsmonsterSelect(' + monsterLibraryIndex + ')">' + monsterCapitalization + '</div>'
        }
    }
    var count = document.querySelectorAll('.worldMaterials').length;
    for (let k = 0; k < count; k++) {
        document.getElementsByClassName("worldMaterials")[k].addEventListener("mouseover", function () {
            document.getElementById("nav-bar-breeding").classList.add("world-monster-hover");
        });
        document.getElementsByClassName("worldMaterials")[k].addEventListener("mouseout", function () {
            document.getElementById("nav-bar-breeding").classList.remove("world-monster-hover");
        });
    }
}




function worldsmonsterSelect(monster) {
    // select monster with the index method
    monsterSelect(monster);
    navBarSelect('breeding');
}




// Used for breeding map
function tilecheck(params) {
    console.log("Tile clicked: " + params)
}


