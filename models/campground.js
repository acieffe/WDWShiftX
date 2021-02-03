const mongoose = require('mongoose'); // Get Mongoose
const review = require('./review');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
	url: String,
	filename: String,
});

ImageSchema.virtual('thumbnail').get(function () {
	return this.url.replace('/upload', '/upload/w_200');
});

const opts = { toJSON: { virtuals: true } };

const CampgroundSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		images: [ImageSchema],
		price: {
			type: Number,
			required: true,
		},
		description: {
			type: String,
			required: false,
		},
		location: {
			type: String,
			required: true,
		},
		geometry: {
			type: {
				type: String,
				enum: ['Point'],
				required: false,
			},
			coordinates: {
				type: [Number],
				required: false,
			},
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		reviews: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Review',
			},
		],
	},
	opts
);

CampgroundSchema.virtual('properties.popUpMarkup').get(function () {
	return `<strong><a href="/campgrounds/${this._id}">${this.title}</a></strong>
	<p>${this.description.substring(0, 75)}...</p>`;
});

CampgroundSchema.post('findOneAndDelete', async function (doc) {
	if (doc) {
		await review.deleteMany({
			_id: {
				$in: doc.reviews,
			},
		});
	}
});

module.exports = mongoose.model('Campground', CampgroundSchema);
