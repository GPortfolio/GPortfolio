import { getDeepByKey } from './utils';

/**
 * Comparing values for array.sort
 * @param {string} key
 * @param {string} order - asc|desc
 */
function compareValues(key: string, order: string = 'asc') {
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

export default {
  /**
   * Sort array by ASC
   * @param {array} arr
   * @param {string} key
   * @return {void} self array change
   */
  asc(arr: any[], key: string) {
    arr.sort(compareValues(key));
  },

  /**
   * Sort array by DESC
   * @param {array} arr
   * @param {string} key
   * @return {void} self array change
   */
  desc(arr: any[], key: string) {
    arr.sort(compareValues(key, 'desc'));
  },
};
