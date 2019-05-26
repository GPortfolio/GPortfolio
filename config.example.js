/* eslint-disable */
'use strict'

module.exports = {

  /**
   * The value is the name of the folder, all templates
   * you can find by the current path:
   *    ./src/templates
   *  You can also create your own template, which is
   *  described in this file:
   *    README.md
   * @var {string}
   * @default default
   */
  template: 'default',

  /**
   * Set your login from github, after the build we will receive
   * data from this profile (name, projects, etc.)
   * @var {string}
   * @example
   *  You can find the login from the address bar, for example:
   *    https://github.com/alexeykhr
   *  The value will be:
   *    alexeykhr
   */
  username: 'nwtgck',

  /**
   * Various configurations are stored that will filter
   * the received data with the Github API.
   * @var {Object}
   */
  parseGithub: {

    /**
     * @see https://developer.github.com/v3/repos/#list-user-repositories docs
     */
    repositories: {
      /**
       * @var {string} - all, owner, member
       * @default owner
       */
      type: 'owner',

      /**
       * @var {string} - created, updated, pushed, full_name
       * @default full_name
       */
      sort: 'full_name',

      /**
       * @var {string} - asc, desc
       * @default asc when using full_name, otherwise desc
       */
      direction: 'asc'
    }
  }
}
