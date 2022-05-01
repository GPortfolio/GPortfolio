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
              { attr: 'fork', values: false },
              { attr: 'language', values: ['HTML', 'JavaScript], revert: true }
            ],
          ],
        },
      },
    },
  },
  data: {
    position: 'Software Developer',
    links: [
      { name: 'github', url: 'https://github.com/rkcabell' },
      { name: 'linkedin', url: 'https://www.linkedin.com/in/ryan-cabell-7548b5158/' }
      { name: 'resume', image: () => require('./src/templates/default/assets/resume_icon.ico') }
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
