// npm install bcryptjs
// require in bcrypt, which will be leveraged below in the register function
const bcrypt = require('bcryptjs');

// This will return our database object so we can perform crud operations with it.
const usersCollection = require('../db').db().collection('users');

// We are requiring in our validator package, so we can validate email addresses from the user input
const validator = require("validator");

// We are going to leverage this funtion in our userController file
let User = function (data) {
  // "this" points toward whatever is calling/executing the current function
  // = data is calling what just got called in our function, and we are storing it in a property (this.data) that we can use later
  this.data = data;
  this.errors = [];
}
// Lets check to see if the user submitted anything other than a string
  User.prototype.cleanUp = function() {
    
    if (typeof(this.data.username) !="string") {
      this.data.username = "";
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
    }
  }

  // Lets validate the user data
  User.prototype.validate = function() {
    return new Promise(async (resolve, reject) => {
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
    if (this.data.password.length > 50) {
      this.errors.push("password cannot exceed 150 characrers");
    }
    // Lets check for the minimum and maximum length of the username
    if (this.data.username.length > 0 && this.data.username.length < 3) {
      this.errors.push("Username must be at least 3 characters");
    }
    if (this.data.username.length > 30) {
      this.errors.push("Username cannot exceed 30 characrers");
    }

    // Only if username is valid, then check to see if it's available
    if (this.data.username.length > 2 && this.data.username.length < 31 && validator.isAlphanumeric(this.data.username)) {
      let usernameExists = await usersCollection.findOne({username: this.data.username})
      if (usernameExists) {this.errors.push("That username is already taken.")}
    }

     // Only if email is valid, then check to see if it's available
    if (validator.isEmail(this.data.email)) {
      let emailExists = await usersCollection.findOne({email: this.data.email})
      if (emailExists) {this.errors.push("That email is in use by existing account.")}
    }
    resolve()
  })
  }

  // This is our method for login
  User.prototype.login = function() {
    // Promise() is used to create new promises
    return new Promise((resolve, reject) => {
      // this will check for strings of text
    this.cleanUp()
    // lets set up our crud operations. This will read data from the database
      // contents in fineOne() tells Mongo what to look for, to find a match for user input.
      // is a function that findOne will call when the first operation is complete
    usersCollection.findOne({username: this.data.username}).then((attemptedUser) => {
      // if () will check to see if username and password is a successful match
        // if user password entered is a match, it will compare to hashed password in attemptedUser.password to see if it returns as true or false
      if (attemptedUser && bcrypt.compareSync(this.data.password, attemptedUser.password)) {
        resolve("Congrats!");
      } else {
        reject("Invalid username/password");
      }
    }).catch(function() {
      reject("Please try again later.");
    })
  })
}

  // Add a method to our blueprint
  User.prototype.register = function() {
    return new Promise(async (resolve, reject) => {
    // Step #1 - validate user data
    this.cleanUp()
    await this.validate()
    // Step #2 - only if there are no validation errors, then save the user data into a database
    if (!this.errors.length) {
      // hash user password
      let salt = bcrypt.genSaltSync(10);
      // overwrite user password value
      this.data.password = bcrypt.hashSync(this.data.password, salt);
      // Insert/create new document into users database collection
      await usersCollection.insertOne(this.data);
      resolve()
    } else {
      reject(this.errors)
    }
  })
  }

module.exports = User
