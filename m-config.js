require('dotenv').config();
let env = process.env;
module.exports = {
  tokens: {
    bot: env.tokBot,
    mongodb: env.tokMongodb
  },
  bot: {
    prefix: env.botPrefix
  },
  owners: {
    lau: env.ownLau,
    dev: env.ownDev,
    mon: env.ownMon
  },
  servidor: {
    id: env.servID,
    categorias: {
      info: {
        id: env.catInfo,
        canales: {
          casos: env.chanCases
        }
      },
      comunidad: {
        id: env.catCom,
        canales: {
          sugerencias: env.chanSuggs,
          proyectos: env.chanProjects
        }
      },
      staff: {
        id: env.catStaff,
        canales: {
          request: env.chanRequest,
          logs: env.chanLogs
        }
      },
      tickets: {
        id: env.catTickets,
        canales: {}
      },
      bots: {
        id: env.catBots,
        canales: {
          invitar: env.chanInvite,
          playground: env.chanPlay
        }
      }
    },
    roles: {
      staff: {
        sht: env.roleSHT,
        ceo: env.roleCEO,
        representantes: env.roleRep,
        departamento: {
          comunidad: env.roleDepCom,
          tecnico: env.roleDepTec
        }
      },
      comunidad: {
        verificado: env.roleVeri
      },
      bots: {
        club: env.roleClub,
        test: env.roleTest
      }
    }
  }
};
