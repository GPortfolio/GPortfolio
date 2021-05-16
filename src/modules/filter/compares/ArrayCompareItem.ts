import IFilterCompareItem from "../interfaces/IFilterCompareItem"

export default class ArrayCompareItem implements IFilterCompareItem {
  isSupport(value: any): boolean {
    return Array.isArray(value)
  }

  compare(value: any[], compare: any, options: {[key: string]: any}): boolean {
    return value.includes(compare)
  }
}
