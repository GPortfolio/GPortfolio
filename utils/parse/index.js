'use strict'

const dribbbleProfileParse = require('./dribbble/profile')
const dribbbleShotsParse = require('./dribbble/shots')
const repositoriesParse = require('./repositories')
const Dribbble = require('../classes/Dribbble')
const profileParse = require('./profile')
const config = require('../../config')

/**
 * @throws
 */
module.exports = async () => {

  const data = {
    // Github
    profile: await profileParse(),
    repositories: await repositoriesParse(),

    // Dribbble
    dribbble: {}
  }

  // Parse Dribbble - check fill data
  if (Object.values(config.dribbble).every(obj => obj)) {
    data.dribbble.profile = await dribbbleProfileParse()
    data.dribbble.shots = await dribbbleShotsParse()
  } else {
    Dribbble.log('skip')
  }

  return data
}
