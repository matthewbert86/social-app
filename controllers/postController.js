/***  Our goal in this file is to export multiple functions that can be accessed from another javascript file ****/

exports.viewCreateScreen = function(req, res) {
    res.render('create-post')
}
