export default class StringUtils {
  static removeLastSymbolIfPresent(str: string, symbol: string): string {
    return str[str.length - 1] === symbol
      ? str.substring(0, str.length - 1)
      : str;
  }
}
