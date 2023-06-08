const express = require('express');
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
const Router = require("./routes")
import { inject } from '@vercel/analytics';

app.use(express.json());
app.use(cors());
app.use(Router);

mongoose.connect(process.env.MONGODB_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`API server listening on port ${port}`);
    inject();
});