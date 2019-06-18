'use strict'

const config = require('../../config')
const axios = require('axios')

module.exports = class Github {

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
   * Print console.log with color
   * @param {string} txt
   * @param {string} section
   */
  static log(txt, section = '') {
    console.log(`\x1b[34m[Github%s]\x1b[0m %s`, section ? ` ${section}` : '', txt)
  }

  /**
   * REST API of Github
   * @return {string}
   */
  static get API_GITHUB() {
    return 'https://api.github.com'
  }

  /**
   * Full url to get list of the repositories
   * @return {string}
   */
  static get URL_REPOSITORIES() {
    const append = config.token ? 'user/repos' : `users/${config.username}/repos`
    return `${Github.API_GITHUB}/${append}`
  }

  /**
   * Full url to get profile
   * @return {string}
   */
  static get URL_PROFILE() {
    return `${Github.API_GITHUB}/users/${config.username}`
  }
}
