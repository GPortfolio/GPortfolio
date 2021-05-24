import IConfig from './src/interfaces/IConfig';

export default {
  services: {
    github: {
      configuration: {
        nickname: 'Alexeykhr',
        sort: {
          repositories: [
            { attr: 'forks_count', sortByDesc: true },
            { attr: 'stargazers_count', sortByDesc: true },
          ],
        },
        filter: {
          repositories: [
            [
              { attr: 'owner.login', values: ['Alexeykhr', 'GPortfolio', 'uSchedule', 'uRepairPC'] },
            ],
          ],
        },
      },
    },
  },
  templates: {
    default: {
      configuration: {
        background: () => require('./public/background.jpg')
      },
    }
  }
} as IConfig;
