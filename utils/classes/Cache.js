'use strict'

const variables = require('../variables')
const fs = require('fs')

/** @type {string} */
const BASE_PATH = variables.ROOT + '/cache/'

/** @type {string} */
const FILE_ENCODING = 'utf8'

/** @type {Object} */
let generalFile

/**
 * Create cache folder if not exists
 */
if (!fs.existsSync(BASE_PATH)) {
  try {
    console.log('[Cache] Create folder')
    fs.mkdirSync(BASE_PATH)
  } catch (e) {
    console.warn(e)
  }
}

class Cache {

  /**
   * @param {string} fileName (ext is required)
   * @param {string} cacheName
   */
  constructor(fileName, cacheName = fileName) {
    this.fileName = fileName
    this.cacheName = cacheName
    this.timeWait = 1000 * 60 * 60 // 1 hour
  }

  /**
   * The name of the cache file in the cache folder
   * @param {string} name
   */
  setFileName(name) {
    this.fileName = name
  }

  /**
   * The name of the property in the general file
   * @param {string} name
   * @default as fileName
   */
  setCacheName(name) {
    this.cacheName = name
  }

  /**
   * Waiting before the next request to the API.
   * @param {number} timestamp - milliseconds
   * @default 1 hour
   */
  setTimeWait(timestamp) {
    this.timeWait = +timestamp || 0
  }

  /**
   * Update data to cache file
   * @param {object|array} data
   * @return {void}
   */
  updateData(data) {
    Cache.writeFile(this.fileName, data)
  }

  /**
   * Update/override data for general file
   * @param {object} data
   */
  static updateGeneralFile(data) {
    Cache.writeFile(variables.FILE_GENERAL_JSON, {
      ...generalFile,
      ...data
    })
  }

  /**
   * Append timestamp to file
   * @return {void}
   */
  updateTimestamp() {
    Cache.updateGeneralFile({
      [this.keyTimestamp]: Date.now()
    })
  }

  /**
   * Get data from file if exists
   * @return {object|array}
   */
  get dataFromFile() {
    return Cache.tryReadJsonFile(this.fileName)
  }

  /**
   * @return {string}
   */
  get keyTimestamp() {
    return this.cacheName + '_timestamp'
  }

  /**
   * Check if the file exists and the time for
   * re-receiving information has not come
   * @return {boolean}
   */
  get canParse() {
    // Check by exists
    if (!Cache.existsFile(this.fileName)) {
      return true
    }

    // Check by timestamp
    return (+generalFile[this.keyTimestamp] || 0) + this.timeWait <= Date.now()
  }

  /**
   * Get data from file if exists
   * @param {string} fileName - path in <root>/data folder (ext is required)
   * @return {null|object|array}
   */
  static tryReadJsonFile(fileName) {
    const path = BASE_PATH + fileName

    if (!fs.existsSync(path)) {
      return null
    }

    const data = fs.readFileSync(path, { encoding: FILE_ENCODING })

    try {
      return JSON.parse(data)
    } catch (e) {
      console.warn(e)
      return null
    }
  }

  /**
   * Set data to .json file
   * @param {string} fileName - path in <root>/data folder (ext is required)
   * @param {*} data
   */
  static writeFile(fileName, data) {
    fs.writeFileSync(BASE_PATH + fileName, JSON.stringify(data), { encoding: FILE_ENCODING })
  }

  /**
   * Check if the file exists
   * @param {string} fileName - path in <root>/data folder (ext is required)
   * @return {boolean}
   */
  static existsFile(fileName) {
    return fs.existsSync(BASE_PATH + fileName)
  }
}

generalFile = Cache.tryReadJsonFile(variables.FILE_GENERAL_JSON) || {}

module.exports = Cache
