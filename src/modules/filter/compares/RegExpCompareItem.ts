import IFilterCompareItem from "../interfaces/IFilterCompareItem"

export default class RegExpCompareItem implements IFilterCompareItem {
  isSupport(value: any): boolean {
    return value instanceof RegExp
  }

  compare(value: RegExp, compare: any, options: {[key: string]: any}): boolean {
    return value.test(compare)
  }
}
