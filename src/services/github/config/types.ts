const prefix = 'services.github';

export default {
  GithubFetcher: Symbol.for(`${prefix}.fetcher`),
  GithubProfileData: Symbol.for(`${prefix}.data.profile`),
  GithubRepositoriesData: Symbol.for(`${prefix}.data.repositories`),
};
