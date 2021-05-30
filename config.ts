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
  data: {
    position: 'PHP Developer',
    links: [
      { name: 'github', url: 'https://github.com/alexeykhr' },
      { name: 'linkedin', url: 'https://linkedin.com/in/alexeykhr' },
    ],
  },
  templates: {
    default: {
      configuration: {
        background: () => require('./public/background.jpg'),
      },
    },
  },
} as IConfig;