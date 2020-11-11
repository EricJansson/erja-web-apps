const request = require('request')

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

// const geocode = (address, callback) => {
//     const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicmFwaWRhbGwiLCJhIjoiY2tnMnVnbTBkMDNxdDJ3bDY0bHV3YnE3cSJ9.urAkPFGMJPpPDFH_MlzO1Q&limit=1';
//     request({ url, json: true }, (error, {body}) => {
//         if (error) {
//             callback('Unable to connect to location services!', undefined)
//         } else if (body.features.length === 0) {
//             callback('Can not find location. Try another search.')
//         } else if (body.features.length > 0) {
//             callback(undefined, {
//                 longitude: body.features[0].center[1],
//                 latitude: body.features[0].center[0],
//                 location: body.features[0].place_name
//             })
//         }
//     })
// }

// geocode('Gävle', (error, data) => {
//     console.log('Error: ', error)
//     console.log('Data: ', data)
// })

module.exports = geocode
