import IGithubConfig from './IGithubConfig';
import IGithubRepository from './IGithubRepository';
import IGithubProfile from './IGithubProfile';

export default interface IGithubService {
  configuration: IGithubConfig
  data: {
    profile: IGithubProfile | undefined
    repositories: IGithubRepository[]
  }
}
