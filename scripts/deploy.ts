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
const username = config.modules.github.username;
const branch = config.global.base ? 'gh-pages' : 'master';
const remoteCmd = `git remote add origin https://github.com/${username}`;

shell.exec('git init');

if (config.global.base) {
  shell.exec(`${remoteCmd}/${config.global.base}.git`);
} else {
  shell.exec(`${remoteCmd}/${username}.github.io.git`);
}

shell.exec('git fetch');
shell.exec('git add .');
shell.exec(`git commit -m deploy`);
shell.exec(`git push -u --force-with-lease origin ${branch}`);
