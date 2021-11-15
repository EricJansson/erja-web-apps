
document.getElementsByTagName('meta')["viewport"].content = "width=device-width, initial-scale=1.0";


setTimeout(() => {
    dev_mode();
}, 100);

// ¬∀x P(x) ⇔ ∃x ¬P(x) 

var number_of_lists = 4;


var MY_LIST_1 = {
    title: "Diskret matematik",
    description: "Räkneregler för mängdlära.",
    ALL_QUESTIONS: [
        {
            question: "(A ∪ B) ∪ C = A ∪ (B ∪ C)",
            answer: "Associativa",
            alt_answer: "A ∩ (B ∩ C) = (A ∩ B) ∩ C"
        },
        {
            question: "A ∪ B = B ∪ A",
            answer: "Kommutativa",
            alt_answer: "A ∩ B = B ∩ A"
        },
        {
            question: "A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C)",
            answer: "Distributiva",
            alt_answer: "(A ∩ B) ∪ (A ∩ C) = A ∩ (B ∪ C)"
        },
        {
            question: "(A ∪ B)^c = A^c ∩ B^c",
            answer: "De Morgan",
            alt_answer: "A^c ∪ B^c = (A ∩ B)^c"
        },
        {
            question: "A ∪ A = A",
            answer: "Idempotens",
            alt_answer: "A = A ∩ A"
        },
        {
            question: "A ∪ (A ∩ B) = A",
            answer: "Absorption",
            alt_answer: "A = A ∩ (A ∪ B)"
        },
        {
            question: "(A^c)^c = A",
            answer: "Dubbelt komplement",
            alt_answer: "A = (A^c)^c"
        },
        {
            question: "A ∪ A^c = U",
            answer: "Invers",
            alt_answer: "A ∩ A^c = ∅"
        },
        {
            question: "A ∪ ∅ = A",
            answer: "Identitet",
            alt_answer: "A = A ∩ U"
        },
        {
            question: "A ∩ ∅ = ∅",
            answer: "Dominans",
            alt_answer: "A ∪ U = U"
        }
    ]
}

// ¬∀x P(x) ⇔ ∃x ¬P(x) 

var MY_LIST_2 = {
    title: "Logik och boolesk algebra",
    description: "Räkneregler för logik.",
    ALL_QUESTIONS: [
        {
            question: "P∧(Q∧R) ⇔ (P∧Q)∧R",
            answer: "Associativa",
            alt_answer: "P∨(Q∨R) ⇔ (P∨Q)∨R"
        },
        {
            question: "P∧Q ⇔ Q∧P",
            answer: "Kommutativa",
            alt_answer: "P∨Q ⇔ Q∨P"
        },
        {
            question: "P∧(Q∨R) ⇔ (P∧Q)∨(P∧R)",
            answer: "Distributiva",
            alt_answer: "P∨(Q∧R) ⇔ (P∨Q)∧(P∨R)"
        },
        {
            question: "¬(P∧Q) ⇔ ¬P∨¬Q",
            answer: "De Morgan",
            alt_answer: "¬(P∨Q) ⇔ ¬P∧¬Q"
        },
        {
            question: "P∧P ⇔ P",
            answer: "Idempotens",
            alt_answer: "P∨P ⇔ P"
        },
        {
            question: "P∧(P∨Q) ⇔ P",
            answer: "Absorption",
            alt_answer: "P∨(P∧Q) ⇔ P"
        },
        {
            question: "¬¬P ⇔ P",
            answer: "Dubbelt komplement",
            alt_answer: "¬¬P ⇔ P"
        },
        {
            question: "P∧¬P ⇔ 0",
            answer: "Invers",
            alt_answer: "P∨¬P ⇔ 1"
        },
        {
            question: "P∧1 ⇔ P",
            answer: "Identitet",
            alt_answer: "P∨0 ⇔ P"
        },
        {
            question: "P∧0 ⇔ 0",
            answer: "Dominans",
            alt_answer: "P∨1 ⇔ 1"
        },
        {
            question: "P↔Q ⇔ (P→Q) ∧ (Q→P)",
            answer: "Omskrivningsregel för ↔",
            alt_answer: "P↔Q ⇔ (P→Q) ∧ (Q→P)"
        },
        {
            question: "P→Q ⇔ ¬P∨Q",
            answer: "Omskrivningsregel för →",
            alt_answer: "P→Q ⇔ ¬P∨Q"
        }
    ]
}

var MY_LIST_3 = {
    title: "Beginner Japanese",
    description: "Japanese vocabulary for beginners",
    ALL_QUESTIONS: [
        {
            question: "I am very glad to meet you.",
            answer: "Oaidekite ureshii desu",
            alt_answer: "おあいできて　うれしいです。"
        }, {
            question: "Do you speak English?",
            answer: "Eigo o hanasemasu ka",
            alt_answer: "えいごをはなせますか。"
        }, {
            question: "How are you?",
            answer: "O-genki desu ka",
            alt_answer: "おげんきですか。"
        }, {
            question: "I don't understand.",
            answer: "Wakarimasen",
            alt_answer: "わかりません。"
        }, {
            question: "I only speak a little Japanese.",
            answer: "Watashi wa nihongo ga sukoshi shika hanasemasen.",
            alt_answer: "わたしは　にほんごがすこししか　はなせません。"
        }, {
            question: "My name is Kaorii.",
            answer: "Watashi no namae wa Kaori desu.",
            alt_answer: "わたしのなまえは　かおりです。"
        }, {
            question: "Long time, no see!",
            answer: "Hisashiburi",
            alt_answer: "久しぶり。"
        }, {
            question: "See you later/Goodbye",
            answer: "Ja Mata",
            alt_answer: "じゃまた。"
        }
    ]
}






var MY_LIST_4 = {
    title: "Math repetition",
    description: "Preparation for university.",
    ALL_QUESTIONS: [
        {
            question: "z³ = 64(cos270° + i sin270°)",
            answer: "Polär form",
            alt_answer: "4i" // -2√3 - 2i   // 2√3 - 2i
        }, {
            question: "x³ ⋅ x³",
            answer: "Potensregler multiplikation",
            alt_answer: "x³⁺³"
        }, {
            question: "x³ / x²",
            answer: "Potensregler division",
            alt_answer: "x³-² = x"
        }, {
            question: "|-6|",
            answer: "√x²+y²",
            alt_answer: "6"
        }, {
            question: "sin x = 1",
            answer: "90°",
            alt_answer: "π/4"
        }, {
            question: "cos x = -1",
            answer: "180°",
            alt_answer: "π/2"
        }, {
            question: "D eˣ",
            answer: "eˣ",
            alt_answer: ""
        }, {
            question: "D lnx",
            answer: "1/x",
            alt_answer: "1/x + C"
        }, {
            question: "Asymptot",
            answer: "Närmar sig definitionsmängdens gränser men når aldrig dit.",
            alt_answer: "Närmar sig definitionsmängdens gränser men når aldrig dit."
        }, {
            question: "213° i radianer",
            answer: "3.72",
            alt_answer: "213π/180"
        }, {
            question: "2 rad i grader",
            answer: "115",
            alt_answer: "2*180/π"
        }
    ]
}





// ∪  ∩  ∅ 



// setup My lists variable

var ALL_LISTS = [];
var MY_LIST;

setup_lists = (list_name) => {
    ALL_LISTS.push({});
    ALL_LISTS[ALL_LISTS.length - 1].title = list_name.title;
    ALL_LISTS[ALL_LISTS.length - 1].description = list_name.description;
}


displayAvailableLists = () => {
    for (let i = 0; i < number_of_lists; i++) {
        console.log(["MY_LIST_" + (i + 1)])
        setup_lists(window["MY_LIST_" + (i + 1)])
    }
    MY_LIST = MY_LIST_1;
}

displayAvailableLists()






const preQuizSetupSection = document.getElementById("setup_other_list_content");

displayPreQuizSetup = () => {
    preQuizSetupSection.innerHTML = "";

    for (let ii = 0; ii < ALL_LISTS.length; ii++) {
        console.log("Title: " + ALL_LISTS[ii].title + ", Description: " + ALL_LISTS[ii].description)

        var my_div = document.createElement("DIV");
        if (ii != 0) { // Highlight first List in the loop
            my_div.className = "setup_list_subjects";
        } else {
            my_div.className = "highlight_lesson_list setup_list_subjects";
        }
        my_div.id = "setup_other_list_header_" + (ii + 1);
        preQuizSetupSection.appendChild(my_div)

        var my_div = document.createElement("DIV");
        my_div.className = "setup_other_list_headers";
        my_div.id = "setup_other_list_header_box_" + (ii + 1);
        document.getElementById("setup_other_list_header_" + (ii + 1)).appendChild(my_div)

        var my_div = document.createElement("DIV");
        my_div.className = "setup_other_list_content";
        my_div.id = "setup_other_list_content_box_" + (ii + 1);
        document.getElementById("setup_other_list_header_" + (ii + 1)).appendChild(my_div)



        var my_div = document.createElement("DIV");
        my_div.className = "setup_lists_text";
        my_div.innerText = ALL_LISTS[ii].title; // MYLIST[x] title
        document.getElementById("setup_other_list_header_box_" + (ii + 1)).appendChild(my_div)

        var my_div = document.createElement("DIV");
        my_div.className = "setup_lists_text";
        my_div.innerText = ALL_LISTS[ii].description; // MYLIST[x] description
        document.getElementById("setup_other_list_content_box_" + (ii + 1)).appendChild(my_div)
        /*
        ALL_LISTS[ii].title
        ALL_LISTS[ii].description
        */

    }

    /*
        var my_div = document.createElement("DIV");
        my_div.className = "highlight_lesson_list setup_list_subjects";
        my_div.id = "setup_other_list_header_1";
        preQuizSetupSection.appendChild(my_div)
    
        var my_div = document.createElement("DIV");
        my_div.className = "setup_other_list_headers";
        my_div.id = "setup_other_list_header_box_1";
        document.getElementById("setup_other_list_header_1").appendChild(my_div)
        
        var my_div = document.createElement("DIV");
        my_div.className = "setup_other_list_content";
        my_div.id = "setup_other_list_content_box_1";
        document.getElementById("setup_other_list_header_1").appendChild(my_div)
    
    
    
        var my_div = document.createElement("DIV");
        my_div.className = "setup_lists_text";
        my_div.innerText = "Diskret matematik"; // MYLIST[x] title
        document.getElementById("setup_other_list_header_box_1").appendChild(my_div)
        
        var my_div = document.createElement("DIV");
        my_div.className = "setup_lists_text";
        my_div.innerText = "Räkneregler för mängdlära."; // MYLIST[x] description
        document.getElementById("setup_other_list_content_box_1").appendChild(my_div)
    */
}

displayPreQuizSetup();



















/*
var ALL_LISTS = [
    {
        title: "Diskret matematik",
        description: "Metoder och formler"
    },
    {
        title: "Beginner Japanese",
        description: "Japanese vocabulary for beginners"
    },
    {
        title: "Math repetition",
        description: "Preparation for university"
    }
]
*/


/*

var loaded_json_data = {};

get_data_function = () => {
    console.log("clicked");
    fetch('/learn_for_fun/get_my_lesson').then((response) => {
        console.log("Fetch data: ")
        response.json().then((data) => {
            console.log("Print data: ")
            loaded_json_data.ALL_LISTS = data.jsondata.ALL_LISTS;
            loaded_json_data.ALL_QUESTIONS = data.jsondata.ALL_QUESTIONS;
            console.log(loaded_json_data)
        }).catch(() => {
            console.log("Second catch")
            console.log(err)
        })
    }).catch(() => {
        console.log("Can't find...")
        console.log(err)
    })
}


write_data_function = () => {
    console.log("clicked");
    fetch('/learn_for_fun/write_my_lesson').then((response) => {
        console.log("Fetch data: ")
        response.json().then((data) => {

        }).catch(() => {

            console.log(err)
        })
    }).catch(() => {

        console.log(err)
    })
}

*/

/*

Some tutorial on how to use the site for newcomers (or as a "?" help option)
*randomized* AND *strict* questions
*quiz mode* AND *learn mode*: learn mode repeats wrong answers, quiz mode is counting correct + wrong answer stats
*learn mode* repeat questions for longer sessions/better training
x*2 options OR type OR long dropdown?
end of game "scorescreen" / "overview"

*Edit Mode*
flikar premade/my own quizes

*/
