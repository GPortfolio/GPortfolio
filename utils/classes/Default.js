'use strict'

const variables = require('../variables')

class Default {

  /**
   * Print console.log with color
   * @param {string} txt
   * @param {string} section
   */
  static log(txt, section = '') {
    console.log(`${this.prototype.color}[${this.prototype.name}%s]\x1b[0m %s`, section ? ` ${section}` : '', txt)
  }
}

Default.prototype.name = 'undefined'
Default.prototype.color = variables.CONSOLE_COLORS.reset

module.exports = Default
