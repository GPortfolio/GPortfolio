import { IConfigData } from './IConfig';
import IApplication from './IApplication';

export default interface IService {
  name(): string

  configuration(): any

  boot(app: IApplication): void

  proxy(app: IApplication): IConfigData | undefined
}
