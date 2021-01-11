
const request = require('request')

const recentlyplayedgames = (playerID, callback) => {
    var gamelistarray = [];
    const url = 'https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=4AB055F4351D22E1C36B75ECF5B347AF&steamid=' + playerID;
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to find player!', undefined)
        } else if (typeof body.response == "undefined") {
            callback("Player doesn't exist.")
        } else if (typeof body.response.total_count == "undefined") {
            callback("Game history is unavailable.")
        } else if (body.response.total_count === 0) {
            callback("This user hasn't played any games recently.")
        } else if (body.response.games.length > 0) {
            for (let i = 0; i < body.response.games.length; i++) {
                // make object with set properties
                const game = {
                    appid: false,
                    name: false,
                    playtime_2weeks: false,
                    playtime_forever: false,
                    img_icon_url: false,
                    img_logo_url: false
                };
                const me = Object.create(game);
                me.appid = body.response.games[i].appid
                me.name = body.response.games[i].name
                me.playtime_2weeks = body.response.games[i].playtime_2weeks
                me.img_icon_url = body.response.games[i].img_icon_url
                // add object to gamelistarray
                gamelistarray.push(me)
                // appidarray.push(body.response.games[i].appid)
            }
            callback(undefined, {
                // appid: appidarray,
                games: gamelistarray
            })
        }
    })
}
/*
recentlyplayedgames("76561198035585856", (error, data) => {
    console.log('Error: ', error)
    console.log('Data: ', data)
})
*/
module.exports = recentlyplayedgames




