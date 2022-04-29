import IConfig from './src/interfaces/IConfig';
export default {
  // Choosing a template for generating a site, a list of available in the [Templates] section
  template: 'default',

  global: {
    // Format: language_TERRITORY
    locale: 'en_US', // default value

    // The Open Graph protocol
    // https://ogp.me/
    opg: {
      // All settings have already been added, but if you want to expand with
      // new values or replace, you can always do it here:
      'og:image:alt': 'Profile image',
    },

    // Progressive Web Apps
    // https://web.dev/progressive-web-apps/
    pwa: {
      // If you want to change the data when generating manifest.json
      description: 'My Portfolio',
      theme_color: '#000',
    },

    // HTML Meta tags
    // <meta name="<key>" content="<value>">
    meta: {
      description: 'My Portfolio',
      viewport: 'width=device-width, initial-scale=1.0',
    },

    www: {
      // If you are using your domain and not <username> .github.io
      domain: '',
    },
  },

  // This is the main property, the data from which fill the template
  // If any services are used (like Github), then this data can be
  // automatically filled in
  data: {
    // To replace generated values or add missing data
    hireable: true,
    gender: 'male',
    position: 'Software Developer',
    avatar: () => require('./public/my-image.png'),
  },

  // Here are the services from which you can automatically get the latest data
  services: {
    github: {
      configuration: {
        // https://github.com/<nickname>
        nickname: 'rkcabell',
        // This data is used when making requests to the Github API
        fetcher: {
          repositories: {
            type: 'all',
          },
        },
        // When generating a template, the received data is filtered,
        // described in more detail in the [Filter] section
        filter: {
          repositories: [
            [
              { attr: 'owner.login', values: ['rkcabell', 'orgName'] },
              { attr: 'id', values: 123456, options: { sign: '>' } },
            ],
            [
              { attr: 'fork', values: false },
            ],
          ],
        },
        // Output data is also sorted in more detail in the [Sorter] section
        sort: {
          repositories: [
            { attr: 'created_at', sortByDesc: true },
            { attr: 'forks_count', sortByDesc: true },
          ],
        },
      },
    },
  },

  // Each template can have its own unique settings
  templates: {
    // Template name
    default: {
      configuration: {
        githubRepositoriesMore: 2,
        background: () => require('./public/background.png'),
      },
    },
  },
} as IConfig;
