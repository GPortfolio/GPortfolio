import { getDeepByKey } from '../helpers/utils';
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
   * @param {*[]} arr
   * @return {*}
   */
  public run (arr: any[]): any {
    return arr.filter((item) => {
      for (const filter of this.filters) {
        const values = getDeepByKey(item, filter.attr.split('.'));
        const res = Filter.compare(filter.values, values, filter.more);

        if ((!res && !filter.revert) || (res && filter.revert)) {
          return false;
        }
      }

      return true;
    });
  }
}
