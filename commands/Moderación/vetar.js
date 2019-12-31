const Command = require('../../base/Command.js');

module.exports = class ECommand extends Command {
  constructor(client) {
    super(client, {
      name: 'vetar',
      description: 'Veta a un usuario del servidor.',
      usage: prefix => `\`${prefix}vetar <usuario> <razón>\``,
      examples: prefix => `\`${prefix}vetar Sandessat Molestoso.\``,
      enabled: true,
      ownerOnly: false,
      guildOnly: false,
      aliases: ['ban'],
      memberPermissions: [],
      dirname: __dirname
    });
  }
  async run(message, args, data) {
    try {
      if (!message.member.roles.has(server.roles.staff.departamento.comunidad)) return message.channel.send(':x: | No eres del Departamento Comunidad.');
      else
      if (!args[0]) {
        return message.channel.send(':x: | Necesitas mencionar a alguien.');
      } else {
        let member =
          message.mentions.members.first().user ||
          message.guild.members.find(x =>
            `${x.displayName}`.toLowerCase().includes(args[0].toLowerCase())
          ).user;
        let dataM = await this.client.findOrCreateMember({
          id: member.id,
          guildID: message.guild.id
        });
        if (!args[1]) {
          return message.channel.send(':x: | Necesitas especificar una razón.');
        } else if (!member) {
          return message.channel.send(':x: | Menciona a alguien válido.');
        } else {
          if (!isNaN(args[0])) {
            member = await this.client.fetchUser(args[0]);
            if (member) return member;
            else return;
          }
          let id = this.client.functions.makeID();
          let reason = args.slice(1).join(' ');
          let sendChannel = `- El usuario ${member.tag} (${member.id}) ha sido vetado por el/la moderador/a ${message.author.tag}.\n+ Razón: ${reason}\n+ ID del caso: ${id}`;
          let sendMember = `\n- Has sido vetado del servidor **${message.guild.name}**.\n+ Razón: ${reason}\n+ ID del caso: ${id}\n--- Si crees que esto es un error contacta con algún staff y proporciona la ID de tu caso.
          `;
          this.client.channels
            .get(this.client.config.servidor.categorias.info.canales.casos)
            .send(sendChannel, { code: 'diff' });
          member.send(sendMember, { code: 'diff' });
          message.guild.ban(member, { reason: reason, days: 7 });
          dataM.moderation = {
            cases: dataM.moderation.cases.push({
              mType: 'ban',
              mID: id,
              mReason: reason,
              mMod: message.author.id
            })
          };
          await dataM.save();
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
};
