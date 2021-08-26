import getItemTotalResult from '../../helpers/getItemTotals';
import items from '../stories/items';
import tracks from '../stories/tracks';

describe('getItemTotalResult', () => {
  test('should return the total result for each item for last month', () => {
    const result = getItemTotalResult(items[0], tracks);
    expect(result).toEqual(10);
  });

  test('should return 0 if the items and tracks are empty arrays', () => {
    const result = getItemTotalResult([], []);
    expect(result).toEqual(0);
  });
});
