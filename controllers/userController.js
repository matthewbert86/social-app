/***  Our goal in this file is to export multiple functions that can be accessed from another javascript file ****/

// Imports function from User.js
const User = require('../models/User');

// Node is going to look for a property named login so it knows what it needs to export from this file
exports.login = function(req, res) {
    // model to create a new user object 
    // We pass in the user data submitted between User()
    let user = new User(req.body)
    user.login().then(function(result) {
        // if our promise calls resolve
        res.send(result)
    }).catch(function(e){
        // if our promise calls reject
        res.send(e)
    })
    
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
    // errors was set up as an array in User.js
    // length is property in an array that counts how many items are in the array
    if (user.errors.length) {
        // if there are errors, send this
        res.send(user.errors)
    } else {
        // if there are no errors, we go to this
        res.send("Congrats! There are no errors.")
    }
};

// This is the function that gets called when someone visits the base URL
exports.home = function (req, res) {
    res.render('home-guest')
};

