




var overlay_fade_effect = document.getElementById("overlay_fade_effect");
var overlay = document.getElementById("overlay");

display_overlay = () => {
    overlay_fade_effect.style.display = "block";
    overlay.style.display = "block";
}

overlay_accept = (action) => {
    overlay_fade_effect.style.display = "none";
    overlay.style.display = "none";
    if (action == "end session") {
        goToNextQuestion('end_session');
    }
}

overlay_decline = () => {
    overlay_fade_effect.style.display = "none";
    overlay.style.display = "none";
}

