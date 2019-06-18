'use strict'

const variables = require('../variables')
const Cache = require('../classes/Cache')
const config = require('../../config')
const axios = require('axios')

/** @type {string} */
const APPEND_CONSOLE = '[Github Profile]'

/**
 * @return {Promise<?object>}
 * @throws
 */
module.exports = async () => {

  const cache = new Cache(variables.FILE_PROFILE_JSON)

  /** @type {object} - data from API */
  let githubUser = {}

  if (cache.canParse) {

    /**
     * Make a Github API request to get user data.
     * @see https://developer.github.com/v3/users/#get-a-single-user docs
     */
    try {
      console.log(`${APPEND_CONSOLE} Fetching data from API..`)
      const fetchGithubData = await axios(`${variables.API_GITHUB}/users/${config.username}`, {
        headers: {
          Authorization: config.token ? `token ${config.token}` : null
        }
      })
      githubUser = fetchGithubData.data
      console.log(`${APPEND_CONSOLE} Complete`)

    } catch (e) {
      throw new Error(`${APPEND_CONSOLE}: ${e}`)
    }

    /*
     * Update cache and timestamp
     */
    cache.updateData(githubUser)
    cache.updateTimestamp()

  } else {
    githubUser = cache.fileData
    console.log(`${APPEND_CONSOLE} Get profile from cache`)
  }

  return githubUser
}
