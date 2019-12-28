import { IGithubRepository } from '../../interfaces/IGithub';
import config from '../../config';
import Filter from '../../classes/Filter';
import Sort from '../../classes/Sort';
import Github from './Github';

/**
 * @return {Promise<IGithubRepository[]>}
 * @throws
 */
export default async (): Promise<IGithubRepository[]> => {
  const { github } = config.websites;

  let repositories = await Github.fetchRepositories();

  /*
   * Filter repositories if need
   */
  const filter = new Filter(github.filter.repositories);
  if (filter.exists) {
    repositories = filter.run(repositories);
    Github.log(Github.sections.repositories, `Filter, ${repositories.length} length`).info();
  }

  /*
   * Sort repositories if need
   */
  if (github.sort.repositories.enable) {
    const sort = new Sort(repositories);

    /* eslint-disable-next-line @typescript-eslint/no-unused-expressions */
    github.sort.repositories.sortByDesc
      ? sort.desc(github.sort.repositories.attr)
      : sort.asc(github.sort.repositories.attr);
  }

  return repositories;
};
