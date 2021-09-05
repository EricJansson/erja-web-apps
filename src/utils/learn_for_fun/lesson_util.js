
const fs = require('fs');

const fileName = __dirname + "/test_JSON.json";
const file = require(fileName);
/*
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicmFwaWRhbGwiLCJhIjoiY2tnMnVnbTBkMDNxdDJ3bDY0bHV3YnE3cSJ9.urAkPFGMJPpPDFH_MlzO1Q&limit=1';
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Can not find location. Try another search.')
        } else if (body.features.length > 0) {
            callback(undefined, {
                longitude: body.features[0].center[1],
                latitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}
*/

var obj;
/*const read_my_lesson = (file_name, callback) => {
    obj = JSON.parse(fs.readFileSync(file_name, 'utf8'));
}*/
var my_JSON_path = '/scripts/learn_for_fun/JSON_files/my_lesson.json';

const read_my_lesson = (dir_path, callback) => {
    var file_path = dir_path + my_JSON_path;
    fs.readFile(file_path, 'utf8', function (err, data) {
        if (err) {
            callback('Unable to find document! Check path.', undefined)
        } else {
            obj = JSON.parse(data);
            callback(undefined, {
                jsondata: obj
            })
        }
    });
}

module.exports = read_my_lesson

