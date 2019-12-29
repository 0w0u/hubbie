const Command = require('../../base/Command.js');

module.exports = class InviteCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'invitar',
			description: 'Invita a un bot al servidor.',
			usage: prefix => `\`${prefix}invitar <ID> <Prefijo>\``,
			examples: prefix => `\`${prefix}invitar 123456789987654321 !\``,
			enabled: true,
			ownerOnly: false,
			guildOnly: false,
			aliases: ['invite'],
			memberPermissions: [],
			dirname: __dirname
		});
	}

	async run(message, args, data) {
		try {
			if (!args[0]) {
				return message.channel.send(
					':x: | Necesitas especificar la ID de un bot.'
				);
			} else {
				if (!args[1]) {
					return message.channel.send(
						':x: | Necesitas especificar el prefijo.'
					);
				} else {
					let user;
					try {
						user = await this.client.fetchUser(args[0]);
					} catch {
						return message.channel.send(
							':x: | Esa no es una ID válida, la ID debe ser el identificador de la aplicación del bot.'
						);
					}
					if (!user.bot) {
						return message.channel.send(
							':x: | La ID introducida no pertenece a un bot.'
						);
					}
					let bot = await this.client.findOrCreateBot({ id: args[0] });
					if (bot.invited) {
						return message.channel.send(':x: | Este bot ya ha sido invitado.');
					}
					bot.id = args[0];
					bot.nQueue = data.guild.botQueue + 1;
					bot.invited = true;
					bot.info.ownerID = message.author.id;
					bot.info.prefix = args[1];
					await bot.save();
					message.channel.send('Bot invitado')
				}
			}
		} catch (e) {
			console.error(e);
		}
	}
};
