import axios, { AxiosInstance, AxiosResponse } from 'axios';
import GithubRequest from '../GithubRequest';
import IGithubFetcher from '../interfaces/IGithubFetcher';
import IGithubConfigRepository from '../interfaces/IGithubConfigRepository';

export default class GithubPublicFetcher implements IGithubFetcher {
  protected username: string;

  protected axios: AxiosInstance;

  constructor(username: string, instance: AxiosInstance | undefined = undefined) {
    this.username = username;
    this.axios = instance || axios.create();
  }

  public fetchProfile(): Promise<AxiosResponse> {
    return this.axios.get(`${GithubRequest.API}/users/${this.username}`);
  }

  public fetchRepositories(
    params: IGithubConfigRepository,
    page = 1,
    perPage: number = GithubRequest.REPOS_MAX_COUNT,
  ): Promise<AxiosResponse> {
    return this.axios.get(`${GithubRequest.API}/users/${this.username}/repos`, {
      params: {
        type: params.type,
        sort: params.sort,
        direction: params.direction,
        page,
        per_page: perPage,
      },
    });
  }
}
