import { IDefaultTemplate } from '@i/templates/IDefaultTemplate';
import { IDribbbleWebsite } from '@i/websites/IDribbbleWebsite';
import { IGithubWebsite } from '@i/websites/IGithubWebsite';

export interface IConfig {
  global: IConfigGlobal
  data: IConfigData
  websites: {
    github: IGithubWebsite
    dribbble: IDribbbleWebsite
  }
  templates: {
    default: IDefaultTemplate
  }
}

export interface IConfigGlobal {
  template: string
  base: string
  opg: Object
  pwa: Object
  customDomain: string
  meta: Object
}

export interface IConfigData {
  first_name: string
  last_name: string
  bio: string
  avatar_url: string
  position: string
  company: string
  location: string
  hireable: boolean
  links: Array<{
    url: string
    name: string
    icon: string
  }>
}
