import Application from '../Application';
import { IConfigProxyData } from './IConfig';

export default interface IService {
  name(): string

  register(): any

  boot(app: Application): void

  proxy(app: Application): IConfigProxyData | undefined
}
