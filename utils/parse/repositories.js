'use strict'

const Filter = require('../classes/Filter')
const variables = require('../variables')
const Cache = require('../classes/Cache')
const config = require('../../config')
const axios = require('axios')

/**
 * @return {Promise<?array>}
 *  null - failed
 *  [] - success
 */
module.exports = async () => {

  const cache = new Cache(variables.FILE_REPOSITORIES_JSON)
  cache.setTimeWait(1000 * 60 * 60 * 2) // 2 hour

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
        console.log(`[Repositories] Fetching data from API.. | ${page} page`)
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
      console.log(`[Repositories] Filter, ${repositories.length} length`)
    }

    /*
     * Update cache and timestamp
     */
    cache.updateData(repositories)
    cache.updateTimestamp()

  } else {
    repositories = cache.fileData
    console.log(`[Repositories] Get repositories from cache, ${repositories.length} length`)
  }

  return Array.isArray(repositories) ? repositories : null
}
