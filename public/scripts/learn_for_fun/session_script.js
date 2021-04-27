
var session_array = [];

// var session_mode = 1;   -> menu_script.js
var current_question_number = 0;
var number_of_options = 4;
var correct_answer = 0;
var number_of_corrects = 0;
var number_of_wrongs = 0;
var question_answered_already = false;


startSession = () => {
    for (let i = 0; i < ALL_QUESTIONS.length; i++) {
        ALL_QUESTIONS[i]["option_id"] = i;
        ALL_QUESTIONS[i]["alt_option_repeat"] = 0;
    }
    document.getElementById("main_content").style.display = "block";
    document.getElementById("main_Header").style.display = "none";
    document.getElementById("start_menu").style.display = "none";
    session_array = []; // reset
    current_question_number = 0; // reset
    number_of_corrects = 0; // reset
    number_of_wrongs = 0; // reset
    for (let k = 0; k < ALL_QUESTIONS.length; k++) {
        session_array.push(k);
    }
    session_data("setup");
    array_shuffler(session_array);
    generate_question(current_question_number);
}





var timer;
var session_progress_total;
var session_progress_amount;
var session_success_rate;
var start_time = "0:00";

session_data = (setup_data) => {
    if (setup_data == "setup") {
        session_progress_total = session_array.length;
        session_success_rate = 0;
        document.getElementById("session_success_rate").innerText = "";
        document.getElementById("session_timer").innerText = start_time;
        // set time
        start_timer = () => {
            var start = Date.now();
            var timer_minute = 0;
            timer = setInterval(function () {
                var millisec_now = Date.now() - start; // milliseconds elapsed since start
                timer_seconds = Math.floor(millisec_now / 1000);
                if (timer_seconds >= 60) {
                    start = Date.now();
                    timer_seconds = timer_seconds - 60;
                    timer_minute++;
                }
                if (timer_seconds < 10) {
                    timer_seconds = "0" + timer_seconds;
                }
                document.getElementById("session_timer").innerText = timer_minute + ":" + timer_seconds;
            }, 200); // update about every second
        }
        start_timer();
    }
    // set success rate

    // calculate success_rate
    session_success_rate = (number_of_corrects / current_question_number) * 100;
    // floor the success_rate to 1 decimal.
    session_success_rate = (Math.floor(session_success_rate * 10)) / 10;
    if (setup_data != "setup") {
        document.getElementById("session_success_rate").innerText = session_success_rate + "%";
    }
    // set question amount/completion
    session_progress_amount = current_question_number;
    // calculate progress_percent
    session_progress_percent = (session_progress_amount / session_progress_total) * 100;
    // floor the progress_percent to 1 decimal.
    session_progress_percent = (Math.floor(session_progress_percent * 10)) / 10;
    document.getElementById("session_progress").innerText = session_progress_amount + "/" + session_progress_total + " (" + session_progress_percent + "%)";
}


var question_loop_number = 0;

generate_question = (question_num) => {
    var current_question_num = session_array[question_num]; // number of the question at index[PARAM]
    var current_question_index = session_array.indexOf(current_question_num); // index of "number of the question"
    ALL_QUESTIONS[current_question_num]["alt_option_repeat"]++;
    document.getElementById("question_block").innerText = ALL_QUESTIONS[current_question_num].question;

    var current_task_options = [];
    current_task_options.push(current_question_num);

    var temp_array_copy = session_array;

    // remove item with value of 'randomized_question_num'      
    temp_array_copy = temp_array_copy.filter(function (item) {
        return item !== session_array[current_question_index];
    })

    var failsafe = 0;
    while (current_task_options.length < 4 && failsafe < 20) {
        if (failsafe == 19) {
            console.log("Failsafe: ∞ loop.");
            alert("Unexpected error. Failsafe: ∞ loop.")
            throw "generate_question() ERROR"
        }
        failsafe++;
        var random_index_num = Math.floor(Math.random() * temp_array_copy.length);
        var random_array_number = temp_array_copy[random_index_num];
        if (ALL_QUESTIONS[random_array_number]["alt_option_repeat"] <= question_loop_number &&
            !current_task_options.includes(random_array_number)) {
            ALL_QUESTIONS[random_array_number]["alt_option_repeat"]++;
            current_task_options.push(random_array_number);
        } else {
            var local_lowest;
            for (let i = 0; i < ALL_QUESTIONS.length; i++) {
                ALL_QUESTIONS[i].alt_option_repeat;
                if (ALL_QUESTIONS[i].alt_option_repeat < local_lowest) {
                    local_lowest = ALL_QUESTIONS[i].alt_option_repeat - 1;
                }
            }
            if (local_lowest < question_loop_number) {
                question_loop_number = local_lowest;
            } else {
                question_loop_number++;
            }
        }
        temp_array_copy = temp_array_copy.filter(function (item) {
            return item !== temp_array_copy[random_index_num];
        })
    }
    var task_options_length = current_task_options.length;
    for (let i = 0; i < task_options_length; i++) {
        if (session_mode == 1) {
            current_task_options[i] = ALL_QUESTIONS[current_task_options[i]].answer;
        } else if (session_mode == 2) {
            current_task_options[i] = ALL_QUESTIONS[current_task_options[i]].alt_answer;
        }
    }
    console.log(current_task_options);
    array_shuffler(current_task_options);
    for (let i = 0; i < current_task_options.length; i++) {
        if (ALL_QUESTIONS[session_array[current_question_number]].answer == current_task_options[i] || ALL_QUESTIONS[session_array[current_question_number]].alt_answer == current_task_options[i]) {
            correct_answer = i + 1;
        }
        document.getElementById("optionBtn" + (i + 1)).innerText = current_task_options[i];
    }
    current_question_number++;  // session question
}


array_shuffler = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}


selectOption = (option_number) => {
    if (question_answered_already) {
        console.log("Question already answered.");
        return
    }
    if (option_number == correct_answer) {
        console.log("Correct!")
        number_of_corrects++;
        document.getElementById("next_question_wrong").style.display = "none";
    } else {
        console.log("Wrong.")
        number_of_wrongs++;
        document.getElementById("next_question_correct").style.display = "none";
        document.getElementById("optionBtn" + option_number).classList.add("wrong_answer");
    }
    for (let i = 1; i <= number_of_options; i++) {
        document.getElementById("optionBtn" + i).classList.remove("active_options");
    }
    if (current_question_number < session_array.length) {
        document.getElementById("next_question_hide_toggle").style.display = "block";
    } else {
        clearInterval(timer); // stop timer
        document.getElementById("post_session_recap_btn").style.display = "block";
    }
    document.getElementById("optionBtn" + correct_answer).classList.add("correct_answer");
    // refresh data
    session_data();
    question_answered_already = true;
}


goToNextQuestion = (end_Session) => {
    document.getElementById("next_question_hide_toggle").style.display = "none";
    document.getElementById("next_question_wrong").style.display = "block";
    document.getElementById("next_question_correct").style.display = "block";
    // remove correct/wrong answer colors
    for (let i = 1; i <= number_of_options; i++) {
        document.getElementById("optionBtn" + i).classList.remove("correct_answer");
        document.getElementById("optionBtn" + i).classList.remove("wrong_answer");
        document.getElementById("optionBtn" + i).classList.add("active_options");
    }
    if (end_Session == 'end_session') {
        document.getElementById("main_Header").style.display = "block";
        document.getElementById("start_menu").style.display = "block";
        document.getElementById("post_session_recap_btn").style.display = "none";
        document.getElementById("main_content").style.display = "none";
        clearInterval(timer); // stop timer
    } else {
        generate_question(current_question_number);
    }
    
    question_answered_already = false;
}
