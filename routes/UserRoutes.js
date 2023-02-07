const express = require('express');
const userModel = require('../models/User');
const app = express();
app.post('/user', async (req, res) => {

    console.log(req.body)
    
    const user = new userModel(req.body);
    try {
        await user.save((err) => {
            if (err) {

                res.send(err)
            } else {
                res.send(user);
            }
        });
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/user', async (req, res) => {
    const user = await userModel.find({});
    try {
        res.status(200).send(user);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = app