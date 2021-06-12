import { inject, injectable, multiInject } from 'inversify';
import IConfig, { IConfigData, IConfigGlobal } from './interfaces/IConfig';
import ITemplate from './interfaces/ITemplate';
import IService from './interfaces/IService';
import { TYPES } from './types';
import IApplication from './interfaces/IApplication';
import ObjectUtils from './utils/ObjectUtils';
import SiteUrlResolver from './modules/core/SiteUrlResolver';

// TODO Refactoring

@injectable()
export default class Application implements IApplication {
  public static DEFAULT_TEMPLATE = 'default';

  private data: IConfig;

  private services: IService[];

  private templates: ITemplate[];

  private siteUrl: string;

  constructor(
  @inject(TYPES.UserData) userData: IConfig,
    @multiInject(TYPES.Services) services: IService[],
    @multiInject(TYPES.Templates) templates: ITemplate[],
  ) {
    this.services = services;
    this.templates = templates;

    this.data = {
      template: Application.DEFAULT_TEMPLATE,
      global: this.defaultGlobalData,
      data: this.defaultData,
      services: this.registerServices(),
      templates: this.registerTemplates(),
      webpack: () => {},
    };

    this.mergeDataFromServices(this.data.data);

    ObjectUtils.deepMerge(this.data, userData);

    this.services.forEach((service) => service.applyConfigurations(this));

    this.siteUrl = new SiteUrlResolver(this.config.global.www).resolve();
  }

  get config(): IConfig {
    return this.data;
  }

  get template(): ITemplate {
    return this.data.templates[this.data.template];
  }

  get url(): string {
    return this.siteUrl;
  }

  protected registerServices(): any {
    const services: any = {};

    this.services.forEach((service) => {
      services[service.name()] = service.configuration();
    });

    return services;
  }

  protected registerTemplates(): any {
    const templates: any = {};

    this.templates.forEach((template) => {
      templates[template.info.name] = template;
    });

    return templates;
  }

  private mergeDataFromServices(data: IConfigData): void {
    this.services.forEach((service) => {
      const config = service.configDataAdapter();

      if (config !== undefined) {
        /* eslint-disable no-param-reassign */
        data.login = data.login || config.login;
        data.first_name = data.first_name || config.first_name;
        data.last_name = data.last_name || config.last_name;
        data.bio = data.bio || config.bio;
        data.avatar = data.avatar || config.avatar;
        data.gender = data.gender || config.gender;
        data.position = data.position || config.position;
        data.company = data.company || config.company;
        data.location = data.location || config.location;
        data.hireable = data.hireable || config.hireable;
        data.links.push(...config.links);
      }
    });
  }

  get defaultGlobalData(): IConfigGlobal {
    return {
      locale: 'en_US',
      opg: {},
      pwa: null,
      meta: {},
      www: {
        domain: '',
        path: '',
        protocol: 'https',
      },
    };
  }

  get defaultData(): IConfigData {
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
    };
  }
}
