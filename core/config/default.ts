import { IConfig } from '@i/IConfig';

export default {
  global: {

    /**
     * The value is the name of the folder, all templates
     * you can find by the current path:
     *    src/templates
     * You can also create your own template, which is
     * described in this file:
     *    README.md
     */
    template: 'default',

    /**
     * If the repository is called: <username>.github.io
     *  Then the value is empty
     * If the repository is called: portfolio, or any other name
     *  Then the value of <name of repository>
     */
    base: '',

    /**
     * The Open Graph protocol
     * @example
     *  { 'og:title': 'My portfolio' }
     *  <meta property="og:title" content="My portfolio" />
     */
    opg: {
      //
    },

    /**
     * Override options for WebpackPwaManifest plugin
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
     * @example
     *  www.example.com
     */
    customDomain: '',

    /**
     * Meta tags to head
     * @example
     *  { description: 'My Portfolio', keywords: 'portfolio, cw' }
     */
    meta: {
      //
    },
  },

  /**
   * User data, which will be mostly used in templates
   */
  data: {

    /**
     * First name of the user
     */
    first_name: '',

    /**
     * Last name of the user
     */
    last_name: '',

    /**
     * Short text for user description
     */
    bio: '',

    /**
     * Image link
     */
    avatar_url: '',

    /**
     * @example
     *  Freelance
     *  Software Engineer
     *  UI/UX Designer
     */
    position: '',

    /**
     * Name of the company
     */
    company: '',

    /**
     * Where are you
     */
    location: '',

    /**
     * Do you accept a job offer
     */
    hireable: false,

    /**
     * Links to various website / social networks
     */
    links: [
      //
    ],
  },

  /**
   * A list of sites on which we can obtain additional data, such as a list
   * of repositories from the Github, or shots from Dribbble. And also
   * with the help of these data you can quickly fill out a profile
   */
  websites: {

    /**
     * DescriptionGitHub is a global company that provides hosting for
     * software development version control using Git
     * @see https://github.com/
     * @see docs/websites/github.md
     */
    github: {

      /**
       * If a token is specified, then all repositories will be
       * displayed (including from organizations). You do not
       * need to specify any additional accesses, just
       * get the token itself
       * @see https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line
       */
      token: '',

      /**
       * Various configurations are stored that will filter
       * the received data with the Github API
       */
      parse: {

        /**
         * @see https://developer.github.com/v3/repos/#list-user-repositories docs
         */
        repositories: {

          /**
           * Not used if token is present. Instead, use: visibility, affiliation.
           * @default owner
           */
          type: 'owner',

          /**
           * @default full_name
           */
          sort: 'full_name',

          /**
           * @default asc when using full_name, otherwise desc
           */
          direction: 'asc',

          /**
           * ONLY IF THE TOKEN IS SPECIFIED
           * @default all
           */
          visibility: 'public',

          /**
           * ONLY IF THE TOKEN IS SPECIFIED
           * Comma-separated list of values:
           *  owner: Repositories that are owned by the authenticated user.
           *  collaborator: Repositories that the user has been added to as a collaborator.
           *  organization_member: Repositories that the user has access to through being a member
           *    of an organization. This includes every repository on every team that the user is on
           * @default owner,collaborator,organization_member
           */
          affiliation: 'owner,collaborator,organization_member',
        },
      },

      /**
       * Before outputting data - filter them
       * @see docs/config.md #Filters
       */
      filter: {
        repositories: [
          //
        ],
      },

      /**
       * Before outputting data - sort them
       * @see docs/config.md #Sort
       */
      sort: {
        repositories: null,
      },

      /**
       * Profile from Github API
       */
      profile: null,

      /**
       * Repositories from Github API
       */
      repositories: [
        //
      ],
    },

    /**
     * DescriptionDribbble is a self-promotion and networking
     * platform for digital designers.
     * @see https://dribbble.com/
     * @see docs/websites/dribbble.md
     */
    dribbble: {

      /**
       * Data required to obtain access_token (access to profile)
       */
      auth: {
        client_id: '',
        client_secret: '',
        code: '',
      },

      /**
       * Before outputting data - filter them
       * @see docs/config.md #Filters
       */
      filter: {
        shots: [
          //
        ],
      },

      /**
       * Before outputting data - sort them
       * @see docs/config.md #Sort
       */
      sort: {
        shots: null,
      },

      /**
       * Profile from Dribbble API
       */
      profile: null,

      /**
       * Shots from Dribbble API
       */
      shots: [
        //
      ],
    },
  },

  /**
   * Additional settings for each created template
   */
  templates: {
    default: {

      /**
       * @see docs/config.md #Image
       */
      background: '',

      /**
       * Number of items to display, the rest will be hidden and displayed
       * when you click on the button (for the same number of elements)
       *  0 - display all
       */
      github_repositories_more: 25,

      /**
       * Same as github_repositories_more
       */
      dribbble_shots_more: 25,
    },
  },
} as IConfig;
