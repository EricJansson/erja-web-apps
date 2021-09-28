


var session_mode = 1;

mode_select = (mode_number) => {
    session_mode = mode_number;
    var mode_btns = document.querySelectorAll(".start_menu_btns");
    for (let i = 0; i < mode_btns.length; i++) {
        mode_btns[i].classList.remove("menu_mode_active");
    }
    mode_btns[session_mode].classList.add("menu_mode_active");
}

toggle_listReview_menu = (showId) => {
    if (showId == "edit") {
        if (ALL_QUESTIONS_loaded == false) {
            generate_full_edit_list();
            swap_list(1);   // First list selected as default
        }
        document.getElementById("start_menu").style.display = "none";
        document.getElementById("main_Header").style.display = "none";
        document.getElementById("edit_lesson").style.display = "block";
    } else if (showId == "menu") {
        document.getElementById("start_menu").style.display = "block";
        document.getElementById("main_Header").style.display = "block";
        document.getElementById("edit_lesson").style.display = "none";
    }
}


