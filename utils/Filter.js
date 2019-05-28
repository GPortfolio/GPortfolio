'use strict'

module.exports = class Filter {

  /**
   * @param {{attr: string, values: *, revert: boolean, more: *}[]} filters
   */
  constructor(filters) {
    this.filters = filters
  }

  /**
   * Filter is not empty
   * @return {boolean}
   */
  get has() {
    return !!this.filters.length
  }

  /**
   * Filter array by filters
   * @param {Array} arr
   * @return {*}
   * TODO deep attr ('owner.login' or 'license.key')
   */
  run(arr) {
    return arr.filter((item) => {
      for (const filter of this.filters) {
        console.log(filter.attr, filter.values, item[filter.attr])
        const res = Filter.compare(filter.values, item[filter.attr], filter.more)

        if ((!res && !filter.revert) || (res && filter.revert)) {
          return false
        }
      }

      return true
    })
  }

  /**
   * Compare value by type
   * @param filterValue
   * @param compareValue
   * @param more
   * @return {boolean}
   * TODO support pattern type
   */
  static compare(filterValue, compareValue, more = null) {
    switch (typeof filterValue) {
    case 'boolean':
      return !!filterValue === !!compareValue
    case 'object':
      if (Array.isArray(filterValue)) {
        return filterValue.includes(compareValue)
      }
      // Not support
      return false
    case 'number':
      switch (more) {
      case '>':
        return +filterValue > +compareValue
      case '<':
        return +filterValue < +compareValue
      case '>=':
        return +filterValue >= +compareValue
      case '<=':
        return +filterValue <= +compareValue
      default:
        return +filterValue === +compareValue
      }
    default:
      return filterValue === compareValue
    }
  }
}
