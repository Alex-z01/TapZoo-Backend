const express = require("express");
const cookieParser = require("cookie-parser");
const keys = require('./config/keys');

// Server initialization
const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

console.log(keys.port);
console.log(keys.mongoURI);

const hostname = '0.0.0.0'

// Setting up DB
const mongoose = require('mongoose');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true })
  .then(res => console.log('Connected to DB!'))
  .catch(err => console.log(err));

  
require('./models/Player');
require('./models/Zoo');

// Setup routes
require('./routes/accountRoutes')(server);
require('./routes/zooRoutes')(server);
require('./routes/miscRoutes')(server);

server.get("/", (req, res) => {
  console.log("HELLO!");
});

server.listen(keys.port, hostname, () => console.log(
    `Express started on http://${hostname}:${keys.port}; ` +
    `press Ctrl-C to terminate.`
))