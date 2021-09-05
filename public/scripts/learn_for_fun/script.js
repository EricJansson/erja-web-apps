
document.getElementsByTagName('meta')["viewport"].content = "width=device-width, initial-scale=1.0";


setTimeout(() => {
    dev_mode();
}, 100);




var ALL_LISTS = [
    {
        title: "Beginner Japanese",
        description: "Japanese vocabulary for beginners"
    },
    /*
    {
        title: "Math repetition",
        description: "Preparation for university"
    },
    */
    {
        title: "Diskret matematik",
        description: "Metoder och formler"
    }
]


var MY_LIST_1 = {
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


/*
var MY_LIST_2 = {
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

*/



var MY_LIST_2 = {
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
            question: "(Ac)c = A",
            answer: "Dubbelt komplement",
            alt_answer: "A = (Ac)c"
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

// ∪  ∩  ∅ 



// setup My lists variable

ALL_LISTS = [];

setup_lists = (list_name) => {
    ALL_LISTS.push({});
    ALL_LISTS[ALL_LISTS.length - 1].title = list_name.title;
    ALL_LISTS[ALL_LISTS.length - 1].description = list_name.description;
}

setup_lists(MY_LIST_1);
// setup_lists(MY_LIST_2);
setup_lists(MY_LIST_2);

var MY_LIST = MY_LIST_1;




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

*randomized* AND *strict* questions
*quiz mode* AND *learn mode*: learn mode repeats wrong answers, quiz mode is counting correct + wrong answer stats
*learn mode* repeat questions for longer sessions/better training
x*2 options OR type OR long dropdown?
end of game "scorescreen" / "overview"

*Edit Mode*
flikar premade/my own quizes

*/
