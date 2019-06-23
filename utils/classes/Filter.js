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
  get exists() {
    return !!this.filters.length
  }

  /**
   * Filter array by filters
   * @param {Array} arr
   * @return {*}
   */
  run(arr) {
    return arr.filter((item) => {
      for (const filter of this.filters) {
        const values = Filter.getDeepByKey(item, filter.attr.split('.'))
        const res = Filter.compare(filter.values, values, filter.more)

        if ((!res && !filter.revert) || (res && filter.revert)) {
          return false
        }
      }

      return true
    })
  }

  /**
   * Get deep value from object
   * @param {object} obj
   * @param {array} keys
   * @param {number} deep
   *  attr, deep.attr
   * @return {*}
   */
  static getDeepByKey(obj, keys, deep = 0) {
    const val = obj[keys[deep]]

    if (val && typeof val === 'object') {
      return Filter.getDeepByKey(val, keys, deep + 1)
    }

    return val
  }

  /**
   * Compare value by type
   * @param filterValue
   * @param compareValue
   * @param more
   * @return {boolean}
   */
  static compare(filterValue, compareValue, more = null) {
    switch (typeof filterValue) {
    case 'boolean':
      return !!filterValue === !!compareValue
    case 'object':
      if (Array.isArray(filterValue)) {
        return filterValue.includes(compareValue)
      }
      if (filterValue instanceof RegExp) {
        return filterValue.test(compareValue)
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
