

const lesson_full_list = document.getElementById("other_lessons_block");

generate_list = () => {
    lesson_full_list.innerHTML = "";


    for (let i = 1; i <= ALL_LISTS.length; i++) {
        var my_div = document.createElement("DIV");
        my_div.className = "lesson_lists";
        my_div.id = "lesson_list_" + i;
        lesson_full_list.appendChild(my_div)

        var my_div = document.createElement("DIV");
        my_div.className = "lesson_list_title";
        my_div.innerText = ALL_LISTS[i - 1].title;
        document.getElementById("lesson_list_" + i).appendChild(my_div)

        var my_div = document.createElement("DIV");
        my_div.className = "lesson_list_description";
        my_div.innerText = ALL_LISTS[i - 1].description;
        document.getElementById("lesson_list_" + i).appendChild(my_div)
    }

    for (let k = 1; k <= ALL_LISTS.length; k++) {
        document.getElementById("lesson_list_" + k).addEventListener('click', () => { swap_list(k); });
    }

}

var current_active_list = 1;

swap_list = (select_list_index) => {
    
    for (let i = 0; i < number_of_lists; i++) {
        document.getElementById("lesson_list_" + (i + 1)).classList.remove("highlight_lesson_list")
    }
    document.getElementById("lesson_list_" + select_list_index).classList.add("highlight_lesson_list")

    console.log(select_list_index)
    MY_LIST = window["MY_LIST_" + select_list_index];

    generate_full_edit_list();
    generate_table();
    hide_alt_answers();


    /*
    if (select_list_index == 1 && current_active_list != 1) {
        MY_LIST = ["MY_LIST_" + select_list_index]
        ALL_LISTS[select_list_index - 1]
        document.getElementById("display_list_mode_2").classList.remove("display_list_clickable");
        document.getElementById("display_list_mode_1").classList.add("display_list_clickable");
        current_mode = 1;
    } else if (select_list_index == 2 && current_active_list != 2) {

        document.getElementById("display_list_mode_1").classList.remove("display_list_clickable");
        document.getElementById("display_list_mode_2").classList.add("display_list_clickable");
        current_mode = 2;
    } else {
        console.log("Already selected.");
    }
    */
}











generate_list();




