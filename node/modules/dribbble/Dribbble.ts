import axios, { AxiosInstance } from 'axios';
import config from '../../../config';
import Cache from '../../classes/Cache';
import Module from '../../classes/Module';
import { IDribbbleOath, IDribbbleProfile, IDribbbleShot } from '../../interfaces/IDribbble';

/** @type {AxiosInstance} */
const axiosInstance: AxiosInstance = axios.create();

/** @type {string} */
const GENERAL_FILE_KEY_TOKEN: string = 'dribble_token';

/** @type {number} */
const MAX_COUNT: number = 100;

class Dribbble extends Module {

  /**
   * Logger sections
   */
  static get sections () {
    return {
      profile: 'Profile',
      shots: 'Shots',
      token: 'Token',
    };
  }

  /**
   * Full url to get profile
   * @return {string}
   */
  static get URL_PROFILE (): string {
    return `${this.API}/user`;
  }

  /**
   * Full url to get profile shots
   * @return {string}
   */
  static get URL_SHOTS (): string {
    return `${this.API}/user/shots`;
  }

  /**
   * Full url to get oauth token
   * @return {string}
   */
  static get URL_OAUTH_TOKEN (): string {
    return `${this.WEBSITE}/oauth/token`;
  }

  public static NAME = 'Dribbble';
  public static API = 'https://api.dribbble.com/v2';
  public static WEBSITE = 'https://dribbble.com';

  /**
   * Fetch token and set to write to file.
   * @throws
   * @return {Promise<string>} access_token
   */
  public static async fetchUpdateToken (): Promise<string> {
    const response = await Dribbble.fetchToken();
    Cache.generalFile = { [GENERAL_FILE_KEY_TOKEN]: response.access_token };
    return response.access_token;
  }

  /**
   * Make a Dribbble API request to get profile token.
   * @return {Promise<IDribbbleOath>} data
   * @throws
   * @see https://developer.dribbble.com/v2/oauth/ docs
   */
  public static async fetchToken (): Promise<IDribbbleOath> {
    Dribbble.log(Dribbble.sections.token, 'Fetching data from API..').info();
    let response;

    try {
      response = await axiosInstance.post(Dribbble.URL_OAUTH_TOKEN, config.modules.dribbble.auth);
    } catch (e) {
      Dribbble.errorLog(e, Dribbble.sections.token);
      throw new Error(e);
    }

    Dribbble.log(Dribbble.sections.token, 'Complete').success();
    return response.data;
  }

  /**
   * Make a Dribbble API request to get profile.
   * @return {Promise<IDribbbleProfile>} data
   * @throws
   * @see https://developer.dribbble.com/v2/user/ docs
   */
  public static async fetchProfile (): Promise<IDribbbleProfile> {
    Dribbble.log(Dribbble.sections.profile, 'Fetching data from API..').info();
    let response;

    try {
      response = await axiosInstance.get(Dribbble.URL_PROFILE);
    } catch (e) {
      Dribbble.errorLog(e, Dribbble.sections.profile);
      throw new Error(e);
    }

    Dribbble.log(Dribbble.sections.profile, 'Complete').success();
    return response.data;
  }

  /**
   * Make a Dribbble API request to get profile shots.
   * @return {Promise<IDribbbleShot[]>}
   * @throws
   * @see https://developer.dribbble.com/v2/shots/ docs
   */
  public static async fetchShots (): Promise<IDribbbleShot[]> {
    const shots = [];
    let fetchShots;
    let page = 1;

    do {
      Dribbble.log(Dribbble.sections.shots, `Fetching data from API.. | ${page} page`).info();

      try {
        fetchShots = await axiosInstance.get(Dribbble.URL_SHOTS, {
          params: {
            page: page++,
            per_page: MAX_COUNT,
          },
        });
      } catch (e) {
        Dribbble.errorLog(e, Dribbble.sections.shots);
        throw new Error(e);
      }

      shots.push(...fetchShots.data);

    } while (fetchShots.data.length === MAX_COUNT);

    Dribbble.log(Dribbble.sections.shots, `Complete, ${shots.length} length`).success();
    return shots;
  }

  /**
   * Try-catch handle after axios response
   * @param e
   * @param {string} section
   * @return {void}
   */
  public static errorLog (e: any, section: string): void {
    if (e && e.response && e.response.data) {
      const data = e.response.data;
      if (data.error_description || data.message || data.error) {
        Dribbble.log(section, data.error_description || data.message || data.error).error();
      }
    }

    Dribbble.log(section, e).error();
  }
}

// Add a request interceptor
axiosInstance.interceptors.request.use(async (axiosConfig) => {
  let token = Cache.generalFile[GENERAL_FILE_KEY_TOKEN];

  if (!token && axiosConfig.url !== Dribbble.URL_OAUTH_TOKEN) {
    try {
      token = await Dribbble.fetchUpdateToken();
    } catch (e) {
      return {
        ...axiosConfig,
        cancelToken: new axios.CancelToken((cancel) => cancel('stop executing request')),
      };
    }
  }

  axiosConfig.headers.common.Authorization = `Bearer ${token}`;
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;

  return axiosConfig;
});

/*
 * Auto update access_token
 */
axiosInstance.interceptors.response.use(undefined, async (err) => {

  /*
   * Temporary, while does not work auto refresh code
   */
  if (!axios.isCancel(err) && err.response.status === 401) {
    const url = `https://dribbble.com/oauth/authorize?client_id=${config.modules.dribbble.auth.client_id}`;
    Dribbble.log(Dribbble.sections.token, 'Need to get the code again').warning();
    Dribbble.log(Dribbble.sections.token, url).warning();
    Cache.generalFile = { [GENERAL_FILE_KEY_TOKEN]: null };
  }

  /*
   * Dribbble Code working only works once
   * Now this code without a server does not work
   */
  // if (!axios.isCancel(err) && err.config.url !== Dribbble.URL_OAUTH_TOKEN && err.response.status === 401) {
  //   Dribbble.log(Dribbble.sections.token, 'Try refresh token').info()
  //   try {
  //     const token = await Dribbble.fetchUpdateToken()
  //     return axios(config)
  //   } catch (e) {
  //     Cache.generalFile = { [GENERAL_FILE_KEY_TOKEN]: null }
  //   }
  // }

  return Promise.reject(err);
});

export default Dribbble;
