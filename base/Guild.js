const { Schema, model } = require('mongoose'),
  config = require('../m-config.js');

module.exports = model(
  'Guild',
  new Schema({
    id: { type: String },
    membersData: { type: Object, default: {} },
    members: [{ type: Schema.Types.ObjectId, ref: 'Member' }],
    prefix: { type: String, default: config.prefix },
    botQueue: { type: Number, default: 0 },
    logs: {
      type: Object,
      default: {
        enabled: true,
        channel: undefined
      }
    }
  })
);
