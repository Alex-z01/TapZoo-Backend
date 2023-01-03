const mongoose = require('mongoose');

const defaultCells = []

for(let i = 0; i < 4; i++)
{
for(let j = 0; j < 4; j++)
{
  defaultCells.push({
    pos_x: i,
    pos_y: j,
    status: 'VALID',
    current_income: 0
  });
}
}

const zooSchema = new mongoose.Schema({
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
    required: true,
  },
  width: {
    type: Number,
    required: true,
    default: 8
  },
  height: {
    type: Number,
    required: true,
    default: 8
  },
  structures: [{
    type: Object,
    default: []
  }],
  cells: [{
    type: Object,
    default: defaultCells
  }]
});
  
const Zoo = mongoose.model('zoo', zooSchema);

module.exports = Zoo;