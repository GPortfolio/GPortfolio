import { AxiosResponse } from 'axios';
import IGithubConfigRepository from './IGithubConfigRepository';

export default interface IGithubFetcher {
  fetchProfile(): Promise<AxiosResponse>

  fetchRepositories(
    params: IGithubConfigRepository,
    page: number,
    perPage: number
  ): Promise<AxiosResponse>
}
