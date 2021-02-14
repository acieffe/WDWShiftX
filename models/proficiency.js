const mongoose = require('mongoose'); // Get Mongoose
const Schema = mongoose.Schema;

const ProfiencySchema = new Schema({
	role: {
		type: String,
		require: true,
	},
	property: {
		type: String,
		require: true,
	},
	location: {
		type: String,
		require: true,
	},
});
