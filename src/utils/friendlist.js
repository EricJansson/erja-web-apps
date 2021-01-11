
const request = require('request')

const friendlist = (playerID, callback) => {
    var friendlistArray = [];
    const url = 'https://api.steampowered.com/ISteamUser/GetFriendList/v1/?key=4AB055F4351D22E1C36B75ECF5B347AF&steamid=' + playerID;
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to find user!', undefined)
        } else if (Object.keys(body).length === 0) {
            callback(" is hidden. Friendlist unavailable.")
        } else if (typeof body.friendslist == "undefined") {
            callback("Unable to find user! Try another ID.")
        } else if (body.friendslist.friends.length > 0) {
            for (let i = 0; i < body.friendslist.friends.length; i++) {
                friendlistArray.push(body.friendslist.friends[i].steamid)
            }
            callback(undefined, {
                friendids: friendlistArray,
                friends: body.friendslist.friends.length
            })
        } else if (body.friendslist.friends.length === 0) {
            callback("User has no friends.")
        }
    })
}

/*friendlist("76561198035585856", (error, data) => {
    console.log('Error: ', error)
    console.log('Data: ', data)
})*/

module.exports = friendlist

