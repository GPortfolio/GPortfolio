import { inject, injectable } from 'inversify';
import IService from '../../interfaces/IService';
import Sorter from '../../modules/sorter/Sorter';
import Filter from '../../modules/filter/Filter';
import GithubDataAdapter from './GithubDataAdapter';
import { IConfigData } from '../../interfaces/IConfig';
import IGithub from './interfaces/IGithub';
import { TYPES } from '../../types';
import IApplication from '../../interfaces/IApplication';
import IGithubProfile from './interfaces/IGithubProfile';
import IGithubRepository from './interfaces/IGithubRepository';

@injectable()
export default class GithubService implements IService {
  private filter: Filter;

  private sorter: Sorter;

  private profileData: IGithubProfile | undefined;

  private repositoriesData: IGithubRepository[];

  constructor(
  @inject(Filter) filter: Filter,
    @inject(Sorter) sorter: Sorter,
    @inject(TYPES.GithubProfileData) profileData: IGithubProfile | undefined,
    @inject(TYPES.GithubRepositoriesData) repositoriesData: IGithubRepository[],
  ) {
    this.filter = filter;
    this.sorter = sorter;
    this.profileData = profileData;
    this.repositoriesData = repositoriesData;
  }

  public name() {
    return 'github';
  }

  public configuration(): IGithub {
    return {
      configuration: {
        nickname: '',
        fetcher: {
          repositories: {
            type: 'owner',
            sort: 'full_name',
            direction: 'asc',
            visibility: 'public',
            affiliation: ['owner', 'collaborator', 'organization_member'],
          },
        },
        filter: {
          repositories: [],
        },
        sort: {
          repositories: [],
        },
      },
      data: {
        profile: this.profileData,
        repositories: this.repositoriesData,
      },
    };
  }

  public boot(app: IApplication): void {
    const { github } = app.config.services;

    github.configuration.sort.repositories.forEach((rule) => {
      this.sorter.sortByRule(github.data.repositories, rule);
    });

    github.data.repositories = this.filter.handle(
      github.data.repositories,
      github.configuration.filter.repositories,
    );
  }

  public proxy(app: IApplication): IConfigData | undefined {
    const { github } = app.config.services;

    return github.data.profile && new GithubDataAdapter(github.data.profile);
  }
}
