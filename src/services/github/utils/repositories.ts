import path from 'path';
import fs from 'fs';
import GithubLoggerFetcher from '../GithubLoggerFetcher';
import GithubPublicFetcher from '../fetcher/GithubPublicFetcher';
import Application from '../../../Application';
import GithubPrivateFetcher from '../fetcher/GithubPrivateFetcher';

const config = Application.make().config()
const { github } = config.services

const filePath = path.resolve(__dirname, '../../../../data/github/repositories.json')
const args = process.argv.slice(2)

let fetcher
if (args.length) {
  fetcher = new GithubPrivateFetcher(args[0])
} else {
  fetcher = new GithubPublicFetcher(github.configuration.nickname);
}

const githubFetcher = new GithubLoggerFetcher(fetcher);
githubFetcher.fetchAllRepositories(github.configuration.fetcher.repositories)
  .then((profile) => {
    fs.writeFileSync(filePath, JSON.stringify(profile, null, 2))
  });
