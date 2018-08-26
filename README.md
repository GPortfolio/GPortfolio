<p align="center">
  <img src="https://github.com/WPortfolio/WPortfolio/blob/master/static/images/pixabay/resume.png" height="100">
</p>
<p align="center">
  <a href="https://wportfolio.github.io/">Example (app_template: 1)</a>
</p>

> Generate a portfolio using webpack

## Introducing

Create your portfolio website using webpack.
Select your template, fill in the information config.js, _base.scss files and upload to server.

## Benefits

- Documented code
- Webpack + babel + es6
- Only the most necessary dependencies
- Generating html code (HtmlWebpackPlugin)
- The largest estimates in the audit (Lighthouse)
- Common configuration files for all templates (config.js, _base.scss)
- Progressive Web Apps (PWA), website is accessible without internet

## How to start

- Fork this repo to your profile
- Rename repository name to "{login}.github.io"
- Console "cd /to/your/project"
- Console "npm install"
- Fill out the files with your information + image and stuff: "./src/config.js" and "./src/_base.scss"
- Console "npm run build"
- Console "git push -u origin"
- Wait a few minutes, then open your site: "{login}.github.io"

*{login} - your username on Github.

## Development Setup

``` bash
# install deps
npm install

# build dist files
npm run build

# running the webpack in watch mode
npm run dev
```

## TODO

- [ ] Multiple templates
- [ ] I18n
- [ ] Common .js file
- [ ] Projects section

## License

MIT
