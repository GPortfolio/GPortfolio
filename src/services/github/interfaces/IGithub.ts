import IGithubRepository from './IGithubRepository';
import IGithubProfile from './IGithubProfile';
import IGithubConfiguration from './IGithubConfiguration';

export default interface IGithub {
  configuration: IGithubConfiguration
  data: {
    profile: IGithubProfile | undefined
    repositories: IGithubRepository[]
  }
}
