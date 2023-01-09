
const Zoo = require('../models/Zoo');

function CreateZoo(playerId) {
    var defaultCells = []

    for(let i = 0; i < 15; i++)
    {
      for(let j = 0; j < 15; j++)
      {
        defaultCells.push({
          pos_x: i,
          pos_y: j,
          status: 'INVALID',
          current_income: 0
        });
      }
    }

    var zoo = Zoo.create({
        player: playerId,
        cells: defaultCells
    })

    return zoo;
}

module.exports = server => {

    server.get('/zoos/:playerId', async (req, res) => {
        const playerId = req.params.playerId;

        const filter = { player: playerId };

        var zoo = await Zoo.findOne(filter);

        if(zoo == null)
        {
            zoo = new Zoo({
                player: playerId
            });

            await zoo.save();
        }

        res.send({code: 0, msg: {zoo}});
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