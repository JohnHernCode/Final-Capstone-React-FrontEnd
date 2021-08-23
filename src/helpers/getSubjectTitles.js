const getSubjectTitles = (subjects, theDayMeasures = undefined) => {
  const titles = {};
  subjects.forEach((subject) => {
    // eslint-disable-next-line max-len
    const targetMeasure = theDayMeasures ? theDayMeasures.find((tr) => tr.subject_id === subject.id) : null;
    titles[subject.id] = targetMeasure ? targetMeasure.result : '';
  });
  return titles;
};

export default getSubjectTitles;
