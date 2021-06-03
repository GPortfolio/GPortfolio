import { injectable } from 'inversify';
import IFilterCompareItem from '../interfaces/IFilterCompareItem';

@injectable()
export default class RegExpCompareItem implements IFilterCompareItem {
  isSupport(filterValue: any): boolean {
    return filterValue instanceof RegExp;
  }

  compare(filterValue: RegExp, input: any): boolean {
    return filterValue.test(input);
  }
}
