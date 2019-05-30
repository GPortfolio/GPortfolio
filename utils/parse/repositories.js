'use strict'

const variables = require('../helper/variables')
const jsonHelper = require('../helper/json')
const Filter = require('../helper/Filter')
const config = require('../../config')
const axios = require('axios')

/**
 * Waiting before the next request to the API.
 *  2 hours
 * @type {number} - milliseconds
 */
const TIME_WAIT = 1000 * 60 * 60 * 2

/**
 * How to save in timestamp
 * @type {string}
 */
const CACHE_NAME = 'repositories'

/**
 * @return {Promise<?array>}
 *  null - failed
 *  [] - success
 */
module.exports = async () => {

  const timestamp = jsonHelper.tryReadJsonFile(variables.FILE_TIMESTAMP_JSON)
  const repositoriesFileExists = jsonHelper.existsJsonFile(variables.FILE_REPOSITORIES_JSON)
  const canRepeatRequestByTimestamp = (+timestamp[CACHE_NAME] || 0) + TIME_WAIT <= Date.now()

  /** @type {array} - data from API */
  let repositories = []

  if (canRepeatRequestByTimestamp || !repositoriesFileExists) {

    /**
     * Make a Github API request to get user repositories.
     * @see https://developer.github.com/v3/repos/#list-user-repositories docs
     */
    try {
      let fetchRepositories
      let page = 1

      do {
        console.log(`[Repositories] Fetching data from API.. | ${page} page`)
        fetchRepositories = await axios(`${variables.API_GITHUB}/users/${config.username}/repos`, {
          params: {
            ...config.parseGithub.repositories,
            per_page: 100,
            page: page++
          }
        })
        repositories.push(...fetchRepositories.data)

      } while (fetchRepositories.data.length === 100)

      console.log(`[Repositories] Complete, ${repositories.length} length`)
    } catch (e) {
      console.warn(`[Repositories]: ${e}`)
      return null
    }

    /*
     * Filter repositories if need
     */
    const filter = new Filter(config.parseGithub.filter)
    if (filter.has) {
      repositories = filter.run(repositories)
    }

    /*
     * Update repositories cache
     */
    jsonHelper.writeJsonFile(variables.FILE_REPOSITORIES_JSON, repositories)

    /*
     * Update timestamp cache
     */
    jsonHelper.writeJsonFile(variables.FILE_TIMESTAMP_JSON,
      Object.assign({}, timestamp, { [CACHE_NAME]: Date.now() })
    )
  } else {
    repositories = jsonHelper.tryReadJsonFile(variables.FILE_REPOSITORIES_JSON)
    console.log(`[Repositories] Get repositories from cache, ${repositories.length} length`)
  }

  return Array.isArray(repositories) ? repositories : null
}
