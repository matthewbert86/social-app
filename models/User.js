// We are going to leverage this funtion in our userController file
let User = function(data) {
    // "this" points toward whatever is calling/executing the current function
    // = data is calling what just got called in our function, and we are storing it in a property (this.data) that we can use later
    this.data = data
    
    // Add a method to our blueprint
    User.prototype.register = function() {}
}

module.exports = User