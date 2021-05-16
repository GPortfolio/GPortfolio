import { log } from 'console';
import chalk from 'chalk';

export default class Logger {
  private section: string;

  constructor(section: string) {
    this.section = section
  }

  success(msg: string) {
    log(chalk.bgGreen(chalk.whiteBright(`[${this.section}]`)), msg);
  }

  warning(msg: string) {
    log(chalk.bgYellow(chalk.whiteBright(`[${this.section}]`)), msg);
  }

  error(msg: string) {
    log(chalk.bgRed(chalk.whiteBright(`[${this.section}]`)), msg);
  }

  info(msg: string) {
    log(chalk.bgBlack(chalk.whiteBright(`[${this.section}]`)), msg);
  }
}
