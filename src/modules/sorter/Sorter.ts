import { injectable } from 'inversify';
import ObjectUtils from '../../utils/ObjectUtils';
import ISorterItem from './interfaces/ISorterItem';

@injectable()
export default class Sorter {
  sortByRule(arr: { [key: string]: any }[], rule: ISorterItem): void {
    if (rule.sortByDesc) {
      this.desc(arr, rule.attr);
    } else {
      this.asc(arr, rule.attr);
    }
  }

  asc(arr: { [key: string]: any }[], key: string, separator = '.'): void {
    arr.sort(this.compareValues(key, false, separator));
  }

  desc(arr: { [key: string]: any }[], key: string, separator = '.'): void {
    arr.sort(this.compareValues(key, true, separator));
  }

  protected compareValues(key: string, orderByDesc = false, separator = '.') {
    const parts = key.split(separator);
    const keysExceptLast = parts.slice(0, -1);
    const lastKey = parts[parts.length - 1];

    return (a: any, b: any) => {
      const objA = ObjectUtils.deepKeyFromArray(a, keysExceptLast);
      const objB = ObjectUtils.deepKeyFromArray(b, keysExceptLast);

      const varA = typeof objA[lastKey] === 'string' ? objA[lastKey].toUpperCase() : objA[lastKey];
      const varB = typeof objB[lastKey] === 'string' ? objB[lastKey].toUpperCase() : objB[lastKey];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }

      if (orderByDesc) {
        comparison *= -1;
      }

      return comparison;
    };
  }
}
