import { Container } from 'inversify';
import { TYPES } from '../../../types';
import ITemplate from '../../../interfaces/ITemplate';
import IDefaultTemplate from '../interfaces/IDefaultTemplate';
import IService from '../../../interfaces/IService';
import GithubService from '../../../services/github/GithubService';

export default (di: Container) => {
  di.bind<IService>(TYPES.Services).to(GithubService);

  di.bind<ITemplate>(TYPES.Templates).toDynamicValue(() => ({
    info: {
      name: 'default',
      author: 'alexeykhr',
    },
    configuration: {
      background: () => require('../assets/background.png'),
      githubRepositoriesMore: 24,
    },
  }) as IDefaultTemplate);
};
