'use strict'

const Github = require('../classes/Github')
const variables = require('../variables')
const Cache = require('../classes/Cache')

/** @type {string} */
const LOG_SECTION = 'Profile'

/**
 * @return {Promise<?object>}
 * @throws
 */
module.exports = async () => {

  const cache = new Cache(variables.FILE_PROFILE_JSON)

  /** @type {object} - data from API */
  let githubUser = {}

  if (cache.canParse) {

    /*
     * Fetch profile
     */
    Github.log('Fetching data from API..', LOG_SECTION)
    try {
      githubUser = await Github.fetchProfile()
      Github.log('Complete', LOG_SECTION)
    } catch (e) {
      Github.log(e, LOG_SECTION)
      throw new Error(e)
    }

    /*
     * Update cache and timestamp
     */
    cache.updateData(githubUser)
    cache.updateTimestamp()

  } else {
    githubUser = cache.fileData
    Github.log(`Get from cache`, LOG_SECTION)
  }

  return githubUser
}
