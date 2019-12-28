import { IDribbbleProfile } from '../../interfaces/IDribbble';
import Dribbble from './Dribbble';

/**
 * @return {Promise<IDribbbleProfile>}
 * @throws
 */
export default (): Promise<IDribbbleProfile> => Dribbble.fetchProfile();
