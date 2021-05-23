import IConfig from './src/interfaces/IConfig';

export default {
  template: 'default',
  services: {
    github: {
      configuration: {
        nickname: 'alexeykhr',
        sort: {
          repositories: [
            { attr: 'stargazers_count', sortByDesc: true },
            { attr: 'forks_count', sortByDesc: true },
          ],
        },
        filter: {
          repositories: [
            [{ attr: 'stargazers_count', values: 10, revert: false, options: { sign: '<' } }],
          ],
        },
      },
    },
  },
} as IConfig;
