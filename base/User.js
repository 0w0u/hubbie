const mongoose = require('mongoose');

module.exports = mongoose.model(
	'User',
	new mongoose.Schema({
		id: { type: String },
		tickets: {
			type: Array,
			default: [
				{
					id: Number,
					status: true // true = open | false = closed
				}
			]
		}
	})
);
