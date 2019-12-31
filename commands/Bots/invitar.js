const Command = require('../../base/Command.js'),
  { RichEmbed } = require('discord.js');
module.exports = class Bots extends Command {
  constructor(client) {
    super(client, {
      name: 'invitar',
      description: 'Invita a un bot al servidor.',
      usage: prefix => `\`${prefix}invitar <ID> <Prefijo>\``,
      examples: prefix => `\`${prefix}invitar 123456789987654321 !\``,
      enabled: true,
      ownerOnly: false,
      guildOnly: true,
      aliases: ['invite'],
      memberPermissions: [],
      dirname: __dirname
    });
  }

  async run(message, args, data) {
    let server = this.client.config.servidor;
    try {
      if (
        !message.member.roles.has(server.roles.comunidad.verificado) ||
        message.channel.id !== server.categorias.bots.canales.invitar
      ) {
        return message.channel.send(
          ':x: | No eres un usuario verificado y no estás en el canal correcto para invitar.'
        );
      } else {
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
              return message.channel.send(
                ':x: | Este bot ya ha sido invitado.'
              );
            }
            let embedDev = new RichEmbed()
              .setColor(this.client.colors.hub)
              .setTitle('¡Petición registrada!')
              .addField(
                'Notificación',
                'Le notificamos que su bot **`' +
                  user.tag +
                  '`** está pendiente de ser aprobado o ser rechazado a la brevedad. Su puesto en la cola de espera es **`' +
                  (data.guild.botQueue += 1) +
                  '`**.'
              );
            let embedQueue = new RichEmbed()
              .setColor(this.client.colors.yel)
              .setTitle('¡Petición recibida!')
              .setDescription(
                message.author.tag +
                  ' ha solicitado que su bot ' +
                  user.tag +
                  ' sea invitado al servidor.'
              )
              .addField(
                'Invitación',
                `[Clic aquí para invitar](https://discordapp.com/api/oauth2/authorize?client_id=${user.id}&permissions=0&scope=bot&guild_id=${message.guild.id})`
              )
              .addField('Bot', user.tag, true)
              .addField('Desarrollador', message.author.tag, true);
            let embedChannel = new RichEmbed()
              .setColor(this.client.colors.hub)
              .setTitle('¡Petición registrada!')
              .addField(
                '¡Hola ' + message.author.username + '!',
                'Gracias por invitar tu bot a **Script Hub**, este será probado por algún miembro del Personal y se te notificará sobre la decisión que este tome.'
              )
              .addField('Bot', user.tag, true)
              .addField('Desarrollador', message.author.tag, true);
            message.author.send({ embed: embedDev });
            this.client.channels
              .get(server.categorias.staff.canales.request)
              .send({ embed: embedQueue });
            let msg = await message.channel.send({ embed: embedChannel });
            bot.id = args[0];
            bot.invited = true;
            data.guild.botQueue;
            bot.nQueue = data.guild.botQueue;
            bot.info = {
              ownerID: message.author.id,
              prefix: args[1]
            };
            bot.invite = {
              state: 0,
              messageID: msg.id
            };
            await bot.save();
            await data.guild.save();
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
};
