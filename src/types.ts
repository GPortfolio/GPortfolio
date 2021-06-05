import githubService from './services/github/config/types';

const TYPES = {
  UserData: Symbol.for('user.data'),
  Application: Symbol.for('application'),
  Logger: Symbol.for('logger'),
  LoggerPrefix: Symbol.for('logger.prefix'),
  FilterCompareItems: Symbol.for('filter.compare.items'),
  Services: Symbol.for('services'),
  Templates: Symbol.for('templates'),

  ...githubService,
};

export { TYPES };

export default TYPES;
