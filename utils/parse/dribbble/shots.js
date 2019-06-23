'use strict'

const Dribbble = require('../../classes/Dribbble')
const Filter = require('../../classes/Filter')
const variables = require('../../variables')
const Cache = require('../../classes/Cache')
const config = require('../../../config')

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
     * Filter shots if need
     */
    const filter = new Filter(config.parseDribbble.filter)
    if (filter.exists) {
      shots = filter.run(shots)
      Dribbble.log(`Filter, ${shots.length} length`, Dribbble.sections.shots)
    }

    /*
     * Update cache and timestamp
     */
    cache.updateData(shots)
    cache.updateTimestamp()

  } else {
    shots = cache.dataFromFile
    Dribbble.log(`Get from cache, ${shots.length} length`, Dribbble.sections.shots)
  }

  return shots
}
