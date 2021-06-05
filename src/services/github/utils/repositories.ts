import 'reflect-metadata';
import path from 'path';
import fs from 'fs';
import GithubLoggerFetcher from '../GithubLoggerFetcher';
import { di } from '../../../di';
import { TYPES } from '../../../types';
import IPrefixLogger from '../../../modules/logger/interfaces/IPrefixLogger';
import IApplication from '../../../interfaces/IApplication';
import { parseGithubFetcher } from '../helper/utils';

const logger = di.get<IPrefixLogger>(TYPES.LoggerPrefix);
logger.setPrefix('Utils');

const fetcher = parseGithubFetcher();
if (fetcher === undefined) {
  logger.info('Skip Fetch Repositories');
  process.exit(0);
}

const { github } = di.get<IApplication>(TYPES.Application).config.services;
const githubFetcher = new GithubLoggerFetcher(fetcher, logger);

githubFetcher.fetchAllRepositories(github.configuration.fetcher.repositories)
  .then((repositories) => {
    fs.writeFileSync(
      path.resolve(__dirname, '../../../../data/github-repositories.json'),
      JSON.stringify(repositories, null, 2),
    );
  })
  .catch(() => {
    process.exit(1);
  });
