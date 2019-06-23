'use strict'

const Github = require('../classes/Github')
const Filter = require('../classes/Filter')
const variables = require('../variables')
const Cache = require('../classes/Cache')
const config = require('../../config')

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

    repositories = await Github.fetchRepositories()

    /*
     * Filter repositories if need
     */
    const filter = new Filter(config.parseGithub.filter)
    if (filter.exists) {
      repositories = filter.run(repositories)
      Github.log(`Filter, ${repositories.length} length`, Github.sections.repositories)
    }

    /*
     * Update cache and timestamp
     */
    cache.updateData(repositories)
    cache.updateTimestamp()

  } else {
    repositories = cache.dataFromFile
    Github.log(`Get from cache, ${repositories.length} length`, Github.sections.repositories)
  }

  return repositories
}
