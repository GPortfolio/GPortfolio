export default class ObjectUtils {
  static isObject(value: any): boolean {
    return value && value.constructor === Object;
  }

  static deepKeyFromString(data: any, keys: string, separator: string = '.'): any {
    return ObjectUtils.deepKey(data, keys.split(separator));
  }

  static deepKeyFromArray(data: any, keys: string[]): any {
    return ObjectUtils.deepKey(data, keys);
  }

  static deepMerge(target: any, ...sources: any[]): any {
    if (!sources.length) {
      return target;
    }

    const source = sources.shift();

    if (ObjectUtils.isObject(target) && ObjectUtils.isObject(source)) {
      for (const key in source) {
        if (ObjectUtils.isObject(source[key])) {
          if (!target[key]) {
            Object.assign(target, { [key]: {} });
          }

          ObjectUtils.deepMerge(target[key], source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }

    return ObjectUtils.deepMerge(target, ...sources);
  }

  /**
   * @example
   *  obj - { foo: { foo2: 'bar' } }
   *  keys - 'foo.foo2'
   *  result - 'bar'
   */
  protected static deepKey(data: any, keys: string[], deep: number = 0): any {
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
