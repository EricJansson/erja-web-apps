
// ADD NEW OBJECT INTO EDIT MODE

var ALL_QUESTIONS_loaded = false;


make_full_edit_list = () => {
    for (let i = 1; i <= ALL_QUESTIONS.length; i++) {
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
    } else if (typeof data_type == "number") {
        editmode_new_div.classList = "edit_question_num";
        editmode_new_div.innerText = data_type + ".";
    }
    document.getElementById("edit_object_" + index).appendChild(editmode_new_div);
}

make_new_object = (index) => {
    editmode_new_div = document.createElement("DIV");
    editmode_new_div.classList = "edit_object_grid";
    editmode_new_div.id = "edit_object_" + index;
    current_object_id = editmode_new_div.id;
    document.getElementById("display_session_data").appendChild(editmode_new_div);
}


add_object_data = (object_id, object_data, index, object_classlist) => {
    index = index || "";
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
            editmode_new_div.innerText = ALL_QUESTIONS[index - 1].question;
        } else if (object_data == "answer") {
            editmode_new_div.innerText = ALL_QUESTIONS[index - 1].answer;
        } else if (object_data == "alt_answer") {
            editmode_new_div.innerText = ALL_QUESTIONS[index - 1].alt_answer;
        }
    }
    document.getElementById("edit_object_" + index).appendChild(editmode_new_div);

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
    add_edit_btn(index, object_data);
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

    current_edited_data_btn = document.getElementById(type + "_" + index);
    current_edited_data_btn.innerHTML = `<input id="edit_data_input_field" placeholder="` + ALL_QUESTIONS[index - 1][type] + `"></input>`
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

    ALL_QUESTIONS[index - 1][type] = current_edited_data;

    current_edited_data_btn.innerHTML = ALL_QUESTIONS[index - 1][type];
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

    current_edited_data = ALL_QUESTIONS[index - 1][type];

    current_edited_data_btn.innerHTML = ALL_QUESTIONS[index - 1][type];
}








