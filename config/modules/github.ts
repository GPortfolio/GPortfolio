export default {
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
   * TODO Move to docs
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
     * @see core/interfaces/IGithib.ts identify attributes
     * @see docs/config.md #Filters
     */
    repositories: [
      //
    ],
  },
}
