const Command = require('../../base/Command.js');

module.exports = class ECommand extends Command {
  constructor(client) {
    super(client, {
      name: '',
      description: '',
      usage: prefix => `\`${prefix}\``,
      examples: prefix => `\`${prefix}\``,
      enabled: true,
      ownerOnly: false,
      guildOnly: false,
      aliases: [],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data) {
    try {
      if (!args[0]) {
        return message.channel.send(
          ':x: | Necesitas colocar la ID de un usuario.'
        );
      } else {
        if (!args[1]) {
          return message.channel.send(
            ':x: | Necesitas colocar la ID de un caso.'
          );
        } else {
          let user;
          try {
            user = await this.client.fetchUser(args[0]);
          } catch {
            return message.channel.send(':x: | El usuario no existe.');
          }
          let member = await this.client.findOrCreateMember({
            id: user.id,
            guildID: message.guild.id
          });
          let caso = member.moderation.cases.find(x => x.mID === args[1]);
          let msg = `- Miembro: ${user.tag}\n- Tipo: ${caso.mType}\n- Razón: ${caso.mReason}\n+ Moderador: ${this.client.users.get(caso.mMod).tag}\n+ ID: ${caso.mID}`;
          message.channel.send(msg, { code: 'diff' })
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
};
