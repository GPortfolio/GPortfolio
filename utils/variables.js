'use strict'

const config = require('../config')
const path = require('path')

/**
 * @param {string} str
 * @return {string}
 */
const noLastSlash = (str) => str[str.length - 1] === '/' ? str.substring(0, str.length - 1) : str

module.exports = {

  /** @var {string} */
  ROOT: path.resolve(__dirname, '..'),

  /** @var {string} */
  SITE_URL: noLastSlash('https://' + (config.customDomain || `${config.username}.github.io/${config.base}`)),

  /** @var {{}} */
  CONSOLE_COLORS: {
    reset: '\x1b[0m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m'
  },

  /**
   * Files in <root>/data folder
   * @var {string}
   */
  FILE_PROFILE_JSON: 'profile.json',
  FILE_TIMESTAMP_JSON: 'timestamp.json',
  FILE_REPOSITORIES_JSON: 'repositories.json'
}
