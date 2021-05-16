import IConfig from './interfaces/IConfig';
import StringUtils from './utils/StringUtils';
import ITemplate from './interfaces/ITemplate';

// TODO Temporary
export default class Config {
  static get(): IConfig {
    return {
      global: {
        template: 'default',
        base: '',
        locale: 'en_US',
        opg: {},
        pwa: {},
        customDomain: '',
        meta: {},
      },
      services: {
        github: {
          configuration: {
            token: '',
            nickname: '',
            settings: {
              repositories: {
                type: 'owner',
                sort: 'full_name',
                direction: 'asc',
                visibility: 'public',
                affiliation: ['owner', 'collaborator', 'organization_member'],
              },
            },
            filter: {
              repositories: [],
            },
            sort: {
              repositories: [],
            },
          },
          data: {
            profile: undefined,
            repositories: [],
          },
        }
      },
      data: {
        login: 'alexeykhr',
        first_name: 'Alexey',
        last_name: 'Khrushch',
        bio: 'Some bio',
        avatar_url: '',
        gender: 'male',
        position: 'Software Developer',
        company: 'My Company',
        location: 'Kiyv',
        hireable: false,
        links: [],
      },
      templates: {
        default: {
          info: {
            name: 'default',
            github_author: 'alexeykhr',
          },
          configuration: {
            background: require('./templates/default/assets/background.png'),
            githubRepositoriesMore: 25,
          },
        },
      },
    }
  }

  static siteUrl() {
    const config = Config.get()

    const domain = `https://${config.global.customDomain || config.services.github.configuration.nickname}.github.io`

    return StringUtils.removeLastSymbolIfPresent(`${domain}/${config.global.base}`, '/')
  }

  static template(): ITemplate {
    const config = Config.get()

    return config.templates[config.global.template]
  }
}
