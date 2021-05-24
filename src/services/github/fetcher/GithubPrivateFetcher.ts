import axios, { AxiosInstance, AxiosResponse } from 'axios';
import GithubFetcher from '../GithubFetcher';
import IGithubFetcher from '../interfaces/IGithubFetcher';
import IGithubConfigRepository from '../interfaces/IGithubConfigRepository';

export default class GithubPrivateFetcher implements IGithubFetcher {
  protected token: string;
  protected axios: AxiosInstance;

  constructor(token: string, instance: AxiosInstance | undefined = undefined) {
    this.token = token;
    this.axios = instance || axios.create({
      headers: {
        Authorization: `token ${token}`,
      },
    });
  }

  fetchProfile(): Promise<AxiosResponse> {
    return this.axios.get(this.profileUrl());
  }

  fetchRepositories(params: IGithubConfigRepository, page: number = 1, perPage: number = 100): Promise<AxiosResponse> {
    return this.axios.get(this.repositoriesUrl(), {
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

  profileUrl(): string {
    return `${GithubFetcher.API}/user`;
  }

  repositoriesUrl(): string {
    return `${GithubFetcher.API}/user/repos`;
  }
}
