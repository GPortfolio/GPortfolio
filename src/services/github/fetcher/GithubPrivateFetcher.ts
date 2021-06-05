import axios, { AxiosInstance, AxiosResponse } from 'axios';
import GithubRequest from '../GithubRequest';
import IGithubFetcher from '../interfaces/IGithubFetcher';
import IGithubConfigRepository from '../interfaces/IGithubConfigRepository';

export default class GithubPrivateFetcher implements IGithubFetcher {
  protected token: string;

  protected axios: AxiosInstance;

  constructor(token: string, instance: AxiosInstance | undefined = undefined) {
    this.token = token;
    this.axios = instance || axios.create({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  public fetchProfile(): Promise<AxiosResponse> {
    return this.axios.get(`${GithubRequest.API}/user`);
  }

  public fetchRepositories(
    params: IGithubConfigRepository,
    page = 1,
    perPage: number = GithubRequest.REPOS_MAX_COUNT,
  ): Promise<AxiosResponse> {
    return this.axios.get(`${GithubRequest.API}/user/repos`, {
      params: {
        affiliation: params.affiliation.length ? params.affiliation.join(',') : undefined,
        visibility: params.visibility,
        direction: params.direction,
        type: params.affiliation.length || params.visibility ? undefined : params.type,
        sort: params.sort,
        page,
        per_page: perPage,
      },
    });
  }
}
