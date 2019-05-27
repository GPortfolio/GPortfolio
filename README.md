# GPortfolio

<p align="center">
    <a href="https://github.com/GPortfolio/GPortfolio">
        <img src="https://raw.githubusercontent.com/GPortfolio/GPortfolio/master/public/images/logo.png" alt="GPortfolio">
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
- Open Graph
- Documented code
- Webpack + babel + es6
- Multiple template support
- Progressive Web Apps (PWA)
- The largest estimates in the audit (Lighthouse)

## How to install
- Clone this repository on your PC
- Copy *config.example.js* to the *config.js* file and config
- Create the repository: *<username>.github.io*
- Run **npm ci && npm run build && npm run deploy**
- Open *<username>.github.io* in the browser

## How to contribute
TODO

## FAQ
- [How to make a new template?](#how-to-make-a-new-template)

### How to make a new template
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

## Changelog
Detailed changes for each release are documented in the [CHANGELOG.md](https://github.com/GPortfolio/GPortfolio/blob/master/CHANGELOG.md).

## License
[MIT](https://opensource.org/licenses/MIT)
