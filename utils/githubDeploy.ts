/* | -----------------------------------------------------------------------------------------------
 * | - Push files from dist folder to repository -
 * | -----------------------------------------------------------------------------------------------
 * |
 * | gh-pages branch if config.base exists
 * | <username.github.io repository
 * |
 * | NOTE: --force flag
 * |
 */

import fs from 'fs';
import path, { sep } from 'path';
import shell from 'shelljs';
import config from '../core/config';
import logger from '../core/helpers/logger';

/** @type {string} */
const BASE_DIST: string = path.resolve(__dirname, `..${sep}dist`);

/** @type {string} */
const section: string = 'Deploy';

// Check dist folder after build
if (!fs.existsSync(BASE_DIST)) {
  logger(section, `${BASE_DIST} not exists`).error();
  logger(section, '$ npm run build').info();
  process.exit(1);
}

if (!config.websites.github.profile) {
  logger(section, '').error();
  process.exit(1);
}

const { login } = config.websites.github.profile;

// Go to dist folder
logger(section, `cd: ${BASE_DIST}`).info();
shell.cd(BASE_DIST);

// Create CNAME for support a custom domain
if (config.global.customDomain) {
  logger(section, `Create: ${BASE_DIST + sep}CNAME`).info();
  fs.writeFileSync(`${BASE_DIST + sep}CNAME`, config.global.customDomain);
}

// Git
const branch = config.global.base ? 'gh-pages' : 'master';

logger(section, 'git init').info();
shell.exec('git init');

logger(section, 'git add .').info();
shell.exec('git add .');

logger(section, '$ git commit -m deploy').info();
shell.exec('git commit -m deploy');

if (config.global.base) {
  shell.exec(`git push --force git@github.com:${login}/${config.global.base}.git master:${branch}`);
} else {
  shell.exec(`git push --force git@github.com:${login}/${login}.github.io.git master:${branch}`);
}
