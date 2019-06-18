'use strict'

const Filter = require('../classes/Filter')
const variables = require('../variables')
const Cache = require('../classes/Cache')
const config = require('../../config')
const axios = require('axios')

/** @type {string} */
const APPEND_CONSOLE = '[Github Repositories]'

/**
 * @return {Promise<?array>}
 * @throws
 */
module.exports = async () => {

  const cache = new Cache(variables.FILE_REPOSITORIES_JSON)
  cache.setTimeWait(1000 * 60 * 60 * 2) // 2 hours

  /** @type {array} - data from API */
  let repositories = []

  if (cache.canParse) {

    /** @type {string} */
    const URL_REQUEST = config.token ? 'user/repos' : `users/${config.username}/repos`

    /**
     * Make a Github API request to get user repositories.
     * @see https://developer.github.com/v3/repos/#list-user-repositories docs
     */
    try {
      let fetchRepositories
      let page = 1

      do {
        console.log(`${APPEND_CONSOLE} Fetching data from API.. | ${page} page`)
        fetchRepositories = await axios(`${variables.API_GITHUB}/${URL_REQUEST}`, {
          params: {
            ...config.parseGithub.repositories,
            per_page: 100,
            page: page++
          },
          headers: {
            Authorization: config.token ? `token ${config.token}` : null
          }
        })
        repositories.push(...fetchRepositories.data)

      } while (fetchRepositories.data.length === 100)

      console.log(`${APPEND_CONSOLE} Complete, ${repositories.length} length`)
    } catch (e) {
      throw new Error(`${APPEND_CONSOLE}: ${e}`)
    }

    /*
     * Filter repositories if need
     */
    const filter = new Filter(config.parseGithub.filter)
    if (filter.has) {
      repositories = filter.run(repositories)
      console.log(`${APPEND_CONSOLE} Filter, ${repositories.length} length`)
    }

    /*
     * Update cache and timestamp
     */
    cache.updateData(repositories)
    cache.updateTimestamp()

  } else {
    repositories = cache.fileData
    console.log(`${APPEND_CONSOLE} Get repositories from cache, ${repositories.length} length`)
  }

  return repositories
}
