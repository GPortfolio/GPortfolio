import fs from 'fs';
import { sep } from 'path';
import variables from '../variables';
import Logger from './Logger';

/** @type {string} */
const BASE_PATH: string = variables.root + sep + 'cache' + sep;

/** @type {string} */
const FILE_ENCODING: string = 'utf8';

/** @type {Object} */
let generalFile: any;

/**
 * Create cache folder if not exists
 */
if (!fs.existsSync(BASE_PATH)) {
  try {
    console.log('[Cache] Create folder');
    fs.mkdirSync(BASE_PATH);
  } catch (e) {
    console.warn(e);
  }
}

class Cache {

  /**
   * Get data from file if exists
   * @return {*}
   */
  get dataFromFile (): any {
    return Cache.tryReadJsonFile(this.fileName);
  }

  /**
   * @return {string}
   */
  get keyTimestamp (): string {
    return this.cacheName + '_timestamp';
  }

  /**
   * Check if the file exists and the time for
   * re-receiving information has not come
   * @return {boolean}
   */
  get needParse (): boolean {
    // Check by exists
    if (!Cache.existsFile(this.fileName)) {
      return true;
    }

    // Check by timestamp
    return (+generalFile[this.keyTimestamp] || 0) + this.timeWait <= Date.now();
  }

  /**
   * @return {*}
   */
  static get generalFile (): any {
    return generalFile;
  }

  /**
   * Update/override data for general file
   */
  static set generalFile (data) {
    generalFile = { ...generalFile, ...data };
    Cache.writeFile(variables.cache.general, generalFile);
  }

  /**
   * Get data from file if exists
   * @param {string} fileName - path in <root>/data folder (ext is required)
   * @return {*}
   */
  public static tryReadJsonFile (fileName: string): any {
    const path = BASE_PATH + fileName;

    if (!fs.existsSync(path)) {
      return null;
    }

    const data = fs.readFileSync(path, { encoding: FILE_ENCODING });

    try {
      return JSON.parse(data);
    } catch (e) {
      Logger.error('Cache', e);
      return null;
    }
  }

  /**
   * Set data to .json file
   * @param {string} fileName - path in <root>/data folder (ext is required)
   * @param {*} data
   */
  public static writeFile (fileName: string, data: any) {
    fs.writeFileSync(BASE_PATH + fileName, JSON.stringify(data), { encoding: FILE_ENCODING });
  }

  /**
   * Check if the file exists
   * @param {string} fileName - path in <root>/data folder (ext is required)
   * @return {boolean}
   */
  public static existsFile (fileName: string): boolean {
    return fs.existsSync(BASE_PATH + fileName);
  }

  public fileName: string;
  public cacheName: string;
  public timeWait: number;

  /**
   * @param {string} fileName (ext is required)
   * @param {string} cacheName
   */
  constructor (fileName: string = variables.cache.general, cacheName: string = fileName) {
    this.fileName = fileName;
    this.cacheName = cacheName;
    this.timeWait = 1000 * 60 * 60; // 1 hour
  }

  /**
   * The name of the cache file in the cache folder
   * @param {string} name
   */
  public setFileName (name: string) {
    this.fileName = name;
  }

  /**
   * The name of the property in the general file
   * @param {string} name
   * @default as fileName
   */
  public setCacheName (name: string) {
    this.cacheName = name;
  }

  /**
   * Waiting before the next request to the API.
   * @param {number} timestamp - milliseconds
   * @default 1 hour
   */
  public setTimeWait (timestamp: number) {
    this.timeWait = +timestamp || 0;
  }

  /**
   * Update data to cache file
   * @param {object|array} data
   * @return {void}
   */
  public updateData (data: object | any[]): void {
    Cache.writeFile(this.fileName, data);
  }

  /**
   * Append timestamp to file
   * @return {void}
   */
  public updateTimestamp (): void {
    Cache.generalFile = { [this.keyTimestamp]: Date.now() };
  }
}

generalFile = Cache.tryReadJsonFile(variables.cache.general) || {};

export default Cache;
