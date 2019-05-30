# GPortfolio

<p align="center">
    <a href="https://github.com/GPortfolio/GPortfolio">
        <img src="https://raw.githubusercontent.com/GPortfolio/GPortfolio/master/assets/upstream/logo.png" alt="GPortfolio">
    </a>
</p>
<p align="center">
    <a href="https://github.com/GPortfolio/GPortfolio" rel="nofollow"><img src="https://img.shields.io/github/package-json/v/GPortfolio/GPortfolio.svg" alt="Version"></a>
    <a href="https://david-dm.org/GPortfolio/GPortfolio" rel="nofollow"><img src="https://david-dm.org/GPortfolio/GPortfolio.svg" alt="Dependency Status"></a>
    <a href="https://david-dm.org/GPortfolio/GPortfolio?type=dev" rel="nofollow"><img src="https://david-dm.org/GPortfolio/GPortfolio/dev-status.svg" alt="devDependency Status"></a>
    <a href="https://github.com/GPortfolio/GPortfolio" rel="nofollow"><img src="https://img.shields.io/github/license/GPortfolio/GPortfolio.svg" alt="License"></a>
</p>

## Introducing
Creating an automatic portfolio based on Github profile. When building a project, we get a profile
and repositories with the Github API and generate an html file based on the chosen one.

## Benefits
- Documented code
- Repository filters
- Webpack + babel + es6
- The Open Graph protocol
- Multiple template support
- Progressive Web Apps (PWA)
- The largest estimates in the audit (Lighthouse)

## How to install
### \<username>.github.io
- Clone this repository on your PC
- Copy **config.example.js** to the **config.js** file and config this
- Create **\<username>.github.io** repository
- Run `npm ci && npm run build && npm run release`
- Open **\<username>.github.io** in the browser

### \<username>.github.io/\<repo>
- Fork this repository and clone on your PC
- Rename to **\<repo>**, example - portfolio
- Copy **config.example.js** to the **config.js** file and config this
- Run `npm ci && npm run build && npm run release`
- Change Source GitHub Pages to **gh-pages branch**
- Open **\<username>.github.io/\<repo>** in the browser

## FAQ
- [How to make a new template?](#how-to-make-a-new-template)
- [How to refresh data from API?](#how-to-refresh-data-from-api)
- [How to change favicon?](#how-to-change-favicon)

### How to make a new template?
Run the command to create base files with required default content:
```bash
$ npm run template <name>
```

Change the template in the **config.js** file:
```js
module.exports = {
  template: 'default' // <name> 
}
```

Run the project with a new template in dev mode:
```bash
$ npm run dev
```

*\<name> - new template name*

### How to refresh data from API?
Data is cached to the API Github cached, to avoid the limit. It lasts about an hour.

But you can force to refresh the data by deleting the **cache** folder.

### How to change favicon?
Put the file **favicon.ico** in the **assets** folder.

## How to contribute
Please make sure to read the [Contributing Guide](https://raw.githubusercontent.com/GPortfolio/GPortfolio/master/CONTRIBUTING.md) before making a pull request.

### Structure
- **assets** - files that do not directly build webpack.
- **cache** - temporarily created files, for example - data from the GitHub API.
- **dist** - compiled files that are uploaded to your **repository/gh-pages** branch.
- **node_modules** - libraries.
- **public** - all files from this folder will be copied to the **dist** folder and access by url: **/static/public/***.
- **src** - source files.
- **utils** - files that work with the node: getting data from the API, script for creating a new template, etc.

## Changelog
Detailed changes for each release are documented in the [CHANGELOG.md](https://github.com/GPortfolio/GPortfolio/blob/master/CHANGELOG.md).

## License
[MIT](https://opensource.org/licenses/MIT)
