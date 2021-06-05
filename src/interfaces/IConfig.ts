import { ManifestOptions } from 'webpack-pwa-manifest';
import IGithub from '../services/github/interfaces/IGithub';
import IDefaultTemplate from '../templates/default/interfaces/IDefaultTemplate';
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
  opg: { [key: string]: string }
  pwa: ManifestOptions | null
  meta: { [key: string]: string }
  www: IConfigGlobalWww
}

export interface IConfigGlobalWww {
  domain: string
  path: string
  protocol: 'https' | 'http'
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

export interface IConfigDataLink {
  url: string
  name: string // github, linkedin, twitter
}
