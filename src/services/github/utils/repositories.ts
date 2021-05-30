import 'reflect-metadata';
import path from 'path';
import fs from 'fs';
import GithubLoggerFetcher from '../GithubLoggerFetcher';
import GithubPublicFetcher from '../fetcher/GithubPublicFetcher';
import GithubPrivateFetcher from '../fetcher/GithubPrivateFetcher';
import IGithubFetcher from '../interfaces/IGithubFetcher';
import { di } from '../../../di';
import { TYPES } from '../../../types';
import IPrefixLogger from '../../../modules/logger/interfaces/IPrefixLogger';
import IApplication from '../../../interfaces/IApplication';

const { github } = di.get<IApplication>(TYPES.Application).config.services;
const args = process.argv.slice(2);

const fetcher: IGithubFetcher = args.length
  ? new GithubPrivateFetcher(args[0])
  : new GithubPublicFetcher(github.configuration.nickname);

const logger = di.get<IPrefixLogger>(TYPES.LoggerPrefix);
const githubFetcher = new GithubLoggerFetcher(fetcher, logger);

githubFetcher.fetchAllRepositories(github.configuration.fetcher.repositories)
  .then((profile) => {
    fs.writeFileSync(
      path.resolve(__dirname, '../../../../data/github/repositories.json'),
      JSON.stringify(profile, null, 2),
    );
  });
