
const request = require('request')


const idconverter = (playerId, callback) => {
    const url = 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=4AB055F4351D22E1C36B75ECF5B347AF&steamids=' + playerId
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to player summaries!', undefined)
        } else if (typeof body.response.players === "undefined") {
            callback('Can\'t find player. Try another ID.')
        } else if (body.response.players.length > 0) {
            callback(undefined, {
                playerName: body.response.players[0].personaname,
                playerAvatar: body.response.players[0].avatarmedium,
                playerStatus: body.response.players[0].personastate,
                playerCreated: body.response.players[0].timecreated,
                playerVisibility: body.response.players[0].communityvisibilitystate,
                playerIngame: body.response.players[0].gameextrainfo,
                playerIngameid: body.response.players[0].gameid,
                playerLastlogoff: body.response.players[0].lastlogoff
            })
        }
    })
}


module.exports = idconverter

