export default interface IFilterItem {
  attr: string
  values: any
  revert: boolean
  options: {
    sign: string
  } | undefined
}
