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
  let profile = {}

  if (cache.canParse) {

    profile = await Github.fetchProfile()

    /*
     * Update cache and timestamp
     */
    cache.updateData(profile)
    cache.updateTimestamp()

  } else {
    profile = cache.dataFromFile
    Github.log(`Get from cache`, Github.sections.profile)
  }

  return profile
}
