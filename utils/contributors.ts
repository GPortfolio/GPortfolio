/* | -----------------------------------------------------------------------------------------------
 * | - README.md | Contributors section -
 * | -----------------------------------------------------------------------------------------------
 * |
 * | Get data from the Github API on contributors to the
 * | main repository and add to README.md
 * |
 */

import { IGithubContributor } from '@i/websites/IGithubWebsite';
import fs from 'fs';
import { EOL } from 'os';
import path, { sep } from 'path';
import Github from '../core/websites/Github';
import global from '../core/global';

const github = new Github();

/** @type {string} */
const FILE_ENCODING: string = 'utf8';

/*
 * Get file
 */
const filePath = path.resolve(__dirname, `..${sep}README.md`);
const file = fs.readFileSync(filePath, { encoding: FILE_ENCODING });

/*
 * Calculate position
 */
const contrSection = '## Contributors';
const posContr = file.indexOf(contrSection);
const posContrToNext = file.indexOf('##', posContr + contrSection.length);

(async () => {
  // Append text before Contributors section
  let txt = file.substring(0, posContr);
  txt += contrSection + EOL + EOL;

  // Add Contributors section
  const contributors = await github.fetchContributors(global.owner, global.repository);
  contributors.forEach((contr: IGithubContributor) => {
    txt += `<a href="${contr.html_url}" title="${contr.login}">${EOL
    }  <img src="${contr.avatar_url}" alt="${contr.login}" width="48px">${EOL
    }</a>${EOL}`;
  });

  // Append text after Contributors section
  txt += EOL + file.substring(posContrToNext);

  // Write with new text
  fs.writeFileSync(filePath, txt, { encoding: FILE_ENCODING });
})();
