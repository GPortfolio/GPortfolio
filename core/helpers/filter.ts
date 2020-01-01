import { IFilter } from '@i/IFilter';
import { getDeepByKey } from './utils';

/**
 * Compare value by type
 * @return {boolean}
 */
function compare(filterValue: any, compareValue: string, more = ''): boolean {
  switch (typeof filterValue) {
    case 'boolean':
      return filterValue === !!compareValue;
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

/**
 * Filter array by filters
 */
export default (filters: IFilter[], arr: any[]): any => arr.filter((item) => filters.every((f) => {
  const values = getDeepByKey(item, f.attr.split('.'));
  const res = compare(f.values, values, f.more);

  return (res || f.revert) && (!res || !f.revert);
}));
