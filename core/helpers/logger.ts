import chalk from 'chalk';
import { log } from 'console';

export default (section: string, msg: string) => ({
  success: () => {
    log(chalk.bgGreen(chalk.whiteBright(`[${section}]`)), msg);
  },
  warning: () => {
    log(chalk.bgYellow(chalk.whiteBright(`[${section}]`)), msg);
  },
  error: () => {
    log(chalk.bgRed(chalk.whiteBright(`[${section}]`)), msg);
  },
  info: () => {
    log(chalk.bgBlack(chalk.whiteBright(`[${section}]`)), msg);
  },
});
