import config from '../../../config';
import Cache from '../../classes/Cache';
import Filter from '../../classes/Filter';
import Sort from '../../classes/Sort';
import { IDribbbleShot } from '../../interfaces/IDribbble';
import variables from '../../variables';
import Dribbble from './Dribbble';

/**
 * @return {Promise<IDribbbleShot[]>}
 * @throws
 */
export default async (): Promise<IDribbbleShot[]> => {

  const dribbble = config.modules.dribbble;
  const cache = new Cache(variables.cache.dribbble.shots);

  /** @type {IDribbbleShot[]} - data from API */
  let shots: IDribbbleShot[];

  if (cache.needParse) {

    shots = await Dribbble.fetchShots();

    /*
     * Update cache and timestamp
     */
    cache.updateData(shots);
    cache.updateTimestamp();

  } else {
    shots = cache.dataFromFile;
    Dribbble.log(Dribbble.sections.shots, `Get from cache, ${shots.length} length`).info();
  }

  /*
   * Filter shots if need
   */
  const filter = new Filter(dribbble.filter.shots);
  if (filter.exists) {
    shots = filter.run(shots);
    Dribbble.log(Dribbble.sections.shots, `Filter, ${shots.length} length`).info();
  }

  /*
   * Sort shots if need
   */
  if (dribbble.sort.shots.enable) {
    const sort = new Sort(shots);
    dribbble.sort.shots.sortByDesc
      ? sort.desc(dribbble.sort.shots.attr)
      : sort.asc(dribbble.sort.shots.attr);
  }

  return shots;
};
