
var setup_tab_myList = document.getElementById("setup_my_list_header");
var setup_tab_savedList = document.getElementById("setup_saved_list_header");
var setup_tab_otherList = document.getElementById("setup_other_list_header");


setupSession = (goBackToMenu) => {
    // Hide/show appropriate content
    if (goBackToMenu) {
        document.getElementById("start_menu").style.display = "block";
        document.getElementById("setup_session").style.display = "none"
        return
    }
    document.getElementById("start_menu").style.display = "none";
    document.getElementById("setup_session").style.display = "block"
}

// startSession() <- add this to the "QUIZ ME!" btn

quiz_setup_tabs = (selected_tab) => {

    setup_tab_myList.style.width = "100%"
    setup_tab_savedList.style.width = "100%"
    setup_tab_otherList.style.width = "100%"
    window["setup_tab_" + selected_tab].style.width = "250%"
}


setup_tab_myList.addEventListener('click', () => { quiz_setup_tabs("myList"); });
setup_tab_savedList.addEventListener('click', () => { quiz_setup_tabs("savedList"); });
setup_tab_otherList.addEventListener('click', () => { quiz_setup_tabs("otherList"); });


