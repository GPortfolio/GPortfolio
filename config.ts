import IConfig from './src/interfaces/IConfig';

export default {
  services: {
    github: {
      configuration: {
        nickname: 'rkcabell',
        sort: {
          repositories: [
            { attr: 'created_at', sortByDesc: true },
            { attr: 'forks_count', sortByDesc: true },
            { attr: 'stargazers_count', sortByDesc: true },
          ],
        },
        filter: {
          repositories: [
            [
              { attr: 'owner.login', values: ['rkcabell', 'portfolio'] },
              { attr: 'name', values: ['awesome-vue', 'merge-conflict', 'github-pages-with-jekyll', 'markdown-portfolio'], revert: true },
              { attr: 'fork', values: false },
            ],
          ],
        },
      },
    },
  },
  data: {
    position: 'Java Developer',
    links: [
      { name: 'github', url: 'https://github.com/rkcabell' }
    ],
  },
  templates: {
    default: {
      configuration: {
        background: () => require('./src/templates/default/assets/background.png'),
      },
    },
  },
} as IConfig;
