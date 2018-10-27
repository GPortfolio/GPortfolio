<p align="center">
  <img src="https://github.com/WPortfolio/WPortfolio/blob/master/static/images/resume.png" height="100">
</p>
<p align="center">
  <a href="https://wportfolio.github.io/">Demo page (app_template: 1)</a> |
  <a href="https://github.com/WPortfolio/WPortfolio/tree/master/src/templates">Preview templates</a>
</p>

> Generate a portfolio using webpack

## Introducing

Create your portfolio website using webpack.
Select your template, fill in the information config.js file and upload to server.

## Benefits

- Documented code
- Webpack + babel + es6
- Only the most necessary dependencies
- Generating html code (HtmlWebpackPlugin)
- The largest estimates in the audit (Lighthouse)
- Common configuration file for all templates - config.js
- Progressive Web Apps (PWA), website is accessible without internet

## How to start

- Fork this repo to your profile
- Rename repository name to "{login}.github.io"
- Console "cd /to/your/project"
- Console "npm install"
- Fill out the file with your information + image and stuff: "./src/config.js"
- Console "npm run build"
- Console "git push -u origin"
- Wait a few minutes, then open your site: "{login}.github.io"

*{login} - your username on Github.

## How to create your own template?

- Create a new folder "./src/templates/t{number}"
- Create 3 files: "index.html", "scss/index.scss", "js/index.js"
- Change the app_template (config.js) number to your {number}
- Console "npm run dev"
- Watch for changes in the compiled file "./index.html"
- When the file is finished: console "npm run build"
- Push changes to the server

*{number} - this is app_template.

**Use htmlWebpackPlugin as in the first template, creating a new template

## Development Setup

``` bash
# install deps
npm install

# build dist files
npm run build

# running the webpack in watch mode
npm run dev
```

## License

MIT
