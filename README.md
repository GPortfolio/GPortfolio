# GPortfolio

<p align="center">
  <a href="https://github.com/GPortfolio/GPortfolio">
    <img src="https://raw.githubusercontent.com/GPortfolio/GPortfolio/main/src/assets/project/logo.png" alt="GPortfolio">
  </a>
</p>
<p align="center">
  <a href="https://github.com/GPortfolio/GPortfolio" rel="nofollow"><img src="https://img.shields.io/github/package-json/v/GPortfolio/GPortfolio.svg" alt="Version"></a>
  <a href="https://github.com/GPortfolio/GPortfolio/actions/workflows/pr.yml" rel="nofollow"><img src="https://github.com/GPortfolio/GPortfolio/actions/workflows/pr.yml/badge.svg" alt="Build"></a>
  <a href="https://lgtm.com/projects/g/GPortfolio/GPortfolio/alerts/" rel="nofollow"><img src="https://img.shields.io/lgtm/alerts/g/GPortfolio/GPortfolio.svg?logo=lgtm&logoWidth=18" alt="Total alerts"></a>
  <a href="https://github.com/GPortfolio/GPortfolio" rel="nofollow"><img src="https://img.shields.io/github/license/GPortfolio/GPortfolio.svg" alt="License"></a>
</p>

## Introducing

Automatic portfolio creation based on Github profile.

**Example - Default theme**: [Github](https://github.com/Alexeykhr/alexeykhr.github.io) / [Website](https://alexeykhr.github.io)

[Previous Version v3](https://github.com/GPortfolio/GPortfolio/tree/v3.4.1)

## Features

- All settings are in one file **config.ts**
- Vanilla JS, no frameworks
- Ability to change data on the fly (in dev mode, you just need to refresh the page)
- Adding new services (like Github API) to get data and fill the template
- Configuring, sorting and filtering the received data
- Ability to add new templates and switch between them
- Support for Progressive Web Apps (offline access)
- Support for The Open Graph protocol (social share)
- Automatic daily page build with Github Actions

## How to install

- Fork this repository
- Rename the forked repository to **\<username>.github.io** | *[Settings -> Repository name]*
- Enable Github Actions and `profile.yml` for autodeploy | *[Actions tab -> profile.yml]*
- [Generate new access token](https://github.com/settings/tokens/new) and add this value to the repository settings as `ACCESS_TOKEN` | *[Settings -> Secret]*
- Fill the [`config.ts`](#config) file in root directory with your data and push changes
- Change Github page to `gh-pages` branch | *[Settings -> Pages -> Source]*
- Open the site (**\<username>.github.io**)

## Templates

<table>
  <tr>
    <td>
      <a href="https://raw.githubusercontent.com/GPortfolio/GPortfolio/main/src/assets/templates/default.png" title="Default template">
        <img src="https://raw.githubusercontent.com/GPortfolio/GPortfolio/main/src/assets/templates/default.png" width="250" alt="Default template">
      </a>
    </td>
  </tr>
</table>

## Config

Not all possible data are listed here, you can find more in [IConfig](https://github.com/GPortfolio/GPortfolio/blob/main/src/interfaces/IConfig.ts) interface.
Also use typehint hints from your IDE.

All images must be loaded via callback, example:

```js
image: () => require('./public/my-image.png')
```

If the image is a link from the Internet, then simply:

```js
image: 'https://example.com/image.png'
```

**Example**

```ts
export default {
  // Choosing a template for generating a site, a list of available in the [Templates] section
  template: 'default',

  global: {
    // Format: language_TERRITORY
    locale: 'en_US', // default value

    // The Open Graph protocol
    // https://ogp.me/
    opg: {
      // All settings have already been added, but if you want to expand with
      // new values or replace, you can always do it here:
      'og:image:alt': 'Profile image',
    },

    // Progressive Web Apps
    // https://web.dev/progressive-web-apps/
    pwa: {
      // If you want to change the data when generating manifest.json
      description: 'My Portfolio',
      theme_color: '#000',
    },

    // HTML Meta tags
    // <meta name="<key>" content="<value>">
    meta: {
      description: 'My Portfolio',
      viewport: 'width=device-width, initial-scale=1.0',
    },

    www: {
      // If you are using your domain and not <username> .github.io
      domain: '',
    },
  },

  // This is the main property, the data from which fill the template
  // If any services are used (like Github), then this data can be
  // automatically filled in
  data: {
    // To replace generated values or add missing data
    hireable: true,
    gender: 'male',
    position: 'Software Developer',
    avatar: () => require('./public/my-image.png'),
  },

  // Here are the services from which you can automatically get the latest data
  services: {
    github: {
      configuration: {
        // https://github.com/<nickname>
        nickname: 'myNickname',
        // This data is used when making requests to the Github API
        fetcher: {
          repositories: {
            type: 'all',
          },
        },
        // When generating a template, the received data is filtered,
        // described in more detail in the [Filter] section
        filter: {
          repositories: [
            [
              { attr: 'owner.login', values: ['myNickname', 'orgName'] },
              { attr: 'id', values: 123456, options: { sign: '>' } },
            ],
            [
              { attr: 'fork', values: false },
            ],
          ],
        },
        // Output data is also sorted in more detail in the [Sorter] section
        sort: {
          repositories: [
            { attr: 'created_at', sortByDesc: true },
            { attr: 'forks_count', sortByDesc: true },
          ],
        },
      },
    },
  },

  // Each template can have its own unique settings
  templates: {
    // Template name
    default: {
      configuration: {
        githubRepositoriesMore: 2,
        background: () => require('./public/background.png'),
      },
    },
  },
} as IConfig;
```

### Filter

Filtering allows you to filter data when displaying information on the site.

#### Use cases

Output repositories that are not forks **AND** number of stars greater than 10.

```ts
[
  [
    { attr: 'fork', values: false },
    { attr: 'stargazers_count', values: 10, options: { sign: '>' } },
  ]
]
```

Output repositories that are not forks **OR** number of stars less than 10.

```ts
[
  [
    { attr: 'fork', values: false },
  ],
  [
    { attr: 'stargazers_count', values: 10, options: { sign: '<' } },
  ],
]
```

Output repositories where (the number of forks is more than 10 **AND** non-Javascript language) **OR** (TypeScript language).

```ts
[
  [
    { attr: 'forks_count', values: 10, options: { sign: '>' } },
    { attr: 'language', values: 'JavaScript', revert: true },
  ],
  [
    { attr: 'language', values: 'TypeScript' },
  ],
]
```

### Sorter

Sorting allows you to sort data while displaying information on the site.

#### Use cases

Sort repositories by creation date.

```ts
[
  { attr: 'created_at', sortByDesc: true },
]
```

Sort the repositories first by the number of stars, and then by creation date.

```ts
[
  { attr: 'created_at', sortByDesc: true },
  { attr: 'stargazers_count', sortByDesc: true },
]
```

## Utils

For Github, a token is required to get information about the organization's repositories.

All data is stored in the `./data` folder.

```shell
# Fetch Github data
$ yarn github:profile ACCESS_TOKEN
$ yarn github:repositories ACCESS_TOKEN
```

## How to contribute

Please make sure to read the [Contributing Guide](https://github.com/GPortfolio/GPortfolio/blob/main/.github/CONTRIBUTING.md) before making a pull request.

## Changelog

Detailed changes for each release are documented in the [CHANGELOG.md](https://github.com/GPortfolio/GPortfolio/blob/main/CHANGELOG.md).

## License

[MIT](https://opensource.org/licenses/MIT)
