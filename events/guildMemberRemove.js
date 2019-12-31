module.exports = class GuildMemberRemoveEvent {
  constructor(client) {
    this.client = client;
  }
  async run(member) {
    try {
      let canal = this.client.channels.get(
        this.client.config.servidor.categorias.staff.canales.logs
      );
      canal.send(`[${member.user.bot ? `Bot` : `Común`}] **${member.user.tag}** ha salido del servidor.`);
    } catch (e) {
      console.error(e);
    }
  }
};
