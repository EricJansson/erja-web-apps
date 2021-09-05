
// ADD NEW OBJECT INTO EDIT MODE

var ALL_QUESTIONS_loaded = false;

const session_data = document.getElementById("display_session_data");




generate_full_edit_list = () => {
    session_data.innerHTML = "";
    
    for (let i = 1; i <= MY_LIST.ALL_QUESTIONS.length; i++) {
        make_new_object(i);
        add_object_type(i, i);
        add_object_type("Question", i);
        add_object_data(null, "question", i);
        add_object_type("Answer", i);
        add_object_data(null, "answer", i);
        add_object_type("Alternate answer", i);
        add_object_data(null, "alt_answer", i);
    }
    ALL_QUESTIONS_loaded = true;
}



add_object_type = (data_type, index) => {
    index = index || "";
    editmode_new_div = document.createElement("DIV");
    if (typeof data_type == "string") {
        editmode_new_div.classList = "edit_object_type";
        editmode_new_div.innerText = data_type + ":";
        document.getElementById("edit_object_" + index).appendChild(editmode_new_div);
    } else if (typeof data_type == "number") {
        editmode_new_div.classList = "edit_question_num";
        editmode_new_div.innerText = data_type + ".";
        document.getElementById("edit_object_" + index).appendChild(editmode_new_div);

        var delete_item_btn = document.createElement("BUTTON");
        delete_item_btn.classList = "delete_item_btns";
        delete_item_btn.innerText = "x";
        delete_item_btn.setAttribute("onclick", "delete_item(" + data_type + ")");
        document.getElementById("edit_object_" + index).appendChild(delete_item_btn);
    }
}


make_new_object = (index) => {
    editmode_new_div = document.createElement("DIV");
    editmode_new_div.classList = "edit_object_grid";
    editmode_new_div.id = "edit_object_" + index;
    current_object_id = editmode_new_div.id;
    session_data.appendChild(editmode_new_div);
}


add_object_data = (object_id, object_data, index, object_classlist) => {
    index = index || "";
    add_edit_btn = (index, object_data) => {
        editmode_edit_btns = document.createElement("DIV");
        editmode_edit_btns.id = "edit_btns_" + object_data + "_" + index;
        editmode_edit_btns.classList = "edit_all_edit_btns";
        document.getElementById("edit_object_" + index).appendChild(editmode_edit_btns);
        for (let i = 0; i < 3; i++) {
            new_btn = document.createElement("BUTTON");
            if (i == 0) {
                new_btn.classList = "edit_btns edit_btn_edit";
                new_btn.setAttribute("onclick", "edit_btn_edit('" + object_data + "', " + index + ")");
            } else if (i == 1) {
                new_btn.classList = "edit_btns edit_btn_accept_" + object_data;
                new_btn.id = "edit_btn_accept_" + object_data + "_" + index;
                new_btn.setAttribute("onclick", "edit_btn_accept('" + object_data + "', " + index + ")");
            } else if (i == 2) {
                new_btn.classList = "edit_btns edit_btn_decline_" + object_data;
                new_btn.id = "edit_btn_decline_" + object_data + "_" + index;
                new_btn.setAttribute("onclick", "edit_btn_decline('" + object_data + "', " + index + ")");
            }
            document.getElementById("edit_btns_" + object_data + "_" + index).appendChild(new_btn);
        }
    }
    editmode_new_div = document.createElement("DIV");
    if (object_data == "question" || object_data == "answer" || object_data == "alt_answer") {
        editmode_new_div.classList = "edit_object_data";
        editmode_new_div.id = object_data + "_" + index;
    } else {
        editmode_new_div.classList = object_classlist;
    }
    if (typeof object_id == "string") {
        editmode_new_div.id = object_id + index;
    }
    if (typeof object_data == "string") {
        if (object_data == "question") {
            editmode_new_div.innerText = MY_LIST.ALL_QUESTIONS[index - 1].question;
        } else if (object_data == "answer") {
            editmode_new_div.innerText = MY_LIST.ALL_QUESTIONS[index - 1].answer;
        } else if (object_data == "alt_answer") {
            editmode_new_div.innerText = MY_LIST.ALL_QUESTIONS[index - 1].alt_answer;
        }
    }
    add_edit_btn(index, object_data);
    document.getElementById("edit_object_" + index).appendChild(editmode_new_div);
}


var current_edited_data_btn;
var current_edited_data;

edit_btn_edit = (type, index) => {
    var all_edit_btns = document.getElementsByClassName('edit_btn_edit');
    var all_accept_btns = document.getElementsByClassName('edit_btn_accept_' + type);
    var all_decline_btns = document.getElementsByClassName('edit_btn_decline_' + type);
    for (var i = 0; i < all_edit_btns.length; i++) {
        all_edit_btns[i].style.display = 'none';
    }
    all_accept_btns[index - 1].style.display = 'inline-block';
    all_decline_btns[index - 1].style.display = 'inline-block';

    current_edited_data = MY_LIST.ALL_QUESTIONS[index - 1][type];

    current_edited_data_btn = document.getElementById(type + "_" + index);
    current_edited_data_btn.innerHTML = `<input class="edit_list_input_fields" id="edit_data_input_field" value="` + MY_LIST.ALL_QUESTIONS[index - 1][type] + `"></input>`
    function read_edit_input(param) {
        var my_input = param.target.value;
        current_edited_data = my_input;
    }
    document.getElementById('edit_data_input_field').addEventListener('input', read_edit_input);
}


edit_btn_accept = (type, index) => {
    var all_edit_btns = document.getElementsByClassName('edit_btn_edit');
    var all_accept_btns = document.getElementsByClassName('edit_btn_accept_' + type);
    var all_decline_btns = document.getElementsByClassName('edit_btn_decline_' + type);
    for (var i = 0; i < all_edit_btns.length; i++) {
        all_edit_btns[i].style.display = 'inline-block';
    }
    all_accept_btns[index - 1].style.display = 'none';
    all_decline_btns[index - 1].style.display = 'none';

    MY_LIST.ALL_QUESTIONS[index - 1][type] = current_edited_data;

    current_edited_data_btn.innerHTML = MY_LIST.ALL_QUESTIONS[index - 1][type];
}


edit_btn_decline = (type, index) => {
    var all_edit_btns = document.getElementsByClassName('edit_btn_edit');
    var all_accept_btns = document.getElementsByClassName('edit_btn_accept_' + type);
    var all_decline_btns = document.getElementsByClassName('edit_btn_decline_' + type);
    for (var i = 0; i < all_edit_btns.length; i++) {
        all_edit_btns[i].style.display = 'inline-block';
    }
    all_accept_btns[index - 1].style.display = 'none';
    all_decline_btns[index - 1].style.display = 'none';

    current_edited_data = MY_LIST.ALL_QUESTIONS[index - 1][type];

    current_edited_data_btn.innerHTML = MY_LIST.ALL_QUESTIONS[index - 1][type];
}

// create new question

var create_question_element = document.getElementById('create_question');
var create_answer_element = document.getElementById('create_answer');
var create_alt_answer_element = document.getElementById('create_alt_answer');

var question_input = "";
var answer_input = "";
var alt_answer_input = "";

show_create_item = () => {
    document.getElementById("create_new_list_block").style.display = "block";

    question_input = "";
    answer_input = "";
    alt_answer_input = "";

    create_question_element.value = "";
    create_answer_element.value = "";
    create_alt_answer_element.value = "";
}

read_created_question = (param) => {
    question_input = param.target.value;
}

read_created_answer = (param) => {
    answer_input = param.target.value;
}

read_created_alt_answer = (param) => {
    alt_answer_input = param.target.value;
}

var add_new_object;

create_item = () => {
    if (question_input == "" || answer_input == "" || alt_answer_input == "") {
        return console.log("Fill all fields...")
    }
    // hide "create new item" block
    document.getElementById("create_new_list_block").style.display = "none";
    // create new object and add it to MY_LIST.ALL_QUESTIONS array
    add_new_object = {};
    add_new_object.question = question_input;
    add_new_object.answer = answer_input;
    add_new_object.alt_answer = alt_answer_input;
    console.log(add_new_object);
    MY_LIST.ALL_QUESTIONS.unshift(add_new_object);
    // renew the list
    generate_full_edit_list();
}

create_question_element.addEventListener('input', read_created_question);
create_answer_element.addEventListener('input', read_created_answer);
create_alt_answer_element.addEventListener('input', read_created_alt_answer);

new_question_cancel = () => {
    // hide "create new item" block
    document.getElementById("create_new_list_block").style.display = "none";
}



// Delete items

delete_item_mode = () => {
    var total_items = document.getElementsByClassName("delete_item_btns");
    for (let i = 0; i < total_items.length; i++) {
        total_items[i].style.display = "block"
    }
}

delete_item = (question_number) => {
    var total_items = document.getElementsByClassName("delete_item_btns");
    for (let i = 0; i < total_items.length; i++) {
        total_items[i].style.display = "none"
    }

    // MY_LIST.ALL_QUESTIONS[question_number - 1].question == "Do you speak English?"
    MY_LIST.ALL_QUESTIONS.splice(question_number - 1, 1);

    // renew the list
    generate_full_edit_list();

}





// Change list

list_tab = (what_list) => {
    for (let i = 1; i < 4; i++) {
        document.getElementById("list_tab_" + i).classList.add("inactive_list_tab");
    }
    if (what_list == "My lists") {
        document.getElementById("list_tab_1").classList.remove("inactive_list_tab");
    } else if (what_list == "Saved Lists") {
        document.getElementById("list_tab_2").classList.remove("inactive_list_tab");
    } else if (what_list == "Other") {
        document.getElementById("list_tab_3").classList.remove("inactive_list_tab");
    }
}

document.getElementById("list_tab_1").addEventListener('click', () => { list_tab("My lists"); });
document.getElementById("list_tab_2").addEventListener('click', () => { list_tab("Saved Lists"); });
document.getElementById("list_tab_3").addEventListener('click', () => { list_tab("Other"); });



// toggle list displaying mode (Card / Table)

var current_mode = 2;

swap_list_mode = (select_list) => {
    if (select_list == "Table list" && current_mode != 1) {
        document.getElementById("display_session_data").style.display = "block";
        document.getElementById("display_table_data").style.display = "none";

        document.getElementById("display_list_mode_2").classList.remove("display_list_clickable");
        document.getElementById("display_list_mode_1").classList.add("display_list_clickable");
        current_mode = 1;
    } else if (select_list == "Card list" && current_mode != 2) {
        document.getElementById("display_session_data").style.display = "none";
        document.getElementById("display_table_data").style.display = "grid";

        document.getElementById("display_list_mode_1").classList.remove("display_list_clickable");
        document.getElementById("display_list_mode_2").classList.add("display_list_clickable");
        current_mode = 2;
    } else {
        console.log("Already selected.");
    }
}

document.getElementById("display_list_mode_1").addEventListener('click', () => { swap_list_mode("Card list"); });
document.getElementById("display_list_mode_2").addEventListener('click', () => { swap_list_mode("Table list"); });



