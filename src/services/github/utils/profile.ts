import 'reflect-metadata';
import path from 'path';
import fs from 'fs';
import GithubLoggerFetcher from '../GithubLoggerFetcher';
import { di } from '../../../di';
import { TYPES } from '../../../types';
import IPrefixLogger from '../../../modules/logger/interfaces/IPrefixLogger';
import { parseGithubFetcher } from '../helper/utils';

const logger = di.get<IPrefixLogger>(TYPES.LoggerPrefix);
logger.setPrefix('Utils');

const fetcher = parseGithubFetcher();
if (fetcher === undefined) {
  logger.info('Skip Fetch Profile');
  process.exit(0);
}

const githubFetcher = new GithubLoggerFetcher(fetcher, logger);

githubFetcher.fetchProfile()
  .then((profile) => {
    fs.writeFileSync(
      path.resolve(__dirname, '../../../../data/github-profile.json'),
      JSON.stringify(profile, null, 2),
    );
  })
  .catch(() => {
    process.exit(1);
  });
