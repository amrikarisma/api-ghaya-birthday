const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    presence: {
        type: String,
    },
    gift: {
        type: Number,
    },
});
MessageSchema.set('timestamps', true);
const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;