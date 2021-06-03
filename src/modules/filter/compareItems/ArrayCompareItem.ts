import { injectable } from 'inversify';
import IFilterCompareItem from '../interfaces/IFilterCompareItem';

@injectable()
export default class ArrayCompareItem implements IFilterCompareItem {
  isSupport(filterValue: any): boolean {
    return Array.isArray(filterValue);
  }

  compare(filterValue: any[], compare: any): boolean {
    if (Array.isArray(compare)) {
      return this.compareMultiple(filterValue, compare);
    }

    return filterValue.includes(compare);
  }

  private compareMultiple(filterValue: any[], compare: any[]) {
    const map = new Map();

    compare.forEach((c) => map.set(c, true));

    return filterValue.every((fv) => map.has(fv));
  }
}
