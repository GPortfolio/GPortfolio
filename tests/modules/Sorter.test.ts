import Sorter from '../../src/modules/sorter/Sorter';

describe('Sorter module', () => {
  describe('ASC sorting', () => {
    it('single-level array', () => {
      const arr = [
        { a: 1, b: 4 },
        { a: 3, b: 5 },
        { a: 2, b: 6 },
      ];

      const sorter = new Sorter();
      sorter.asc(arr, 'a');

      expect(arr).toStrictEqual([
        { a: 1, b: 4 },
        { a: 2, b: 6 },
        { a: 3, b: 5 },
      ]);
    });

    it('multi-level array', () => {
      const arr = [
        { a: { b: 1 }, c: 6 },
        { a: { b: 3 }, c: 7 },
        { a: { b: 2 }, c: 8 },
      ];

      const sorter = new Sorter();
      sorter.asc(arr, 'a.b');

      expect(arr).toStrictEqual([
        { a: { b: 1 }, c: 6 },
        { a: { b: 2 }, c: 8 },
        { a: { b: 3 }, c: 7 },
      ]);
    });
  });

  describe('DESC sorting', () => {
    it('single-level array', () => {
      const arr = [
        { a: 1, b: 4 },
        { a: 3, b: 5 },
        { a: 2, b: 6 },
      ];

      const sorter = new Sorter();
      sorter.desc(arr, 'a');

      expect(arr).toStrictEqual([
        { a: 3, b: 5 },
        { a: 2, b: 6 },
        { a: 1, b: 4 },
      ]);
    });

    it('multi-level array', () => {
      const arr = [
        { a: { b: 1 }, c: 6 },
        { a: { b: 3 }, c: 7 },
        { a: { b: 2 }, c: 8 },
      ];

      const sorter = new Sorter();
      sorter.desc(arr, 'a.b');

      expect(arr).toStrictEqual([
        { a: { b: 3 }, c: 7 },
        { a: { b: 2 }, c: 8 },
        { a: { b: 1 }, c: 6 },
      ]);
    });
  });

  describe('Sorting by Rule', () => {
    it('ASC sort', () => {
      const arr = [
        { a: { b: 1 }, c: 6 },
        { a: { b: 3 }, c: 7 },
        { a: { b: 2 }, c: 8 },
      ];

      const sorter = new Sorter();
      sorter.sortByRule(arr, { sortByDesc: false, attr: 'a.b' });

      expect(arr).toStrictEqual([
        { a: { b: 1 }, c: 6 },
        { a: { b: 2 }, c: 8 },
        { a: { b: 3 }, c: 7 },
      ]);
    });

    it('DESC sort', () => {
      const arr = [
        { a: { b: 1 }, c: 6 },
        { a: { b: 3 }, c: 7 },
        { a: { b: 2 }, c: 8 },
      ];

      const sorter = new Sorter();
      sorter.sortByRule(arr, { sortByDesc: true, attr: 'a.b' });

      expect(arr).toStrictEqual([
        { a: { b: 3 }, c: 7 },
        { a: { b: 2 }, c: 8 },
        { a: { b: 1 }, c: 6 },
      ]);
    });
  });
});
