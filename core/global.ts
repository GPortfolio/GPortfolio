import path from 'path';

export default {

  /** @type {string} */
  account: process.env.APP_ACCOUNT || 'profile',

  /** @type {string} */
  root: path.resolve(__dirname, '..'),

  /** @type {string} */
  owner: 'GPortfolio',

  /** @type {string} */
  repository: 'GPortfolio',
};
