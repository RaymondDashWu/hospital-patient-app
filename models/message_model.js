const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Message = mongoose.model('Message', {
    message_title: String,
    message_content: String
});

module.exports = Message;
