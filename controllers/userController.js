/***  Our goal in this file is to export multiple functions that can be accessed from another javascript file ****/

// Imports function from User.js
const User = require('../models/User')

// Node is going to look for a property named login so it knows what it needs to export from this file
exports.login = function(req, res) {
    // model to create a new user object 
    // We pass in the user data submitted between User()
    let user = new User(req.body)
    user.login().then(function(result) {
        // leverage session that is unique per browser visitor/user
        req.session.user = {avatar: user.avatar, username: user.data.username}
        // if our promise calls resolve
        req.session.save(function() {
            res.redirect('/')
        })
    }).catch(function(e){
        // leverage our flash package if user has entered wrong info
        req.flash('errors', e);
        // manually tell our session to save
        req.session.save(function(){
            res.redirect('/')
        })
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
    user.register().then(() => {
        // Update session data and send user back to home if the registration was a success
        req.session.user = {username: user.data.username, avatar: user.avatar}
        req.session.save(function () {
          res.redirect("/");
        });
    }).catch((regErrors) => {
        // use flash package to send any errors to our session data
        regErrors.forEach(function(error) {
            req.flash('regErrors', error)
        })
        // manually rell our session to save
        req.session.save(function() {
            res.redirect('/')
        })
    });
    
};

// This is the function that gets called when someone visits the base URL
exports.home = function (req, res) {
    if (req.session.user) {
        // If they are a logged in user, this will take them to their main profile page
        res.render('home-dashboard', {username: req.session.user.username, avatar: req.session.user.avatar});
    } else {
        // If they are not logged in, this will take the user to the main sign up/login screen
        res.render('home-guest', {errors: req.flash('errors'), regErrors: req.flash('regErrors')});
    }
};

