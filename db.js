// npm install mongodb

// require in mongodb
const mongodb = require('mongodb')

// This will connect us to our mongodb account and database
let connectionString =
  "mongodb://todoAppUser:4L963fFWi74hFQB5@cluster0-shard-00-00-ummw7.mongodb.net:27017,cluster0-shard-00-01-ummw7.mongodb.net:27017,cluster0-shard-00-02-ummw7.mongodb.net:27017/MentalGeek?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";

// this will open connection to a mongodb database set up above
mongodb.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
    // This will return the database object we need to work with
    module.exports = client.db()
    // lets start our express app below
    const app = require('./app')
    // listen for incoming requests
    app.listen(3000)
});