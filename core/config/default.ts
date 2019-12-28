export default {
  global: {

    /**
     * The value is the name of the folder, all templates
     * you can find by the current path:
     *    src/templates
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
     */
    opg: {
      //
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
      description: '',
      name: '',
      short_name: '',
    },

    /**
     * If you are deploying to a custom domain
     * @type {string}
     * @example
     *  www.example.com
     */
    customDomain: '',

    /**
     * Add meta tags to head
     * @type {Object}
     * @example
     *  { description: 'Portfolio of a certain user' }
     *  { keywords: 'portfolio, cw' }
     */
    meta: {
      //
    },
  },

  data: {

    /**
     * @type {string}
     */
    first_name: '',

    /**
     * @type {string}
     */
    last_name: '',

    /**
     * @type {string}
     */
    bio: '',

    /**
     * @type {string}
     */
    avatar_url: '',

    /**
     * @type {string}
     */
    position: '',

    /**
     * @type {string}
     */
    company: '',

    /**
     * @type {string}
     */
    location: '',

    /**
     * @type {boolean}
     */
    hireable: false,

    /**
     * @type {Array}
     */
    links: [
      //
    ],
  },

  websites: {
    github: {

      /**
       * Set your login from github, after the build we will receive
       * data from this profile (name, projects, etc.)
       * @type {string}
       * @example
       *  You can find the login from the address bar, for example, value will be:
       *    alexeykhr
       *  From url https://github.com/alexeykhr
       */
      username: '',

      /**
       * NOTICE: Set value in .env file
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
           *    of an organization. This includes every repository on every team that the user is on
           * @default owner,collaborator,organization_member
           */
          affiliation: 'owner,collaborator,organization_member',
        },
      },

      filter: {

        /**
         * @type {IFilter[]}
         * @see core/interfaces/IGithub.ts identify attributes
         * @see docs/config.md #Filters
         */
        repositories: [
          //
        ],
      },

      sort: {

        /**
         * @type {ISort}
         * @see core/interfaces/IGithub.ts identify attributes
         * @example
         *  { attr: 'stargazers_count', enable: true, sortByDesc: true }
         *  { attr: 'owner.id', enable: true, sortByDesc: false }
         */
        repositories: {
          //
        },
      },

      /**
       * @type {IGithubProfile}
       */
      profile: {
        //
      },

      /**
       * @type {IGithubRepository}
       */
      repositories: [
        //
      ],
    },

    dribbble: {

      auth: {
        /**
         * NOTICE: Set value in .env file
         * @type {string}
         */
        client_id: '',

        /**
         * NOTICE: Set value in .env file
         * @type {string}
         */
        client_secret: '',

        /**
         * NOTICE: Set value in .env file
         * NOTE: Code is valid only once when receiving a token
         * @type {string}
         */
        code: '',
      },

      filter: {

        /**
         * @type {IFilter[]}
         * @see core/interfaces/IDribbble.ts identify attributes
         * @see docs/config.md #Filters
         */
        shots: [
          //
        ],
      },

      sort: {

        /**
         * @type {ISort}
         * @see core/interfaces/IDribbble.ts identify attributes
         * @example
         *  { attr: 'id', enable: true, sortByDesc: true }
         */
        shots: {
          //
        },
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

      /**
       * Number of items to display, the rest will be hidden and displayed
       * when you click on the button (for the same number of elements)
       *  0 - display all
       * @type {number}
       */
      github_repositories_more: 25,

      /**
       * Same as github_repositories_more
       * @type {number}
       */
      dribbble_shots_more: 25,
    },
  },
};
