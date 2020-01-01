import { IConfig } from '@i/IConfig';
import filterFunc from '../helpers/filter';
import sortFunc from '../helpers/sort';
import logger from '../helpers/logger';

/**
 * @return {void} self change
 */
export default (config: IConfig) => {
  /* | ------------------------------------------------------------------------------
   * | - Github -
   * | ------------------------------------------------------------------------------
   */

  const { github } = config.websites;

  // Filter repositories
  if (github.filter.repositories.length) {
    const msg = `Start: ${github.repositories.length} repositories, ${github.filter.repositories.length} filters`;

    logger('Github.Repositories Filter', msg).info();
    github.repositories = filterFunc(github.filter.repositories, github.repositories);
    logger('Github.Repositories Filter', `Complete: ${github.repositories.length} repositories`).success();
  }

  // Sort repositories
  if (github.sort.repositories) {
    const isDesc = github.sort.repositories.sortByDesc;
    const method = isDesc ? sortFunc.desc : sortFunc.asc;

    logger('Github.Repositories Sort', `Start: ${isDesc ? 'DESC' : 'ASC'}`).info();
    method(github.repositories, github.sort.repositories.attr);
    logger('Github.Repositories Sort', 'Finish').success();
  }

  /* | ------------------------------------------------------------------------------
   * | - Dribbble -
   * | ------------------------------------------------------------------------------
   */

  const { dribbble } = config.websites;

  // Filter shots
  if (dribbble.filter.shots.length) {
    const msg = `Start: ${dribbble.shots.length} shots, ${dribbble.filter.shots.length} filters`;

    logger('Dribbble.Shots Filter', msg).info();
    dribbble.shots = filterFunc(dribbble.filter.shots, dribbble.shots);
    logger('Dribbble.Shots Filter', `Complete: ${github.repositories.length} shots`).success();
  }

  // Sort shots
  if (dribbble.sort.shots) {
    const isDesc = dribbble.sort.shots.sortByDesc;
    const method = isDesc ? sortFunc.desc : sortFunc.asc;

    logger('Dribbble.Shots Sort', `Start: ${isDesc ? 'DESC' : 'ASC'}`).info();
    method(dribbble.shots, dribbble.sort.shots.attr);
    logger('Dribbble.Shots Sort', 'Finish').success();
  }
};
