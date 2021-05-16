import ObjectUtils from '../../utils/ObjectUtils';

export default class Sorter {
  static asc(arr: any[], key: string, separator: string = '.') {
    arr.sort(Sorter.compareValues(key, false, separator));
  }

  static desc(arr: any[], key: string, separator: string = '.') {
    arr.sort(Sorter.compareValues(key, true, separator));
  }

  static compareValues(key: string, orderByDesc: boolean = false, separator: string = '.') {
    const parts = key.split(separator);
    const keysExceptLast = parts.slice(0, -1);
    const lastKey = parts[parts.length - 1];

    return (a: any, b: any) => {
      const objA = ObjectUtils.deepKeyFromArray(a, keysExceptLast);
      const objB = ObjectUtils.deepKeyFromArray(b, keysExceptLast);

      const varA = typeof objA[lastKey] === 'string' ? objA[lastKey].toUpperCase() : objA[lastKey];
      const varB = typeof objB[lastKey] === 'string' ? objB[lastKey].toUpperCase() : objB[lastKey];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }

      if (orderByDesc) {
        comparison *= -1;
      }

      return comparison;
    };
  }
}
