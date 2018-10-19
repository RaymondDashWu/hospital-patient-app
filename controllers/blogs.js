const Blog = require('../models/blog_model');
const Hospital = require('../models/hospital_model')

console.log("Connected to blog controller")
module.exports = function (app, Blog) {
    app.get('/blogs', (req, res) => {
        // Enables ability to update/delete individual messages
        if (req.query._id) {
            Blog.find({
                    _id: req.query._id
                }).limit(1)
                .then(blogs => {
                    res.render('blogs-show', {
                        blogs: blogs[0]
                    });
                })
                .catch(err => {
                    console.log(err.message);
                });
        } else {
            // Shows all messages with patient
            Blog.find()
                .then(blogs => {
                    res.render('blogs-index', {
                        blogs: blogs
                    });
                })
                .catch(err => {
                    console.log(err.message);
                });
        }
    });

    app.get('/blogs/new', (req, res) => {
        res.render('blogs-new', {})
    })

    app.post('/blogs', (req, res) => {
        Blog.create(req.body)
            .then(blog => {
                Blog.find({}).then(blogs => {
                    res.render('blogs-index', {
                        blogs: blogs
                    })
                })
            })
    })

    app.delete('/blogs', (req, res) => {
        console.log('delete')
        if (req.query._id) {
            Blog.findByIdAndRemove({
                    _id: req.query._id
                })
                .then(blogs => {
                    res.redirect('/blogs')
                })
                .catch(err => {
                    console.log(err.message);
                });
        } else {
            console.log("Blog could not be deleted")
        }
    })

    app.put('/blogs/edit', (req, res) => {
        console.log(req.body)
        if (req.query._id) {
            Blog.findByIdAndUpdate({
                    _id: req.query._id
                }, req.body)
                .then(blogs => {
                    res.send()
                })
                .catch(err => {
                    console.log(err.message);
                });
        } else {
            console.log("Blog could not be edited")
        }
    })
}











// const Blog = require('../models/blog_model');
// const express = require('express');

// // TO-DO: Change out hospital_id with ID of one hospital***
// console.log("Connected to blogs controller")
// function blogs(app) {
//     app.get('/blogs', (req, res) => {
//         Blog.find()
//             .then(blogs => {
//                 res.render('blogs-index', {blogs: blogs});
//             })
//             .catch(err => {
//                 console.log(err.message);
//             });
//     });

//     app.delete('/hospitals/:hospital_id/blogs/:id', function (req, res) {
//         Blog.findByIdAndRemove(req.params.id)
//             .then((blog) => {
//                 res.redirect(`/hospitals/${req.params.hospital_id}`)
//             })
//             .catch((err) => {
//                 console.log(err.message)
//             })
//     })

//     app.delete('/hospitals/:hospital_id/blogs/comments/:id', function (req, res) {
//         console.log("DELETE comment")
//         Comment.findByIdAndRemove(req.params.id)
//             .then((comment) => {
//                 res.redirect(`/movies/${req.params.movieId}`)
//             })
//             .catch((err) => {
//                 console.log(err.message)
//             })
//     });

//     app.put('/hospitals/:hospital_id/blogs/:id', (req, res) => {
//         Blog.findByIdAndUpdate(req.params.id, req.body)
//             .then(blog => {
//                 res.redirect(`/hospitals/${req.params.hospital_id}`)
//             })
//             .catch(err => {
//                 console.log(err.message)
//             })
//     });

//     app.get('/hospitals/:hospital_id/blogs/:id/edit', function (req, res) {
//         Blog.findById(req.params.id, function(err, blog) {
//             res.render('blogs-edit', {blog: blog});
//         })
//     });

//     app.get('/hospitals/:hospital_id/blogs/new', (req, res) => {
//         res.render('blogs-new', {hospital_id: req.params.hospital_id})
//     })

//     // app.post('/movies/:movieId/reviews', (req, res) => {
//     //     console.log(req.body)
//     // })

//     app.post('/hospitals/:hospital_id/blogs', (req, res) => {
//         Blog.create(req.body)
//             .then((review) => {
//                 // console.log(review);
//                 res.redirect(`/hospitals/${req.params.hospital_id}`);
//             })
//             .catch((err) => {
//                 console.log(err.message);
//         })
//     });

//     app.get('/hospitals/:hospital_id/blogs/:id', (req, res) => {
//         Blog.findById(req.params.id)
//             .then(review => {
//                 Comment.find({reviewId: req.params.id})
//                     .then(comments => {
//                         res.render('blogs-show', {blog: blog, comments: comments.reverse()})
//                     })
//             })
//             .catch((err) => {
//                 console.log(err.message);
//             })
//     });
// }

// module.exports = blogs