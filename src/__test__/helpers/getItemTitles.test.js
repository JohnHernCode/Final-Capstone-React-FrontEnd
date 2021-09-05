import getItemTitles from '../../helpers/getItemTitles';
import items from '../stories/items';
import tracks from '../stories/tracks';

describe('getItemTitles', () => {
  test('should return items titles corresponding each track', () => {
    const theDayTracks = tracks.filter((track) => track.date === tracks[0].date);
    const titles = getItemTitles(items, theDayTracks);
    const result = {
      1: 10, 2: 4, 3: 3, 4: 5, 5: 2, 6: 1,
    };
    expect(titles).toEqual(result);
  });
  test('should return default items object with empty strings', () => {
    const titles = getItemTitles(items);
    const result = {
      1: '', 2: '', 3: '', 4: '', 5: '', 6: '',
    };
    expect(titles).toEqual(result);
  });
});
