import IFilterCompareItem from '../interfaces/IFilterCompareItem';

export default class NumberCompareItem implements IFilterCompareItem {
  isSupport(value: any): boolean {
    return typeof value === 'number';
  }

  compare(value: number, compare: any, options: { sign: string }): boolean {
    if (options.sign) {
      return this.compareBySign(value, +compare, options.sign);
    }

    return value === +compare;
  }

  protected compareBySign(value: number, compare: number, sign: string) {
    switch (sign) {
      case '>':
        return value > +compare;
      case '<':
        return value < +compare;
      case '>=':
        return value >= +compare;
      case '<=':
        return value <= +compare;
      default:
        throw new Error(`Sign ${sign} not support`);
    }
  }
}
