import IConfig from './interfaces/IConfig';
import StringUtils from './utils/StringUtils';
import ITemplate from './interfaces/ITemplate';
import listServices from './config/services';
import listTemplates from './config/templates';
import ObjectUtils from './utils/ObjectUtils';
import configData from '../config';

export default class Application {
  protected static instance: Application;

  protected data: IConfig;

  constructor() {
    this.data = {
      template: 'default',
      global: {
        locale: 'en_US',
        opg: {},
        pwa: {},
        meta: {},
        www: {
          domain: '',
          path: '',
          https: true,
        },
      },
      services: this.registerServices(),
      data: {
        login: '',
        first_name: '',
        last_name: '',
        bio: '',
        avatar: '',
        gender: '',
        position: '',
        company: '',
        location: '',
        hireable: false,
        links: [],
      },
      templates: this.resolveTemplates(),
    };

    this.data = ObjectUtils.deepMerge(this.data, configData);

    this.bootServices();
  }

  static make(): Application {
    if (Application.instance === undefined) {
      Application.instance = new Application();
    }

    return Application.instance;
  }

  config(): IConfig {
    return this.data;
  }

  siteUrl(): string {
    const config = this.config();

    const protocol = config.global.www.https ? 'https' : 'http';
    const domain = `${config.global.www.domain || config.services.github.configuration.nickname + '.github.io'}`;

    return StringUtils.removeLastSymbolIfPresent(`${protocol}://${domain}/${config.global.www.path}`, '/');
  }

  template(): ITemplate {
    const config = this.config();

    return config.templates[config.template];
  }

  protected registerServices(): any {
    const services: any = {};

    for (const service of listServices) {
      services[service.name()] = service.register();
    }

    return services;
  }

  protected bootServices(): void {
    for (const service of listServices) {
      service.boot(this);
    }
  }

  protected resolveTemplates(): any {
    const templates: any = {};

    for (const template of listTemplates) {
      templates[template.info.name] = template;
    }

    return templates;
  }
}
