// Node.js is on the lookout for this special variable.
// The Router is to list all of the URL's or routes that we are on the lookout for.

const express = require("express");

// The express framework will express a mini application
const router = express.Router();

// router.get()
router.get("/", function (req, res) {
  // If there is a get request to the homepage, we use res.render() to render the home page template
  res.render("home-guest");
});

router.get("/about", function (req, res) {
  res.send("This is our about page");
});

module.exports = router;
