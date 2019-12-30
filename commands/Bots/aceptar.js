const Command = require('../../base/Command.js'),
	{ RichEmbed } = require('discord.js');
module.exports = class Bots extends Command {
	constructor(client) {
		super(client, {
			name: 'aceptar',
			description: 'Acepta un bot para unirlo al Club de Bots.',
			usage: prefix => `\`${prefix}aceptar\``,
			examples: prefix => `\`${prefix}\``,
			enabled: true,
			ownerOnly: false,
			guildOnly: true,
			aliases: ['accept'],
			memberPermissions: [],
			dirname: __dirname
		});
	}

	async run(message, args, data) {
		let embed = new RichEmbed();
		try {
			if (!message.member.roles.has(this.client.config.roles.comu)) {
				return message.channel.send(':x: | No eres del Departamento Comunidad.');
			} else {
				if (!args[0]) {
					return message.channel.send(':x: | Necesitas mencionar a un bot para aceptar.');
				} else {
					let member = message.mentions.members.first() || message.guild.members.find(x => `${x.displayName}${x.user.tag}`.toLowerCase().includes(args[0].toLowerCase())) || message.guild.members.get(args[0]);
					if (!member) {
						return message.channel.send(':x: | El bot no está en el servidor.');
					} else {
						if (!member.user.bot) {
							return message.channel.send(':x: | El usuario especificado no es un bot.');
						} else {
							let bot = await this.client.findOrCreateBot({ id: member.id });
							if (!bot.invited) {
								return message.channel.send(':x: | Ese bot no está invitado.');
							} else {
								if (bot.accepted) {
									return message.channel.send(':x: | Ese bot ya ha sido aceptado.');
								} else {
									if (message.guild) {
										embed
											.setColor(this.client.colors.hub)
											.setTitle('¡Nuevo miembro del Club de Bots!')
											.addField('~ Dueño', '<@' + bot.info.ownerID + '>', true)
											.addField('~ Prefijo', '`' + bot.info.prefix + '`', true)
											.setImage(member.user.displayAvatarURL);
										this.client.channels.get(this.client.config.canales.play).send({ embed });
									}
									if (message.member) {
										let embeda = new RichEmbed()
											.setColor(this.client.colors.gre)
											.setThumbnail(member.user.displayAvatarURL)
											.setTitle('¡Bot aprobado!')
											.setDescription('Tu bot ahora es parte del Club de Bots de Script Hub.')
											.addField('Playground', 'Puedes ir al canal <#' + this.client.config.canales.play + '> para probar a tu bot.')
											.addField('Información', 'Puedes usar el comando `s!infobot` para ver la información guardada de tu bot.');
										this.client.users.get(bot.info.ownerID).send({ embed: embeda });
									}
									if (bot.invite.messageID) {
										let msg = await this.client.channels.get(this.client.config.canales.invi).fetchMessage(bot.invite.messageID);
										let acceptEmbed = new RichEmbed()
											.setColor(this.client.colors.gre)
											.setTitle('¡Petición aceptada!')
											.addField('Tu bot ha sido aceptado en el servidor', 'Puedes ir a probarlo en <#' + this.client.config.canales.play + '>')
											.addField('Bot', `<@${bot.id}>`, true)
											.addField('Desarrollador', `<@${bot.info.ownerID}>`, true);
										await msg.edit({ embed: acceptEmbed });
									}
									member.removeRole(this.client.config.roles.test);
									member.addRole(this.client.config.roles.club);
									bot.invited = false;
									bot.accepted = true;
									data.guild.botQueue -= 1;
									bot.nQueue = data.guild.botQueue;
									await bot.save();
									await data.guild.save();
								}
							}
						}
					}
				}
			}
		} catch (e) {
			console.error(e);
		}
	}
};
