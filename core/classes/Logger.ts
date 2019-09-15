import { ConsoleColors } from '../enum/Colors';

const OPEN_TAG = '\x1b[';
const CLOSE_TAG = '\x1b[0m';

export default class Logger {

  public static info (section: string, msg: string) {
    Logger.log(section, msg, ConsoleColors.info);
  }

  public static success (section: string, msg: string) {
    Logger.log(section, msg, ConsoleColors.success);
  }

  public static warning (section: string, msg: string) {
    Logger.log(section, msg, ConsoleColors.warning);
  }

  public static error (section: string, msg: string) {
    Logger.log(section, msg, ConsoleColors.error);
  }

  private static log (section: string, msg: string, color: ConsoleColors) {
    console.log(
      `%s[%s]%s %s`,
      OPEN_TAG + color,
      section,
      CLOSE_TAG,
      msg,
    );
  }
}
