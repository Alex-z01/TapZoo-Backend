const { json } = require('express');
const mongoose = require('mongoose');
const { sendEmail } = require('../gmail');
const { sendVerificationEmail } = require('../mail');
const Player = require('../models/Player');
const Zoo = require('../models/Zoo');
const { sendVerificationSMS } = require('../phone');

module.exports = server => {

    // Routes
    server.post('/create', async (req, res) => {
        const { rUsername, rPassword, rEmail} = req.body;

        if (!rUsername) {
            res.send({ code: 1, response: "Please input a valid username" });
            return;
        }

        if(!rPassword) {
            res.send({ code: 1, response: "Please input a valid password" });
            return;
        }

        if(!rEmail) {
            res.send({ code: 1, response: "Please input a valid email" });
            return;
        }

        // Check if the username is already taken
        var player = await Player.findOne({ username: rUsername });
        if (player) {
            res.send({ code: 1, response: "Username already exists" });
            return;
        }

        // Generate a random verification code
        var verificationCode = Math.floor(Math.random() * 1000000);

        // Create a new Player object with the provided username and password
        player = new Player({
            username: rUsername,
            password: rPassword,
            email: rEmail,
            verificationCode: verificationCode
        });

        zoo = new Zoo({
            player: player._id,
            structures: []
        });

        // Save the player to the database
        await player.save();
        await zoo.save();

        // Create a cookie thast stores the username
        res.cookie('username', player.username);

        // Send an email with the verification code
        console.log(rEmail + " " + verificationCode);
        try {
            // Using SendGrid web API
            await sendVerificationEmail(rEmail, verificationCode);

            // Using SMTP
            // await sendEmail(rEmail, "TapZoo Verification Code", verificationCode);

        } catch (error) {
            res.send({ code : 1, response: error.message});
            return;
        }

        // Send the response
        res.send({ code: 0, response: `Account created for ${player.username}!` });
    });

    server.post('/verify', async (req, res) => {
        const { verificationCode } = req.body;

        console.log(req.cookies.username);

        // Check if the username and verification code are provided
        if (req.cookies.username == null || verificationCode == null) {
            res.send({ code: 1, response: "username of verification code missing" });
            return;
        }

        // Check if the username exists and the verification code matches
        var player = await Player.findOne({ username: req.cookies.username });
        if (player == null || player.verificationCode != verificationCode) {
            res.send({ code: 1, response: "Invalid verification code" });
            return;
        }

        // Verify the player
        player.verified = true;
        await player.save();

        // Send the response
        res.send({ code: 0, response: `${player.username} has been verified! Zoo created` });
    });

    server.post('/login', async (req, res) => {
        const { rUsername, rPassword } = req.body;

        if (!rUsername) {
            res.send({ code: 1, response: "Please input a valid username", msg: {} });
            return;
        }

        if(!rPassword) {
            res.send({ code: 1, response: "Player not found :(", msg: {} });
            return;
        }
    
        // Find the player with the provided username
        var player = await Player.findOne({ username: rUsername });

        // Check if the player exists and if the password is correct
        if (!player || rPassword != player.password) {
            res.send({ code: 1, response: "Player not found :(", msg: {} });
            return;
        }
    
        if (!player.verified)
        {
            console.log("not verified");
            res.send({ code: 1, response: "Account is not verified!", msg: {} });
            return;
        }

        // Update the player's login time
        player.login = Date.now();
        player.save();

        var zoo = await Zoo.findOne({player: player._id});

        if(zoo == null)
        {
            zoo = new Zoo({
                player: player._id
            });

            await zoo.save();
        }

        res.send({ code: 0, response: "Logged in!", msg: 
            {
                playerData: JSON.stringify(player),
                zooData: JSON.stringify(zoo)
            }
        });
    });

    server.post('/logout', async (req, res) => {
        // Use destructuring assignment to get the username from the request
        const { playerId } = req.body;
    
        // Find the player with the provided username
        const player = await Player.findById(playerId);
    
        // Check if the player exists
        if (player == null) {
            console.log(`Error: player doesn't exist`);
            return;
        }
    
        // Update the player's logout time
        player.logout = Date.now();
        player.save();
    
        // Log the player's logout
        console.log(`${player.username} logged out.`);
        res.send({ code: 0, response: `${player.username} logged out.`});
    });

    server.post('/users/:playerId/update', async (req, res) => {
        const playerId = req.params.playerId;

        const update = req.body;

        data = JSON.parse(update.data);

        const player = Player.findByIdAndUpdate(playerId, data, (error, player) => {
            if (error)
            {
                console.log(error);
            }
            else {
                console.log(data);
            }
        });
    })
}

