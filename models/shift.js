const mongoose = require('mongoose'); // Get Mongoose
const Schema = mongoose.Schema;

const ShiftSchema = new Schema({
	proficienies: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Proficiency',
		},
	],
	start: {
		type: Date,
		require: true,
	},
	end: {
		type: Date,
		required: false,
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	comments: {
		type: String,
		require: false,
	},
});

module.exports = mongoose.model('Shift', ShiftSchema);
