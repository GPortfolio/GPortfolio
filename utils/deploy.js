'use strict'

/* | ------------------------------------------------------------------------------------------------
 * | - Push files from dist folder to repository -
 * | ------------------------------------------------------------------------------------------------
 * |
 * | gh-pages branch if config.base exists
 * | <username.github.io repository
 * |
 * | NOTE: Force push!
 * |
 */

const variables = require('./helper/variables')
const config = require('../config')
const shell = require('shelljs')
const fs = require('fs')

/** @type {string} */
const BASE_DIST = variables.ROOT + '/dist'

/**
 * Check dist folder after
 *  npm run build
 */
if (!fs.existsSync(BASE_DIST)) {
  console.warn(`${BASE_DIST} not exists`)
  process.exit(0)
}

// Move to dist folder
shell.cd(BASE_DIST)

// Create CNAME for support a custom domain
if (config.customDomain) {
  fs.writeFileSync(BASE_DIST + '/CNAME', config.customDomain)
}

// Git
shell.exec(`git init`)
shell.exec(`git add -A`)
shell.exec(`git commit -m deploy`)

if (config.base) {
  shell.exec(`git push -f git@github.com:${config.username}/${config.base}.git master:gh-pages`)
} else {
  shell.exec(`git push -f git@github.com:${config.username}/${config.username}.github.io.git master`)
}

shell.cd('-')