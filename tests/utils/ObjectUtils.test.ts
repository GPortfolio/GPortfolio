import ObjectUtils from '../../src/utils/ObjectUtils';

describe('ObjectUtils', () => {
  describe('isObject', () => {
    it('null', () => {
      expect(ObjectUtils.isObject(null)).toBeFalsy();
    });

    it('{}', () => {
      expect(ObjectUtils.isObject({})).toBeTruthy();
    });

    it('undefined', () => {
      expect(ObjectUtils.isObject(undefined)).toBeFalsy();
    });

    it('scalar types', () => {
      expect(ObjectUtils.isObject(123)).toBeFalsy();
      expect(ObjectUtils.isObject('123')).toBeFalsy();
    });
  });

  describe('deepKey', () => {
    it('get from single object', () => {
      const val = ObjectUtils.deepKeyFromString({ a: 3 }, 'a');

      expect(val).toBe(3);
    });

    it('get from deep object', () => {
      const val = ObjectUtils.deepKeyFromString({ a: 3, b: { c: 4 } }, 'b.c');

      expect(val).toBe(4);
    });

    it('get non-exist property from object', () => {
      const val = ObjectUtils.deepKeyFromString({ a: 3, b: { c: 4 } }, 'c.a');

      expect(val).toBeUndefined();
    });

    it('get from object as number[]', () => {
      const val = ObjectUtils.deepKeyFromArray({ 2: 3 }, [2]);

      expect(val).toBe(3);
    });

    it('get from array', () => {
      const val = ObjectUtils.deepKeyFromString([1, 2, 3], '1');

      expect(val).toBe(2);
    });

    it('get from array as number[]', () => {
      const val = ObjectUtils.deepKeyFromArray([1, 2, 3], [1]);

      expect(val).toBe(2);
    });

    it('get from array as string[]', () => {
      const val = ObjectUtils.deepKeyFromArray([1, 2, 3], ['1']);

      expect(val).toBe(2);
    });

    it('get non-exists key from array', () => {
      const val = ObjectUtils.deepKeyFromString([1, 2, 3], '10');

      expect(val).toBeUndefined();
    });

    it('complex data', () => {
      const val = ObjectUtils.deepKeyFromString({
        a: [2, 3, {
          b: {
            c: [6, 7],
          },
        }],
      }, 'a.2.b.c.1');

      expect(val).toBe(7);
    });

    it('empty keys to string', () => {
      const val = ObjectUtils.deepKeyFromString({ a: 1 }, '');

      expect(val).toStrictEqual({ a: 1 });
    });

    it('empty keys to array', () => {
      const val = ObjectUtils.deepKeyFromArray({ a: 1 }, []);

      expect(val).toStrictEqual({ a: 1 });
    });
  });

  describe('deepMerge', () => {
    it('simple merge', () => {
      const target = { a: 1, b: 2 };
      ObjectUtils.deepMerge(target, { a: 3 });
      expect(target).toStrictEqual({ a: 3, b: 2 });
    });

    it('replace value with type', () => {
      const target = { a: 1, b: [2, 3, 4] };
      ObjectUtils.deepMerge(target, { b: 5 });
      expect(target).toStrictEqual({ a: 1, b: 5 });
    });

    it('replace in deep object', () => {
      const target = { a: 1, b: { c: 5 } };
      ObjectUtils.deepMerge(target, { b: { c: 6 } });
      expect(target).toStrictEqual({ a: 1, b: { c: 6 } });
    });

    it('append new values to object', () => {
      const target = { a: 1, b: { c: 2 } };
      ObjectUtils.deepMerge(target, { b: { f: 7 }, k: 3 });
      expect(target).toStrictEqual({ a: 1, b: { c: 2, f: 7 }, k: 3 });
    });
  });
});
