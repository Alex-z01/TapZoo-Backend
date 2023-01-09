const mongoose = require('mongoose');
const Player = require('../models/Player');

module.exports = server => {

    server.get('/leaderboard/:stat', async (req, res) =>{
        const { stat } = req.params;

        console.log(`Fetching leaderboard with stat ${stat}`);

        const sort = {};
        sort[stat] = -1;

        const select = {_id: 0, username: 1, zooCoins:1, level: 1};

        Player.find().select(select).sort(sort).exec((error, players) => {
            if(error) {
                console.log(error);
            }
            else {
                res.send({ code: 0, msg: 
                    {
                        LeaderboardData: JSON.stringify(players)    
                    } 
                });
            }
        });
    })

}