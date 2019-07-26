/* | ------------------------------------------------------------------------------------------------
 * | - Push files from dist folder to repository -
 * | ------------------------------------------------------------------------------------------------
 * |
 * | gh-pages branch if config.base exists
 * | <username.github.io repository
 * |
 * | NOTE: Force push with lease!
 * |
 */

import fs from 'fs';
import shell from 'shelljs';
import config from '../config';
import variables from '../node/variables';

/** @type {string} */
const BASE_DIST: string = variables.root + '/dist';

/**
 * Check dist folder after
 *  npm run build
 */
if (!fs.existsSync(BASE_DIST)) {
  console.warn(`${BASE_DIST} not exists`);
  process.exit(0);
}

// Move to dist folder
shell.cd(BASE_DIST);

// Create CNAME for support a custom domain
if (config.global.customDomain) {
  fs.writeFileSync(BASE_DIST + '/CNAME', config.global.customDomain);
}

// Git
shell.exec(`git init`);
shell.exec(`git add -A`);
shell.exec(`git commit -m deploy`);

if (config.global.base) {
  shell.exec(`git push --force-with-lease git@github.com:${config.modules.github.username}/${config.global.base}.git master:gh-pages`);
} else {
  shell.exec(`git push --force-with-lease git@github.com:${config.modules.github.username}/${config.modules.github.username}.github.io.git master`);
}

shell.cd('-');
