import path from 'path';
import fs from 'fs';
import defaultData from './default';

const folder = process.env.APP_DEMO === 'true' ? 'demo' : 'custom';
const data = defaultData;

const replace = (keys: Array<string>) => {
  const keySplit = keys.join('/');
  const filePath = path.resolve(`config/${folder}/${keySplit}.json`);

  if (fs.existsSync(filePath)) {
    let currentData: any = data;

    let lastKey = keys.pop();
    if (!lastKey) {
      return;
    }

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
    const jsonData = require(`./${folder}/${keySplit}.json`);

    currentData[lastKey] = Array.isArray(currentData[lastKey])
      ? [...currentData[lastKey], ...jsonData]
      : { ...currentData[lastKey], ...jsonData };
  }
};

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

export default data;
