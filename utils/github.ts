import GithubLoggerFetcher from '../src/services/github/GithubLoggerFetcher';
import GithubPublicFetcher from '../src/services/github/fetcher/GithubPublicFetcher';

const fetcher = new GithubPublicFetcher('alexeykhr')
const githubFetcher = new GithubLoggerFetcher(fetcher)

githubFetcher.fetchProfile()
  .then((profile) => {
    console.log(JSON.stringify(profile))
  })
