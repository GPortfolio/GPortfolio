export default interface ILogger {
  success(message?: any, ...params: any[]): void

  warning(message?: any, ...params: any[]): void

  error(message?: any, ...params: any[]): void

  info(message?: any, ...params: any[]): void

  debug(message?: any, ...params: any[]): void
}
