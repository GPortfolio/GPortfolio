import GithubService from '../services/github/GithubService';
import IService from '../interfaces/IService';

export default [
  new GithubService(),
] as IService[];
