import { IGithubProfile } from '../../interfaces/IGithub';
import Github from './Github';

/**
 * @return {Promise<IGithubProfile>}
 * @throws
 */
export default (): Promise<IGithubProfile> => Github.fetchProfile();
