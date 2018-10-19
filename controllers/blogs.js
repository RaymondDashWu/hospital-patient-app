const Blog = require('../models/blog_model');
const express = require('express');

// TO-DO: Change out hospital_id with ID of one hospital***
console.log("Connected to blogs controller")
function blogs(app) {
    app.get('/blogs', (req, res) => {
        Blog.find()
            .then(blogs => {
                res.render('blogs-index', {blogs: blogs});
            })
            .catch(err => {
                console.log(err.message);
            });
    });
    
    app.delete('/hospitals/:hospital_id/blogs/:id', function (req, res) {
        Blog.findByIdAndRemove(req.params.id)
            .then((blog) => {
                res.redirect(`/hospitals/${req.params.hospital_id}`)
            })
            .catch((err) => {
                console.log(err.message)
            })
    })
    
    app.delete('/hospitals/:hospital_id/blogs/comments/:id', function (req, res) {
        console.log("DELETE comment")
        Comment.findByIdAndRemove(req.params.id)
            .then((comment) => {
                res.redirect(`/movies/${req.params.movieId}`)
            })
            .catch((err) => {
                console.log(err.message)
            })
    });
    
    app.put('/hospitals/:hospital_id/blogs/:id', (req, res) => {
        Blog.findByIdAndUpdate(req.params.id, req.body)
            .then(blog => {
                res.redirect(`/hospitals/${req.params.hospital_id}`)
            })
            .catch(err => {
                console.log(err.message)
            })
    });
    
    app.get('/hospitals/:hospital_id/blogs/:id/edit', function (req, res) {
        Blog.findById(req.params.id, function(err, blog) {
            res.render('blogs-edit', {blog: blog});
        })
    });

    app.get('/hospitals/:hospital_id/blogs/new', (req, res) => {
        res.render('blogs-new', {hospital_id: req.params.hospital_id})
    })
    
    // app.post('/movies/:movieId/reviews', (req, res) => {
    //     console.log(req.body)
    // })

    app.post('/hospitals/:hospital_id/blogs', (req, res) => {
        Blog.create(req.body)
            .then((review) => {
                // console.log(review);
                res.redirect(`/hospitals/${req.params.hospital_id}`);
            })
            .catch((err) => {
                console.log(err.message);
        })
    });

    app.get('/hospitals/:hospital_id/blogs/:id', (req, res) => {
        Blog.findById(req.params.id)
            .then(review => {
                Comment.find({reviewId: req.params.id})
                    .then(comments => {
                        res.render('blogs-show', {blog: blog, comments: comments.reverse()})
                    })
            })
            .catch((err) => {
                console.log(err.message);
            })
    });
}

module.exports = blogs
