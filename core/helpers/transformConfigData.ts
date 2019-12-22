import { IConfigData } from '../interfaces/IConfig';

/**
 * Execute all functions from config.data
 * @param {*} configData
 * @param {*} modules
 * @return {IConfigData}
 */
export default (configData: any, modules: any): IConfigData => {
  const data = configData;

  Object.entries(configData).forEach(([key, val]) => {
    if (typeof val === 'function') {
      data[key] = val(modules);
    }
  });

  return data;
};
