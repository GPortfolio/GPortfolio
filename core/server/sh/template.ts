/* | -----------------------------------------------------------------------------------------------
 * | - Generate a basic files/content for new template. -
 * | -----------------------------------------------------------------------------------------------
 * |
 * | How to create: npm run template <name>
 * | Example: npm run template myTemplateName
 * |
 */

import fs from 'fs';
import path, { sep } from 'path';
import config from '../../config';
import logger from '../../helpers/logger';

/** @type {Array<string>} */
const argv: string[] = process.argv.slice(2);

/** @type {string} */
const loggerSection: string = 'Template';

// Check name of template
if (argv.length !== 1) {
  logger(loggerSection, 'Invalid arguments').error();
  process.exit(1);
}

/**
 * Name of template
 * @type {string}
 */
const name: string = argv[0].trim();

/**
 * Path to templates
 * @type {string}
 */
const BASE_PATH: string = path.resolve(__dirname, `..${sep}src${sep}templates${sep}`);

/** @type {string} */
const FILE_ENCODING: string = 'utf8';

const githubProfile = config.websites.github.profile;

// Check on exists template
if (fs.existsSync(BASE_PATH + name)) {
  logger(loggerSection, `Template exists: ${BASE_PATH + name}`).error();
  process.exit(1);
}

// Create folder
logger(loggerSection, `Create: ${BASE_PATH + name}`).info();
fs.mkdirSync(BASE_PATH + name);

/*
 * ---------------------------------------------- Create required .ts file
 */
logger(loggerSection, `Create: ${BASE_PATH + name + sep}index.ts`).info();
fs.writeFileSync(`${BASE_PATH + name + sep}index.ts`, `import '../../main';

// Code
`, { encoding: FILE_ENCODING });

/*
 * ---------------------------------------------- Create required .scss file
 */
logger(loggerSection, `Create: ${BASE_PATH + name + sep}index.scss`).info();
fs.writeFileSync(`${BASE_PATH + name + sep}index.scss`, `@import "../../main.scss";

// Code
`, { encoding: FILE_ENCODING });

/*
 * ---------------------------------------------- Create required .html file
 */
logger(loggerSection, `Create: ${BASE_PATH + name + sep}index.ejs`).info();
fs.writeFileSync(`${BASE_PATH + name + sep}index.ejs`, `<!DOCTYPE html>
<%
const { default: config } = require('../../../core/config')
%>

<html lang="en" data-template="${name}" data-compiled="<%= Date.now() %>">
<head>
  <%= require('ejs-loader!@src/parts/head.ejs')() %>
</head>
<body>
  <!-- Code -->
</body>
</html>
`, { encoding: FILE_ENCODING });

/*
 * ---------------------------------------------- Create .md file
 */
logger(loggerSection, `Create: ${BASE_PATH + name + sep}README.md`).info();
fs.writeFileSync(`${BASE_PATH + name + sep}README.md`, `# Template: ${name}

## Preview
<img src="https://raw.githubusercontent.com/GPortfolio/GPortfolio/master/demo/templates/${name}.png" alt="${name}">

## Creator
[@${githubProfile ? githubProfile.login : 'set_login'}](https://github.com/${githubProfile ? githubProfile.login : 'set_url'})
`, { encoding: FILE_ENCODING });

/*
 * ---------------------------------------------- Complete
 */
logger(loggerSection, `Complete, path: ${BASE_PATH + name}`).success();
