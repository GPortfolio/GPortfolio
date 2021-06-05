export default class StringUtils {
  static ltrim(str: string, symbol: string): string {
    return str[0] === symbol
      ? str.substring(1)
      : str;
  }

  static rtrim(str: string, symbol: string): string {
    return str[str.length - 1] === symbol
      ? str.substring(0, str.length - 1)
      : str;
  }
}
