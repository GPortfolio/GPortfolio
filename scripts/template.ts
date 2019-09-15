/* | ------------------------------------------------------------------------------------------------
 * | - Generate a basic files/content for new template. -
 * | ------------------------------------------------------------------------------------------------
 * |
 * | How to create: npm run template <name>
 * | Example: npm run template myTemplateName
 * |
 */

import fs from 'fs';
import { sep } from 'path';
import config from '../config';
import Logger from '../core/classes/Logger';
import variables from '../core/variables';

/** @type {Array<string>} */
const argv: string[] = process.argv.slice(2);

/** @type {string} */
const loggerSection: string = 'Template';

// Check name of template
if (argv.length !== 1) {
  Logger.error(loggerSection, 'Invalid arguments');
  process.exit(0);
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
const BASE_PATH: string = `${variables.root + sep}src${sep}templates${sep}`;

/** @type {string} */
const FILE_ENCODING: string = 'utf8';

// Check on exists template
if (fs.existsSync(BASE_PATH + name)) {
  Logger.warning(loggerSection, `Template exists: ${BASE_PATH + name}`);
  process.exit(0);
}

// Create folder
Logger.info(loggerSection, `Create: ${BASE_PATH + name}`);
fs.mkdirSync(BASE_PATH + name);

/*
 * ---------------------------------------------- Create required .ts file
 */
Logger.info(loggerSection, `Create: ${BASE_PATH + name + sep}index.ts`);
fs.writeFileSync(`${BASE_PATH + name + sep}index.ts`, `import '../../main';

// Code
`, { encoding: FILE_ENCODING });

/*
 * ---------------------------------------------- Create required .scss file
 */
Logger.info(loggerSection, `Create: ${BASE_PATH + name + sep}index.scss`);
fs.writeFileSync(`${BASE_PATH + name + sep}index.scss`, `@import "../../main.scss";

// Code
`, { encoding: FILE_ENCODING });

/*
 * ---------------------------------------------- Create required .html file
 */
Logger.info(loggerSection, `Create: ${BASE_PATH + name + sep}index.ejs`);
fs.writeFileSync(`${BASE_PATH + name + sep}index.ejs`, `<!DOCTYPE html>
<%
const headTemplate = require('ejs-loader!@src/parts/head.ejs')
const safeQuotes = (str) => str.replace(/"/g, '&quot;')
%>
<html lang="en" data-template="default" data-compiled="<%= Date.now() %>">
<head>
  <%= headTemplate({ github: modules.github, config, url }) %>
</head>
<body>
  <!-- Code -->
</body>
</html>
`, { encoding: FILE_ENCODING });

/*
 * ---------------------------------------------- Create .md file
 */
Logger.info(loggerSection, `Create: ${BASE_PATH + name + sep}README.md`);
fs.writeFileSync(`${BASE_PATH + name + sep}README.md`, `# Template: ${name}

## Preview
<img src="https://raw.githubusercontent.com/GPortfolio/GPortfolio/master/demo/templates/${name}.png" alt="${name}">

## Creator
[@${config.modules.github.username}](https://github.com/${config.modules.github.username})
`, { encoding: FILE_ENCODING });

/*
 * ---------------------------------------------- Complete
 */
Logger.success(loggerSection, `Complete, path: ${BASE_PATH + name}`);
Logger.info(loggerSection, `To change the template - edit config.ts:`);
Logger.info(loggerSection, `  { global.template: ${name} }`);
