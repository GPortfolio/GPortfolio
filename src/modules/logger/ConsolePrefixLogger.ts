import chalk from 'chalk';
import { injectable } from 'inversify';
import ConsoleLogger from './ConsoleLogger';
import IPrefixLogger from './interfaces/IPrefixLogger';

@injectable()
export default class ConsolePrefixLogger extends ConsoleLogger implements IPrefixLogger {
  private prefix: string;

  constructor(prefix: string) {
    super();
    this.prefix = prefix;
  }

  public success(message?: any, ...params: any[]): void {
    super.success(chalk.bgGreen(chalk.whiteBright(`[${this.prefix}]`)), message, ...params);
  }

  public warning(message?: any, ...params: any[]): void {
    super.warning(chalk.bgGreen(chalk.whiteBright(`[${this.prefix}]`)), message, ...params);
  }

  public error(message?: any, ...params: any[]): void {
    super.error(chalk.bgRed(chalk.whiteBright(`[${this.prefix}]`)), message, ...params);
  }

  public info(message?: any, ...params: any[]): void {
    super.info(chalk.bgBlack(chalk.whiteBright(`[${this.prefix}]`)), message, ...params);
  }

  public debug(message?: any, ...params: any[]): void {
    super.debug(chalk.bgBlack(chalk.whiteBright(`[${this.prefix}]`)), message, ...params);
  }

  public setPrefix(prefix: string): void {
    this.prefix = prefix;
  }
}
