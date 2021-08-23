import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Chart from 'react-google-charts';
import pluralize from 'pluralize';
import getAvgRate from '../helpers/getRate';
import getSubjectTotals from '../helpers/getSubjectTotals';
import { getMeasures } from '../helpers/restMeasures';
import { addMeasures } from '../actions/measures';
import { addMeasureDates } from '../actions/measureDates';
import { getSubjects } from '../helpers/restSubjects';
import addSubjects from '../actions/subjects';

const Progress = ({
  addMeasures, loginUser, addMeasureDates, measureDates, measures, subjects, addSubjects,
}) => {
  const [error, setError] = useState('');

  const runGetSubjects = async () => {
    try {
      const response = await getSubjects();
      if (response.length > 0) {
        setError('');
        addSubjects(response);
      } else {
        setError('No Subjects');
      }
    } catch {
      setError('Unable to fetch the subject data');
    }
  };

  const runGetMeasures = async () => {
    try {
      const response = await getMeasures();
      if (response) {
        setError('');
        addMeasures(response.measures);
        addMeasureDates(response.measure_dates);
      } else {
        setError('No Measures');
      }
    } catch {
      setError('Unable to fetch the data');
    }
  };

  useEffect(() => {
    if (loginUser) {
      runGetMeasures();
      runGetSubjects();
    }
  }, []);

  const arMonth = getAvgRate(measureDates, measures, 'THIS_MONTH') || 0;
  const percentForChart = arMonth >= 100 ? 100 : arMonth;
  const leftPercentForChart = 100 - percentForChart;
  return loginUser ? (
    <div className="progress">
      <h1 className="heading">Your Progress</h1>
      <div className="content">
        {error && <p className="error-msg">{error}</p>}
        <div className="progress__header">
          <div className="progress__title">
            Average achievements rate for the last 30 days
          </div>
          <div className="progress__chart__text">
            <span className="txt">You achieved</span>
            <span className="num">
              {`${arMonth}`}
            </span>
            <span className="txt">on average</span>
          </div>
          <div className="progress__chart__container">
            <Chart
              width="400px"
              height="400px"
              chartType="PieChart"
              loader={<div className="loader">Loading...</div>}
              data={[['Pac Man', 'Percentage'], ['', percentForChart], ['', leftPercentForChart]]}
              options={{
                legend: 'none',
                pieSliceText: 'none',
                pieStartAngle: 0,
                tooltip: { trigger: 'none' },
                slices: {
                  0: { color: '#86df81' },
                  1: { color: '#eaeef1' },
                },
              }}
              rootProps={{ 'data-testid': '6' }}
            />
          </div>
        </div>
        <div className="progress__graph">
          <div className="progress__title">
            Weekly Achievements Rate (%)
          </div>
          <div className="progress__graph__container">
            <Chart
              width="100%"
              height="200px"
              chartType="Bar"
              loader={<div>Loading Chart</div>}
              data={[
                ['', ''],
                ['This week', getAvgRate(measureDates, measures, 'THIS_WEEK')],
                ['Last week', getAvgRate(measureDates, measures, 'LAST_WEEK')],
                ['2 weeks ago', getAvgRate(measureDates, measures, 'TWO_WEEKS_BEFORE')],
                ['3 weeks ago', getAvgRate(measureDates, measures, 'THREE_WEEKS_BEFORE')],
                ['Last month', getAvgRate(measureDates, measures, 'LAST_MONTH')],
              ]}
              rootProps={{ 'data-testid': '2' }}
            />
          </div>
        </div>
        <div className="progress__subjects mb3">
          {subjects.map((subject) => {
            const subjectTotalResult = getSubjectTotals(subject, measures);
            const formattedSubjectTotal = subjectTotalResult.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return (
              <div className="progress__subject" key={subject.id}>
                <div className="progress__subject__title">
                  {subject.title}
                </div>
                <div className="progress__subject__num">
                  {formattedSubjectTotal}
                </div>
                <div className="progress__subject__unit">
                  {pluralize(subject.unit, subjectTotalResult)}
                </div>
              </div>
            );
          })}
        </div>
        <Link to="/progress" className="btn">Share</Link>
      </div>
    </div>
  ) : <Redirect to="/" />;
};

const mapStateToProps = (state) => ({

  subjects: state.subjects,
  measures: state.measures,
  measureDates: state.measureDates,
  loginUser: state.user.logIn,
});

const mapDispatchToProps = (dispatch) => ({
  addSubjects: (subjects) => dispatch(addSubjects(subjects)),
  addMeasures: (measures) => dispatch(addMeasures(measures)),
  addMeasureDates: (measureDates) => dispatch(addMeasureDates(measureDates)),
});

Progress.propTypes = {
  subjects: PropTypes.instanceOf(Array),
  addSubjects: PropTypes.func,
  addMeasures: PropTypes.func,
  addMeasureDates: PropTypes.func,
  measureDates: PropTypes.instanceOf(Array),
  loginUser: PropTypes.bool.isRequired,
  measures: PropTypes.instanceOf(Array),
};

Progress.defaultProps = {
  subjects: [],
  addMeasures: null,
  addMeasureDates: null,
  addSubjects: null,
  measureDates: [],
  measures: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Progress);
