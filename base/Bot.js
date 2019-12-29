const mongoose = require('mongoose');

module.exports = mongoose.model(
	'Bot',
	new mongoose.Schema({
		id: { type: String },
		nQueue: 0,
		info: {
			ownerId: { type: String },
			prefix: { type: String },
			description: 'Un simple bot.',
			verified: false,
			votes: {
				up: 0,
				down: 0
			}
		}
	})
);
