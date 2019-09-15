/* | ------------------------------------------------------------------------------------------------
 * | - Push files from dist folder to repository -
 * | ------------------------------------------------------------------------------------------------
 * |
 * | gh-pages branch if config.base exists
 * | <username.github.io repository
 * |
 * | NOTE: --force flag
 * |
 */

import fs from 'fs';
import { sep } from 'path';
import shell from 'shelljs';
import config from '../config';
import Logger from '../core/classes/Logger';
import variables from '../core/variables';

/** @type {string} */
const BASE_DIST: string = `${variables.root + sep}dist`;

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
  Logger.info(loggerSection, `Create: ${BASE_DIST + sep}CNAME`);
  fs.writeFileSync(`${BASE_DIST + sep}CNAME`, config.global.customDomain);
}

// Git
const username = config.modules.github.username;
const branch = config.global.base ? 'gh-pages' : 'master';

shell.exec('git init');
shell.exec('git add .');
shell.exec('git commit -m deploy');

if (config.global.base) {
  shell.exec(`git push --force git@github.com:${username}/${config.global.base}.git master:${branch}`);
} else {
  shell.exec(`git push --force git@github.com:${username}/${username}.github.io.git master:${branch}`);
}
