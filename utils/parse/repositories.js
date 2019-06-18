'use strict'

const Github = require('../classes/Github')
const Filter = require('../classes/Filter')
const variables = require('../variables')
const Cache = require('../classes/Cache')
const config = require('../../config')

/** @type {string} */
const LOG_SECTION = 'Repositories'

/**
 * @return {Promise<?array>}
 * @throws
 */
module.exports = async () => {

  const cache = new Cache(variables.FILE_REPOSITORIES_JSON)
  cache.setTimeWait(1000 * 60 * 60 * 2) // 2 hours

  /** @type {array} - data from API */
  let repositories = []

  if (cache.canParse) {

    /*
     * Fetch repositories
     */
    try {
      repositories = await Github.fetchRepositories((page) => {
        Github.log(`Fetching data from API.. | ${page} page`, LOG_SECTION)
      })
      Github.log(`Complete, ${repositories.length} length`, LOG_SECTION)
    } catch (e) {
      Github.log(e, LOG_SECTION)
      throw new Error(e)
    }

    /*
     * Filter repositories if need
     */
    const filter = new Filter(config.parseGithub.filter)
    if (filter.has) {
      repositories = filter.run(repositories)
      Github.log(`Filter, ${repositories.length} length`, LOG_SECTION)
    }

    /*
     * Update cache and timestamp
     */
    cache.updateData(repositories)
    cache.updateTimestamp()

  } else {
    repositories = cache.fileData
    Github.log(`Get from cache, ${repositories.length} length`, LOG_SECTION)
  }

  return repositories
}
