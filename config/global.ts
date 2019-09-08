export default {
  /**
   * The value is the name of the folder, all templates
   * you can find by the current path:
   *    ./src/templates
   * You can also create your own template, which is
   * described in this file:
   *    README.md
   * @type {string}
   * @default default
   */
  template: 'default',

  /**
   * If the repository is called: <username>.github.io
   *  Then the value is empty
   * If the repository is called: portfolio, or any other name
   *  Then the value of <name of repository>
   * @type {string}
   */
  base: '',

  /**
   * The Open Graph protocol
   *  key - property
   *  value - content
   * @type {Object}
   * @see http://ogp.me/
   * @example
   *  'og:title': 'My portfolio'
   * @default
   *  og:title => Portfolio by {data.name},
   *  og:type => profile,
   *  og:image => {data.image},
   *  og:url => {site url},
   *  profile:username => {data.username}
   */
  opg: {
    'profile:first_name': '',
    'profile:gender': '', // male, female
    'profile:last_name': '',
  },

  /**
   * Override options for WebpackPwaManifest plugin
   * @type {Object}
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
   * @type {string}
   * @example
   *  www.example.com
   */
  customDomain: '',
}
