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
  username: '',

  /**
   * If the repository is called: <username>.github.io
   * Then the value is empty
   * If the repository is called: portfolio, or any other name
   * Then the value of <name of repository>
   * @var {string}
   */
  base: '',

  /**
   * The Open Graph protocol
   *  key - property
   *  value - content
   * @var {Object}
   * @see http://ogp.me/
   * @example
   *  'og:title': 'My portfolio'
   * @default
   *  og:title => Portfolio by {name from Github},
   *  og:type => profile,
   *  og:image => {avatar url from Github},
   *  og:url => https://{username}.github.io/,
   *  profile:username => {username}
   */
  opg: {
    'profile:first_name': '',
    'profile:last_name': '',
    'profile:gender': '' // male, female
  },

  /**
   * Override options for WebpackPwaManifest plugin
   * @var {Object}
   * @see https://github.com/arthurbergmz/webpack-pwa-manifest
   * @example
   *  For change description and background color:
   *    { description: 'My portfolio', background_color: '#333' }
   */
  pwa: {
    //
  },

  /**
   * If you are deploying to a custom domain
   * @var {string}
   * @example
   *  www.example.com
   */
  customDomain: '',

  /**
   * Display a list of social networks in the template (if supported)
   * @var {{name: string, icon: string, link: string}[]}
   *  icon - svg, find: /assets/upstream/icons
   * @example
   *  { name: 'Github', icon: 'github', link: 'https://github.com/profile' },
   *  { name: 'LinkedIn', icon: 'linkedin', link: 'https://linkedin.com/in/profile' }
   */
  socialLinks: [
    //
  ],

  /**
   * Various configurations are stored that will filter
   * the received data with the Github API
   * @var {Object}
   */
  parseGithub: {

    /** @see https://developer.github.com/v3/repos/#list-user-repositories docs */
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
    },

    /**
     * After get repositories (API) - filter by these filters
     * Accept repository if all of the parameters is valid
     * String equal!
     *  Deep attr not support yet
     *  Values pattern not support yet
     *
     * @var {{attr: string, values: *, revert: boolean, more: *}[]}
     *  more - extra options, support:
     *    If values is number - ['>', '<', '>=', '<=']
     *
     * @see cache/repositories.json to see attributes or for API to get repositories
     *
     * @example
     *  Get repositories that have the name rep1 and rep2,
     *  as well as the non-Javascript language
     *  and the size is less than 200 kb
     *  { attr: 'name', values: ['rep2', 'rep1'], revert: false, more: null } // 2 repositories
     *  { attr: 'language', values: 'JavaScript', revert: true, more: null } // excluding javascript
     *  { attr: 'size', values: 200, revert: false, more: '<' } //  size is less than 200 KB
     */
    filter: [
      //
    ]
  }
}
