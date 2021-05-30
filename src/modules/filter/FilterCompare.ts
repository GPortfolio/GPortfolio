import { injectable, multiInject } from 'inversify';
import IFilterCompareItem from './interfaces/IFilterCompareItem';
import { TYPES } from '../../types';

@injectable()
export default class FilterCompare {
  items: IFilterCompareItem[];

  constructor(@multiInject(TYPES.FilterCompareItems) items: IFilterCompareItem[]) {
    this.items = items;
  }

  compare(value: any, compare: any, options: { [key: string]: any }): boolean {
    const compareItem = this.items.find((item) => item.isSupport(value));

    if (compareItem === undefined) {
      return value === compare;
    }

    return compareItem.compare(value, compare, options);
  }
}
