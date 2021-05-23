import IDefaultTemplate from './interfaces/IDefaultTemplate';

export default {
  template: {
    info: {
      name: 'default',
      author: 'alexeykhr',
    },
    configuration: {
      background: () => require('./assets/background.png'),
      githubRepositoriesMore: 25,
    },
  } as IDefaultTemplate,
};
