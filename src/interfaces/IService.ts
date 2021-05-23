import Application from '../Application';

export default interface IService {
  name(): string

  register(): any

  boot(app: Application): void
}
