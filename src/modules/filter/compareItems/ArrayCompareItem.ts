import { injectable } from 'inversify';
import IFilterCompareItem from '../interfaces/IFilterCompareItem';

@injectable()
export default class ArrayCompareItem implements IFilterCompareItem {
  isSupport(value: any): boolean {
    return Array.isArray(value);
  }

  compare(value: any[], compare: any): boolean {
    return value.includes(compare);
  }
}
