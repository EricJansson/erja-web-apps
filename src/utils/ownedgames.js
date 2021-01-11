

const request = require('request')

const ownedgames = (playerID, callback) => {
    var gamelistarray = [];
    const url = 'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=4AB055F4351D22E1C36B75ECF5B347AF&steamid=' + playerID + '&include_appinfo=true&format=json&include_played_free_games=true'
    // const url = 'https://api.steampowered.com/ISteamUser/GetFriendList/v1/?key=4AB055F4351D22E1C36B75ECF5B347AF&steamid=' + playerID;
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to find player!', undefined)
        } else if (typeof body.response == "undefined") {
            callback("Can't find player.")
        } else if (typeof body.response.games == "undefined") {
            callback("No games have been played.")
        } else if (body.response.games.length > 0) {
            for (let i = 0; i < body.response.games.length; i++) {
                if (body.response.games[i].playtime_forever < 1 || body.response.games[i].img_icon_url === '') {
                    continue
                }
                // make object with set properties
                const game = {};
                const me = Object.create(game);
                me.appid = body.response.games[i].appid
                me.name = body.response.games[i].name
                me.playtime_forever = body.response.games[i].playtime_forever
                me.img_icon_url = body.response.games[i].img_icon_url
                // add object to gamelistarray
                gamelistarray.push(me)
                // appidarray.push(body.response.games[i].appid)
            }
            // sort array by playtime_forever (biggest first)
            var sortable = gamelistarray;
            sortable.sort(function (a, b) {
                return b.playtime_forever - a.playtime_forever;
            });
            callback(undefined, {
                owned_games: sortable
            })
        }
    })
}

/*
ownedgames("76561198035585856", (error, data) => {
    console.log('Error: ', error)
    console.log('Data: ', data.owned_games)
})      */

module.exports = ownedgames

