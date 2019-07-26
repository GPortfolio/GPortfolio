import config from '../../../config';
import Cache from '../../classes/Cache';
import Filter from '../../classes/Filter';
import { IGithubRepository } from '../../interfaces/IGithub';
import variables from '../../variables';
import Github from './Github';

/**
 * @return {Promise<IGithubRepository[]>}
 * @throws
 */
export default async (): Promise<IGithubRepository[]> => {

  const cache = new Cache(variables.cache.github.repositories);
  cache.setTimeWait(1000 * 60 * 60 * 2); // 2 hours

  /** @type {IGithubRepository[]} - data from API */
  let repositories: IGithubRepository[];

  if (cache.needParse) {

    repositories = await Github.fetchRepositories();

    /*
     * Filter repositories if need
     */
    const filter = new Filter(config.modules.github.filter.repositories);
    if (filter.exists) {
      repositories = filter.run(repositories);
      Github.log(Github.sections.repositories, `Filter, ${repositories.length} length`).info();
    }

    /*
     * Update cache and timestamp
     */
    cache.updateData(repositories);
    cache.updateTimestamp();

  } else {
    repositories = cache.dataFromFile;
    Github.log(Github.sections.repositories, `Get from cache, ${repositories.length} length`).info();
  }

  return repositories;
};
