import IGithubService from 'src/services/github/interfaces/IGithubService';
import IDefaultTemplate from 'src/templates/default/interfaces/IDefaultTemplate';
import ITemplate from './ITemplate';

export default interface IConfig {
  global: IConfigGlobal
  data: IConfigData
  services: {
    github: IGithubService
  }
  templates: {
    [key: string]: ITemplate & any
    default: IDefaultTemplate
  }
}

export interface IConfigGlobal {
  template: string
  base: string
  locale: string
  opg: object
  pwa: object
  customDomain: string
  meta: object
}

export interface IConfigData {
  login: string
  first_name: string
  last_name: string
  bio: string
  avatar_url: string
  gender: 'male' | 'female' | ''
  position: string
  company: string
  location: string
  hireable: boolean
  links: IConfigDataLink[]
}

export interface IConfigDataLink {
  url: string
  name: string
  icon: string
}
