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

app.post("/pay", async (req, res) => {
    try {
        let transactionToken = null;
        const now = new Date();
        const midtransClient = require('midtrans-client');
        // Create Snap API instance
        let snap = new midtransClient.Snap({
            // Set to true if you want Production Environment (accept real transaction).
            isProduction: false,
            serverKey: 'SB-Mid-server-x3mLdCNV2nqhWViv37LVkxeP'
        });

        let parameter = {
            "transaction_details": {
                "order_id": "GS-TRX-" + now.getTime(),
                "gross_amount": req.body.amount
            },
            "credit_card": {
                "secure": true
            },
            "item_details": req.body.items,
            "customer_details": {
                "first_name": req.body.first_name,
                "last_name": req.body.last_name,
                "email": req.body.email,
                "phone": req.body.phone,
            }
        };
        console.log(parameter)
        snap.createTransaction(parameter)
            .then((transaction) => {
                // transaction token
                transactionToken = transaction.token;
                console.log('transactionToken:', transactionToken);
                res.send(transactionToken);
            })

    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = app;
