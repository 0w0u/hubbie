const { Schema, model } = require('mongoose');

module.exports = model(
	'User',
	new Schema({
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
