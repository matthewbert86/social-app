// We use "const" over "let" because this is a constant variable - it's not going to change. It makes for more readability in the code.
// require() is use when we need to require in a package, which will be express
const express = require("express");
// We are calling express through this variable
const app = express();

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

app.listen(3000);
