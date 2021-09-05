

const list_table = document.getElementById("display_table_data");
const list_table_header = document.getElementById("display_table_header");



generate_table = () => {
    // SETUP SESSION HEADER 
    list_table_header.innerHTML = "";
    // setup title
    var new_div = document.createElement("DIV");
    new_div.innerText = MY_LIST.title;
    list_table_header.appendChild(new_div);
    // setup title description
    var new_div = document.createElement("DIV");
    new_div.innerText = MY_LIST.description;
    list_table_header.appendChild(new_div);

    // Empty the whole list
    list_table.innerHTML = "";
    // need this first to offset grid correctly
    var new_div = document.createElement("DIV");
    new_div.className = "table_item_first";
    list_table.appendChild(new_div);

    // create question header
    var new_div = document.createElement("DIV");
    new_div.className = "table_item_header";
    new_div.textContent = "Questions"
    list_table.appendChild(new_div);

    // create answer block (with select option)
    var new_div = document.createElement("DIV");
    new_div.id = "table_question";
    list_table.appendChild(new_div);
    var new_select = document.createElement("SELECT");
    new_select.id = "mode_select_id";
    new_select.setAttribute("onchange", "toggle_answers()")
    document.getElementById("table_question").appendChild(new_select);
    var new_option = document.createElement("OPTION");
    new_option.innerText = "Answers"
    new_option.setAttribute("value", "answer")
    document.getElementById("mode_select_id").appendChild(new_option);
    var new_option = document.createElement("OPTION");
    new_option.innerText = "Second Answers"
    new_option.setAttribute("value", "alt_answer")
    document.getElementById("mode_select_id").appendChild(new_option);

    create_new_item = (innerText) => {
        var create_new_div = document.createElement("DIV");
        if (typeof innerText == "number") {
            create_new_div.className = "table_item_num";
        } else {
            create_new_div.className = "table_items";
        }
        create_new_div.innerText = innerText;
        list_table.appendChild(create_new_div);
    }

    for (let i = 0; i < MY_LIST.ALL_QUESTIONS.length; i++) {
        create_new_item(i + 1);
        create_new_item(MY_LIST.ALL_QUESTIONS[i].question);
        create_new_item(MY_LIST.ALL_QUESTIONS[i].answer);
        create_new_item(MY_LIST.ALL_QUESTIONS[i].alt_answer);
    }
}



hide_answers = () => {
    for (let k = 0; k < MY_LIST.ALL_QUESTIONS.length; k++) {
        document.getElementsByClassName("table_items")[1 + k * 3].style.display = "none";
        document.getElementsByClassName("table_items")[2 + k * 3].style.display = "block";
    }
}

hide_alt_answers = () => {
    for (let k = 0; k < MY_LIST.ALL_QUESTIONS.length; k++) {
        document.getElementsByClassName("table_items")[2 + k * 3].style.display = "none";
        document.getElementsByClassName("table_items")[1 + k * 3].style.display = "block";
    }
}



function toggle_answers() {
    var x = document.getElementById("mode_select_id").value;
    if (x == "answer") {
        hide_alt_answers();
    } else if (x == "alt_answer") {
        hide_answers();
    } else {
        throw "bugelibug hide_answers()"
    }
}




generate_table();
hide_alt_answers();

