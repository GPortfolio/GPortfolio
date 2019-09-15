import profile from './profile';
import repositories from './repositories';

/**
 * @throws
 */
export default async () => {
  return {
    profile: await profile(),
    repositories: await repositories(),
  };
};
