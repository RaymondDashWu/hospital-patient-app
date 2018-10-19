const Message = require('../models/message_model');
const Hospital = require('../models/hospital_model')

console.log("Connected to messages controller")
module.exports = function (app, Message) {
    app.get('/messages', (req, res) => {
        // Enables ability to update/delete individual messages
        if (req.query._id) {
            Message.find({
                    _id: req.query._id
                }).limit(1)
                .then(messages => {
                    res.render('messages-show', {
                        messages: messages[0]
                    });
                })
                .catch(err => {
                    console.log(err.message);
                });
        } else {
            // Shows all messages with patient
            Message.find()
                .then(messages => {
                    res.render('messages-index', {
                        messages: messages
                    });
                })
                .catch(err => {
                    console.log(err.message);
                });
        }
    });

    app.get('/messages/new', (req, res) => {
        res.render('messages-new', {})
    })

    app.post('/messages', (req, res) => {
        Message.create(req.body)
            .then(message => {
                Message.find({}).then(messages => {
                    res.render('messages-index', {
                        messages: messages
                    })
                })
            })
    })

    app.delete('/messages', (req, res) => {
        console.log('delete')
        if (req.query._id) {
            Message.findByIdAndRemove({
                    _id: req.query._id
                })
                .then(messages => {
                    // res.render('messages-show', {messages: messages[0]});
                    res.redirect('/messages')
                })
                .catch(err => {
                    console.log(err.message);
                });
        } else {
            console.log("Message could not be deleted")
        }
    })

    app.put('/messages/edit', (req, res) => {
        console.log(req.body)
        if (req.query._id) {
            Message.findByIdAndUpdate({
                    _id: req.query._id
                }, req.body)
                .then(messages => {
                    res.send()
                    // res.render('messages-show', {messages: messages[0]});
                })
                .catch(err => {
                    console.log(err.message);
                });
        } else {
            console.log("Message could not be edited")
        }
    })
}