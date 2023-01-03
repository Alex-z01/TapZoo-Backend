
const Zoo = require('../models/Zoo');

module.exports = server => {

    server.get('/zoos/:playerId', async (req, res) => {
        const playerId = req.params.playerId;

        const filter = { player: playerId };

        const zoo = Zoo.findOne(filter, (error, zoo) => {
            if(error)
            {
                res.send(error);
            } else {
                res.send(zoo);
            }
        });
    })

    server.post('/zoos/:playerId/update', async (req, res) => {
        const playerId = req.params.playerId;

        const filter = { player: playerId };

        const update = req.body;

        data = JSON.parse(update.data);

        var cells = data.cells;
        cells = cells.filter(cell => cell.state == 1);
        
        const zoo = Zoo.findOneAndUpdate(filter, data, (error, zoo) => {
            if(error){
                console.log(error);
            } else {
                zoo.structures = data;
            }
        });
    });
}