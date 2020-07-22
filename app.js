// We use "const" over "let" because this is a constant variable - it's not going to change. It makes for more readability in the code.
// require() is use when we need to require in a package, which will be express
const express = require("express");
// npm install express-session
const session = require("express-session");
// npm install connect-mongo, we then use (session) to reference the express-session package.
const MongoStore = require("connect-mongo")(session)
// We are calling express through this variable
const app = express();

// set up configuration options on how to use sessions
let sessionOptions = session({
    secret: "JavaScript is cool",
    // Override sessionOptions from just storing data in memory
    store: new MongoStore({client: require("./db")}),
    resave: false,
    saveUninitialized: false,
    //maxeAge: math is equal to one day before the cookie expires
    cookie: {maxAge: 1000 * 60 * 60 * 24, httpOnly: true}
})

// tell express to use our session settings 
app.use(sessionOptions);

const router = require("./router");

// Add submitted user data onto our request object
app.use(express.urlencoded({extended: false}))
// This is another common way to get data, from a json file
app.use(express.json())

// This will allow use to access files from the public folder
app.use(express.static("public"));

// This will allow images to be displayed. 
app.use("/public/images/", express.static("./public/images"));
// The first views is an express option, and the 2nd is the name of our views folder, which will pull our content to display in app.js
app.set("views", "views");
// This is where we tell express which template engine we're using, which will be ejs.
app.set("view engine", "ejs");

// Which URL are we using the router for?
// in spit #2, we set it to router, since that's what we are exporting
app.use("/", router);

// we are exporting our express app to db.js, so we can open the database first
module.exports = app

