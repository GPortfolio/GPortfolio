import config from './index';

/**
 * @param {string} str
 * @return {string}
 */
const noLastSlash = (str: string): string => (str[str.length - 1] === '/'
  ? str.substring(0, str.length - 1)
  : str);

const { profile: githubProfile } = config.websites.github;

export default noLastSlash(`https://${config.global.customDomain
  || `${githubProfile ? githubProfile.login : ''}.github.io/${config.global.base}`}`);
