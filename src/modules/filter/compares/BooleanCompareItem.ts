import IFilterCompareItem from '../interfaces/IFilterCompareItem';

export default class BooleanCompareItem implements IFilterCompareItem {
  isSupport(value: any): boolean {
    return typeof value === 'boolean';
  }

  compare(value: boolean, compare: any, options: { [key: string]: any }): boolean {
    return value === !!compare;
  }
}
