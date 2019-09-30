/* | ------------------------------------------------------------------------------------------------
 * | - README | Contributors section -
 * | ------------------------------------------------------------------------------------------------
 * |
 * | Get data from the Github API to contributors
 * | and add to README.md
 * |
 */

import fs from 'fs';
import os from 'os';
import path from 'path';
import Github from '../core/modules/github/Github';

/** @type {string} */
const FILE_ENCODING: string = 'utf8';

/*
 * Get file
 */
const filePath = path.resolve(__dirname, '../README.md');
const file = fs.readFileSync(filePath, { encoding: FILE_ENCODING });

/*
 * Calculate position
 */
const contrSection = '## Contributors';
const posContr = file.indexOf(contrSection);
const posContrToNext = file.indexOf('##', posContr + contrSection.length);

const run = async () => {

  // Append text before Contributors section
  let txt = file.substring(0, posContr);
  txt += contrSection + os.EOL + os.EOL;

  // Add Contributors section
  const contributors = await Github.fetchSelfContributors();
  contributors.forEach((contr) => {
    txt +=
`<a href="${contr.html_url}" title="${contr.login}">` + os.EOL +
`  <img src="${contr.avatar_url}" alt="${contr.login}" width="48px">` + os.EOL +
`</a>` + os.EOL;
  });

  // Append text after Contributors section
  txt += os.EOL + file.substring(posContrToNext);

  // Write with new text
  fs.writeFileSync(filePath, txt, { encoding: FILE_ENCODING });
};

run();
