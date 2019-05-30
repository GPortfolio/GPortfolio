'use strict'

/* | ------------------------------------------------------------------------------------------------
 * | - Generate a basic files/content for new template. -
 * | ------------------------------------------------------------------------------------------------
 * |
 * | How to create: npm run template <name>
 * | Example: npm run template myTemplate
 * |
 */

const argv = process.argv.slice(2)
const path = require('path')
const fs = require('fs')

// Check name of template
if (argv.length !== 1) {
  console.warn('Invalid arguments')
  process.exit(0)
}

/**
 * @var {string}
 */
const name = argv[0]

/**
 * Path to templates
 * @type {string}
 */
const BASE_PATH = path.resolve(__dirname, '../src/templates') + '/'

// Check on exists template
if (fs.existsSync(BASE_PATH + name)) {
  console.warn(`[Exists]: ${BASE_PATH + name}`)
  process.exit(0)
}

// Create folder
fs.mkdirSync(BASE_PATH + name)

/*
 * ---------------------------------------------- Create required .js file
 */
fs.writeFileSync(BASE_PATH + name + '/index.js', `'use strict'

import '@root/main'

// Code
`, { encoding: 'UTF-8' })

/*
 * ---------------------------------------------- Create required .scss file
 */
fs.writeFileSync(BASE_PATH + name + '/index.scss', `// noinspection CssUnknownTarget
@import "@root/main.scss";
`, { encoding: 'UTF-8' })

/*
 * ---------------------------------------------- Create required .html file
 */
fs.writeFileSync(BASE_PATH + name + '/index.html', `<!DOCTYPE html>
<% const o = htmlWebpackPlugin.options %>
<html lang="en">
<head>
  <!-- START: Common part -->
  <meta charset="utf-8">
  <title><%= o._profile.name %></title>
  <link rel="icon" href="/favicon.ico">
  <meta property="og:title" content="Portfolio by <%= o._profile.name %>" />
  <meta property="og:type" content="profile" />
  <meta property="og:image" content="<%= o._profile.avatar_url %>" />
  <meta property="og:url" content="https://<%= o._config.username %>.github.io/<%= o._config.base %>" />
  <meta property="og:description" content="<%= o._profile.bio %>" />
  <meta property="profile:username" content="<%= o._profile.login %>" />
  <% for (let [property, content] of Object.entries(o._config.opg)) { %>
    <meta property="<%= property %>" content="<%= content %>" />
  <% } %>
  <!-- END: Common part -->
</head>
<body>

</body>
</html>
`, { encoding: 'UTF-8' })

/*
 * ---------------------------------------------- Complete
 */
console.log('Complete, path:', BASE_PATH + name)
console.log('Change the template in the config.js file to:', name)
