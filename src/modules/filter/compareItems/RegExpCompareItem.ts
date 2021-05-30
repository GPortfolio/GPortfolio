import { injectable } from 'inversify';
import IFilterCompareItem from '../interfaces/IFilterCompareItem';

@injectable()
export default class RegExpCompareItem implements IFilterCompareItem {
  isSupport(value: any): boolean {
    return value instanceof RegExp;
  }

  compare(value: RegExp, compare: any): boolean {
    return value.test(compare);
  }
}
