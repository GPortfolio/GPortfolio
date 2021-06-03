import { injectable } from 'inversify';
import IFilterCompareItem from '../interfaces/IFilterCompareItem';

@injectable()
export default class BooleanCompareItem implements IFilterCompareItem {
  isSupport(filterValue: any): boolean {
    return typeof filterValue === 'boolean';
  }

  compare(filterValue: boolean, compare: any): boolean {
    if (Array.isArray(compare)) {
      return this.compareMultiple(filterValue, compare);
    }

    return filterValue === !!compare;
  }

  private compareMultiple(filterValue: boolean, compare: any[]) {
    return compare.some((c) => filterValue === !!c);
  }
}
