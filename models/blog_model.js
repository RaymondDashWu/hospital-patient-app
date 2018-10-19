const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Blog = mongoose.model('Blog', {
    blog_title: String,
    blog_content: String,
    blog_id: {type: Schema.Types.ObjectId, ref: 'Blog'}
});

module.exports = Blog;
