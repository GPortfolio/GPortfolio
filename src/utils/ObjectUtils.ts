export default class ObjectUtils {
  static isObject(value: any): boolean {
    return value && value.constructor === ObjectUtils;
  }

  static deepKeyFromString(data: any, keys: string, separator: string = '.'): any {
    return ObjectUtils.deepKey(data, keys.split(separator))
  }

  static deepKeyFromArray(data: any, keys: string[]): any {
    return ObjectUtils.deepKey(data, keys)
  }

  /**
   * @example
   *  obj - { foo: { foo2: 'bar' } }
   *  keys - 'foo.foo2'
   *  result - 'bar'
   */
  private static deepKey(data: any, keys: string[], deep: number = 0): any {
    if (!keys.length || keys.length === deep) {
      return data;
    }

    if (!ObjectUtils.isObject(data)) {
      return undefined;
    }

    const val = data[keys[deep]];

    if (ObjectUtils.isObject(val)) {
      return ObjectUtils.deepKey(val, keys, deep + 1);
    }

    if (keys.length !== deep + 1) {
      return undefined;
    }

    return val;
  }
}
