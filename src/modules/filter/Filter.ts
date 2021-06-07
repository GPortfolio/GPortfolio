import { inject, injectable } from 'inversify';
import IFilterItem from './interfaces/IFilterItem';
import FilterCompare from './FilterCompare';
import ObjectUtils from '../../utils/ObjectUtils';

@injectable()
export default class Filter {
  private filterCompare: FilterCompare;

  constructor(@inject(FilterCompare) filterCompare: FilterCompare) {
    this.filterCompare = filterCompare;
  }

  handle(arr: any[], filters: IFilterItem[][], separator = '.'): any[] {
    const groupFilters = filters.filter((group) => group.length);
    if (!groupFilters.length) {
      return arr;
    }

    return arr.filter((item) => groupFilters.some((group) => group.every((filter) => {
      const values = ObjectUtils.deepKeyFromString(item, filter.attr, separator);
      const res = this.filterCompare.compare(filter.values, values, filter.options || {});

      return (res || filter.revert) && (!res || !filter.revert);
    })));
  }
}
