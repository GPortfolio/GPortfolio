import { injectable } from 'inversify';
import ILogger from './interfaces/ILogger';

@injectable()
export default class ConsoleLogger implements ILogger {
  public log(message?: any, ...params: any[]): void {
    console.log(message, ...params);
  }

  public warning(message?: any, ...params: any[]): void {
    console.warn(message, ...params);
  }

  public error(message?: any, ...params: any[]): void {
    console.error(message, ...params);
  }

  public info(message?: any, ...params: any[]): void {
    console.info(message, ...params);
  }

  public debug(message?: any, ...params: any[]): void {
    console.debug(message, ...params);
  }
}
