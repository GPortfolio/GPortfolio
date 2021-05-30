import { inject, injectable } from 'inversify';
import StringUtils from '../../utils/StringUtils';
import IApplication from '../../interfaces/IApplication';
import { TYPES } from '../../types';

@injectable()
export default class SiteUrlResolver {
  private app: IApplication;

  constructor(@inject(TYPES.Application) app: IApplication) {
    this.app = app;
  }

  public handle() {
    const url = `${this.protocol}://${this.domain}/${this.path}`;

    return StringUtils.removeLastSymbolIfPresent(url, '/');
  }

  get protocol() {
    return this.app.config.global.www.https ? 'https' : 'http';
  }

  get domain() {
    return this.app.config.global.www.domain || this.githubDomain;
  }

  get githubDomain() {
    return `${this.app.config.services.github.configuration.nickname.toLowerCase()}.github.io`;
  }

  get path() {
    return this.app.config.global.www.path;
  }
}
