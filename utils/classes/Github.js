'use strict'

const variables = require('../variables')
const config = require('../../config')
const Default = require('./Default')
const axios = require('axios')

class Github extends Default {

  /**
   * For console.log
   */
  static get sections() {
    return {
      repositories: 'Repositories',
      profile: 'Profile'
    }
  }

  /**
   * Make a Github API request to get user data.
   * @return {Promise<Object>}
   * @throws
   * @see https://developer.github.com/v3/users/#get-a-single-user docs
   */
  static async fetchProfile() {
    Github.log('Fetching data from API..', Github.sections.profile)
    let response

    try {
      response = await axios(Github.URL_PROFILE, {
        headers: {
          Authorization: config.token ? `token ${config.token}` : null
        }
      })
    } catch (e) {
      Github.log(e, Github.sections.profile)
      throw new Error(e)
    }

    Github.log('Complete', Github.sections.profile)

    return response.data
  }

  /**
   * Make a Github API request to get user repositories.
   * @return {Promise<Array>}
   * @throws
   * @see https://developer.github.com/v3/repos/#list-user-repositories docs
   */
  static async fetchRepositories() {
    let fetchRepositories
    let repositories = []
    let page = 1

    do {
      Github.log(`Fetching data from API.. | ${page} page`, Github.sections.repositories)

      try {
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
      } catch (e) {
        Github.log(e, Github.sections.repositories)
        throw new Error(e)
      }

      repositories.push(...fetchRepositories.data)

    } while (fetchRepositories.data.length === 100)

    Github.log(`Complete, ${repositories.length} length`, Github.sections.repositories)

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
