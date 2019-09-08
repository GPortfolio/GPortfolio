import { IConfigData } from '../interfaces/IConfig';

/**
 * Execute all functions from config.data
 * @param {any} configData
 * @param {any} modules
 * @return {IConfigData}
 */
export default (configData: any, modules: any): IConfigData => {
  Object.entries(configData).forEach(([key, val]) => {
    if (typeof val === 'function') {
      configData[key] = val(modules);
    }
  });

  return configData;
};
