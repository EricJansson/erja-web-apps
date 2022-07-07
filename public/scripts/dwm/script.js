

var currentMonsterSelected = "none";

var allMapTiles = [];
var allSubTiles = [];
var allWorldTiles = [];


var htmlToChange = [
    document.getElementById("monsterName"),
    document.getElementById("monsterSkills"),
    document.getElementById("monster-family-iconText"),
    document.getElementById("monster-family-icon"),
    document.getElementById("foundLocation"),
    document.getElementById("foundLocationDetails"),
    document.getElementById("doesLocationExist"),
    document.getElementById("monster-req-list"),
    document.getElementById("monster-req-box"),
    document.getElementById("foundDetails")
]

var monBase = [
    document.getElementById("monster-base-1"),
    document.getElementById("monster-base-2"),
    document.getElementById("monster-base-3"),
    document.getElementById("monster-base-4"),
    document.getElementById("monster-base-5"),
    document.getElementById("monster-base-6")
]

var monMate = [
    document.getElementById("monster-mate-1"),
    document.getElementById("monster-mate-2"),
    document.getElementById("monster-mate-3"),
    document.getElementById("monster-mate-4"),
    document.getElementById("monster-mate-5"),
    document.getElementById("monster-mate-6")
]

var mapToggled = [
    document.getElementById("mapToggleBtn"),
    document.getElementById("sidebarFoundLocation"),
    document.getElementById("mainMonsterBreeding"),
    document.getElementById("mainFamilies"),
    document.getElementById("mainSpells"),
    document.getElementById("mainWorlds")
]

var navBarId = [
    document.getElementById("nav-bar-search"),
    document.getElementById("nav-bar-breeding"),
    document.getElementById("nav-bar-families"),
    document.getElementById("nav-bar-spells"),
    document.getElementById("nav-bar-worlds")
]

function monsterSelect(par) {
    var param = typeof par;
    if (param === "number") {
        param = lib.allM[par];
    } else if (param === "string") {
        param = par;
    } else {
        console.log("par is not a STRING OR NUMBER");
    }
    if (lib[param] === undefined) {
        throw "       " + param + " NOT REGISTERED :)";
    } else if (lib[param].mate === undefined) {
        throw "       " + param + " MATE NOT REGISTERED!!!";
    }

    //  Set Name
    htmlToChange[0].innerHTML = lib[param].name;
    //  Set Skills
    htmlToChange[1].innerHTML = "<div onclick=\"breedSkill('0')\" class=\"breedingSkills\">" + lib[param].skills[0] + "</div>" +
        ", " + "<div onclick=\"breedSkill('1')\" class=\"breedingSkills\">" + lib[param].skills[1] + "</div>" +
        ", " + "<div onclick=\"breedSkill('2')\" class=\"breedingSkills\">" + lib[param].skills[2] + "</div>";
    //  Set Family Name
    htmlToChange[2].innerHTML = lib[param].fam + " Family";
    //  Select Family Icon
    var monsterFMSelect = htmlToChange[3].style;
    switch (lib[param].fam) {
        case "Slime":
            monsterFMSelect.backgroundPosition = "0px 0px";
            break;
        case "Dragon":
            monsterFMSelect.backgroundPosition = "-24px 0px";
            break;
        case "Beast":
            monsterFMSelect.backgroundPosition = "-48px 0px";
            break;
        case "Bird":
            monsterFMSelect.backgroundPosition = "-72px 0px";
            break;
        case "Plant":
            monsterFMSelect.backgroundPosition = "1px -26px";
            break;
        case "Bug":
            monsterFMSelect.backgroundPosition = "-22px -26px";
            break;
        case "Devil":
            monsterFMSelect.backgroundPosition = "-48px -26px";
            break;
        case "Zombie":
            monsterFMSelect.backgroundPosition = "-70px -24px";
            break;
        case "Material":
            monsterFMSelect.backgroundPosition = "2px -52px";
            break;
        case "Water":
            monsterFMSelect.backgroundPosition = "-22px -52px";
            break;
        case "Boss":
            monsterFMSelect.backgroundPosition = "-46px -52px";
            break;

        default:
            throw "FAMILY NOT FOUND";
    }

    //  Hide Map if visible
    if (mapToggle === true) {
        toggleMap();
    }

    //          Found location

    htmlToChange[9].innerHTML = lib[param].found[1];
    htmlToChange[5].innerHTML = lib[param].found[1];
    //  if no location exist, hide "Details" and "SHOW MAP"
    if (lib[param].found[0] === "none") {
        htmlToChange[4].innerHTML = "Cannot be found.";
        htmlToChange[6].style.display = "none";
    } else {
        //  else, show "Details" and "SHOW MAP"
        mapGrid(lib[param].found[0], param);
        htmlToChange[6].style.display = "inline-block";
        htmlToChange[4].innerHTML = lib[param].found[0] + " Key World";
    }

    //          Breeding recipe
    //  Show all recipe boxes
    for (let i = 0; i < monMate.length; i++) {
        monBase[i].style.display = "block";
        monMate[i].style.display = "block";
    }
    //  Hide all EMPTY recipe boxes
    for (let i = lib[param].base.length; i < monMate.length; i++) {
        monBase[i].style.display = "none";
        monMate[i].style.display = "none";
    }

    //  Set text to monster's base + mate recipe
    for (let y = 0; y < lib[param].mate.length; y++) {

        monBase[y].textContent = "";
        monMate[y].textContent = "";
        var ml = "";

        for (let x = 0; x < lib[param].mate[y].length; x++) {
            ml = lib[param].mate[y][x].toLowerCase();
            if (lib.allM.includes(ml)) {
                monMate[y].innerHTML += "<div class=\"monMaterials\" onclick=\"monsterMate(" + x + ", " + y + ")\"> " + lib[param].mate[y][x] + " </div>";
            } else {
                monMate[y].innerHTML += "<div class=\"monMaterials-notonlist\" onclick=\"monsterMate(" + x + ", " + y + ")\"> " + lib[param].mate[y][x] + " </div>";
            }
        }

        for (let x = 0; x < lib[param].base[y].length; x++) {
            ml = lib[param].base[y][x].toLowerCase();
            if (lib.allM.includes(ml)) {
                monBase[y].innerHTML += "<div class=\"monMaterials\" onclick=\"monsterBase(" + x + ", " + y + ")\"> " + lib[param].base[y][x] + " </div>";
            } else {
                monBase[y].innerHTML += "<div class=\"monMaterials-notonlist\" onclick=\"monsterBase(" + x + ", " + y + ")\"> " + lib[param].base[y][x] + " </div>";
            }
        }
    }

    //  Set the "Required to make" text
    if (lib[param].reqFor[0] === "none") {
        htmlToChange[8].style.display = "none";
    } else {
        htmlToChange[7].innerHTML = "";
        for (let x = 0; x < lib[param].reqFor.length; x++) {
            htmlToChange[7].innerHTML += "<div class=\"monMaterials\" onclick=\"monsterReqFor(" + x + ")\"> " + lib[param].reqFor[x] + " </div>";
        }
        htmlToChange[8].style.display = "grid";
    }
    currentMonsterSelected = lib[param].name.toLowerCase();

    /*
    // Set URLquery to current monster active (and devmode=active)
    if (history.pushState) {
        var newurl = "";
        if (devModeURLQuery === "active") {
            newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?monster=' + currentMonsterSelected + "&devmode=active";
            console.log("no devmode active");
        } else {
            newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?monster=' + currentMonsterSelected;
            console.log("DEVMODE ACTIVE!");
        }
        window.history.pushState({ path: newurl }, '', newurl);
    }
    */
}




function monsterMate(paramX, paramY) {
    console.log("X" + paramX + " + Y" + paramY + " \"Mate\"")
    //                                              mate
    var lowerCase = lib[currentMonsterSelected].mate[paramY][paramX].toLowerCase();
    monsterSelect(lowerCase);
}

function monsterBase(paramX, paramY) {
    console.log("X" + paramX + " + Y" + paramY + " \"Base\"")
    //                                              base
    var lowerCase = lib[currentMonsterSelected].base[paramY][paramX].toLowerCase();
    monsterSelect(lowerCase);
}

function monsterReqFor(paramX) {
    //                                              reqFor
    var lowerCase = lib[currentMonsterSelected].reqFor[paramX].toLowerCase();
    monsterSelect(lowerCase);
}


var breedMapNavs = {
    worldList: ["world0 doesnt exist", "w1", "w2", "w3", "w4", "w5", "w6", "w7"],
    w1: [
        document.getElementById("bmNavSub-W1-1"),
        document.getElementById("bmNavSub-W1-2")
    ],
    w2: [
        document.getElementById("bmNavSub-W2-1"),
        document.getElementById("bmNavSub-W2-2"),
        document.getElementById("bmNavSub-W2-3"),
        document.getElementById("bmNavSub-W2-4")
    ],
    w3: [
        document.getElementById("bmNavSub-W3-1"),
        document.getElementById("bmNavSub-W3-2"),
        document.getElementById("bmNavSub-W3-3"),
        document.getElementById("bmNavSub-W3-4"),
        document.getElementById("bmNavSub-W3-5")
    ],
    w4: [
        document.getElementById("bmNavSub-W4-1"),
        document.getElementById("bmNavSub-W4-2"),
        document.getElementById("bmNavSub-W4-3"),
        document.getElementById("bmNavSub-W4-4"),
        document.getElementById("bmNavSub-W4-5"),
        document.getElementById("bmNavSub-W4-6")
    ],
    w5: [
        document.getElementById("bmNavSub-W5-1"),
        document.getElementById("bmNavSub-W5-2")
    ],
    w6: [
        document.getElementById("bmNavSub-W6-1"),
        document.getElementById("bmNavSub-W6-2")
    ],
    w7: [
        document.getElementById("bmNavSub-W7-1"),
        document.getElementById("bmNavSub-W7-2")
    ]
}


var subBreedmap = [
    document.getElementById("sub-mapSelected"),
    document.getElementById("subMapGrid")
]


function breedSkill(param) {

    n = lib[currentMonsterSelected].skills[param];

    console.log(n + " clicked.");
}















var allMapList = [
    "map-easternmountain",
    "map-spookyforest",
    "map-hoodsquidcave",
    "map-volcano"
]


function breedMapNavSelect(world, location) {
    var worldSelected = breedMapNavs.worldList[world];
    subBreedmap[1].textContent = "";

    for (let i = 0; i < allMapList.length; i++) {
        subBreedmap[0].classList.remove(allMapList[i]);
    }
    for (let i = 0; i < mapNavText.length; i++) {
        mapNavText[i].style.display = "none";
    }
    mapNavText[world - 1].style.display = "block";
    for (let i = 0; i < breedMapNavs[worldSelected].length; i++) {
        breedMapNavs[worldSelected][i].classList.add("breedMapSubs"),
            breedMapNavs[worldSelected][i].classList.remove("bms-selected")
    }
    breedMapNavs[worldSelected][location].classList.add("bms-selected");
    breedMapNavs[worldSelected][location].classList.remove("breedMapSubs");
    if (location === 0) {
        mapSelect.style.display = "block";
        subBreedmap[0].style.display = "none";
    } else {
        mapSelect.style.display = "none";
        subBreedmap[0].style.display = "block";
    }
    var locationgridBlockAmount = 0;
    var classToAdd = "";
    var mapWidth = "";
    var mapHeight = "";
    var templateColumns = "";


    if (world === 1) {
        // oasis

    } else if (world === 2) {
        // pirate
        if (location === 1) {
            locationgridBlockAmount = 16;
            classToAdd = "map-hoodsquidcave";
            templateColumns = "auto auto auto auto";
            mapWidth = "640px";
            mapHeight = "576px";
        } else if (location === 2) {

        } else if (location === 3) {
            locationgridBlockAmount = 16;
            classToAdd = "map-volcano";
            templateColumns = "auto auto auto auto";
            mapWidth = "640px";
            mapHeight = "576px";
        }


    } else if (world === 3) {
        // ice
        if (location === 1) {
            // Mines
        } else if (location === 2) {
            locationgridBlockAmount = 16;
            classToAdd = "map-spookyforest";
            templateColumns = "auto auto auto auto";
            mapWidth = "640px";
            mapHeight = "576px";
        } else if (location === 3) {
            locationgridBlockAmount = 8;
            classToAdd = "map-easternmountain";
            templateColumns = "auto auto";
            mapWidth = "320px";
            mapHeight = "576px";
        } else if (location === 4) {
            // Ice tower
        }
    } else if (world === 4) {
        // sky

    } else if (world === 5) {
        // limbo

    } else if (world === 6) {
        // elf

    } else if (world === 7) {
        // traveler

    } else {
        throw "breedMapNavSelect \"WORLD\" does not exist"
    }

    for (let i = 0; i < 2; i++) {
        subBreedmap[i].style.width = mapWidth;
        subBreedmap[i].style.height = mapHeight;
    }
    subBreedmap[1].style.gridTemplateColumns = templateColumns;
    if (location != 0) {
        subBreedmap[0].classList.add(classToAdd);
    }
    for (let i = 0; i < locationgridBlockAmount; i++) {
        subBreedmap[1].innerHTML += "<div id=\"submMap" + i + "\" class=\"mapGridBlock\" onclick=\"tilecheck(" + i + ")\"></div> "
    }
}










var searchwindow = document.getElementById("searchWindow");

function searchHide(param, reset) {
    document.body.style.overflow = "visible";
    if (reset) {
        result.innerHTML = "<br>";
        searchInput.value = '';
    }
    if (param === "hide") {
        searchwindow.style.display = "none";
        navBarId[0].classList.remove("nav-bar-active");
        searchActive = false;
        return;
    }
    if (typeof searchActive === "undefined" || !searchActive && !param) {
        document.body.style.overflow = "hidden";
        searchwindow.style.display = "block";
        navBarId[0].classList.add("nav-bar-active");
        window.scrollTo(0, 0);
        document.getElementById("searchInput").select();
        searchActive = true;
    } else if (searchActive) {
        navBarId[0].classList.remove("nav-bar-active");
        searchwindow.style.display = "none";
        searchActive = false;
    }
}


var searchbackground = document.getElementById("searchBackground");

searchbackground.addEventListener("click", function () { searchHide("hide", true) });






var mapToggle = false;

function toggleMap(param) {
    if (param === "hide" || mapToggle === true) {
        mapToggled[0].textContent = "SHOW MAP >";
        mapToggled[1].style.display = "none";
        mapToggled[2].style.width = "700px";
        mapToggle = false;
    } else if (mapToggle === false) {
        mapToggled[0].textContent = "< HIDE MAP";
        mapToggled[1].style.display = "block";
        mapToggled[2].style.width = "1300px";
        mapToggle = true;
    }
}

/* 
64  Oasis   8x8   
64  Pirate  8x8
144 Ice     12x12
144 Sky     12x12
9   Limbo   3x3
36  Elf     6x6
25 Traveler 5x5
*/


var gridMap = document.getElementById("fullMapGrid");
var mapSelect = document.getElementById("mapSelected");

// bmn = breed map n?
var mapNavText = [
    document.getElementById("bmn-oasis"),
    document.getElementById("bmn-pirate"),
    document.getElementById("bmn-ice"),
    document.getElementById("bmn-sky"),
    document.getElementById("bmn-limbo"),
    document.getElementById("bmn-elf"),
    document.getElementById("bmn-traveler")
]

var gridBlockAmount = 0;
var gridColumnAmount = "";

function mapGrid(location, monsterSelectedParam) {
    for (let i = 0; i < mapNavText.length; i++) {
        mapNavText[i].style.display = "none";
    }
    switch (location) {
        case "Oasis":
            gridBlockAmount = 64;
            mapSelect.style.backgroundImage = "url(\"/images/oasisWorld.png\")";
            gridColumnAmount = "auto auto auto auto auto auto auto auto";
            mapNavText[0].style.display = "block";
            break;
        case "Pirate":
            gridBlockAmount = 64;
            mapSelect.style.backgroundImage = "url(\"/images/pirateWorld.png\")";
            gridColumnAmount = "auto auto auto auto auto auto auto auto";
            mapNavText[1].style.display = "block";
            break;
        case "Ice":
            gridBlockAmount = 144;
            mapSelect.style.backgroundImage = "url(\"/images/iceWorld.png\")";
            gridColumnAmount = "auto auto auto auto auto auto auto auto auto auto auto auto";
            mapNavText[2].style.display = "block";
            break;
        case "Sky":
            gridBlockAmount = 144;
            mapSelect.style.backgroundImage = "url(\"/images/skyWorld.png\")";
            gridColumnAmount = "auto auto auto auto auto auto auto auto auto auto auto auto";
            mapNavText[3].style.display = "block";
            break;
        case "Limbo":
            gridBlockAmount = 9;
            mapSelect.style.backgroundImage = "url(\"/images/limboWorld.png\")";
            gridColumnAmount = "auto auto auto";
            mapNavText[4].style.display = "block";
            break;
        case "Elf":
            gridBlockAmount = 36;
            mapSelect.style.backgroundImage = "url(\"/images/elfWorld.png\")";
            gridColumnAmount = "auto auto auto auto auto auto";
            mapNavText[5].style.display = "block";
            break;
        case "Traveler":
            gridBlockAmount = 25;
            mapSelect.style.backgroundImage = "url(\"/images/travelerWorld.png\")";
            gridColumnAmount = "auto auto auto auto auto";
            mapNavText[6].style.display = "block";
            break;
        default:
            throw "   World is not registered!"
    }
    gridMap.textContent = "";
    gridMap.style.gridTemplateColumns = gridColumnAmount;

    var locationLowcase = location.toLowerCase();

    for (let i = 0; i < gridBlockAmount; i++) {
        gridMap.innerHTML += "<div id=\"mMap" + i + "\" class=\"mapGridBlock\" onclick=\"tilecheck(" + i + ")\"></div>"
    }
    if (map.world[locationLowcase].mList === undefined) {
        console.log("NO Map tiles registered");
    } else {
        var locationIndexNumber;
        var monster_in_Water = false;
        //  check if monster is from water
        if (map.world[locationLowcase].mWList.indexOf(monsterSelectedParam) > 0) {
            monster_in_Water = true;
        } else {    // if not..   
            locationIndexNumber = map.world[locationLowcase].mList.indexOf(monsterSelectedParam);
        }
        if (monster_in_Water) {
            locationIndexNumber = "w";
            locationIndexNumber = map.world[locationLowcase].mWList.indexOf(monsterSelectedParam);
            //  locationIndexNumber = map.world[locationLowcase].mWList.indexOf(monsterSelectedParam);
            for (let i = 0; i < map.world[locationLowcase].mLocation.length; i++) {
                if (map.world[locationLowcase].mLocation[i].includes("w")) {
                    document.getElementById("mMap" + i).classList.add("monsterLocation");
                } else {
                    continue;
                }
            }
        } else {
            for (let i = 0; i < map.world[locationLowcase].mLocation.length; i++) {
                if (map.world[locationLowcase].mLocation[i].includes(locationIndexNumber)) {
                    document.getElementById("mMap" + i).classList.add("monsterLocation");
                } else {
                    continue;
                }
            }
        }
    }
}



var credits = [
    "Sky Map: Ripped by JonahStrix."
]




// var map = "Map JSON!";
// var spell = "Spells Json!";
// var lib = "Library JSON!";

var allSpellsLoaded = false;
var monsterLibraryLoaded = false;
var worldsLoaded = false;

fetch('/JSON_files/spells.json')
    .then(
        function (response) {
            response.json().then(function (data) {
                spell = data;
            });
            allSpellsLoaded = true;
            setTimeout(loadProgram, 0);
        }
    )
    .catch(function (err) {
        console.log(err);
    });


fetch('/JSON_files/monsterLibrary.json')
    .then(
        function (response) {
            response.json().then(function (data) {
                lib = data;
            });
            monsterLibraryLoaded = true;
            setTimeout(loadProgram, 0);
        }
    )
    .catch(function (err) {
        console.log(err);
    });

fetch('/JSON_files/worlds.json')
    .then(
        function (response) {
            response.json().then(function (data) {
                map = data;
            });
            worldsLoaded = true;
            setTimeout(loadProgram, 0);
        }
    )
    .catch(function (err) {
        console.log(err);
    });




/*  Search field */
var sss = '';

var searchInput = document.getElementById('searchInput');
var searchresult = document.getElementById('searchresult');
var result = document.getElementById('result');

// search inputHandler
var inputHandler = function (param) {
    result.innerHTML = "<br>";
    sss = param.target.value.toLowerCase();
    if (sss.length >= 2) {
        for (let i = 1; i < lib.allM.length; i++) {
            if (lib.allM[i] === "x" && result.innerHTML === "<br>") {
                result.innerHTML = "<br>No results found."
                return;
            }
            if (!lib.allM[i].includes(sss) && i != lib.allM.length) {
                continue;
            } else {
                if (lib[lib.allM[i]] === undefined) {
                    console.log(lib.allM[i])
                } else {
                    n = lib[lib.allM[i]].name;
                    result.innerHTML += "<button onclick=\"selectBreedingClick(" + i + ")\">" + n + "</button><br> "
                }
            }
        }
    } else {
        console.log("Too short");
        return;
    }
}


searchInput.addEventListener('input', inputHandler);
searchInput.addEventListener('propertychange', inputHandler); // for IE8
//    Firefox/Edge18-/IE9+ don’t fire on <select><option>
//    source.addEventListener('change', inputHandler);


function selectBreedingClick(monsterNameOrIndex, showBreedingMaps) {
    monsterSelect(monsterNameOrIndex);
    navBarSelect("breeding");
    if (showBreedingMaps) {
        toggleMap();
    }
}



function inputfunction(param) {
    lib[lib.allM[param]].name

    searchresult.textContent = lib[lib.allM[param]].name + " selected";
}



//      Nav-bar

var navBarList = [
    "search",
    "breeding",
    "families",
    "spells",
    "worlds"
]

var navBarSelected = "breeding";

function navBarSelect(param) {
    searchHide("hide");
    if (param === navBarSelected) {
        return console.log(param + " is already selected");
    }
    for (let i = 0; i < navBarId.length; i++) {
        navBarId[i].classList.remove("nav-bar-active");
    }
    for (let i = 2; i < mapToggled.length; i++) {
        mapToggled[i].style.display = "none";
    }
    toggleMap("hide");

    n = navBarList.indexOf(param);
    mapToggled[n + 1].style.display = "block";
    navBarId[n].classList.add("nav-bar-active");
    navBarSelected = param;
    console.log(param + " selected.");
}



//          Families



var fam_selectedIds = [
    document.getElementById("fam-click-slime"),
    document.getElementById("fam-click-dragon"),
    document.getElementById("fam-click-beast"),
    document.getElementById("fam-click-bird"),
    document.getElementById("fam-click-plant"),
    document.getElementById("fam-click-bug"),
    document.getElementById("fam-click-devil"),
    document.getElementById("fam-click-zombie"),
    document.getElementById("fam-click-material"),
    document.getElementById("fam-click-water"),
    document.getElementById("fam-click-boss")
]

var fam_pageIds = [
    document.getElementById("familyList-column1"),
    document.getElementById("familyList-column2"),
    document.getElementById("familyList-column3"),
    document.getElementById("familyList-column4"),
    document.getElementById("familyList-column5"),
    document.getElementById("familyList-column6")
]

var famListId = document.getElementById("familyList");





var famSelected = "";

function famSelect(param) {
    if (param === famSelected) {
        return console.log(param + " is already selected");
    }
    for (let i = 0; i < fam_selectedIds.length; i++) {
        fam_selectedIds[i].classList.remove("fam-click-boxes");
    }
    function famSelectFunction(param, fam_selectedNumber) {

        for (let i = 0; i < fam_pageIds.length; i++) {
            fam_pageIds[i].textContent = "";
            fam_pageIds[i].style.display = "grid";
        }
        row = 0;
        switch (fam_selectedNumber) {
            case 0:     // Slime fam
                fs = 1;
                fe = 27;
                break;
            case 1:     // Dragon fam
                fs = 27;
                fe = 58;
                break;
            case 2:     // Beast fam
                fs = 58;
                fe = 90;
                break;
            case 3:     // Bird fam
                fs = 90;
                fe = 117;
                break;
            case 4:     // Plant fam
                fs = 117;
                fe = 144;
                break;
            case 5:     // Bug fam
                fs = 144;
                fe = 170;
                break;
            case 6:     // Devil fam
                fs = 170;
                fe = 200;
                break;
            case 7:     // Zombie fam
                fs = 200;
                fe = 227;
                break;
            case 8:     // Material fam
                fs = 227;
                fe = 259;
                break;
            case 9:     // Water fam
                fs = 259;
                fe = 291;
                break;
            case 10:    // Boss fam
                fs = 291;
                fe = 313;
                break;
            default:
                throw "error in the function \"famSelect(param)\""
        }

        for (let i = fs; i < fe; i++) {
            var e = lib[lib.allM[i]].found[0];
            var nums = lib.allM.indexOf(lib.allM[i]);
            if (i === fs + 6 || i === fs + 12 || i === fs + 18 || i === fs + 24 || i === fs + 30) {
                row++;
            }
            if (e === "none") {
                fam_pageIds[row].innerHTML += '<div class=\"fam-map\"></div><div class=\"fam-sublistnomap\" onclick=\"selectBreedingClick(' + nums + ')\">' + lib[lib.allM[i]].name + '</div>';
            } else {
                fam_pageIds[row].innerHTML += '<div class=\"fam-ONmap\" onclick=\"selectBreedingClick(' + i + ', true)\"></div><div class=\"fam-subList\" onclick=\"selectBreedingClick(' + nums + ')\">' + lib[lib.allM[i]].name + '</div>';
            }
        }
        if (row === 5) {
            famListId.style.width = "910px";
        } else if (row === 4) {
            famListId.style.width = "760px";
            fam_pageIds[5].style.display = "none";
        } else if (row === 3) {
            famListId.style.width = "608px";
            fam_pageIds[5].style.display = "none";
            fam_pageIds[4].style.display = "none";
        }

        console.log(param + " selected.");
        famSelected = param;
        fam_selectedIds[fam_selectedNumber].classList.add("fam-click-boxes");

        fs = 0;
        fe = 0;
    }

    familyInTheArrayIndex = -1;
    switch (param) {
        case "slime":
            familyInTheArrayIndex = 0;
            break;
        case "dragon":
            familyInTheArrayIndex = 1;
            break;
        case "beast":
            familyInTheArrayIndex = 2;
            break;
        case "bird":
            familyInTheArrayIndex = 3;
            break;
        case "plant":
            familyInTheArrayIndex = 4;
            break;
        case "bug":
            familyInTheArrayIndex = 5;
            break;
        case "devil":
            familyInTheArrayIndex = 6;
            break;
        case "zombie":
            familyInTheArrayIndex = 7;
            break;
        case "material":
            familyInTheArrayIndex = 8;
            break;
        case "water":
            familyInTheArrayIndex = 9;
            break;
        case "boss":
            familyInTheArrayIndex = 10;
            break;
        default:
            throw "navBarSelect is weird, param is not defined."
    }
    famSelectFunction(param, familyInTheArrayIndex);
}



fam_selectedIds[0].addEventListener("click", function () { famSelect("slime") });
fam_selectedIds[1].addEventListener("click", function () { famSelect("dragon") });
fam_selectedIds[2].addEventListener("click", function () { famSelect("beast") });
fam_selectedIds[3].addEventListener("click", function () { famSelect("bird") });
fam_selectedIds[4].addEventListener("click", function () { famSelect("plant") });
fam_selectedIds[5].addEventListener("click", function () { famSelect("bug") });
fam_selectedIds[6].addEventListener("click", function () { famSelect("devil") });
fam_selectedIds[7].addEventListener("click", function () { famSelect("zombie") });
fam_selectedIds[8].addEventListener("click", function () { famSelect("material") });
fam_selectedIds[9].addEventListener("click", function () { famSelect("water") });
fam_selectedIds[10].addEventListener("click", function () { famSelect("boss") });






















/*
oasis + pirate = 64
ice + sky = 144
limbo = 9
elf = 36
traveler = 25



oasis + pirate = "auto auto auto auto auto auto auto auto";
ice + sky = "auto auto auto auto auto auto auto auto auto auto auto auto";
limbo = "auto auto auto";
elf = "auto auto auto auto auto auto";
traveler = "auto auto auto auto auto";
*/


//    Object.keys(spell).length === spell.list.length
//    Object.keys(spell)[5]     === spell.list[5]









