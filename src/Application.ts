import IConfig, { IConfigData, IConfigGlobal } from './interfaces/IConfig';
import StringUtils from './utils/StringUtils';
import ITemplate from './interfaces/ITemplate';
import listServices from './config/services';
import listTemplates from './config/templates';
import ObjectUtils from './utils/ObjectUtils';
import configData from '../config';
import global from './config/global';
import IService from './interfaces/IService';

export default class Application {
  protected static instance: Application;

  protected data: IConfig;

  constructor() {
    const services = this.registerServices()

    this.data = {
      template: global.defaultTemplate,
      global: this.dataGlobal(),
      services,
      data: this.collectData(),
      templates: this.resolveTemplates(),
    };

    this.fillData(this.data.data, listServices)

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

  protected fillData(data: IConfigData, services: IService[]): void {
    for (const service of services) {
      const config = service.proxy(this)

      if (config === undefined) {
        continue
      }

      data.login = config.login === undefined ? data.login : config.login;
      data.first_name = config.firstName === undefined ? data.first_name : config.firstName;
      data.last_name = config.lastName === undefined ? data.last_name : config.lastName;
      data.bio = config.bio === undefined ? data.bio : config.bio;
      data.avatar = config.avatar === undefined ? data.avatar : config.avatar;
      data.gender = config.gender === undefined ? data.gender : config.gender;
      data.position = config.position === undefined ? data.position : config.position;
      data.company = config.company === undefined ? data.company : config.company;
      data.location = config.location === undefined ? data.location : config.location;
      data.hireable = config.hireable === undefined ? data.hireable : config.hireable;

      if (config.link) {
        data.links.push(config.link)
      }
    }
  }

  private dataGlobal(): IConfigGlobal {
    return {
      locale: 'en_US',
      opg: {},
      pwa: {},
      meta: {},
      www: {
        domain: '',
        path: '',
        https: true,
      },
    };
  }

  private collectData(): IConfigData {
    return {
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
    }
  }
}
