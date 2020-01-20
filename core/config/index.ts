import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import defaultData from './default';
import transform from './transform';
import global from '../global';

// We import this file from the ejs template,
// so we need to update the environment
const envPath = path.resolve('.env');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

/**
 * Support multiple accounts
 * @type {string}
 */
const data = defaultData;

/**
 * Replace default data with user data
 * @param {string[]} keys
 */
const replace = (keys: Array<string>) => {
  const keySplit = keys.join('/');
  const filePath = path.resolve(`core/config/accounts/${global.account}/${keySplit}.json`);

  if (fs.existsSync(filePath)) {
    let currentData: any = data;

    let lastKey = keys.pop();
    if (!lastKey) {
      return;
    }

    // Refers to the folder itself as a folder.json
    if (lastKey === 'index') {
      lastKey = keys.pop();
      if (!lastKey) {
        return;
      }
    }

    keys.forEach((key: string) => {
      currentData = currentData[key];
    });

    // eslint-disable-next-line
    const jsonData = require(`./accounts/${global.account}/${keySplit}.json`);

    currentData[lastKey] = Array.isArray(currentData[lastKey])
      ? [...currentData[lastKey], ...jsonData]
      : { ...currentData[lastKey], ...jsonData };
  }
};

// TODO Automatically

// Common
replace(['global']);
replace(['data']);

// Website - Github
replace(['websites', 'github', 'index']);
replace(['websites', 'github', 'profile']);
replace(['websites', 'github', 'repositories']);

// Website - Dribbble
replace(['websites', 'dribbble', 'index']);
replace(['websites', 'dribbble', 'profile']);
replace(['websites', 'dribbble', 'shots']);

// Templates
replace(['templates', 'default']);

transform(data);

export default data;
