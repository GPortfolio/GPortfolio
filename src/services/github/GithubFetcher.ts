import IGithubProfile from './interfaces/IGithubProfile';
import IGithubFetcher from './interfaces/IGithubFetcher';
import IGithubRepository from './interfaces/IGithubRepository';
import IGithubConfigRepository from './interfaces/IGithubConfigRepository';

export default class GithubFetcher {
  public static API = 'https://api.github.com';

  public static REPOS_MAX_COUNT = 100;

  protected fetcher: IGithubFetcher;

  constructor(fetcher: IGithubFetcher) {
    this.fetcher = fetcher;
  }

  public fetchProfile(): Promise<IGithubProfile> {
    return this.fetcher.fetchProfile()
      .then(({data}) => data);
  }

  public fetchRepositories(params: IGithubConfigRepository, page: number, perPage: number): Promise<IGithubRepository[]> {
    return this.fetcher.fetchRepositories(params, page, perPage)
      .then(({data}) => data);
  }

  public async fetchAllRepositories(params: IGithubConfigRepository): Promise<IGithubRepository[]> {
    const repositories = [];
    let repos = [];
    let page = 1;

    do {
      repos = await this.fetchRepositories(params, page, GithubFetcher.REPOS_MAX_COUNT);

      repositories.push(...repos);

      page++;
    } while (repos.length === GithubFetcher.REPOS_MAX_COUNT);

    return repositories;
  }
}
