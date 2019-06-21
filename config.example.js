/* eslint-disable */
'use strict'

/*
 * After change - restart server
 */

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
   * If a token is specified, then all repositories will be
   * displayed (including from organizations)
   * Only one access is needed to:
   *  public_repo - Access public repositories
   * @var {string}
   * @see https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line
   */
  token: '',

  /**
   * If the repository is called: <username>.github.io
   * Then the value is empty
   * If the repository is called: portfolio, or any other name
   * Then the value of <name of repository>
   * @var {string}
   */
  base: '',

  /**
   * @var {string}
   * @example
   *  Software Developer
   *  UI/UX Designer
   *  JavaScript Developer
   */
  position: '',

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
   *  og:url => {site url},
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
  socialMedia: [
    //
  ],

  /**
   * Settings for a specific template.
   */
  templates: {
    default: {

      /**
       * @var {string}
       * @example
       *  (empty) - use default image in template
       *  upstream/logo.png - from assets folder
       *  https://images.unsplash.com/photo-1505685296765-3a2736de412f - from url
       */
      background: ''
    }
  },

  /**
   * Various configurations are stored that will filter
   * the received data with the Github API
   * @var {Object}
   */
  parseGithub: {

    /** @see https://developer.github.com/v3/repos/#list-user-repositories docs */
    repositories: {

      /**
       * ONLY IF THE TOKEN IS SPECIFIED
       * @var {string} - all, public, private
       * @default all
       */
      visibility: 'public',

      /**
       * ONLY IF THE TOKEN IS SPECIFIED
       * Comma-separated list of values
       * @var {string}
       *  owner: Repositories that are owned by the authenticated user.
       *  collaborator: Repositories that the user has been added to as a collaborator.
       *  organization_member: Repositories that the user has access to through being a member
       *    of an organization. This includes every repository on every team that the user is on.
       * @default owner,collaborator,organization_member
       */
      affiliation: 'owner,collaborator,organization_member',

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
     * @var {{attr: string, values: *, revert: boolean, more: *}[]}
     *  more - extra options, support:
     *    If values is number - ['>', '<', '>=', '<=']
     * @see cache/repositories.json to see attributes or for API to get repositories
     * @example
     *  Get repositories where:
     *  { attr: 'name', values: ['rep2', 'rep1'], revert: false, more: null } // 2 repositories
     *  { attr: 'language', values: 'JavaScript', revert: true, more: null } // excluding javascript
     *  { attr: 'size', values: 200, revert: false, more: '<' } //  size is less than 200 KB
     *  { attr: 'name', values: /php/i, revert: false, more: null } // where php is in the title
     *  { attr: 'owner.login', values: 'nickname', revert: false, more: null } // owner is nickname
     */
    filter: [
      //
    ]
  }
}
