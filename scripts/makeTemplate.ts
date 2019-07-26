/* | ------------------------------------------------------------------------------------------------
 * | - Generate a basic files/content for new template. -
 * | ------------------------------------------------------------------------------------------------
 * |
 * | How to create: npm run template <name>
 * | Example: npm run template myTemplateName
 * |
 */

import fs from 'fs';
import variables from '../node/variables';

const argv = process.argv.slice(2);

// Check name of template
if (argv.length !== 1) {
  console.warn('Invalid arguments');
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
const BASE_PATH: string = variables.root + '/src/templates/';

/** @type {string} */
const FILE_ENCODING: string = 'utf8';

// Check on exists template
if (fs.existsSync(BASE_PATH + name)) {
  console.warn(`[Exists]: ${BASE_PATH + name}`);
  process.exit(0);
}

// Create folder
fs.mkdirSync(BASE_PATH + name);

/*
 * ---------------------------------------------- Create required .js file
 */
fs.writeFileSync(BASE_PATH + name + '/index.js', `import '../../main';

// Code
`, { encoding: FILE_ENCODING });

/*
 * ---------------------------------------------- Create required .scss file
 */
fs.writeFileSync(BASE_PATH + name + '/index.scss', `// noinspection CssUnknownTarget
@import "../../main.scss";
`, { encoding: FILE_ENCODING });

/*
 * ---------------------------------------------- Create required .html file
 */
fs.writeFileSync(BASE_PATH + name + '/index.ejs', `<!DOCTYPE html>
<%
const headTemplate = require('ejs-loader!@src/parts/head.ejs')
const safeQuotes = (str) => str.replace(/"/g, '&quot;')
%>
<html lang="en" data-template="default" data-compiled="<%= Date.now() %>">
<head>
  <%= headTemplate({ profile: modules.github.profile, config, url }) %>
</head>
<body>

</body>
</html>
`, { encoding: FILE_ENCODING });

/*
 * ---------------------------------------------- Complete
 */
console.log('Complete, path:', BASE_PATH + name);
console.log('Change the template in the config.js file to:', name);
