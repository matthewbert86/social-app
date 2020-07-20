/***  Our goal in this file is rto export multiple functions that can be accessed from another javascript file ****/

// Imports function from User.js
const User = require('../models/User');

// Node is going to look for a property named login so it knows what it needs to export from this file
exports.login = function() {

};

exports.logout = function () {

};

// exports.register will be called by router whenever a user clicks the submit button on the registration form
exports.register = function (req, res) {
    // new creates a new object using User() as its blueprint
    // Within the () we are passing the form field values the user has submitted
    let user = new User(req.body);
    // call our register method set up in User.js
    user.register();
    res.send('Thanks for registering');
};

// This is the function that gets called when someone visits the base URL
exports.home = function (req, res) {
    res.render('home-guest')
};

