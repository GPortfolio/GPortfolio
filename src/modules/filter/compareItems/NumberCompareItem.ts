import { injectable } from 'inversify';
import IFilterCompareItem from '../interfaces/IFilterCompareItem';

@injectable()
export default class NumberCompareItem implements IFilterCompareItem {
  isSupport(filterValue: any): boolean {
    return typeof filterValue === 'number';
  }

  compare(filterValue: number, input: any, options: { sign: string }): boolean {
    if (options.sign) {
      return this.compareBySign(filterValue, +input, options.sign);
    }

    return filterValue === +input;
  }

  protected compareBySign(filterValue: number, input: number, sign: string) {
    switch (sign) {
      case '>':
        return +input > filterValue;
      case '<':
        return +input < filterValue;
      case '>=':
        return +input >= filterValue;
      case '<=':
        return +input <= filterValue;
      default:
        throw new Error(`Sign ${sign} not support`);
    }
  }
}
