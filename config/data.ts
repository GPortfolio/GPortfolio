import { getDeepByKey } from '../core/helpers/utils';

export default {
  /**
   * Your name
   * @type {string}
   */
  name: (modules: any) => {
    let val = getDeepByKey(modules, ['github', 'profile', 'name']);

    if (!val) {
      val = getDeepByKey(modules, ['dribbble', 'profile', 'name']);
    }

    return val;
  },

  /**
   * Profile picture
   * @type {string}
   */
  avatar_url: (modules: any) => {
    let val = getDeepByKey(modules, ['github', 'profile', 'avatar_url']);

    if (!val) {
      val = getDeepByKey(modules, ['dribbble', 'profile', 'avatar_url']);
    }

    return val;
  },

  /**
   * @type {string}
   */
  position: 'Full Stack Developer',

  /**
   * Searching for a job
   * @type {boolean}
   */
  hire: (modules: any) => {
    return !!getDeepByKey(modules, ['github', 'profile', 'hireable']);
  },

  /**
   * You are in social networks
   * @type {object}
   */
  socialMedia: [
    //
  ],
};
