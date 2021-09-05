import calcAchieveTotalRate from '../../helpers/calcAchieveTotalRate';
import tracks from '../stories/tracks';
import items from '../stories/items';

describe('calcAchieveTotalRate', () => {
  test('should return the total achievements rate for each day', () => {
    const sameDateTracks = tracks.filter((track) => track.date === tracks[0].date);
    const result = calcAchieveTotalRate(sameDateTracks, items.length);
    expect(result).toEqual(20);
  });

  test('should return 0 if the sameDateTracks is empty', () => {
    const result = calcAchieveTotalRate([], items.length);
    expect(result).toEqual(0);
  });
});
