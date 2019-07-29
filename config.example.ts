import { getDeepByKey } from './node/helpers/utils';

/*
 * After editing - restart the server for the change to take effect.
 */

export default {
  global: {

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
     *  og:title => Portfolio by {name from Github},
     *  og:type => profile,
     *  og:image => {avatar url from Github},
     *  og:url => {site url},
     *  profile:username => {username}
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
  },

  data: {

    /**
     * Your name
     * @type {string}
     */
    name: (modules: any) => {
      let val = getDeepByKey(modules, ['github', 'profile', 'name']);

      if (!val) {
        val = getDeepByKey(modules, ['dribbble', 'profile', 'name']);
      }

      return val;
    },

    /**
     * Profile picture
     * @type {string}
     */
    avatar_url: (modules: any) => {
      let val = getDeepByKey(modules, ['github', 'profile', 'avatar_url']);

      if (!val) {
        val = getDeepByKey(modules, ['dribbble', 'profile', 'avatar_url']);
      }

      return val;
    },

    /**
     * @type {string}
     */
    position: 'Software Developer',

    /**
     * Searching for a job
     * @type {boolean}
     */
    hire: (modules: any) => {
      return !!getDeepByKey(modules, ['github', 'profile', 'hireable']);
    },

    /**
     * You are in social networks
     * @type {object}
     */
    socialMedia: [
      { name: 'Github', icon: 'github', link: 'https://github.com/' },
      { name: 'LinkedIn', icon: 'linkedin', link: 'https://linkedin.com/' },
    ],
  },

  modules: {
    github: {

      /**
       * Set your login from github, after the build we will receive
       * data from this profile (name, projects, etc.)
       * @type {string}
       * @example
       *  You can find the login from the address bar, for example:
       *    https://github.com/alexeykhr
       *  The value will be:
       *    alexeykhr
       */
      username: '',

      /**
       * If a token is specified, then all repositories will be
       *  displayed (including from organizations)
       * Only one access is needed to:
       *  public_repo - Access public repositories
       * @type {string}
       * @see https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line
       */
      token: '',

      /**
       * Various configurations are stored that will filter
       * the received data with the Github API
       * @type {object}
       */
      parse: {

        /** @see https://developer.github.com/v3/repos/#list-user-repositories docs */
        repositories: {

          /**
           * Not used if token is present. Instead, use: visibility, affiliation.
           * @type {string} - all, owner, member
           * @default owner
           */
          type: 'owner',

          /**
           * @type {string} - created, updated, pushed, full_name
           * @default full_name
           */
          sort: 'full_name',

          /**
           * @type {string} - asc, desc
           * @default asc when using full_name, otherwise desc
           */
          direction: 'asc',

          /**
           * ONLY IF THE TOKEN IS SPECIFIED
           * @type {string} - all, public, private
           * @default all
           */
          visibility: 'public',

          /**
           * ONLY IF THE TOKEN IS SPECIFIED
           * Comma-separated list of values
           * @type {string}
           *  owner: Repositories that are owned by the authenticated user.
           *  collaborator: Repositories that the user has been added to as a collaborator.
           *  organization_member: Repositories that the user has access to through being a member
           *    of an organization. This includes every repository on every team that the user is on.
           * @default owner,collaborator,organization_member
           */
          affiliation: 'owner,collaborator,organization_member',
        },
      },

      filter: {

        /**
         * @type {IFilters[]}
         * @see node/interfaces/IGithib.ts identify attributes
         * @see docs/config.md #Filters
         */
        repositories: [
          //
        ],
      },
    },

    dribbble: {

      auth: {
        /**
         * @type {string}
         */
        client_id: '',

        /**
         * @type {string}
         */
        client_secret: '',

        /**
         * NOTE: Code is valid only once when receiving a token
         * @type {string}
         */
        code: '',
      },

      filter: {

        /**
         * @type {IFilters[]}
         * @see node/interfaces/IDribbble.ts identify attributes
         * @see docs/config.md #Filters
         */
        shots: [
          //
        ],
      },
    },
  },

  templates: {
    default: {

      /**
       * @type {string}
       * @see docs/config.md #Image
       */
      background: '',
    },
  },
};
