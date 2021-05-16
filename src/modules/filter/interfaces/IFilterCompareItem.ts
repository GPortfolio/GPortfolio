export default interface IFilterCompareItem {
  isSupport(value: any): boolean

  compare(value: any, compare: any, options: { [key: string]: any }): boolean
}
