import dribbble from './dribbble';
import github from './github';

/**
 * Data collected from various services using API/manual
 * @throws
 */
export default async () => {
  return {
    dribbble: await dribbble(),
    github: await github(),
  };
};
