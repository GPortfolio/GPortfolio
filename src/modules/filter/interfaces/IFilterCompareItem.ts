export default interface IFilterCompareItem {
  isSupport(filterValue: any): boolean

  compare(filterValue: any, input: any, options: { [key: string]: any }): boolean
}
