import fs from 'fs';
import path from 'path';
import variables from '../variables';

/**
 * Get deep value from object
 * @param {any} data
 * @param {array} keys
 * @param {number} deep
 * @return {any} undefined - not found
 * @example
 *  obj - { foo: { foo2: 'bar' } }
 *  keys - 'foo.foo2'
 *  result - 'bar'
 */
export function getDeepByKey (data: any, keys: string[], deep: number = 0): any {
  if (! isObject(data)) {
    return undefined;
  }

  const val = data[keys[deep]];

  if (isObject(val)) {
    return getDeepByKey(val, keys, deep + 1);
  }
  
  if (keys.length !== deep + 1) {
    return undefined;
  }

  return val;
}

/**
 * Get list all files from folder and subfolders*
 * @param {string} base - folder path starting from root directory
 * @param {boolean} scanSubDirs - scan internal folders
 * @param {RegExp} regularExp - filter received files
 * @return {object} - key (path to file), value (always true)
 */
export function getListFiles (
  base: string,
  scanSubDirs: boolean = false,
  regularExp: RegExp = /\.ts$/,
): object {
  const files: { [s: string]: boolean } = {};

  const readDirectory = (directory: string) => {
    fs.readdirSync(directory).forEach((file) => {
      const fullPath = path.resolve(directory, file);

      if (fs.statSync(fullPath).isDirectory()) {
        if (scanSubDirs) {
          readDirectory(fullPath);
        }

        return;
      }

      if (!regularExp.test(fullPath)) {
        return;
      }

      files[fullPath] = true;
    });
  };

  readDirectory(path.resolve(variables.root, base));

  return files;
}

/**
 * Value is an object
 * @param {any} val
 * @return {boolean}
 */
function isObject(val: any): boolean {
  return (!!val) && (val.constructor === Object)
}
