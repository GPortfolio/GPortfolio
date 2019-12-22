# GPortfolio Contributing Guide

- [Code of Conduct](https://github.com/GPortfolio/GPortfolio/blob/master/.github/CODE_OF_CONDUCT.md)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Development Setup](#development-setup)

## Pull Request Guidelines

- Create all pull requests from master. Do not include other pull requests that have not been merged yet.
- Limit each pull request to one feature. If you have made several changes, please submit multiple pull requests.
- If you add a new feature provide tests that specify how the feature works.
- Respect the [coding conventions](https://www.conventionalcommits.org)
- Do not include the number of a related issue in the title of a pull request. Give the pull request a descriptive title and reference any issues from the description.

## Development Setup

To develop a template (selected in the config.js file), run the command:

```bash
npm run dev
```

To start creating a new template, run the command:

```bash
npm run template <name>
```

After completing development, run eslint:

```bash
npm run lint
```
