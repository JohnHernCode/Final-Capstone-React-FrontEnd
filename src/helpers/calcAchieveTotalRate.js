const calcAchieveTotalRate = (sameDateMeasures, subjectNum) => {
  if (!sameDateMeasures || !subjectNum) {
    return 0;
  }
  const totalMeasureRates = sameDateMeasures
    .reduce((acm, rec) => {
      const rate = rec.result / rec.target;
      return acm + ((rate >= 1 ? 1 : rate) * 100);
    }, 0);
  return Math.floor(totalMeasureRates / subjectNum);
};

export default calcAchieveTotalRate;
