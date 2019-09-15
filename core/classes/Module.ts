import Logger from './Logger';

export default abstract class Module {

  /**
   * Print console.log with color
   */
  public static log (section: string, msg: string) {
    return {
      error: () => {
        Logger.error(`${this.name}, ${section}`, msg);
      },
      info: () => {
        Logger.info(`${this.name}, ${section}`, msg);
      },
      success: () => {
        Logger.success(`${this.name}, ${section}`, msg);
      },
      warning: () => {
        Logger.warning(`${this.name}, ${section}`, msg);
      },
    };
  }
}
