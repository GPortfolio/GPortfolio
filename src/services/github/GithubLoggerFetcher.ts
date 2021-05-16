import GithubFetcher from './GithubFetcher';
import IGithubConfigRepository from './interfaces/IGithubConfigRepository';
import IGithubRepository from './interfaces/IGithubRepository';
import Logger from '../../modules/logger/Logger';
import IGithubFetcher from './interfaces/IGithubFetcher';
import IGithubProfile from './interfaces/IGithubProfile';

export default class GithubLoggerFetcher extends GithubFetcher {
  private logger: Logger;

  constructor(fetcher: IGithubFetcher, logger: Logger|undefined = undefined) {
    super(fetcher);
    this.logger = logger || new Logger('Github Fetcher')
  }

  fetchRepositories(params: IGithubConfigRepository, page: number, perPage: number): Promise<IGithubRepository[]> {
    this.logger.info(`Starting fetch repositories: page = ${page}, perPage = ${perPage}`)

    return super.fetchRepositories(params, page, perPage)
      .then((repositories) => {
        this.logger.success(`Complete repositories, count = ${repositories.length}`)
        return repositories
      })
      .catch((err) => {
        this.logger.error(`Failed repositories: ${err.message}`)
        return err
      })
  }

  fetchProfile(): Promise<IGithubProfile> {
    this.logger.info('Starting fetch profile')

    return super.fetchProfile()
      .then((profile) => {
        this.logger.success(`Complete profile`)
        return profile
      })
      .catch((err) => {
        this.logger.error(`Failed profile: ${err.message}`)
        return err
      })
  }
}
