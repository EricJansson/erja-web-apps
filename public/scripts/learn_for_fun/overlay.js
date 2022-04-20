




var overlay_fade_effect = document.getElementById("overlay_fade_effect");
var overlay_quit = document.getElementById("overlay_quit_session");
var overlay_score_recap = document.getElementById("overlay_score_recap");

display_overlay = (reason) => {
    overlay_fade_effect.style.display = "block";
    if (reason == "quit_session") {
        overlay_quit.style.display = "block";
        overlay_score_recap.style.display = "none";
    } else if (reason == "session_results") {
        overlay_quit.style.display = "none";
        overlay_score_recap.style.display = "block";
        display_recap();
    }
}

display_recap = () => {
    document.getElementById("overlay_recap_time").innerText = "Time: " + timer_minute + ":" + timer_seconds;
    document.getElementById("overlay_recap_score").innerText = "Score: " + number_of_corrects + "/" + current_question_number + " (" + session_success_rate() + "%)";
}

overlay_quit_options = (action) => {
    if (action == "end_session") {
        goToNextQuestion('end_session');
    }
    remove_overlay();
}


remove_overlay = () => {
    overlay_fade_effect.style.display = "none";
}
