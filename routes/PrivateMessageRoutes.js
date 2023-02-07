const express = require('express');
const privateMessageModel = require('../models/PrivateMessage');
const app = express();

app.post('/privateMessage', async (req, res) => {
    const privateMessage = new privateMessageModel(req.body);
    try {
        await privateMessage.save((err) => {
            if (err) {

                res.send(err)
            } else {
                res.send(privateMessage);
            }
        });
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/privateMessage', async (req, res) => {
    const privateMessage = await privateMessageModel.find({});
    try {
        res.status(200).send(privateMessage);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = app