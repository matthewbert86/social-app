// Node.js is on the lookout for this special variable.
// The Router is to list all of the URL's or routes that we are on the lookout for.

const express = require("express");
// The express framework will express a mini application
const router = express.Router();
// Import/require in the userController file
const userController = require('./controllers/userController');
// Import/require in the postController file
const postController = require('./controllers/postController');

/******   USER RELATED ROUTES   ******/


// router.get() will first pull from the URL specified, then we get userController.home to specify which file and function we want to display
router.get("/", userController.home);
// router.post will tell our app what to do when it gets a post request to a specific URL - here we setting it with userController.register for the registration form on the home page
router.post('/register', userController.register);

// This router will tell our app when someone has logged in.
router.post('/login', userController.login)
// This router will tell out app when someone has logged out.
router.post('/logout', userController.logout);


/******   POST RELATED ROUTES   ******/
router.get('/create-post', userController.mustBeLoggedIn ,postController.viewCreateScreen);

router.post('/create-post', userController.mustBeLoggedIn, postController.create);

router.get('/post/:id', postController.viewSingle)

module.exports = router;
