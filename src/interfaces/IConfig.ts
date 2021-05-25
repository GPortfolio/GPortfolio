import IGithub from 'src/services/github/interfaces/IGithub';
import IDefaultTemplate from 'src/templates/default/interfaces/IDefaultTemplate';
import ITemplate from './ITemplate';

export default interface IConfig {
  template: string
  global: IConfigGlobal
  data: IConfigData
  services: {
    github: IGithub
  }
  templates: {
    [name: string]: ITemplate | any
    default: IDefaultTemplate
  }
}

export interface IConfigGlobal {
  locale: string
  opg: object
  pwa: object
  meta: object
  www: {
    domain: string
    path: string
    https: boolean
  }
}

export interface IConfigData {
  login: string
  first_name: string
  last_name: string
  bio: string
  avatar: (() => string) | string
  gender: string
  position: string
  company: string
  location: string
  hireable: boolean
  links: IConfigDataLink[]
}

export interface IConfigProxyData {
  login: string | undefined
  firstName: string | undefined
  lastName: string | undefined
  bio: string | undefined
  avatar: (() => string) | string | undefined
  gender: string | undefined
  position: string | undefined
  company: string | undefined
  location: string | undefined
  hireable: boolean | undefined
  link: IConfigDataLink | undefined
}

export interface IConfigDataLink {
  url: string
  name: string // github, linkedin, twitter
}
