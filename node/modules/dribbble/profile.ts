import Cache from '../../classes/Cache';
import { IDribbbleProfile } from '../../interfaces/IDribbble';
import variables from '../../variables';
import Dribbble from './Dribbble';

/**
 * @return {Promise<IDribbbleProfile>}
 * @throws
 */
export default async (): Promise<IDribbbleProfile> => {

  const cache = new Cache(variables.cache.dribbble.profile);

  /** @type {IDribbbleProfile} - data from API */
  let profile: IDribbbleProfile;

  if (cache.needParse) {

    profile = await Dribbble.fetchProfile();

    /*
     * Update cache and timestamp
     */
    cache.updateData(profile);
    cache.updateTimestamp();

  } else {
    profile = cache.dataFromFile;
    Dribbble.log(Dribbble.sections.profile, 'Get from cache').info();
  }

  return profile;
};
