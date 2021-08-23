import { moment } from '../api/api';

const getSubjectTotals = (subject, measures) => {
  const sameSubjectMeasures = measures.filter((measure) => {
    const matchId = measure.subject_id === subject.id;
    const targetDate = moment(Number(measure.date));
    const thisMonth = targetDate.isSameOrBefore(moment()) && targetDate.isAfter(moment().subtract(1, 'months'));
    return matchId && thisMonth;
  });
  return sameSubjectMeasures.reduce((acm, track) => acm + track.result, 0);
};

export default getSubjectTotals;
