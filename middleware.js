const { shiftSchema, reviewSchema } = require('./schemas.js');
const AppError = require('./utils/AppError');
const Shift = require('./models/shift');
const Proficiency = require('./models/proficiency');

module.exports.isLoggedIn = (req, res, next) => {
	if (!req.isAuthenticated()) {
		req.session.returnTo = req.originalUrl;
		req.flash('error', 'You must be signed in.');
		return res.redirect('/login');
	}
	next();
};

// Validate inputs from a shift form
module.exports.validateShift = (req, res, next) => {
	const { error } = shiftSchema.validate(req.body);
	if (error) {
		const msg = error.details.map((el) => el.message).join(',');
		throw new AppError(msg, 400);
	} else {
		next();
	}
};

// Verifies if the user is the Shift Author
module.exports.isAuthor = async (req, res, next) => {
	const { id } = req.params;
	const shift = await Shift.findById(id);
	if (!shift.author.equals(req.user._id)) {
		req.flash('error', "Can't Touch This!");
		return res.redirect(`/shifts/${id}`);
	}
	next();
};

// Validate inputs from the proficiency form
module.exports.validateProficiency = (req, res, next) => {
	const { error } = proficiencySchema.validate(req.body);
	if (error) {
		const msg = error.details.map((el) => el.message).join(',');
		throw new AppError(msg, 400);
	} else {
		next();
	}
};

// Verifies if the user is the Proficiency Author
module.exports.isProficiencyAuthor = async (req, res, next) => {
	const { id, reviewId } = req.params;
	const proficiency = await Proficiency.findById(proficiencyId);
	if (!proficiency.author.equals(req.user._id)) {
		req.flash('error', "Can't Touch This!");
		return res.redirect(`/shifts/${id}`);
	}
	next();
};
