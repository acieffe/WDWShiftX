const express = require('express'); // Get Express
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const Campground = require('../models/campground');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware');
const multer = require('multer'); // Get Multer
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router
	.route('/')
	// Page to show all campgrounds
	.get(catchAsync(campgrounds.index))
	// Adding new campground to database
	.post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground));

// Page to Add New Campgrounds to the database
router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router
	.route('/:id')
	// Show Single Campground page from ID
	.get(catchAsync(campgrounds.showCampground))
	// Updates passed info to database
	.put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
	// Delete specific campground by ID
	.delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

// Page to Update Campground page from ID
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

module.exports = router;
