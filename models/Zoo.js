const mongoose = require('mongoose');

const zooSchema = new mongoose.Schema({
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
    required: true,
  },
  width: {
    type: Number,
    required: true,
    default: 15
  },
  height: {
    type: Number,
    required: true,
    default: 15
  },
  structures: [{
    type: Object,
    default: []
  }],
  cells: [{
    type: Object,
    default: []
  }],
  lockedSections: [{
    type: Number,
    default: []
  }]
});
  
const Zoo = mongoose.model('zoo', zooSchema);

module.exports = Zoo;