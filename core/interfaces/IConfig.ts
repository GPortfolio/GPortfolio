// IConfig
// IConfigGlobal
// IConfigData
// IConfigModules
// IConfigTemplates

export interface IConfigData {
  name: string;
  avatar_url: string;
  position: string;
  hire: boolean;
  socialMedia: Array<{
    name: string;
    icon: string;
    link: string;
  }>;
}
