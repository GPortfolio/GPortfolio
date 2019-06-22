'use strict'

const Dribbble = require('../../classes/Dribbble')
const variables = require('../../variables')
const Cache = require('../../classes/Cache')

/**
 * @return {Promise<array>}
 * @throws
 */
module.exports = async () => {

  const cache = new Cache(variables.FILE_DRIBBBLE_SHOTS_JSON)

  /** @type {array} - data from API */
  let shots = []

  if (cache.canParse) {

    shots = await Dribbble.fetchShots()

    /*
     * Update cache and timestamp
     */
    cache.updateData(shots)
    cache.updateTimestamp()

  } else {
    shots = cache.dataFromFile
    Dribbble.log('Get from cache', Dribbble.sections.shots)
  }

  return shots
}
