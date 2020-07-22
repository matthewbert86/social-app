/***  Our goal in this file is to export multiple functions that can be accessed from another javascript file ****/

// Imports function from User.js
const User = require('../models/User');

// Node is going to look for a property named login so it knows what it needs to export from this file
exports.login = function(req, res) {
    // model to create a new user object 
    // We pass in the user data submitted between User()
    let user = new User(req.body)
    user.login().then(function(result) {
        // leverage session that is unique per browser visitor/user
        req.session.user = {favColor: "blue", username: user.data.username}
        // if our promise calls resolve
        req.session.save(function() {
            res.redirect('/')
        })
    }).catch(function(e){
        // if our promise calls reject
        res.send(e)
    })
    
};

exports.logout = function (req, res) {
    // If an incoming request has a cookie matching a session id, this will find it in database and destroy that session
    req.session.destroy(function() {
        // When user clicks on "logout" this will send them back to the home/login screen
        res.redirect('/');
    })
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
    if (req.session.user) {
        // If they are a logged in user, this will take them to their main profile page
        res.render("home-dashboard", {username: req.session.user.username});
    } else {
        // If they are not logged in, this will take the user to the main sign up/login screen
        res.render("home-guest");
    }
};

