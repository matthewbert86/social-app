// This will return our database object so we can perform crud operations with it.
const usersCollection = require('../db').collection('users')

// We are requiring in our validator package, so we can validate email addresses from the user input
const validator = require("validator");

// We are going to leverage this funtion in our userController file
let User = function (data) {
  // "this" points toward whatever is calling/executing the current function
  // = data is calling what just got called in our function, and we are storing it in a property (this.data) that we can use later
  this.data = data;

  this.errors = [];

// Lets check to see if the user submitted anything other than a string
  User.prototype.cleanUp = function() {
    
    if (typeof(this.data.username) !="string") {
      this.data.username = ""
    }
    if (typeof this.data.email != "string") {
      this.data.email = "";
    }
    if (typeof this.data.password != "string") {
      this.data.password = "";
    }

    // get rid of any bogus properties
    this.data = {
      // the trim() will get rid of any empty spaces before or after a value
      username: this.data.username.trim().toLowerCase(),
      email: this.data.email.trim().toLowerCase(),
      password: this.data.password,
    };
  }

  // Lets validate the user data
  User.prototype.validate = function () {
    // if the user leaves the user name field blank
    if (this.data.username == "") {
      this.errors.push("You must provide a username");
    }
    // set a parameter for what will be a valid username, in our case it can only be letters and numbers
    if (
      this.data.username != "" &&
      !validator.isAlphanumeric(this.data.username)
    ) {
      this.errors.push("Username can only contain letters and numbers.");
    }
    // if the user leaves the email field blank
    if (!validator.isEmail(this.data.email)) {
      this.errors.push("You must provide a valid email address");
    }
    // if the user leaves the password field blank
    if (this.data.password == "") {
      this.errors.push("You must provide a password");
    }
    // Lets check for the minimum and maximum length of the password
    if (this.data.password.length > 0 && this.data.password.length < 12) {
      this.errors.push("Password must be at least 12 characters");
    }
    if (this.data.password.length > 100) {
      this.errors.push("password cannot exceed 100 characrers");
    }
    // Lets check for the minimum and maximum length of the username
    if (this.data.username.length > 0 && this.data.username.length < 3) {
      this.errors.push("Username must be at least 3 characters");
    }
    if (this.data.username.length > 30) {
      this.errors.push("Username cannot exceed 30 characrers");
    }
  };

  // Add a method to our blueprint
  User.prototype.register = function () {
    // Step #1 - validate user data
    this.cleanUp();
    this.validate();
    // Step #2 - only if there are no validation errors, then save the user data into a database
    if (!this.errors.length) {
      // Insert/create new document into users database collection
      usersCollection.insertOne(this.data)
    }
  };
};

module.exports = User;
