import Filter from '../../src/modules/filter/Filter';
import FilterCompare from '../../src/modules/filter/FilterCompare';
import ArrayCompareItem from '../../src/modules/filter/compareItems/ArrayCompareItem';
// import BooleanCompareItem from '../../src/modules/filter/compareItems/BooleanCompareItem';
// import NumberCompareItem from '../../src/modules/filter/compareItems/NumberCompareItem';
// import RegExpCompareItem from '../../src/modules/filter/compareItems/RegExpCompareItem';

describe('Filter module', () => {
  describe('Different input', () => {
    it('array', () => {
      const filter = new Filter(new FilterCompare());

      const result = filter.handle([
        { a: [1, 2, 3] },
        { a: [1, 2] },
        { b: [2, 3] },
      ], [
        [
          {
            values: 1, attr: 'a', revert: false, options: { sign: '' },
          },
        ],
      ]);

      expect(result).toStrictEqual([
        { a: [1, 2, 3] },
        { a: [1, 2] },
      ]);
    });
  });

  describe('Compare Items', () => {
    describe('ArrayCompareItem', () => {
      it('Single value', () => {
        const filter = new Filter(new FilterCompare([
          new ArrayCompareItem(),
        ]));

        const result = filter.handle([
          { a: 1, b: 2 },
          { a: 1, b: 3, c: 6 },
          { b: 4, c: 5 },
        ], [
          [
            {
              values: [1], attr: 'a', revert: false, options: { sign: '' },
            },
          ],
        ]);

        expect(result).toStrictEqual([
          { a: 1, b: 2 },
          { a: 1, b: 3, c: 6 },
        ]);
      });

      it('Multiple values', () => {
        const filter = new Filter(new FilterCompare([
          new ArrayCompareItem(),
        ]));

        const result = filter.handle([
          { a: 1, b: 2 },
          { a: 1, b: 3, c: 6 },
          { a: 4, b: 4, c: 5 },
        ], [
          [
            {
              values: [1, 4], attr: 'a', revert: false, options: { sign: '' },
            },
          ],
        ]);

        expect(result).toStrictEqual([
          { a: 1, b: 2 },
          { a: 1, b: 3, c: 6 },
          { a: 4, b: 4, c: 5 },
        ]);
      });

      it('Multiple values on array input', () => {
        const filter = new Filter(new FilterCompare([
          new ArrayCompareItem(),
        ]));

        const result = filter.handle([
          { a: [1, 2, 3, 4, 5] },
          { a: [1, 4, 5] },
          { a: [2, 3, 4] },
          { a: [3, 5] },
        ], [
          [
            {
              values: [3, 5], attr: 'a', revert: false, options: { sign: '' },
            },
          ],
        ]);

        expect(result).toStrictEqual([
          { a: [1, 2, 3, 4, 5] },
          { a: [3, 5] },
        ]);
      });
    });
  });

  describe('Basic compare', () => {
    it('Filter by number value', () => {
      const filter = new Filter(new FilterCompare());

      const result = filter.handle([
        { a: 1, b: 1 },
        { a: 1, b: 2 },
        { b: 2, c: 3 },
      ], [
        [
          {
            values: 1, attr: 'a', revert: false, options: { sign: '' },
          },
        ],
      ]);

      expect(result).toStrictEqual([
        { a: 1, b: 1 },
        { a: 1, b: 2 },
      ]);
    });

    it('Filter by string value', () => {
      const filter = new Filter(new FilterCompare());

      const result = filter.handle([
        { a: '1', b: '1' },
        { a: '1', b: '2' },
        { b: '2', c: '3' },
      ], [
        [
          {
            values: '1', attr: 'a', revert: false, options: { sign: '' },
          },
        ],
      ]);

      expect(result).toStrictEqual([
        { a: '1', b: '1' },
        { a: '1', b: '2' },
      ]);
    });

    it('Filter using revert', () => {
      const filter = new Filter(new FilterCompare());

      const result = filter.handle([
        { a: 1, b: 1 },
        { a: 1, b: 2 },
        { b: 2, c: 3 },
      ], [
        [
          {
            values: 1, attr: 'a', revert: true, options: { sign: '' },
          },
        ],
      ]);

      expect(result).toStrictEqual([
        { b: 2, c: 3 },
      ]);
    });
  });

  describe('Conditions', () => {
    it('OR', () => {
      const filter = new Filter(new FilterCompare());

      const result = filter.handle([
        { a: 1, b: 1 },
        { a: 1, b: 2 },
        { b: 2, c: 3 },
      ], [
        [
          {
            values: 1, attr: 'a', revert: false, options: { sign: '' },
          },
        ],
        [
          {
            values: 3, attr: 'c', revert: false, options: { sign: '' },
          },
        ],
      ]);

      expect(result).toStrictEqual([
        { a: 1, b: 1 },
        { a: 1, b: 2 },
        { b: 2, c: 3 },
      ]);
    });

    it('AND', () => {
      const filter = new Filter(new FilterCompare());

      const result = filter.handle([
        { a: 1, b: 1 },
        { a: 1, b: 2 },
        { b: 2, c: 3 },
      ], [
        [
          {
            values: 1, attr: 'a', revert: false, options: { sign: '' },
          },
          {
            values: 1, attr: 'b', revert: false, options: { sign: '' },
          },
        ],
      ]);

      expect(result).toStrictEqual([
        { a: 1, b: 1 },
      ]);
    });
  });
});
