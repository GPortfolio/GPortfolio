'use strict'

const variables = require('../variables')
const config = require('../../config')
const Default = require('./Default')
const axios = require('axios')

class Github extends Default {

  /**
   * Make a Github API request to get user data.
   * @return {Promise<Object>}
   * @throws
   * @see https://developer.github.com/v3/users/#get-a-single-user docs
   */
  static async fetchProfile() {
    const fetchGithubData = await axios(Github.URL_PROFILE, {
      headers: {
        Authorization: config.token ? `token ${config.token}` : null
      }
    })

    return fetchGithubData.data
  }

  /**
   * Make a Github API request to get user repositories.
   * @param {function} beforeCb
   * @return {Promise<Array>}
   * @throws
   * @see https://developer.github.com/v3/repos/#list-user-repositories docs
   */
  static async fetchRepositories(beforeCb = () => {}) {
    let fetchRepositories
    let repositories = []
    let page = 1

    do {
      beforeCb(page)

      fetchRepositories = await axios(Github.URL_REPOSITORIES, {
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

    return repositories
  }

  /**
   * Full url to get list of the repositories
   * @return {string}
   */
  static get URL_REPOSITORIES() {
    const append = config.token ? 'user/repos' : `users/${config.username}/repos`
    return `${Github.prototype.api}/${append}`
  }

  /**
   * Full url to get profile
   * @return {string}
   */
  static get URL_PROFILE() {
    return `${Github.prototype.api}/users/${config.username}`
  }
}

Github.prototype.name = Github.name
Github.prototype.api = 'https://api.github.com'
Github.prototype.color = variables.CONSOLE_COLORS.blue

module.exports = Github
