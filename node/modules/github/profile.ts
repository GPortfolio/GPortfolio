import Cache from '../../classes/Cache';
import { IGithubProfile } from '../../interfaces/IGithub';
import variables from '../../variables';
import Github from './Github';

/**
 * @return {Promise<IGithubProfile>}
 * @throws
 */
export default async (): Promise<IGithubProfile> => {

  const cache = new Cache(variables.cache.github.profile);

  /** @type {IGithubProfile} - data from API */
  let profile: IGithubProfile;

  if (cache.needParse) {

    profile = await Github.fetchProfile();

    /*
     * Update cache and timestamp
     */
    cache.updateData(profile);
    cache.updateTimestamp();

  } else {
    profile = cache.dataFromFile;
    Github.log(Github.sections.profile, 'Get from cache').info();
  }

  return profile;
};
