import IGithubProfile from './interfaces/IGithubProfile';
import { IConfigDataLink, IConfigData } from '../../interfaces/IConfig';

export default class GithubDataAdapter implements IConfigData {
  private profile: IGithubProfile;

  constructor(profile: IGithubProfile) {
    this.profile = profile;
  }

  get login(): string {
    return this.profile.login || '';
  }

  get first_name(): string {
    return this.profile.name.split(' ')[0] || '';
  }

  get last_name(): string {
    return this.profile.name.split(' ')[1] || '';
  }

  get avatar(): (() => string) | string {
    return this.profile.avatar_url || '';
  }

  get bio(): string {
    return this.profile.bio || '';
  }

  get company(): string {
    return this.profile.company || '';
  }

  // eslint-disable-next-line class-methods-use-this
  get gender(): string {
    return '';
  }

  get hireable(): boolean {
    return this.profile.hireable || false;
  }

  get links(): IConfigDataLink[] {
    return [{ url: this.profile.html_url, name: 'github' }];
  }

  get location(): string {
    return this.profile.location || '';
  }

  // eslint-disable-next-line class-methods-use-this
  get position(): string {
    return '';
  }
}
