const Campground = require('../models/campground');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
const { cloudinary } = require('../cloudinary');

// Page to show all campgrounds
module.exports.index = async (req, res) => {
	const campgrounds = await Campground.find({});
	res.render('campgrounds/index', { campgrounds });
};

// Page to Add New Campgrounds to the database
module.exports.renderNewForm = (req, res) => {
	res.render('campgrounds/new');
};

// Adding new campground to database
module.exports.createCampground = async (req, res, next) => {
	const geoData = await geocoder
		.forwardGeocode({
			query: req.body.campground.location,
			limit: 1,
		})
		.send();
	const campground = new Campground(req.body.campground);
	campground.geometry = geoData.body.features[0].geometry;
	campground.images = req.files.map((f) => ({ url: f.path, filename: f.filename }));
	campground.author = req.user._id;
	await campground.save();
	//console.log(campground);
	req.flash('success', 'Campground Added Successfully!');
	res.redirect(`/campgrounds/${campground._id}`); // go to product page
};

// Show Single Campground page from ID
module.exports.showCampground = async (req, res) => {
	const campground = await Campground.findById(req.params.id)
		.populate({
			path: 'reviews',
			populate: {
				path: 'author',
			},
		})
		.populate('author');
	if (!campground) {
		req.flash('error', "You don't need to see that Campground!");
		return res.redirect('/campgrounds');
	}
	res.render('campgrounds/show', { campground });
};

// Page to Update Campground page from ID
module.exports.renderEditForm = async (req, res) => {
	const campground = await Campground.findById(req.params.id);
	if (!campground) {
		req.flash('error', "This is not the Campground you're looking for!");
		return res.redirect('/campgrounds');
	}
	res.render('campgrounds/edit', { campground });
};

// Updates passed info to database
module.exports.updateCampground = async (req, res) => {
	const { id } = req.params;
	const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground }, { runValidators: true });
	const imgs = req.files.map((f) => ({ url: f.path, filename: f.filename }));
	campground.images.push(...imgs);
	await campground.save();
	if (req.body.deleteImages) {
		for (let filename of req.body.deleteImages) {
			await cloudinary.uploader.destroy(filename);
		}
		await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } });
	}
	req.flash('success', 'Campground Updated Successfully!');
	res.redirect(`/campgrounds/${campground._id}`); // go to campground page
};

// Delete specific campground by ID
module.exports.deleteCampground = async (req, res) => {
	const { id } = req.params;
	await Campground.findByIdAndDelete(id);
	req.flash('success', 'Campground Deleted Successfully!');
	res.redirect('/campgrounds'); // go to campgrounds page
};
