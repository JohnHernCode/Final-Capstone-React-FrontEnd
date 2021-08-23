import { moment } from '../api/api';

const calcAvgAchieveRate = (cMeasureDates, measures) => {
  const arrForAchieveRateForMonth = [];
  cMeasureDates.forEach((measureDate) => {
    const sameDateMeasures = measures.filter((measure) => measure.date === measureDate);
    const totalRatesForDay = sameDateMeasures
      .reduce((acm, rec) => {
        const rate = rec.result / rec.target;
        return acm + ((rate >= 1 ? 1 : rate) * 100);
      }, 0);
    const achieveRateForDay = totalRatesForDay / sameDateMeasures.length;
    arrForAchieveRateForMonth.push(achieveRateForDay);
  });
  const totalRatesForMonth = arrForAchieveRateForMonth.reduce((accum, rate) => accum + rate, 0);
  return Math.floor(totalRatesForMonth / arrForAchieveRateForMonth.length);
};

// Avg achievements rate for the last 30 days
const getAvgAchieveRateForMonth = (measureDates, measures) => {
  const today = moment();
  const oneMonthAgo = moment().subtract(1, 'months');
  const cMeasureDates = measureDates
    .filter((measure) => {
      const targetMeasure = moment(Number(measure));
      return targetMeasure.isSameOrBefore(today) && targetMeasure.isAfter(oneMonthAgo);
    });
  return calcAvgAchieveRate(cMeasureDates, measures);
};

// Avg achievements rate for the this week => today - 1 week ago
const getAvgAchieveRateForThisWeek = (measureDates, measures) => {
  const today = moment();
  const oneWeekAgo = moment().subtract(1, 'weeks');
  const cMeasureDates = measureDates
    .filter((measure) => {
      const targetMeasure = moment(Number(measure));
      return targetMeasure.isSameOrBefore(today) && targetMeasure.isAfter(oneWeekAgo);
    });
  return calcAvgAchieveRate(cMeasureDates, measures);
};

// Avg achievements rate for the last week => 1 week ago - 2 week ago
const getAvgAchieveRateForLastWeek = (measureDates, measures) => {
  const oneWeekAgo = moment().subtract(1, 'weeks');
  const twoWeeksAgo = moment().subtract(2, 'weeks');
  const cMeasureDates = measureDates
    .filter((measure) => {
      const targetMeasure = moment(Number(measure));
      return targetMeasure.isSameOrBefore(oneWeekAgo) && targetMeasure.isAfter(twoWeeksAgo);
    });
  return calcAvgAchieveRate(cMeasureDates, measures);
};

// Avg achievements rate for the last week => 2 weeks ago - 3 week ago
const getAvgAchieveRateForTwoWeeksBefore = (measureDates, measures) => {
  const twoWeeksAgo = moment().subtract(2, 'weeks');
  const threeWeeksAgo = moment().subtract(3, 'weeks');
  const cMeasureDates = measureDates
    .filter((measure) => {
      const targetMeasure = moment(Number(measure));
      return targetMeasure.isSameOrBefore(twoWeeksAgo) && targetMeasure.isAfter(threeWeeksAgo);
    });
  return calcAvgAchieveRate(cMeasureDates, measures);
};

// Avg achievements rate for the last week => 3 weeks ago - 1 month ago
const getAvgAchieveRateForThreeWeeksBefore = (measureDates, measures) => {
  const threeWeeksAgo = moment().subtract(3, 'weeks');
  const oneMonthAgo = moment().subtract(1, 'months');
  const cMeasureDates = measureDates
    .filter((measure) => {
      const targetMeasure = moment(Number(measure));
      return targetMeasure.isSameOrBefore(threeWeeksAgo) && targetMeasure.isAfter(oneMonthAgo);
    });
  return calcAvgAchieveRate(cMeasureDates, measures);
};

// Avg achievements rate for the last month =>  1 month ago - 2 month ago
const getAvgAchieveRateForLastMonth = (measureDates, measures) => {
  const oneMonthAgo = moment().subtract(1, 'months');
  const twoMonthsAgo = moment().subtract(2, 'months');
  const cMeasureDates = measureDates
    .filter((measure) => {
      const targetMeasure = moment(Number(measure));
      return targetMeasure.isSameOrBefore(oneMonthAgo) && targetMeasure.isAfter(twoMonthsAgo);
    });
  return calcAvgAchieveRate(cMeasureDates, measures);
};

const getAvgRate = (measureDates, measures, type) => {
  switch (type) {
    case 'THIS_MONTH':
      return getAvgAchieveRateForMonth(measureDates, measures);
    case 'THIS_WEEK':
      return getAvgAchieveRateForThisWeek(measureDates, measures);
    case 'LAST_WEEK':
      return getAvgAchieveRateForLastWeek(measureDates, measures);
    case 'TWO_WEEKS_BEFORE':
      return getAvgAchieveRateForTwoWeeksBefore(measureDates, measures);
    case 'THREE_WEEKS_BEFORE':
      return getAvgAchieveRateForThreeWeeksBefore(measureDates, measures);
    case 'LAST_MONTH':
      return getAvgAchieveRateForLastMonth(measureDates, measures);

    default:
      return 0;
  }
};

export default getAvgRate;
