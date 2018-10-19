const Message = require('../models/message_model');
const Hospital = require('../models/hospital_model')


console.log("Connected to messages controller")
module.exports = function (app, Message) {
    app.get('/messages', (req, res) => {
        Message.find()
            .then(messages => {
                res.render('messages-index', {messages: messages});
            })
            .catch(err => {
                console.log(err.message);
            });
    });

    app.get('/messages/new', (req, res) => {
        res.render('messages-new', {})
    })

    app.post('/messages',(req, res) => {
        Message.create(req.body)
        .then(message => {
            Message.find({}).then(messages => {
                res.render('messages-index', {messages: messages})
            })
        })
    })



    
    
    app.post('/messages/:id/comments', (req, res) => {
        Comment.create(req.body)
            .then(comment => {
                res.status(200).send({comment:comment});
            })
            .catch((err) => {
                res.status(400).send({err:err})
            })
    })

    app.put('/hospitals/messages/:id', (req, res) => {
        Review.findByIdAndUpdate(req.params.id, req.body)
            .then(message => {
                res.redirect(`/hospitals/${req.params.hospital_id}`)
            })
            .catch(err => {
                console.log(err.message)
            })
    });

    app.delete('/comments/:id', (req, res) => {
        Comment.findByIdAndRemove(req.params.id)
            .then(comment => {
                console.log(comment)
                res.redirect(`/hospitals/messages/${comment.message_id}`)
            })
            .catch((err) => {
                console.log(err.message)
            })
    })

    app.delete('/messages/comments/:id', function (req, res) {
        Comment.findOneAndDelete({ _id: req.params.id })
            .then(comment => {
                res.status(200).send(comment);
            })
            .catch((err) => {
                console.log(err.message);
                res.status(400).send(err)
            })
    })
}


/*
    app.post('/reviews/comments', (req, res) => {
        Comment.create(req.body).then(comment => {
        res.redirect(`/reviews/${comment.reviewId}`)
    }).catch((err) => {
        console.log(err.message)
    })
    });

*/
