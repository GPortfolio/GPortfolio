# GPortfolio Contributing Guide

- [Code of Conduct](https://github.com/GPortfolio/GPortfolio/blob/main/.github/CODE_OF_CONDUCT.md)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Development Setup](#development-setup)

## Pull Request Guidelines

- Create all pull requests from main. Do not include other pull requests that have not been merged yet.
- Limit each pull request to one feature. If you have made several changes, please submit multiple pull requests.
- If you add a new feature provide tests that specify how the feature works.
- Respect the [coding conventions](https://www.conventionalcommits.org)
- Do not include the number of a related issue in the title of a pull request. Give the pull request a descriptive title and reference any issues from the description.

## Development Setup

Run project:

```shell
$ yarn dev
```

Run Javascript linter:

```shell
$ yarn lint
$ yarn lint:fix
```

Run tests:

```shell
$ yarn test
```

Build project:

```shell
$ yarn build
```
