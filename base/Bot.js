const { Schema, model } = require('mongoose');

module.exports = model(
	'Bot',
	new Schema({
		id: { type: String },
		nQueue: { type: Number },
		invited: false,
		info: {
			ownerID: { type: String },
			prefix: { type: String },
			description: { type: String, default: 'Un simple bot.' },
			verified: false,
			votes: {
				up: 0,
				down: 0
			}
		}
	})
);
