'use strict'

const variables = require('../variables')
const config = require('../../config')
const defaultAxios = require('axios')
const Default = require('./Default')
const Cache = require('./Cache')

const axios = defaultAxios.create()

/** @type {string} */
const GENERAL_FILE_KEY_TOKEN = 'dribble_token'

class Dribbble extends Default {

  /**
   * For console.log
   */
  static get sections() {
    return {
      token: 'Token',
      profile: 'Profile',
      shots: 'Shots'
    }
  }

  /**
   * Fetch token and set to write to file.
   * @throws
   * @return {Promise<*>} access_token
   */
  static async fetchUpdateToken() {
    const response = await Dribbble.fetchToken()
    Cache.generalFile = { [GENERAL_FILE_KEY_TOKEN]: response.access_token }
    return response.access_token
  }

  /**
   * Make a Dribbble API request to get profile token.
   * @return {Promise<Object>} data
   * @throws
   * @see https://developer.dribbble.com/v2/oauth/ docs
   */
  static async fetchToken() {
    Dribbble.log('Fetching data from API..', Dribbble.sections.token)
    let response

    try {
      response = await axios.post(Dribbble.URL_OAUTH_TOKEN, config.dribbble)
    } catch (e) {
      Dribbble.errorLog(e, Dribbble.sections.token)
    }

    Dribbble.log('Complete', Dribbble.sections.token)
    return response.data
  }

  /**
   * Make a Dribbble API request to get profile.
   * @return {Promise<Object>} data
   * @throws
   * @see https://developer.dribbble.com/v2/user/ docs
   */
  static async fetchProfile() {
    Dribbble.log('Fetching data from API..', Dribbble.sections.profile)
    let response

    try {
      response = await axios.get(Dribbble.URL_PROFILE)
    } catch (e) {
      Dribbble.errorLog(e, Dribbble.sections.profile)
    }

    Dribbble.log('Complete', Dribbble.sections.profile)
    return response.data
  }

  /**
   * Make a Dribbble API request to get profile shots.
   * @return {Promise<Array>}
   * @throws
   * @see https://developer.dribbble.com/v2/shots/ docs
   */
  static async fetchShots() {
    let fetchShots
    let shots = []
    let page = 1

    do {
      Dribbble.log(`Fetching data from API.. | ${page} page`, Dribbble.sections.shots)

      try {
        fetchShots = await axios.get(Dribbble.URL_SHOTS, {
          params: {
            per_page: 100,
            page: page++
          }
        })
      } catch (e) {
        Dribbble.errorLog(e, Dribbble.sections.shots)
      }

      shots.push(...fetchShots.data)

    } while (fetchShots.data.length === 100)

    Dribbble.log('Complete', Dribbble.sections.shots)
    return shots
  }

  /**
   * Full url to get profile
   * @return {string}
   */
  static get URL_PROFILE() {
    return `${Dribbble.prototype.api}/user`
  }

  /**
   * Full url to get profile shots
   * @return {string}
   */
  static get URL_SHOTS() {
    return `${Dribbble.prototype.api}/user/shots`
  }

  /**
   * Full url to get oauth token
   * @return {string}
   */
  static get URL_OAUTH_TOKEN() {
    return `${Dribbble.prototype.website}/oauth/token`
  }

  /**
   * Try-catch handle after axios response
   * @param e
   * @param {string} section
   * @throws
   */
  static errorLog(e, section) {
    if (e && e.response && e.response.data) {
      const data = e.response.data
      if (data.error_description || data.message || data.error) {
        Dribbble.log(`Error: ${data.error_description || data.message || data.error}`, section)
        throw new Error(e)
      }
    }

    Dribbble.log(e, section)
    throw new Error(e)
  }
}

Dribbble.prototype.name = Dribbble.name
Dribbble.prototype.website = 'https://dribbble.com'
Dribbble.prototype.api = 'https://api.dribbble.com/v2'
Dribbble.prototype.color = variables.CONSOLE_COLORS.magenta

// Add a request interceptor
axios.interceptors.request.use(async (config) => {
  let token = Cache.generalFile[GENERAL_FILE_KEY_TOKEN]

  if (!token && config.url !== Dribbble.URL_OAUTH_TOKEN) {
    try {
      token = await Dribbble.fetchUpdateToken()
    } catch (e) {
      return {
        ...config,
        cancelToken: new defaultAxios.CancelToken((cancel) => cancel('stop executing request'))
      }
    }
  }

  config.headers.common.Authorization = `Bearer ${token}`
  axios.defaults.headers.common.Authorization = `Bearer ${token}`

  return config
})

/*
 * Auto update access_token
 */
axios.interceptors.response.use(undefined, async (err) => {

  /*
   * Temporary, while does not work auto refresh code
   */
  if (!defaultAxios.isCancel(err) && err.response.status === 401) {
    Dribbble.log('Need to get the code again', Dribbble.sections.token)
    Dribbble.log(`https://dribbble.com/oauth/authorize?client_id=${config.dribbble.client_id}`, Dribbble.sections.token)
    Cache.generalFile = { [GENERAL_FILE_KEY_TOKEN]: null }
  }

  /*
   * Dribbble Code working only works once
   * Now this code without a server does not work
   */
  // if (!defaultAxios.isCancel(err) && err.config.url !== Dribbble.URL_OAUTH_TOKEN && err.response.status === 401) {
    // Dribbble.log('Try refresh token', Dribbble.sections.token)
    // try {
    //   const token = await Dribbble.fetchUpdateToken()
    //   return defaultAxios(config)
    // } catch (e) {
    //   Cache.generalFile = { [KEY_TOKEN]: null }
    // }
  // }

  return Promise.reject(err)
})

module.exports = Dribbble
