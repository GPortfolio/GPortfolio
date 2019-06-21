'use strict'

const Dribbble = require('../../classes/Dribbble')
const variables = require('../../variables')
const Cache = require('../../classes/Cache')

/**
 * @return {Promise<?object>}
 * @throws
 */
module.exports = async () => {

  const cache = new Cache(variables.FILE_DRIBBBLE_PROFILE_JSON)

  /** @type {object} - data from API */
  let profile = {}

  if (cache.canParse) {

    profile = await Dribbble.fetchProfile()

    /*
     * Update cache and timestamp
     */
    cache.updateData(profile.data)
    cache.updateTimestamp()

  } else {
    profile = cache.dataFromFile
    Dribbble.log('Get from cache', Dribbble.sections.profile)
  }

  return profile
}
