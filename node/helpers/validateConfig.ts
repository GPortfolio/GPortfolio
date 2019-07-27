import Logger from '../classes/Logger'
import config from '../../config'
import fs from 'fs'
import variables from '../variables'
import path from 'path'

/** @type {string} */
const LOGGER_SECTION: string = 'Config'

/**
 * @param {string} msg
 * @return {void}
 * @throws
 */
const error = (msg: string): void => {
  Logger.error(LOGGER_SECTION, msg)
  throw new Error(msg)
}

/**
 * Check that the required data has been entered.
 * @return {void}
 * @throws
 */
export default function(): void {
  if (!config.global.template) {
    error('global.template is required')
  } else {
    const templatesPath = variables.root + path.sep + 'src' + path.sep + 'templates'
    if (!fs.existsSync(templatesPath + path.sep + config.global.template)) {
      error(`${config.global.template} template not found`)
    }
  }

  if (!config.modules.github.username) {
    error('modules.github.username is required')
  }
}
