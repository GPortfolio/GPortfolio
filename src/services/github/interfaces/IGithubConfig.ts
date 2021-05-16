import ISorter from '../../../modules/sorter/interfaces/ISorter';
import IFilterItem from '../../../modules/filter/interfaces/IFilterItem';
import IGithubConfigRepository from './IGithubConfigRepository';

export default interface IGithubConfig {
  token: string
  nickname: string
  settings: {
    repositories: IGithubConfigRepository
  }
  filter: {
    repositories: IFilterItem[][]
  }
  sort: {
    repositories: ISorter[]
  }
}
