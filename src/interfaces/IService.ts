import { IConfigData } from './IConfig';
import IApplication from './IApplication';

export default interface IService {
  name(): string

  configuration(): any

  applyConfigurations(app: IApplication): void

  configDataAdapter(): IConfigData | undefined
}
