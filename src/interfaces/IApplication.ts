import IConfig from './IConfig';
import ITemplate from './ITemplate';

export default interface IApplication {
  config: IConfig

  template: ITemplate

  url: string
}
