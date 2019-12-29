require('dotenv').config();
let env = process.env;
module.exports = {
	token: env.token,
	mongodb: env.mongodb,
	prefix: env.prefix,
	owners: [env.lau, env.dev, env.mon]
};
