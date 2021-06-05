import { injectable, multiInject } from 'inversify';
import IFilterCompareItem from './interfaces/IFilterCompareItem';
import { TYPES } from '../../types';

@injectable()
export default class FilterCompare {
  items: IFilterCompareItem[];

  constructor(@multiInject(TYPES.FilterCompareItems) items: IFilterCompareItem[] = []) {
    this.items = items;
  }

  compare(filterValue: any, input: any, options: { [key: string]: any }): boolean {
    const compareItem = this.items.find((item) => item.isSupport(filterValue));

    if (compareItem === undefined) {
      return this.defaultCompare(filterValue, input);
    }

    return compareItem.compare(filterValue, input, options);
  }

  private defaultCompare(filterValue: any, input: any) {
    if (Array.isArray(input)) {
      return input.some((item) => item === filterValue);
    }

    return filterValue === input;
  }
}
