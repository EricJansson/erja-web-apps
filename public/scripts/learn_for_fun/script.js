const ALL_LISTS = [
    {
        title: "Beginner Japanese",
        description: "Japanese vocabulary for beginners"
    }
]

const ALL_QUESTIONS = [
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

document.getElementsByTagName('meta')["viewport"].content = "width=device-width, initial-scale=1.0";
/*
<meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
*/
/*
const ALL_QUESTIONS = [
    {
        question: "I am very glad to meet you.",
        answer: "Oaidekite ureshii desu",
        alt_answer: "おあいできて　うれしいです。"
    },
    {
        question: "Do you speak English?",
        answer: "Eigo o hanasemasu ka",
        alt_answer: "えいごをはなせますか。"
    },
    {
        question: "How are you?",
        answer: "O-genki desu ka",
        alt_answer: "おげんきですか。"
    },
    {
        question: "I don't understand.",
        answer: "Wakarimasen",
        alt_answer: "わかりません。"
    },
    {
        question: "I only speak a little Japanese.",
        answer: "Watashi wa nihongo ga sukoshi shika hanasemasen.",
        alt_answer: "わたしは　にほんごがすこししか　はなせません。"
    },
    {
        question: "My name is Kaorii.",
        answer: "Watashi no namae wa Kaori desu.",
        alt_answer: "わたしのなまえは　かおりです。"
    },
    {
        question: "Long time, no see!",
        answer: "Hisashiburi",
        alt_answer: "久しぶり。"
    },
    {
        question: "See you later/Goodbye",
        answer: "Ja Mata",
        alt_answer: "じゃまた。"
    }
]
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
