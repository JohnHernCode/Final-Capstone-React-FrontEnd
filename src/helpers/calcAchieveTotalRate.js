const calcAchieveTotalRate = (sameDateMeasurements, subjectNum) => {
  if (!sameDateMeasurements || !subjectNum) {
    return 0;
  }
  const totalMeasurementRates = sameDateMeasurements
      .reduce((acm, rec) => {
        const rate = rec.result / rec.target;
        return acm + ((rate >= 1 ? 1 : rate) * 100);
      }, 0);
  return Math.floor(totalMeasurementRates / subjectNum);
};

export default calcAchieveTotalRate;
