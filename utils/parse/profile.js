'use strict'

const Github = require('../classes/Github')
const variables = require('../variables')
const Cache = require('../classes/Cache')

/**
 * @return {Promise<?object>}
 * @throws
 */
module.exports = async () => {

  const cache = new Cache(variables.FILE_PROFILE_JSON)

  /** @type {object} - data from API */
  let githubUser = {}

  if (cache.canParse) {

    githubUser = await Github.fetchProfile()

    /*
     * Update cache and timestamp
     */
    cache.updateData(githubUser)
    cache.updateTimestamp()

  } else {
    githubUser = cache.fileData
    Github.log(`Get from cache`, Github.sections.profile)
  }

  return githubUser
}
