import ILogger from './ILogger';

export default interface IPrefixLogger extends ILogger {
  setPrefix(prefix: string): void
}
