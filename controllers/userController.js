/***  Our goal in this file is rto export multiple functions that can be accessed from another javascript file ****/

// Node is going to look for a property named login so it knows what it needs to export from this file
exports.login = function() {

};

exports.logout = function () {

};

exports.register = function (req, res) {
    res.send('Thanks for registering');
};

// This is the function that gets called when someone visits the base URL
exports.home = function (req, res) {
    res.render('home-guest')
};

