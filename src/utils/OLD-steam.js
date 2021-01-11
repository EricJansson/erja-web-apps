
const request = require('request')
const chalk = require('chalk')






var myGamesPlayed = [
    {
        appid: 427520,
        name: 'Factorio',
        playtime_forever: 22427,
        img_icon_url: '267f5a89f36ab287e600a4e7d4e73d3d11f0fd7d'
    },
    {
        appid: 646570,
        name: 'Slay the Spire',
        playtime_forever: 31342,
        img_icon_url: '33ea124ea8c03a9ce7012d34c3b348a351612fca'
    },
    {
        appid: 814370,
        name: 'Monster Sanctuary',
        playtime_forever: 9684,
        img_icon_url: '35e86c5470c9258e13ea127c0a72f7da7502ebe6'
    },
    {
        appid: 570,
        name: 'Dota 2',
        playtime_forever: 521509,
        img_icon_url: '0bbb630d63262dd66d2fdd0f7d37e8661a410075'
    }
]



// var myGamesPlayed = {
//     car: 300,
//     bike: 60,
//     motorbike: 200,
//     airplane: 1000,
//     helicopter: 400,
//     rocket: 8 * 60 * 60
// };
var sortable = myGamesPlayed;
// var sortable = [];
// for (var game in myGamesPlayed) {
//     sortable.push([myGamesPlayed[game].playtime_forever, myGamesPlayed[game]]);
// }
console.log(sortable)

console.log(chalk.red("SPACE"))
console.log(chalk.red("SPACE"))
console.log(chalk.red("SPACE"))

// sortable.sort(function (a, b) {
//     return a[0] - b[0];
// });

sortable.sort(function (a, b) {
    return b.playtime_forever - a.playtime_forever;
});

console.log(sortable)



/*
var maxSpeed = {
    car: 300,
    bike: 60,
    motorbike: 200,
    airplane: 1000,
    helicopter: 400,
    rocket: 8 * 60 * 60
};
var sortable = [];
for (var vehicle in maxSpeed) {
    sortable.push([vehicle, maxSpeed[vehicle]]);
}

sortable.sort(function(a, b) {
    return a[1] - b[1];
});
*/


/*
var myObject = {}

myObject["Dota 2"] = "520822"
myObject["Team Fortress 2"] = "96"
myObject["Slay the Spire"] = "31131"


var sortable = [];
for (var myGames in myObject) {
    sortable.push([myGames, myObject[myGames]]);
}

sortable.sort(function(a, b) {
    return b[1] - a[1];
});


console.log(Math.round(myObject['Dota 2'] / 60 * 10) / 10 + " hours.")
console.log(myObject)

console.log(sortable)
*/


// var d = new Date(1293234957 * 1000);

// // var d = new Date(data.usercreated);
// console.log(d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear())

/*
const rapidall = "76561198035585856";
const blakan = "76561198035952833";
const honken = "76561198226138660";
const dakini = "76561198331058424";
const artificial = "76561198326419477";
const nessie = "76561198201294175";

const selectedSearch = honken

var friendlist = [];

const getFriendSteamIds = (playerID, callback) => {
    const url = 'https://api.steampowered.com/ISteamUser/GetFriendList/v1/?key=4AB055F4351D22E1C36B75ECF5B347AF&steamid=' + playerID;
    console.log(url)
    request({ url, json: true }, (error, {body} = {}) => {
        if (error) {
            callback('Unable to find player!', undefined)
        } else if (body.friendslist.friends.length === 0) {
            callback("User doesn't have any friends.")
        } else if (body.friendslist.friends.length > 0) {
            for (let i = 0; i < body.friendslist.friends.length; i++) {
                friendlist.push(body.friendslist.friends[i].steamid)
            }
            callback(undefined, {
                friendIds: friendlist,
                friends: body.friendslist.friends.length
            })
        }
    })
}


const idConverter = (playerId, callback) => {
    const url = 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=4AB055F4351D22E1C36B75ECF5B347AF&steamids=' + playerId
    request({ url, json: true }, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to player summaries!', undefined)
        } else if (body.response.players.length === 0) {
            callback('Can not find player. Try another ID.')
        } else if (body.response.players.length > 0) {
            callback(undefined, {
                playerName: body.response.players[0].personaname
            })
        }
    })
}


getFriendSteamIds(selectedSearch, (error, data) => {
    if (error) {
        return console.log('Error: ', error)
    }
    console.log(chalk.yellow("Number of friends: ") + chalk.green.inverse(data.friendIds.length))
    console.log(chalk.yellow('Friend names:'))
    for (let i = 0; i < data.friendIds.length; i++) {
        idConverter(data.friendIds[i], (error, dataconverter) => {
            if (error) {
                return console.log('Error: ', error)
            }
            console.log(chalk.green(dataconverter.playerName))
        })
    }
})

// idConverter('76561197980099418', (error, data) => {
//     console.log('Error: ', error)
//     console.log('Data: ', data)
// })



*/



/*
const idConverter = (playerId, callback) => {
    // const url = 'https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=4AB055F4351D22E1C36B75ECF5B347AF&steamid=' + "76561198035585856";
    const url = 'https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=4AB055F4351D22E1C36B75ECF5B347AF&steamid=' + playerId;
    request({ url, json: true }, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to player summaries!', undefined)
        } else if (body.response.players.length === 0) {
            callback('Can not find player. Try another ID.')
        } else if (body.response.players.length > 0) {
            callback(undefined, {
                playerName: body.response.players[0].personaname
            })
        }
    })
}
*/




/*
https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=4AB055F4351D22E1C36B75ECF5B347AF&steamid=76561198035585856&include_played_free_games=true


compare ingame time before and after
include_played_free_games=true (will show free games too, 570 = dota)

(body.response.games[i].appid === 570) {
    body.response.games[i].playtime_forever // this is the time spent on this game
}
*/

/*
SteamID
Rapidall: 76561198035585856
Johan: 76561198035952833
fredrik (honken): 76561198226138660
fredrik (dakini): 76561198331058424
Fredrik (artifial AI): 76561198326419477
*/

// module.exports = getPlayerFriends
