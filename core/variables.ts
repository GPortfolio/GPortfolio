import path from 'path';
import config from '../config';

/**
 * @param {string} str
 * @return {string}
 */
const noLastSlash = (str: string): string => {
  return str[str.length - 1] === '/'
    ? str.substring(0, str.length - 1)
    : str;
};

export default {

  /** @type {string} */
  root: path.resolve(__dirname, '..'),

  /** @type {string} */
  siteUrl: noLastSlash('https://' + (config.global.customDomain ||
    `${config.modules.github.username}.github.io/${config.global.base}`)),

  /**
   * Files in <root>/cache folder
   * @type {string}
   */
  cache: {
    dribbble: {
      profile: 'dribbble-profile.json',
      shots: 'dribbble-shots.json',
    },
    general: 'general.json',
    github: {
      profile: 'github-profile.json',
      repositories: 'github-repositories.json',
    },
  },
};
