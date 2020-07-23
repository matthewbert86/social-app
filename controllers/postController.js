/***  Our goal in this file is to export multiple functions that can be accessed from another javascript file ****/

exports.viewCreateScreen = function(req, res) {
    res.render('create-post', {username: req.session.user.username, avatar: req.session.user.avatar})
}
