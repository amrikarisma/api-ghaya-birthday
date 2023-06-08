const express = require("express");
const messageModel = require("./models");
const app = express();


app.get('/', (req, res) => {
    res.send('API')
})

app.post('/message/send', async (req, res) => {
    const message = new messageModel(req.body);

    try {
        await message.save();
        res.send(message);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/message", async (req, res) => {
    const message = await messageModel.find({});

    try {
        res.send(message);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = app;
