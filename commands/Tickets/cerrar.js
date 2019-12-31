const Command = require('../../base/Command.js');

module.exports = class ECommand extends Command {
  constructor(client) {
    super(client, {
      name: 'cerrar',
      description: 'Cierra un ticket.',
      usage: prefix => `\`${prefix}cerrar <canal | usuario> [<razón>]\``,
      examples: prefix =>
        `\`${prefix}cerrar Sandessat Ticket creado sin razón.\`, \`${prefix}cerrar #ticket-1234512512 El usuario no responde.\``,
      enabled: true,
      ownerOnly: false,
      guildOnly: false,
      aliases: ['close'],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data) {
    try {
      if (!args[0]) {
        return message.channel.send(
          ':x: | Necesitas especificar un usuario o canal.'
        );
      } else {
        let user,
          canal = message.mentions.channels.first(),
          usuario = message.mentions.users.first();
        if (canal) {
          user = await this.client.findOrCreateUser({
            tickets: { channel: canal.id }
          });
          if (user.tickets.reason) {
            let toB = await this.client.channels.get(canal.id);
            toB.delete();
            user.tickets = {
              reason: '...',
              channel: undefined,
              status: false
            };
            await user.save();
          } else {
            return message.channel.send(':x: | Ese canal no existe.');
          }
        } else if (usuario) {
          user = await this.client.findOrCreateUser({
            id: usuario.id
          });
          if (user.tickets.reason) {
            let toB = await this.client.users.get(user.tickets.channel);
            toB.delete();
            user.tickets = {
              reason: '...',
              channel: undefined,
              status: false
            };
            await user.save();
          } else {
            return message.channel.send(':x: | Ese usuario no tiene tickets.');
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
};
