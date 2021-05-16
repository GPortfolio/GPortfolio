import IFilterCompareItem from './interfaces/IFilterCompareItem';
import BooleanCompareItem from './compares/BooleanCompareItem';
import NumberCompareItem from './compares/NumberCompareItem';
import RegExpCompareItem from './compares/RegExpCompareItem';
import ArrayCompareItem from './compares/ArrayCompareItem';

export default class FilterCompare {
  compares: IFilterCompareItem[];

  constructor(compares: IFilterCompareItem[] | undefined = undefined) {
    this.compares = compares || this.defaultCompares()
  }

  compare(value: any, compare: any, options: {[key: string]: any}) {
    for (const compare of this.compares) {
      if (compare.isSupport(value)) {
        return compare.compare(value, compare, options)
      }
    }

    return value === compare
  }

  setCompares(compares: IFilterCompareItem[]): void {
    this.compares = compares
  }

  addCompare(compare: IFilterCompareItem): void {
    if (!this.compares.includes(compare)) {
      this.compares.push(compare)
    }
  }

  clearCompares(): void {
    this.compares = []
  }

  defaultCompares() {
    return [
      new ArrayCompareItem(),
      new BooleanCompareItem(),
      new NumberCompareItem(),
      new RegExpCompareItem(),
    ]
  }
}
