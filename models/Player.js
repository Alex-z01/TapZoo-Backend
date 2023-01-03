const mongoose = require('mongoose');

// create the player schema
const playerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  verificationCode: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    default: false,
    required: true
  },
  zooCoins: {
    type: Number,
    default: 1,
    required: true
  },
  level: {
    type: Number,
    default: 1,
    required: true
  },
  loginTime: {
    type: Date,
    default: Date.now
  },
  logoutTime: {
    type: Date
  }
});

// create user model
const Player = mongoose.model('player', playerSchema);

// export user model
module.exports = Player;