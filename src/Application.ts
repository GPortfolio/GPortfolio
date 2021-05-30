import { injectable, multiInject } from 'inversify';
import IConfig, { IConfigData, IConfigGlobal } from './interfaces/IConfig';
import ITemplate from './interfaces/ITemplate';
import IService from './interfaces/IService';
import { TYPES } from './types';
import IApplication from './interfaces/IApplication';
import ObjectUtils from './utils/ObjectUtils';
import configData from '../config';

@injectable()
export default class Application implements IApplication {
  public static DEFAULT_TEMPLATE = 'default';

  private data: IConfig;

  private services: IService[];

  private templates: ITemplate[];

  constructor(
  @multiInject(TYPES.Services) services: IService[],
    @multiInject(TYPES.Templates) templates: ITemplate[],
  ) {
    this.services = services;
    this.templates = templates;

    this.data = ObjectUtils.deepMerge({
      template: Application.DEFAULT_TEMPLATE,
      global: this.defaultGlobalData,
      services: this.registerServices(),
      templates: this.registerTemplates(),
    }, configData);

    this.data.data = this.dataFromServices();

    this.bootServices();
  }

  get config(): IConfig {
    return this.data;
  }

  get template(): ITemplate {
    return this.data.templates[this.data.template];
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

  protected bootServices(): void {
    this.services.forEach((service) => {
      service.boot(this);
    });
  }

  private dataFromServices(): IConfigData {
    const data: IConfigData = this.defaultData;

    this.services.forEach((service) => {
      const config = service.proxy(this);

      if (config !== undefined) {
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

    return data;
  }

  get defaultGlobalData(): IConfigGlobal {
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
