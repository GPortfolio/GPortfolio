import IDefaultTemplate from '../interfaces/IDefaultTemplate';

export default class DefaultTemplate implements IDefaultTemplate {
  info = {
    name: 'default',
    github_author: 'alexeykhr'
  };

  configuration = {
    background: require('../assets/background.png'),
    githubRepositoriesMore: 25,
  };
}
