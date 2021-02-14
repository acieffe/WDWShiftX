const mongoose = require('mongoose'); // Get Mongoose
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
	fname: {
		type: String,
		require: true,
	},
	lname: {
		type: String,
		require: true,
	},
	email: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		require: false,
	},
	cell: {
		type: String,
		require: false,
	},
	carrier: {
		type: String,
		require: false,
	},
	prefContact: {
		type: String,
		require: false,
	},
	proficienies: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Proficiency',
		},
	],
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
