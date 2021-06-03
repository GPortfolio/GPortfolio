import IGithubConfigRepository from './IGithubConfigRepository';
import IFilterItem from '../../../modules/filter/interfaces/IFilterItem';
import ISorterItem from '../../../modules/sorter/interfaces/ISorterItem';

export default interface IGithubConfiguration {
  nickname: string
  fetcher: {
    repositories: IGithubConfigRepository
  }
  filter: {
    repositories: IFilterItem[][]
  }
  sort: {
    repositories: ISorterItem[]
  }
}
