import axios, { AxiosInstance } from 'axios';
import {
  IGithubContributor,
  IGithubProfile,
  IGithubRepository,
} from '@i/websites/IGithubWebsite';
import logger from '../helpers/logger';
import config from '../config';

/**
 * Maximum fetch repositories on once
 *
 * @type {number}
 */
const MAX_COUNT: number = 100;

export default class Github {
  private axios: AxiosInstance;

  private token: string;

  private username: string;

  constructor(username: string = '', token: string = '') {
    this.username = username;
    this.token = token;
    this.axios = axios.create({
      headers: {
        Authorization: token ? `token ${token}` : null,
      },
    });
  }

  /**
   * Full url to get list of the repositories
   * @return {string}
   */
  get fetchRepositoriesUrl(): string {
    const append = this.token
      ? 'user/repos'
      : `users/${this.username}/repos`;

    return `${Github.API}/${append}`;
  }

  /**
   * Full url to get profile
   * @return {string}
   */
  get fetchProfileUrl(): string {
    return `${Github.API}/users/${this.username}`;
  }

  public static API = 'https://api.github.com';

  /**
   * Full url to get list contributors.
   * @param {string} owner
   * @param {string} repo
   * @return {string}
   */
  public static fetchContributorsUrl(owner: string, repo: string): string {
    return `${Github.API}/repos/${owner}/${repo}/contributors`;
  }

  /**
   * Make a Github API request to get user data.
   * @return {Promise<IGithubProfile>} data
   * @throws
   * @see https://developer.github.com/v3/users/#get-a-single-user docs
   */
  public async fetchProfile(): Promise<IGithubProfile> {
    logger('Github Profile', 'Fetching data from API..').info();
    let response;

    try {
      response = await this.axios.get(this.fetchProfileUrl);
    } catch (e) {
      logger('Github Profile', e).error();
      throw e;
    }

    logger('Github Profile', 'Complete').success();

    return response.data;
  }

  /**
   * Make a Github API request to get user repositories.
   * @return {Promise<Array<IGithubRepository>>}
   * @throws
   * @see https://developer.github.com/v3/repos/#list-user-repositories docs
   */
  public async fetchRepositories(): Promise<IGithubRepository[]> {
    let fetchRepositories;
    const repositories = [];
    let page = 1;

    const repositoryType = config.websites.github.token
      ? undefined
      : config.websites.github.parse.repositories.type;

    do {
      logger('Github Repositories', `Fetching data from API.. | ${page} page`).info();

      try {
        /* eslint-disable-next-line no-await-in-loop */
        fetchRepositories = await this.axios.get(this.fetchRepositoriesUrl, {
          params: {
            ...config.websites.github.parse.repositories,
            page,
            per_page: MAX_COUNT,
            type: repositoryType,
          },
        });

        page += 1;
      } catch (e) {
        logger('Github Repositories', e).error();
        throw e;
      }

      repositories.push(...fetchRepositories.data);
    } while (fetchRepositories.data.length === MAX_COUNT);

    logger('Github Repositories', `Complete, ${repositories.length} length`).success();
    return repositories;
  }

  /**
   * Make a Github API request to get contributors.
   * @param {string} owner
   * @param {string} repo
   * @return {Promise<Array<IGithubContributor>>}
   * @throws
   * @see https://developer.github.com/v3/repos/#list-contributors docs
   */
  public async fetchContributors(owner: string, repo: string): Promise<IGithubContributor[]> {
    const fetchUrl = Github.fetchContributorsUrl(owner, repo);
    const contributors = [];
    let fetchContributors;
    let page = 1;

    do {
      logger('Github Contributors', `Fetching data from API.. | ${page} page`).info();

      try {
        /* eslint-disable-next-line no-await-in-loop */
        fetchContributors = await this.axios.get(fetchUrl, {
          params: {
            ...config.websites.github.parse.repositories,
            page,
            per_page: MAX_COUNT,
          },
        });

        page += 1;
      } catch (e) {
        logger('Github Contributors', e).error();
        throw e;
      }

      contributors.push(...fetchContributors.data);
    } while (fetchContributors.data.length === MAX_COUNT);

    logger('Github Contributors', `Complete, ${contributors.length} length`).success();
    return contributors;
  }
}
