'use strict'

const path = require('path')

module.exports = {

  ROOT: path.resolve(__dirname, '../..'),

  /**
   * @var {string}
   */
  API_GITHUB: 'https://api.github.com',

  /**
   * Files in <root>/data folder
   * @var {string}
   */
  FILE_PROFILE_JSON: 'profile.json',
  FILE_TIMESTAMP_JSON: 'timestamp.json',
  FILE_REPOSITORIES_JSON: 'repositories.json'
}
