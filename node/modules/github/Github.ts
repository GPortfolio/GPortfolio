import axios, { AxiosInstance } from 'axios';
import config from '../../../config';
import Module from '../../classes/Module';
import { IGithubProfile, IGithubRepository } from '../../interfaces/IGithub';

/** @type {AxiosInstance} */
const axiosInstance: AxiosInstance = axios.create({
  headers: {
    Authorization: config.modules.github.token ? `token ${config.modules.github.token}` : null,
  },
});

/** @type {number} */
const MAX_COUNT: number = 100;

export default class Github extends Module {

  /**
   * Logger sections
   */
  static get sections () {
    return {
      profile: 'Profile',
      repositories: 'Repositories',
    };
  }

  /**
   * Full url to get list of the repositories
   * @return {string}
   */
  static get URL_REPOSITORIES (): string {
    const append = config.modules.github.token
      ? 'user/repos'
      : `users/${config.modules.github.username}/repos`;

    return `${this.API}/${append}`;
  }

  /**
   * Full url to get profile
   * @return {string}
   */
  static get URL_PROFILE (): string {
    return `${this.API}/users/${config.modules.github.username}`;
  }

  public static NAME = 'Github';
  public static API = 'https://api.github.com';

  /**
   * Make a Github API request to get user data.
   * @return {Promise<IGithubProfile>} data
   * @throws
   * @see https://developer.github.com/v3/users/#get-a-single-user docs
   */
  public static async fetchProfile (): Promise<IGithubProfile> {
    Github.log(Github.sections.profile, 'Fetching data from API..').info();
    let response;

    try {
      response = await axiosInstance.get(Github.URL_PROFILE);
    } catch (e) {
      Github.log(Github.sections.profile, e).error();
      throw new Error(e);
    }

    Github.log(Github.sections.profile, 'Complete').success();

    return response.data;
  }

  /**
   * Make a Github API request to get user repositories.
   * @return {Promise<Array<IGithubRepository>>}
   * @throws
   * @see https://developer.github.com/v3/repos/#list-user-repositories docs
   */
  public static async fetchRepositories (): Promise<IGithubRepository[]> {
    let fetchRepositories;
    const repositories = [];
    let page = 1;

    do {
      Github.log(Github.sections.repositories, `Fetching data from API.. | ${page} page`).info();

      try {
        fetchRepositories = await axiosInstance.get(Github.URL_REPOSITORIES, {
          params: {
            ...config.modules.github.parse.repositories,
            page: page++,
            per_page: MAX_COUNT,
          },
        });
      } catch (e) {
        Github.log(Github.sections.repositories, e).error();
        throw new Error(e);
      }

      repositories.push(...fetchRepositories.data);

    } while (fetchRepositories.data.length === MAX_COUNT);

    Github.log(Github.sections.repositories, `Complete, ${repositories.length} length`).success();
    return repositories;
  }
}
