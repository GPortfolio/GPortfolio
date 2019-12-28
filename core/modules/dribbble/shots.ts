import config from '../../config';
import Filter from '../../classes/Filter';
import Sort from '../../classes/Sort';
import { IDribbbleShot } from '../../interfaces/IDribbble';
import Dribbble from './Dribbble';

/**
 * @return {Promise<IDribbbleShot[]>}
 * @throws
 */
export default async (): Promise<IDribbbleShot[]> => {
  const { dribbble } = config.websites;

  let shots = await Dribbble.fetchShots();

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

    /* eslint-disable-next-line @typescript-eslint/no-unused-expressions */
    dribbble.sort.shots.sortByDesc
      ? sort.desc(dribbble.sort.shots.attr)
      : sort.asc(dribbble.sort.shots.attr);
  }

  return shots;
};
