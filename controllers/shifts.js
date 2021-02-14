const Shift = require('../models/shift');

// Page to show all shifts
module.exports.index = async (req, res) => {
	const shifts = await Shift.find({});
	res.render('shifts/index', { shift });
};

// Page to Add New Shifts to the database
module.exports.renderNewForm = (req, res) => {
	res.render('shifts/new');
};

// Adding new shift to database
module.exports.createShift = async (req, res, next) => {
	const shift = new Shift(req.body.shift);
	shift.author = req.user._id;
	await shift.save();
	req.flash('success', 'Shift Added Successfully!');
	res.redirect(`/shifts/${shift._id}`); // go to single shift page
};

// Show Single Shift page from ID
module.exports.showShift = async (req, res) => {
	const campground = await Shift.findById(req.params.id).populate('author');
	if (!shift) {
		req.flash('error', "You don't need to see that Shift!");
		return res.redirect('/shifts');
	}
	res.render('shifts/show', { shift });
};

// Page to Update Shift page from ID
module.exports.renderEditForm = async (req, res) => {
	const shift = await Shift.findById(req.params.id);
	if (!shift) {
		req.flash('error', "This is not the Shift you're looking for!");
		return res.redirect('/shifts');
	}
	res.render('shifts/edit', { shift });
};

// Updates passed info to database
module.exports.updateShift = async (req, res) => {
	const { id } = req.params;
	const shift = await Shift.findByIdAndUpdate(id, { ...req.body.shift }, { runValidators: true });
	await shift.save();
	req.flash('success', 'Shift Updated Successfully!');
	res.redirect(`/shifts/${shift._id}`); // go to shift page
};

// Delete specific shift by ID
module.exports.deleteShift = async (req, res) => {
	const { id } = req.params;
	await Shift.findByIdAndDelete(id);
	req.flash('success', 'Shift Deleted Successfully!');
	res.redirect('/shifts'); // go to shifts page
};
