
// get URL query and use it in function -> monsterSelect(monsterURLQuery)
var monsterURLQuery = new URLSearchParams(window.location.search).get('monster')

var searchIncrementer = 0;


// Try to match library monster list with URLQuery... 
const findMonsterWithURLQuery = (numberOfTries) => {
    // if lib.allM || monsterURLQuery undefined -> run function agian 3 times
    if (typeof lib.allM === "undefined" || typeof monsterURLQuery === "undefined") {
        console.log("QUERY: undefined (retrying)")
        searchIncrementer++;
        if (numberOfTries > 3) {
            // monsterSelect("slime")
            return console.log("QUERY: lib.allM (JSON) unreachable")
        }
        setTimeout(() => {
            findMonsterWithURLQuery(searchIncrementer)
        }, searchIncrementer * 1000)
        // if lib.allM contains URLQuery, use it in monsterSelect(param)
    } else if (lib.allM.includes(monsterURLQuery)) {
        console.log("QUERY: MONSTER success!")
        console.log(monsterURLQuery)
        monsterSelect(monsterURLQuery)
    } else {
        console.log("QUERY: monster not found.")
        monsterSelect("slime")
    }
}

var siteLoaded = false;

const loadProgram = () => {
    setTimeout(() => {
        if (siteLoaded) {
            return
        }
        if (worldsLoaded && allSpellsLoaded && monsterLibraryLoaded) {
            console.log("All JSON loaded.")
            // Select breeding/URLQuery
            findMonsterWithURLQuery();
            // Select worlds => oasis
            worldNavbar('Oasis')
            // Select family => slime
            famSelect("slime");
            // Print the whole spells section
            printNextSpell(spell.list.length - 1);
            // only run once
            siteLoaded = true;
        } else {
            if (!worldsLoaded) {
                console.log("worlds.JSON Undefined")
            }
            if (!allSpellsLoaded) {
                console.log("allSpells.JSON Undefined")
            }
            if (!monsterLibraryLoaded) {
                console.log("monsterLibrary.JSON Undefined")
            }
        }
    }, 100)
}

setTimeout(() => {
    if (!siteLoaded) {
        loadProgram();
        console.log("10 second emergency load.")
    }
}, 10000);


// get URL query and use it in function -> monsterSelect(monsterURLQuery)
var devModeURLQuery = new URLSearchParams(window.location.search).get('devmode')

// developerMode, developer mode. 
// For smooth testing of the application
function developerMode() {
    if (devModeURLQuery === "active") {
        navBarSelect('worlds')
    }
}
developerMode();



function gogogo() {
    //     if (history.pushState) {
    //         var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?monster=' + currentMonsterSelected;
    //         window.history.pushState({ path: newurl }, '', newurl);
    //     }
    document.getElementById("bmn-oasis").style.display = "block"
    document.getElementById("bmn-pirate").style.display = "block"
    document.getElementById("bmn-ice").style.display = "block"
    document.getElementById("bmn-sky").style.display = "block"
    document.getElementById("bmn-limbo").style.display = "block"
    document.getElementById("bmn-elf").style.display = "block"
    document.getElementById("bmn-traveler").style.display = "block"
}


