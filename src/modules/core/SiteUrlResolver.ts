import StringUtils from '../../utils/StringUtils';
import { IConfigGlobalWww } from '../../interfaces/IConfig';

export default class SiteUrlResolver {
  private www: IConfigGlobalWww;

  constructor(www: IConfigGlobalWww) {
    this.www = www;
  }

  public resolve() {
    return StringUtils.rtrim(this.url, '/');
  }

  protected get url() {
    return `${this.www.protocol}://${this.www.domain}${this.path}`;
  }

  protected get path() {
    if (!this.www.path) {
      return '';
    }

    return StringUtils.ltrim(`/${this.www.path}`, '/');
  }
}
