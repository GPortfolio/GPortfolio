/**
 * Get deep value from object
 * @param {any} data
 * @param {array} keys
 * @param {number} deep
 * @return {any} undefined - not found
 * @example
 *  obj - { foo: { foo2: 'bar' } }
 *  keys - 'foo.foo2'
 *  result - 'bar'
 */
export function getDeepByKey (data: any, keys: string[], deep: number = 0): any {
  if (! isObject(data)) {
    return undefined;
  }

  const val = data[keys[deep]];

  if (isObject(val)) {
    return getDeepByKey(val, keys, deep + 1);
  }

  if (keys.length !== deep + 1) {
    return undefined;
  }

  return val;
}

/**
 * Value is an object
 * @param {any} val
 * @return {boolean}
 */
function isObject (val: any): boolean {
  return (!!val) && (val.constructor === Object);
}