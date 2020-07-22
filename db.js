// npm install mongodb
// npm install dotenv

// require in dotenv
const dotenv = require('dotenv')
// This will load in all the values in the .env file
dotenv.config()

// require in mongodb
const mongodb = require('mongodb')

// this will open connection to a mongodb database set up through our .env file and required in above.
  // "process.env.CONNECTIONSTRING" is how we access environment variables in node.js
mongodb.connect(process.env.CONNECTIONSTRING, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
    // This will return the database object we need to work with
    module.exports = client
    // lets start our express app below
    const app = require('./app')
    // listen for incoming requests
    app.listen(process.env.PORT)
});