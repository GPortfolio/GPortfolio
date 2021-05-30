export default class ObjectUtils {
  static isObject(value: any): boolean {
    return value && value.constructor === Object;
  }

  static deepKeyFromString(data: any, keys: string, separator = '.'): any {
    if (!keys) {
      return data;
    }

    return ObjectUtils.deepKey(data, keys.split(separator));
  }

  static deepKeyFromArray(data: any, keys: number[]|string[]): any {
    return ObjectUtils.deepKey(data, keys);
  }

  static deepMerge(target: { [key: string]: any }, source: { [key: string]: any }): void {
    Object.keys(source).forEach((key) => {
      if (ObjectUtils.isObject(source[key])) {
        if (!ObjectUtils.isObject(target[key])) {
          Object.assign(target, { [key]: {} });
        }

        ObjectUtils.deepMerge(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    });
  }

  /**
   * @example
   *  data - { foo: { foo2: 'bar' } }
   *  keys - 'foo.foo2'
   *  return - 'bar'
   */
  protected static deepKey(data: any, keys: number[]|string[], deep = 0): any {
    if (keys.length === deep) {
      return data;
    }

    if (Array.isArray(data)) {
      return ObjectUtils.deepKey(data[+keys[deep]], keys, deep + 1);
    }

    if (!ObjectUtils.isObject(data)) {
      return undefined;
    }

    return ObjectUtils.deepKey(data[keys[deep]], keys, deep + 1);
  }
}
