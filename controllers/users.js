const User = require('../models/user'); // Get the User model

// Showing the register page
module.exports.renderRegistration = (req, res) => {
	res.render('users/register');
};

// Saving user to database
module.exports.register = async (req, res, next) => {
	try {
		const { fname, lname, email, phone, password } = req.body;
		const user = new User({ email, username });
		const registeredUser = await User.register(user, password);
		req.login(registeredUser, (err) => {
			if (err) return next(err);
			req.flash('success', `Welcome to the site, ${user.username}!`);
			res.redirect('/shifts');
		});
	} catch (e) {
		req.flash('error', e.message);
		res.redirect('register');
	}
};

// Showing the login page
module.exports.renderLogin = (req, res) => {
	res.render('users/login');
};

// Verifying and loggin in user and sending to campgrounds page if good
module.exports.login = (req, res) => {
	req.flash('success', `Welcome back to the site, ${req.user.username}!`);
	const redirectUrl = req.session.returnTo || '/shifts';
	delete req.session.returnTo;
	res.redirect(redirectUrl);
};

// Logout user
module.exports.userLogout = (req, res) => {
	req.logout();
	req.flash('success', 'You have been logged out!');
	res.redirect('/shifts');
};
