import { inject, injectable } from 'inversify';
import GithubRequest from './GithubRequest';
import IGithubConfigRepository from './interfaces/IGithubConfigRepository';
import IGithubRepository from './interfaces/IGithubRepository';
import IGithubFetcher from './interfaces/IGithubFetcher';
import IGithubProfile from './interfaces/IGithubProfile';
import { TYPES } from '../../types';
import IPrefixLogger from '../../modules/logger/interfaces/IPrefixLogger';

@injectable()
export default class GithubLoggerFetcher extends GithubRequest {
  protected logger: IPrefixLogger;

  constructor(fetcher: IGithubFetcher, @inject(TYPES.LoggerPrefix) logger: IPrefixLogger) {
    super(fetcher);
    this.logger = logger;
    this.logger.setPrefix('Github');
    this.logger.debug(`Using ${fetcher.constructor.name}`);
  }

  public fetchRepositories(
    params: IGithubConfigRepository,
    page: number,
    perPage: number,
  ): Promise<IGithubRepository[]> {
    this.logger.info(`Starting fetch repositories: page = ${page}, perPage = ${perPage}`);

    return super.fetchRepositories(params, page, perPage)
      .then((repositories) => {
        this.logger.log(`Complete repositories, count = ${repositories.length}`);
        return repositories;
      })
      .catch((err) => {
        this.logger.error(err.response.data || err.message);
        throw err;
      });
  }

  public fetchProfile(): Promise<IGithubProfile> {
    this.logger.info('Starting fetch profile');

    return super.fetchProfile()
      .then((profile) => {
        this.logger.log('Complete profile');
        return profile;
      })
      .catch((err) => {
        this.logger.error(err.response.data || err.message);
        throw err;
      });
  }
}
