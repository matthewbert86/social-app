/***  Our goal in this file is to export multiple functions that can be accessed from another javascript file ****/

// Require in out Post models
const Post = require('../models/Post')

exports.viewCreateScreen = function(req, res) {
    res.render('create-post')
}

exports.create = function(req, res) {
    let post = new Post(req.body, req.session.user._id);
    post.create().then(function() {
        res.send("new post created")
    }).catch(function(errors) {
        res.send(errors)
    })
}

exports.viewSingle = async function(req, res) {
    // talk to post model and request to look up document in database
    try {
        let post = await Post.findSingleById(req.params.id)
        res.render('single-post-screen', {post: post})
    } catch {
        res.send("404 template")
    }
}