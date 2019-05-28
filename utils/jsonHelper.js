'use strict'

const path = require('path')
const fs = require('fs')

/** @type {string} */
const BASE_PATH = path.resolve(__dirname, '../cache') + '/'

/**
 * Create cache folder if not exists
 */
if (!fs.existsSync(BASE_PATH)) {
  try {
    console.log('Create cache folder')
    fs.mkdirSync(BASE_PATH)
  } catch (e) {
    console.warn(e)
  }
}

module.exports = {

  /**
   * Get data from .json file if exists
   * @param {string} fileName - path in <root>/data folder (ext is required)
   * @return {{}}
   */
  tryReadJsonFile(fileName) {
    const path = BASE_PATH + fileName

    if (!fs.existsSync(path)) {
      return {}
    }

    const data = fs.readFileSync(path, { encoding: 'UTF-8' })

    try {
      return JSON.parse(data)
    } catch (e) {
      console.warn(e)
      return {}
    }
  },

  /**
   * Set data to .json file
   * @param {string} fileName - path in <root>/data folder (ext is required)
   * @param {object} data
   */
  writeJsonFile(fileName, data) {
    const path = BASE_PATH + fileName

    fs.writeFileSync(path, JSON.stringify(data), { encoding: 'UTF-8' })
  },

  /**
   * Check if .json file exists
   * @param {string} fileName - path in <root>/data folder (ext is required)
   * @return {boolean}
   */
  existsJsonFile(fileName) {
    return fs.existsSync(BASE_PATH + fileName)
  }
}
