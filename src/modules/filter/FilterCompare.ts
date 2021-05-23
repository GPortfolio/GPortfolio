import IFilterCompareItem from './interfaces/IFilterCompareItem';
import BooleanCompareItem from './compares/BooleanCompareItem';
import NumberCompareItem from './compares/NumberCompareItem';
import RegExpCompareItem from './compares/RegExpCompareItem';
import ArrayCompareItem from './compares/ArrayCompareItem';

export default class FilterCompare {
  items: IFilterCompareItem[];

  constructor(items: IFilterCompareItem[] | undefined = undefined) {
    this.items = items || this.defaultCompares();
  }

  compare(value: any, compare: any, options: { [key: string]: any }) {
    for (const item of this.items) {
      if (item.isSupport(value)) {
        return item.compare(value, compare, options);
      }
    }

    return value === compare;
  }

  setCompareItems(items: IFilterCompareItem[]): void {
    this.items = items;
  }

  addCompareItem(item: IFilterCompareItem): void {
    if (!this.items.includes(item)) {
      this.items.push(item);
    }
  }

  clearCompareItems(): void {
    this.items = [];
  }

  defaultCompares() {
    return [
      new ArrayCompareItem(),
      new BooleanCompareItem(),
      new NumberCompareItem(),
      new RegExpCompareItem(),
    ];
  }
}
