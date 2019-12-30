const Command = require('../../base/Command.js');

module.exports = class Bots extends Command {
	constructor(client) {
		super(client, {
			name: 'remover',
			description: 'Remueve un bot del Club de Bots.',
			usage: prefix => `\`${prefix}remover <bot>\``,
			examples: prefix => `\`${prefix}remover Ginko\``,
			enabled: true,
			ownerOnly: true,
			guildOnly: false,
			aliases: ['remove'],
			memberPermissions: [],
			dirname: __dirname
		});
	}
	async run(message, args, data) {
		try {
			if (!args[0]) {
				return message.channel.send(':x: | Necesitas mencionar un bot para expulsar del Club de Bots.');
			} else {
				let member = message.mentions.members.first() || message.guild.members.find(x => `${x.displayName}${x.user.tag}`.toLowerCase().includes(args[0].toLowerCase())) || message.guild.members.get(args[0]);
				if (!member || !member.user.bot) {
					return message.channel.send(':x: | Bot no encontrado.');
				} else {
					let bot = await this.client.findOrCreateBot({ id: member.id });
					let embed = new (require('discord.js')).RichEmbed()
						.setColor(this.client.colors.red)
						.setTitle('¡Bot expulsado!')
						.setDescription('El bot ' + member.user.tag + ' ya no pertenece más al Club de bots');
					message.channel.send({ embed });
					this.client.users.get(bot.info.ownerID).send({ embed });
					this.client.channels.get(this.client.config.canales.play).send({ embed });
					member.kick('Ya no pertenece al Club de Bots. Moderador/a responsable: ' + message.author.tag)
				}
			}
		} catch (e) {
			console.error(e);
		}
	}
};
