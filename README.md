# GPortfolio

<p align="center">
  <a href="https://github.com/GPortfolio/GPortfolio">
    <img src="https://raw.githubusercontent.com/GPortfolio/GPortfolio/master/demo/logo.png" alt="GPortfolio">
  </a>
</p>
<p align="center">
  <a href="https://circleci.com/gh/GPortfolio/GPortfolio" rel="nofollow"><img src="https://circleci.com/gh/GPortfolio/GPortfolio.svg?style=shield" alt="Build Status"></a>
  <a href="https://github.com/GPortfolio/GPortfolio" rel="nofollow"><img src="https://img.shields.io/github/package-json/v/GPortfolio/GPortfolio.svg" alt="Version"></a>
  <a href="https://lgtm.com/projects/g/GPortfolio/GPortfolio/alerts/" rel="nofollow"><img src="https://img.shields.io/lgtm/alerts/g/GPortfolio/GPortfolio.svg?logo=lgtm&logoWidth=18" alt="Total alerts"></a>
  <a href="https://david-dm.org/GPortfolio/GPortfolio" rel="nofollow"><img src="https://david-dm.org/GPortfolio/GPortfolio.svg" alt="Dependency Status"></a>
  <a href="https://david-dm.org/GPortfolio/GPortfolio?type=dev" rel="nofollow"><img src="https://david-dm.org/GPortfolio/GPortfolio/dev-status.svg" alt="devDependency Status"></a>
  <a href="https://github.com/GPortfolio/GPortfolio" rel="nofollow"><img src="https://img.shields.io/github/license/GPortfolio/GPortfolio.svg" alt="License"></a>
</p>

## Plans
Create ui, with which you can simply create your portfolio online without editing any files.
After development is complete, major changes to this repository are possible.

- More automation
- More customization options
- Get data from various sites in one click
- Deploy to various sites or upload as html

[Repository Server](https://github.com/GPortfolio/server/tree/dev)

<table>
  <tr>
    <td>
      <img src="https://raw.githubusercontent.com/GPortfolio/GPortfolio/master/demo/server/1.png" width="500" alt="Server 1">
    </td>
    <td>
      <img src="https://raw.githubusercontent.com/GPortfolio/GPortfolio/master/demo/server/2.png" width="500" alt="Server 2">
    </td>
  </tr>
</table>

## Introducing

Automatically create a portfolio based on data from various social networks.

**Configure data -> build -> deploy**

[See example](https://alexeykhr.github.io/) | Default template

## Benefits

- Documented code
- Configuration in one place
- Filters after receiving data from API
- Webpack + babel + es6
- Multiple template support
- The Open Graph protocol (social share)
- Progressive Web Apps (offline access)
- The ability to obtain data from:
  - [Github](https://github.com/)
  - [Dribbble](https://dribbble.com/)

## How to install

### \<username>.github.io

- Clone this repository on your PC
- Copy **.env** to the **.env.example** file and config this
- Copy **config.example.ts** to the **config.ts** file and config this
- Create **\<username>.github.io** repository
- Run `npm ci && npm run build && npm run deploy`
- Open **\<username>.github.io** in the browser

### \<username>.github.io/\<repo>

- Fork this repository and clone on your PC
- Rename to **\<repo>**, example - portfolio
- Copy **.env** to the **.env.example** file and config this
- Copy **config.example.ts** to the **config.ts** file and config this
- Run `npm ci && npm run build && npm run deploy`
- Change Source GitHub Pages to **gh-pages branch**
- Open **\<username>.github.io/\<repo>** in the browser

## Templates

<table>
  <tr>
    <td>
      <a href="https://github.com/GPortfolio/GPortfolio/tree/master/src/templates/default" title="Default">
        <img src="https://raw.githubusercontent.com/GPortfolio/GPortfolio/master/demo/templates/default.png" width="250" alt="Default">
      </a>
    </td>
  </tr>
</table>

## Contributors

<a href="https://github.com/Alexeykhr" title="Alexeykhr">
  <img src="https://avatars2.githubusercontent.com/u/14747569?v=4" alt="Alexeykhr" width="48px">
</a>
<a href="https://github.com/apps/dependabot-preview" title="dependabot-preview[bot]">
  <img src="https://avatars3.githubusercontent.com/in/2141?v=4" alt="dependabot-preview[bot]" width="48px">
</a>
<a href="https://github.com/lucasnaja" title="lucasnaja">
  <img src="https://avatars3.githubusercontent.com/u/13838273?v=4" alt="lucasnaja" width="48px">
</a>

## FAQ

- [How to get your repositories from the organization?](#how-to-get-your-repositories-from-the-organization)
- [How to make a new template?](#how-to-make-a-new-template)
- [How to refresh data from API?](#how-to-refresh-data-from-api)
- [How to change favicon?](#how-to-change-favicon)
- [How to connect Dribbble or another?](#how-to-connect-dribbble-or-another)

### How to get your repositories from the organization?

You need to get a **token** from Github with access to `public_repo`,
and add it to **config.ts**.

[Read more](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line)

### How to make a new template?

Run the command to create base files with required default content:

```bash
npm run template <name>
```

Change the template in the **config.ts** file:

```ts
module.exports = {
  template: 'default' // <name>
}
```

Run the project with a new template in dev mode:

```bash
npm run dev
```

\<name> - new template name*

### How to refresh data from API?

Data is cached to the API Github cached, to avoid the limit. It lasts about an hour.

But you can force to refresh the data by deleting the **cache** folder.

### How to change favicon'?'

Put the file **favicon.ico** in the **public** folder.

### How to connect Dribbble or another?

[See here](https://github.com/GPortfolio/GPortfolio/tree/master/docs)

## How to contribute

Please make sure to read the [Contributing Guide](https://github.com/GPortfolio/GPortfolio/blob/master/.github/CONTRIBUTING.md) before making a pull request.

### Structure

- **assets** - files that directly build webpack.
- **cache** - temporarily created files, for example - data from the GitHub API.
- **dist** - compiled files that are uploaded to repository.
- **docs** - documentation (.md files)
- **core** - running scripts (retrieving data from API) before webpack work
- **node_modules** - libraries.
- **public** - all files from this folder will be copied to the **dist** folder (user files).
- **scripts** - small cli scripts.
- **src** - source files.

### How can you improve?

- **Default** template
  - Display data shots from **Dribbble** (`modules.dribbble.shots`)
- Add more templates or improve existing.
- Add more sites for parse data.
- Add tests
- Support merge config.example.ts to config.ts after update
- Other improvements.

## Changelog

Detailed changes for each release are documented in the [CHANGELOG.md](https://github.com/GPortfolio/GPortfolio/blob/master/CHANGELOG.md).

## License

[MIT](https://opensource.org/licenses/MIT)
