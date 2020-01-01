const Command = require('../../base/Command.js');

module.exports = class Mods extends Command {
  constructor(client) {
    super(client, {
      name: 'caso',
      description: 'Mira la información de un caso específico',
      usage: prefix => `\`${prefix}caso <id miembro> <id caso>\``,
      examples: prefix => `\`${prefix}caso 123123123123123 XWx7s\``,
      enabled: true,
      ownerOnly: false,
      guildOnly: false,
      aliases: ['case'],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data) {
    try {
      if (
        !message.member.roles.has(
          this.client.config.servidor.roles.staff.departamento.comunidad
        )
      )
        return message.channel.send(
          ':x: | No eres del Departamento Comunidad.'
        );
      else {
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
            let msg = `- Miembro: ${user.tag}\n- Tipo: ${
              caso.mType
            }\n- Razón: ${caso.mReason}\n+ Moderador/a: ${
              this.client.users.get(caso.mMod).tag
            }\n+ ID: ${caso.mID}`;
            message.channel.send(msg, { code: 'diff' });
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
};
