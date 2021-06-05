import { Container } from 'inversify';
import types from './types';

export default (di: Container) => {
  di.bind(types.GithubFetcher);

  di.bind(types.GithubProfileData).toConstantValue((() => {
    try {
      return require('../../../../data/github-profile.json') || undefined;
    } catch {
      return undefined;
    }
  })());

  di.bind(types.GithubRepositoriesData).toConstantValue((() => {
    try {
      return require('../../../../data/github-repositories.json') || [];
    } catch {
      return [];
    }
  })());
};
