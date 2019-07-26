import config from '../../../config';
import Dribbble from './Dribbble';
import profile from './profile';
import shots from './shots';

/**
 * @throws
 */
export default async () => {
  const isFillData = Object.values(config.modules.dribbble.auth).every((obj) => obj);

  // Need all filled value for parse Dribbble
  if (isFillData) {
    return {
      profile: await profile(),
      shots: await shots(),
    };
  }

  Dribbble.log('Parse', 'Skip').success();
  return null;
};
