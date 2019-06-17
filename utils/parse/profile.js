'use strict'

const variables = require('../variables')
const Cache = require('../classes/Cache')
const config = require('../../config')
const axios = require('axios')

/**
 * @return {Promise<?object>}
 *  null - failed
 *  {} - success
 */
module.exports = async () => {

  const cache = new Cache(variables.FILE_PROFILE_JSON)

  /** @type {?object} - data from API */
  let githubUser = null

  if (cache.canParse) {

    /**
     * Make a Github API request to get user data.
     * @see https://developer.github.com/v3/users/#get-a-single-user docs
     */
    try {
      console.log(`[Profile] Fetching data from api.. | ${config.username} username`)
      const fetchGithubData = await axios(`${variables.API_GITHUB}/users/${config.username}`, {
        headers: {
          Authorization: config.token ? `token ${config.token}` : null
        }
      })
      githubUser = fetchGithubData.data
      console.log(`[Profile] Complete, ${githubUser.name}`)

    } catch (e) {
      console.warn(`[Profile]: ${e}`)
      return null
    }

    /*
     * Update cache and timestamp
     */
    cache.updateData(githubUser)
    cache.updateTimestamp()

  } else {
    githubUser = cache.fileData
    console.log(`[Profile] Get profile from cache, ${githubUser.name}`)
  }

  return githubUser
}
