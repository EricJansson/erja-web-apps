
const fs = require('fs');
const fileName = __dirname + "/test_JSON.json";

const file = require(fileName);



var my_JSON_path = '/scripts/learn_for_fun/JSON_files/my_lesson.json';
const add_to_lesson = (my_JSON_file, callback) => {

    fs.writeFile(fileName, JSON.stringify(my_JSON_file, undefined, 2), function writeJSON(err) {
        if (err) {
            callback(err, null)
            return console.log(err);
        }
        // console.log(JSON.stringify(file));
        console.log('writing to ' + fileName);
    });

}

module.exports = add_to_lesson