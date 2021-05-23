import axios, { AxiosInstance, AxiosResponse } from 'axios';
import GithubFetcher from '../GithubFetcher';
import IGithubFetcher from '../interfaces/IGithubFetcher';
import IGithubConfigRepository from '../interfaces/IGithubConfigRepository';

export default class GithubPublicFetcher implements IGithubFetcher {
  protected username: string;
  protected axios: AxiosInstance;

  constructor(username: string, instance: AxiosInstance | undefined = undefined) {
    this.username = username;
    this.axios = instance || axios.create();
  }

  fetchProfile(): Promise<AxiosResponse> {
    return this.axios.get(this.profileUrl());
  }

  fetchRepositories(params: IGithubConfigRepository, page: number = 1, perPage: number = 100): Promise<AxiosResponse> {
    return this.axios.get(this.repositoriesUrl(), {
      params: {
        type: params.type,
        sort: params.sort,
        direction: params.direction,
        page,
        per_page: perPage,
      },
    });
  }

  profileUrl(): string {
    return `${GithubFetcher.API}/users/${this.username}`;
  }

  repositoriesUrl(): string {
    return `${GithubFetcher.API}/users/${this.username}/repos`;
  }
}
