const express = require('express'); // Get Express
const passport = require('passport');
const User = require('../models/user'); // Get the User model
const users = require('../controllers/users');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');

router
	.route('/register')
	// Showing the register page
	.get(users.renderRegistration)
	// Saving user to database
	.post(catchAsync(users.register));

router
	.route('/login')
	// Showing the login page
	.get(users.renderLogin)
	// Verifying and loggin in user and sending to campgrounds page if good
	.post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login);

// Logout user
router.get('/logout', users.userLogout);

module.exports = router;
