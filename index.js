const express = require('express');
const app = express();
const fs = require("fs");
const cors = require('cors');
const bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(cors());

app.post('/message/send', (req, res) => {
    console.log(req.body)
    // importing the fs module
    let message;
    // initializing a JavaScript object
    const obj = {
        name: req.body.name,
        message: req.body.message,
        gift: 0,
    };

    const fs = require("fs");

    // the .json file path
    const JSON_FILE = "data.json";

    try {
        // reading the JSON file
        let jsonData = fs.readFileSync(JSON_FILE);

        // parsing the JSON content
        const data = JSON.parse(jsonData);

        data.push(obj);

        jsonData = JSON.stringify(data);

        // updating the JSON file
        fs.writeFileSync(JSON_FILE, jsonData);
        message = "Sukses";
    } catch (error) {
        // logging the error
        console.error(error);
        message = error;
        throw error;
    }
    res.send(message);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`API server listening on port ${port}`);
});