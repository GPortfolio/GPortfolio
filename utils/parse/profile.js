'use strict'

const variables = require('../helper/variables')
const jsonHelper = require('../helper/json')
const config = require('../../config')
const axios = require('axios')

/**
 * Waiting before the next request to the API.
 *  1 hour
 * @type {number} - milliseconds
 */
const TIME_WAIT = 1000 * 60 * 60

/**
 * How to save in timestamp
 * @type {string}
 */
const CACHE_NAME = 'profile'

/**
 * @return {Promise<?object>}
 *  null - failed
 *  {} - success
 */
module.exports = async () => {

  const timestamp = jsonHelper.tryReadJsonFile(variables.FILE_TIMESTAMP_JSON)
  const profileFileExists = jsonHelper.existsJsonFile(variables.FILE_PROFILE_JSON)
  const canRepeatRequestByTimestamp = (+timestamp[CACHE_NAME] || 0) + TIME_WAIT <= Date.now()

  /** @type {?object} - data from API */
  let githubUser = null

  if (canRepeatRequestByTimestamp || !profileFileExists) {

    /**
     * Make a Github API request to get user data.
     * @see https://developer.github.com/v3/users/#get-a-single-user docs
     */
    try {
      console.log(`[Profile] Fetching data from api.. | ${config.username} username`)
      const fetchGithubData = await axios(`${variables.API_GITHUB}/users/${config.username}`)
      githubUser = fetchGithubData.data
      console.log(`[Profile] Complete, ${githubUser.name}`)
    } catch (e) {
      console.warn(`[Profile]: ${e}`)
      return null
    }

    /*
     * Update cache
     */
    jsonHelper.writeJsonFile(variables.FILE_PROFILE_JSON, githubUser)

    /*
     * Update timestamp
     */
    jsonHelper.writeJsonFile(variables.FILE_TIMESTAMP_JSON,
      Object.assign({}, timestamp, { [CACHE_NAME]: Date.now() })
    )
  } else {
    githubUser = jsonHelper.tryReadJsonFile(variables.FILE_PROFILE_JSON)
    console.log(`[Profile] Get profile from cache, ${githubUser.name}`)
  }

  return githubUser
}
