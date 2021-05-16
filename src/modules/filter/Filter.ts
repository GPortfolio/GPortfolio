import IFilterItem from './interfaces/IFilterItem';
import FilterCompare from './FilterCompare';
import ObjectUtils from '../../utils/ObjectUtils';

export default class Filter {
  filterCompare: FilterCompare

  constructor(filterCompare: FilterCompare | undefined = undefined) {
    this.filterCompare = filterCompare || new FilterCompare()
  }

  handle(filters: IFilterItem[][], arr: any[], separator: string = '.'): void {
    arr.filter((item) => {
      return filters.some((group) => {
        return group.every((filter) => {
          const values = ObjectUtils.deepKeyFromString(item, filter.attr, separator)
          const res = this.filterCompare.compare(filter.values, values, filter.options);

          return (res || filter.revert) && (!res || !filter.revert)
        })
      })
    })
  }
}
