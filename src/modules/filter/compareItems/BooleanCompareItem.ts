import { injectable } from 'inversify';
import IFilterCompareItem from '../interfaces/IFilterCompareItem';

@injectable()
export default class BooleanCompareItem implements IFilterCompareItem {
  isSupport(value: any): boolean {
    return typeof value === 'boolean';
  }

  compare(value: boolean, compare: any): boolean {
    return value === !!compare;
  }
}
