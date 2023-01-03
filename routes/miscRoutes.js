const mongoose = require('mongoose');
const Player = require('../models/Player');
const Zoo = require('../models/Zoo');

module.exports = server => {

    server.post('/leaderboards/:stat', async (req, res) =>{
        const { stat } = req.params;

        const sort = {};
        sort[stat] = -1;

        Player.find().sort(sort).exec((error, players) => {
            if(error) {
                console.log(error);
            }
            else {
                res.send({ code: 0, msg: players });
            }
        });
    })

}