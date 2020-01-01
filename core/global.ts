import path from 'path';
import config from './config';

/**
 * @param {string} str
 * @return {string}
 */
const noLastSlash = (str: string): string => (str[str.length - 1] === '/'
  ? str.substring(0, str.length - 1)
  : str);

const { profile: githubProfile } = config.websites.github;

export default {

  /** @type {string} */
  root: path.resolve(__dirname, '..'),

  /** @type {string} */
  siteUrl: noLastSlash(`https://${config.global.customDomain
    || `${githubProfile ? githubProfile.login : ''}.github.io/${config.global.base}`}`),

  /** @type {string} */
  owner: 'GPortfolio',

  /** @type {string} */
  repository: 'GPortfolio',
};
