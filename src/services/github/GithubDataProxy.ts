import IGithubProfile from './interfaces/IGithubProfile';
import { IConfigDataLink, IConfigProxyData } from '../../interfaces/IConfig';

export default class GithubDataProxy implements IConfigProxyData {
  private profile: IGithubProfile;

  constructor(profile: IGithubProfile) {
    this.profile = profile;
  }

  get login(): string | undefined {
    return this.profile.login || undefined;
  }

  get firstName(): string | undefined {
    return this.profile.name.split(' ')[0] || undefined;
  }

  get lastName(): string | undefined {
    return this.profile.name.split(' ')[1] || undefined;
  }

  get avatar(): (() => string) | string | undefined {
    return this.profile.avatar_url || undefined;
  }

  get bio(): string | undefined {
    return this.profile.bio || undefined;
  }

  get company(): string | undefined {
    return this.profile.company || undefined;
  }

  get gender(): string | undefined {
    return undefined;
  }

  get hireable(): boolean | undefined {
    return this.profile.hireable === null ? undefined : this.profile.hireable;
  }

  get link(): IConfigDataLink | undefined {
    return { url: this.profile.url, name: 'github' };
  }

  get location(): string | undefined {
    return this.profile.location || undefined;
  }

  get position(): string | undefined {
    return undefined;
  }
}
