


const request = require('request')



const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=dcc0654666b3b3d2b392565814d406fd&query=' + latitude + ',' + longitude + '&units=m'
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to reach weather service. ' + error, undefined)
        } else if (body.error) {
            callback('Unable to find location. ' + body.error.info, undefined)
        } else {
            callback(undefined, "Weather currently in: " + body.location.region + ", " + body.location.country + ". " + body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degress out. It Feels like " + body.current.feelslike + " degress out.<br><br>Time and date in selected region: " + body.location.localtime)
        }
    })
}


// forecast(-75.7088, 44.1545, (error, data) => {
//     console.log('Error', error)
//     console.log('Data', data)
//   })

module.exports = forecast
