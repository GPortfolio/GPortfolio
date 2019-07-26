/* | ------------------------------------------------------------------------------------------------
 * | - Push files from dist folder to repository -
 * | ------------------------------------------------------------------------------------------------
 * |
 * | gh-pages branch if config.base exists
 * | <username.github.io repository
 * |
 * | NOTE: --force-with-lease flag
 * |
 */

import fs from 'fs';
import path from 'path';
import shell from 'shelljs';
import config from '../config';
import Logger from '../node/classes/Logger';
import variables from '../node/variables';

/** @type {string} */
const BASE_DIST: string = `${variables.root + path.sep}dist`;

/** @type {string} */
const loggerSection: string = 'Deploy';

/**
 * Check dist folder after
 *  npm run build
 */
if (!fs.existsSync(BASE_DIST)) {
  Logger.error(loggerSection, `${BASE_DIST} not exists`);
  Logger.info(loggerSection, `Run: npm run build`);
  process.exit(0);
}

// Move to dist folder
shell.cd(BASE_DIST);

// Create CNAME for support a custom domain
if (config.global.customDomain) {
  Logger.info(loggerSection, `Create: ${BASE_DIST + path.sep}CNAME`);
  fs.writeFileSync(`${BASE_DIST + path.sep}CNAME`, config.global.customDomain);
}

// Git
shell.exec(`git init`);
shell.exec(`git add -A`);
shell.exec(`git commit -m deploy`);

const append: string = config.global.base
  ? `${config.modules.github.username}/${config.global.base}.git master:gh-pages`
  : `${config.modules.github.username}/${config.modules.github.username}.github.io.git master`;

Logger.info(loggerSection, 'git push --force-with-lease');
shell.exec(`git push --force-with-lease git@github.com:${append}`);
shell.cd('-');

Logger.success(loggerSection, 'Complete');
