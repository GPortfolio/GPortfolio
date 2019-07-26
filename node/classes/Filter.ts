import { IFilter } from '../interfaces/IFilter';

export default class Filter {

  /**
   * Filter is not empty
   * @return {boolean}
   */
  get exists (): boolean {
    return !!this.filters.length;
  }

  /**
   * Get deep value from object
   * @param {object} obj
   * @param {array} keys
   * @param {number} deep
   * @return {*}
   * @example
   *  obj - { foo: { foo2: 'bar' } }
   *  keys - 'foo.foo2'
   *  result - 'bar'
   */
  public static getDeepByKey (obj: any, keys: any[], deep: number = 0): any {
    const val = obj[keys[deep]];

    if (val && typeof val === 'object') {
      return Filter.getDeepByKey(val, keys, deep + 1);
    }

    return val;
  }

  /**
   * Compare value by type
   * @return {boolean}
   */
  public static compare (filterValue: any, compareValue: string, more = ''): boolean {
    switch (typeof filterValue) {
    case 'boolean':
      return !!filterValue === !!compareValue;
    case 'object':
      if (Array.isArray(filterValue)) {
        return filterValue.includes(compareValue);
      }
      if (filterValue instanceof RegExp) {
        return filterValue.test(compareValue);
      }
      // Not support
      return false;
    case 'number':
      switch (more) {
      case '>':
        return +filterValue > +compareValue;
      case '<':
        return +filterValue < +compareValue;
      case '>=':
        return +filterValue >= +compareValue;
      case '<=':
        return +filterValue <= +compareValue;
      default:
        return +filterValue === +compareValue;
      }
    default:
      return filterValue === compareValue;
    }
  }

  public filters: IFilter[];

  constructor (filters: IFilter[]) {
    this.filters = filters;
  }

  /**
   * Filter array by filters
   * @param {any[]} arr
   * @return {*}
   */
  public run (arr: any[]): any {
    return arr.filter((item) => {
      for (const filter of this.filters) {
        const values = Filter.getDeepByKey(item, filter.attr.split('.'));
        const res = Filter.compare(filter.values, values, filter.more);

        if ((!res && !filter.revert) || (res && filter.revert)) {
          return false;
        }
      }

      return true;
    });
  }
}
