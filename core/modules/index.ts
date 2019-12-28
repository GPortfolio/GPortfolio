import dribbble from './dribbble';
import github from './github';

/**
 * Data collected from various services using API/manual
 * @throws
 */
// TODO Delete?
export default async () => ({
  dribbble: await dribbble(),
  github: await github(),
});
