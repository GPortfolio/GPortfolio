/* | -----------------------------------------------------------------------------------------------
 * | - Push files from dist folder to Github repository -
 * | -----------------------------------------------------------------------------------------------
 * |
 * | NOTE: push with --force flag
 * |
 */

import fs from 'fs';
import path, { sep } from 'path';
import shell from 'shelljs';
import Logger from '../src/modules/logger/Logger';
import Config from '../src/Config';

const logger = new Logger('Deploy')
const config = Config.get()

const BASE_DIST: string = path.resolve(__dirname, `..${sep}dist`);

// Check dist folder after build
if (!fs.existsSync(BASE_DIST)) {
  logger.error(`${BASE_DIST} not exists`);
  logger.info('$ npm run build');
  process.exit(1);
}

const { nickname } = config.services.github.configuration

if (!nickname) {
  logger.error('Nickname not found');
  process.exit(1);
}

// Go to dist folder
logger.info(`cd ${BASE_DIST}`);
shell.cd(BASE_DIST);

// Create CNAME for support a custom domain
if (config.global.customDomain) {
  logger.info(`Create ${BASE_DIST + sep}CNAME`);
  fs.writeFileSync(`${BASE_DIST + sep}CNAME`, config.global.customDomain);
}

// Git
logger.info('git init');
shell.exec('git init');

logger.info('git add .');
shell.exec('git add .');

logger.info('$ git commit -m deploy');
shell.exec('git commit -m deploy');

if (config.global.base) {
  shell.exec(`git push --force git@github.com:${nickname}/${config.global.base}.git master:gh-pages`);
} else {
  shell.exec(`git push --force git@github.com:${nickname}/${nickname}.github.io.git master:gh-pages`);
}
