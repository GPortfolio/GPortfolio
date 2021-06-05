import { injectable } from 'inversify';
import IFilterCompareItem from '../interfaces/IFilterCompareItem';

@injectable()
export default class BooleanCompareItem implements IFilterCompareItem {
  isSupport(filterValue: any): boolean {
    return typeof filterValue === 'boolean';
  }

  compare(filterValue: boolean, input: any): boolean {
    if (Array.isArray(input)) {
      return this.compareMultiple(filterValue, input);
    }

    return filterValue === !!input;
  }

  private compareMultiple(filterValue: boolean, input: any[]): boolean {
    if (!input.length) {
      return true;
    }

    return input.some((item) => filterValue === !!item);
  }
}
