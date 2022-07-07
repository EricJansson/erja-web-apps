


//  Search field 



var spellLearnNameSearch = '';



const spellslearninputname = function (click) {
    minunikavariabel = click.target.value;
    console.log(minunikavariabel);
}


document.getElementById('spellslearninputname').addEventListener('input', spellslearninputname);



const spells_learn_list = document.getElementById("spells_learn_list");

/*
function printNextSpell(numberOfSpells) {
    if (numberOfSpells == 0) {
        return;
    }
    var spellObjectName = Object.keys(spell)[spell.list.length - numberOfSpells]; // swap the value, so it will increment instead (from 1 to "numberOfSpells")
    var fromSkill = "---"
    
    if (spell[spellObjectName].monstersWithThisSpell[0] === "Refer to") {
        fromSkill = spell[spellObjectName].monstersWithThisSpell[1];
    }
    spells_learn_list.innerHTML += `<div class=\"spells_learn_onerow\">
        <div class=\"spells_learn_name\">` + spell[spellObjectName].name + `</div>
        <div class=\"spells_learn_stats\">` + spell[spellObjectName].learnStats.lv + `</div>
        <div class=\"spells_learn_stats\">` + spell[spellObjectName].learnStats.hp + `</div>
        <div class=\"spells_learn_stats\">` + spell[spellObjectName].learnStats.mp + `</div>
        <div class=\"spells_learn_stats\">` + spell[spellObjectName].learnStats.atk + `</div>
        <div class=\"spells_learn_stats\">` + spell[spellObjectName].learnStats.def + `</div>
        <div class=\"spells_learn_stats\">` + spell[spellObjectName].learnStats.agi + `</div>
        <div class=\"spells_learn_stats\">` + spell[spellObjectName].learnStats.int + `</div>
        <div class=\"spells_learn_fromskill\">` + fromSkill + `</div></div>`
    
    // return setTimeout(function() {printNextSpell(numberOfSpells-1)}, 1);     // Looks cool when it loads 1 by 1 (not very practical)
    return printNextSpell(numberOfSpells-1);
}*/


// String.fromCharCode('a'.charCodeAt() + 1) // Returns b

function printNextSpell() {
    var letterSort = "a";
    var spaceUsedLastLoop = false;
    for (let i = 1; i < spell.list.length; i++) {
        var spellObjectName = Object.keys(spell)[i]; // swap the value, so it will increment instead (from 1 to "numberOfSpells")
        if (!spellObjectName.startsWith(letterSort) && !spaceUsedLastLoop) {
            // Notice first line, class is different to disable hover
        spells_learn_list.innerHTML += `<div class=\"spells_learn_emptyrow\"> 
            <div class=\"spells_learn_name\"></div>
            <div class=\"spells_learn_stats\"></div>
            <div class=\"spells_learn_stats\"></div>
            <div class=\"spells_learn_stats\"></div>
            <div class=\"spells_learn_stats\"></div>
            <div class=\"spells_learn_stats\"></div>
            <div class=\"spells_learn_stats\"></div>
            <div class=\"spells_learn_stats\"></div>
            <div class=\"spells_learn_fromskill\"></div></div>`
            nextChar(letterSort);
            i--;
            spaceUsedLastLoop = true;
            continue;
        } else if (!spellObjectName.startsWith(letterSort) && spaceUsedLastLoop) {
            nextChar(letterSort);
        }
        spaceUsedLastLoop = false;
        var fromSkill = "---"
        if (spell[spellObjectName].monstersWithThisSpell[0] === "Refer to") {
            fromSkill = spell[spellObjectName].monstersWithThisSpell[1];
        }
        spells_learn_list.innerHTML += `<div class=\"spells_learn_onerow\">
            <div class=\"spells_learn_name\">` + spell[spellObjectName].name + `</div>
            <div class=\"spells_learn_stats\">` + spell[spellObjectName].learnStats.lv + `</div>
            <div class=\"spells_learn_stats\">` + spell[spellObjectName].learnStats.hp + `</div>
            <div class=\"spells_learn_stats\">` + spell[spellObjectName].learnStats.mp + `</div>
            <div class=\"spells_learn_stats\">` + spell[spellObjectName].learnStats.atk + `</div>
            <div class=\"spells_learn_stats\">` + spell[spellObjectName].learnStats.def + `</div>
            <div class=\"spells_learn_stats\">` + spell[spellObjectName].learnStats.agi + `</div>
            <div class=\"spells_learn_stats\">` + spell[spellObjectName].learnStats.int + `</div>
            <div class=\"spells_learn_fromskill\">` + fromSkill + `</div></div>`
        
        // sort all instances in the array to be in alphabetical order
        function nextChar(character) {
            return letterSort = String.fromCharCode(character.charCodeAt(0) + 1);
        }
    }
}


// setTimeout(function() {printNextSpell(169)}, 100);



