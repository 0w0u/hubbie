require('dotenv').config();
let env = process.env;
module.exports = {
	token: env.token,
	mongodb: env.mongodb,
	prefix: env.prefix,
	owners: [env.mon],
	canales: {
		play: env.play,
		reqs: env.reqs,
		sugg: env.sugg,
		invi: env.invi
	},
	roles: {
		test: env.test,
		club: env.club,
		veri: env.veri,
		comu: env.comu
	}
};
