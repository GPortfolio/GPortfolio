import IService from '../../interfaces/IService';
import configuration from './config/configuration';
import IGithub from './interfaces/IGithub';
import Application from '../../Application';
import Sorter from '../../modules/sorter/Sorter';
import Filter from '../../modules/filter/Filter';

export default class GithubService implements IService {
  protected filter: Filter;
  protected sorter: Sorter;

  constructor(filter: Filter | undefined = undefined, sorter: Sorter | undefined = undefined) {
    this.filter = filter || new Filter()
    this.sorter = sorter || new Sorter()
  }

  name() {
    return 'github';
  }

  register(): IGithub {
    return {
      configuration,
      data: {
        profile: this.load('profile.json', undefined),
        repositories: this.load('repositories.json', [])
      },
    };
  }

  boot(app: Application) {
    const { github } = app.config().services

    for (const rule of github.configuration.sort.repositories) {
      this.sorter.sort(github.data.repositories, rule)
    }

    github.data.repositories = this.filter.handle(github.data.repositories, github.configuration.filter.repositories)
  }

  protected load(fileName: string, value: any): any {
    try {
      return require(`../../../data/github/${fileName}`) || value;
    } catch {
      return value;
    }
  }
}
