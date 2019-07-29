# GPortfolio

<p align="center">
  <a href="https://github.com/GPortfolio/GPortfolio">
    <img src="https://raw.githubusercontent.com/GPortfolio/GPortfolio/master/assets/upstream/logo.png" alt="GPortfolio">
  </a>
</p>
<p align="center">
  <a href="https://circleci.com/gh/GPortfolio/GPortfolio" rel="nofollow"><img src="https://circleci.com/gh/GPortfolio/GPortfolio.svg?style=shield" alt="Build Status"></a>
  <a href="https://github.com/GPortfolio/GPortfolio" rel="nofollow"><img src="https://img.shields.io/github/package-json/v/GPortfolio/GPortfolio.svg" alt="Version"></a>
  <a href="https://david-dm.org/GPortfolio/GPortfolio" rel="nofollow"><img src="https://david-dm.org/GPortfolio/GPortfolio.svg" alt="Dependency Status"></a>
  <a href="https://david-dm.org/GPortfolio/GPortfolio?type=dev" rel="nofollow"><img src="https://david-dm.org/GPortfolio/GPortfolio/dev-status.svg" alt="devDependency Status"></a>
  <a href="https://github.com/GPortfolio/GPortfolio" rel="nofollow"><img src="https://img.shields.io/github/license/GPortfolio/GPortfolio.svg" alt="License"></a>
</p>

## Introducing
Creating an automatic portfolio based on Github profile, with the ability to connect others.
When building, we get data from the API and generate html.

[See examples](https://alexeykhr.github.io) | Default template

## Benefits
- Documented code
- Filters after receiving data from API
- Webpack + babel + es6
- Support: Github, Dribbble
- The Open Graph protocol
- Multiple template support
- Progressive Web Apps - the site is available offline

## How to install
After running the `npm run deploy` command, the **utils/deploy.js** script is launched,
which initializes git in the **dist** folder and makes a **force push with lease**
in the **\<username>.github.io** repository or **\<repo>** in the `gh-pages` branch.

### \<username>.github.io
- Clone this repository on your PC
- Copy **config.example.js** to the **config.js** file and config this
- Create **\<username>.github.io** repository
- Run `npm ci && npm run build && npm run deploy`
- Open **\<username>.github.io** in the browser

### \<username>.github.io/\<repo>
- Fork this repository and clone on your PC
- Rename to **\<repo>**, example - portfolio
- Copy **config.example.js** to the **config.js** file and config this
- Run `npm ci && npm run build && npm run deploy`
- Change Source GitHub Pages to **gh-pages branch**
- Open **\<username>.github.io/\<repo>** in the browser

## Templates
<table>
  <tr>
    <td>
      <a href="https://github.com/GPortfolio/GPortfolio/tree/master/src/templates/default" title="Default">
        <img src="https://raw.githubusercontent.com/GPortfolio/GPortfolio/master/assets/upstream/templates/default.png" width="250" alt="Default">
      </a>
    </td>
  </tr>
</table>

## FAQ
- [How to get your repositories from the organization?](#how-to-get-your-repositories-from-the-organization)
- [How to make a new template?](#how-to-make-a-new-template)
- [How to refresh data from API?](#how-to-refresh-data-from-api)
- [How to change favicon?](#how-to-change-favicon)
- [How to connect Dribbble or another?](#how-to-connect-dribbble-or-another)

### How to get your repositories from the organization?

You need to get a **token** from Github with access to `public_repo`,
and add it to **config.js**.

[Read more](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line)

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

### How to connect Dribbble or another?
[See here](https://github.com/GPortfolio/GPortfolio/tree/master/docs)

## How to contribute
Please make sure to read the [Contributing Guide](https://github.com/GPortfolio/GPortfolio/blob/master/.github/CONTRIBUTING.md) before making a pull request.

### Structure
- **assets** - files that directly build webpack.
- **cache** - temporarily created files, for example - data from the GitHub API.
- **dist** - compiled files that are uploaded to repository.
- **docs** - documentation (.md files)
- **node** - running scripts (retrieving data from API) before webpack work
- **node_modules** - libraries.
- **public** - all files from this folder will be copied to the **dist** folder and access by url: **/static/public/***.
- **scripts** - small cli scripts.
- **src** - source files.

## Changelog
Detailed changes for each release are documented in the [CHANGELOG.md](https://github.com/GPortfolio/GPortfolio/blob/master/CHANGELOG.md).

## License
[MIT](https://opensource.org/licenses/MIT)
