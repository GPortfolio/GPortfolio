import { getDeepByKey } from '../helpers/utils';

export default class Sort {

  private arr: any[];

  constructor (arr: any[]) {
    this.arr = arr;
  }

  /**
   * Sort array by ASC
   * @param {string} key
   * @return {void} self array change
   */
  public asc (key: string) {
    this.arr.sort(this.compareValues(key));
  }

  /**
   * Sort array by DESC
   * @param {string} key
   * @return {void} self array change
   */
  public desc (key: string) {
    this.arr.sort(this.compareValues(key, 'desc'));
  }

  /**
   * Comparing values for array.sort
   * @param {string} key
   * @param {string} order - asc|desc
   */
  private compareValues (key: string, order = 'asc') {
    const parts = key.split('.');
    const keysExceptLast = parts.slice(0, -1);
    const lastKey = parts[parts.length - 1];

    return (a: any, b: any) => {
      const objA = getDeepByKey(a, keysExceptLast);
      const objB = getDeepByKey(b, keysExceptLast);

      const varA = typeof objA[lastKey] === 'string' ? objA[lastKey].toUpperCase() : objA[lastKey];
      const varB = typeof objB[lastKey] === 'string' ? objB[lastKey].toUpperCase() : objB[lastKey];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }

      if (order === 'desc') {
        return comparison * -1;
      }

      return comparison;
    };
  }
}
