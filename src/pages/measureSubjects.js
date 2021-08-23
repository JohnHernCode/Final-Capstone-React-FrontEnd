import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { GrCaretPrevious, GrCaretNext } from 'react-icons/gr';
import PropTypes from 'prop-types';
import Chart from 'react-google-charts';
import { moment } from '../api/api';
import { getSubjects } from '../helpers/restSubjects';
import { addMeasures } from '../actions/measures';
import { addMeasureDates } from '../actions/measureDates';
import { removeMeasureFromDB, getMeasures } from '../helpers/restMeasures';
import measureSubject from '../components/measureSubject';
import addSubjects from '../actions/subjects';
import calcAchieveTotalRate from '../helpers/calcAchieveTotalRate';

const measureSubjects = ({
                      sameDateMeasures,
                      subjects,
                      loginUser,
                      addSubjects,
                      date,
                      measureDates,
                      currentIndex,
                      history,
                      addMeasures,
                      addMeasureDates,
                    }) => {
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const runGetSubjects = async () => {
    try {
      const response = await getSubjects();
      if (response.length > 0) {
        setError('');
        addSubjects(response);
      } else {
        setError('No Items');
      }
    } catch {
      setError('Unable to fetch the item data');
    }
  };

  const runGetMeasures = async () => {
    try {
      const response = await getMeasures();
      if (response) {
        setError('');
        addMeasures(response.records);
        addMeasureDates(response.measure_dates);
      } else {
        setError('No Tracks');
      }
    } catch {
      setError('Unable to fetch the data');
    }
  };

  useEffect(() => {
    if (loginUser) {
      runGetSubjects();
      runGetMeasures();
    }
  }, []);

  const runRemoveMeasureFromDB = async (id) => {
    try {
      setError('');
      await removeMeasureFromDB(id);
    } catch {
      setError('Sorry, unable to remove');
    }
  };

  const handleRemoveMeasure = () => {
    sameDateMeasures.forEach((measure) => {
      runRemoveMeasureFromDB(measure.id);
    });
    if (!error) {
      setMsg('Removing now...');
      setTimeout(() => {
        history.push('/measures');
      }, 800);
    }
  };

  const totalRate = calcAchieveTotalRate(sameDateMeasures, subjects.length) || 0;
  const rateForChart = totalRate >= 100 ? 100 : totalRate;
  const leftRateForChart = 100 - rateForChart;

  return loginUser ? (
      <div className="subjects">
        {error && <p className="error-msg">{error}</p>}
        <h1 className="heading">Track it</h1>
        <div className="subjects__header">
          <div className="subjects__date">
            <Link to={measureDates[currentIndex - 1] || measureDates[currentIndex] || ''}>
              <GrCaretPrevious />
            </Link>
            <span>{moment(date).format('MMM Do YYYY')}</span>
            <Link to={measureDates[currentIndex + 1] || measureDates[currentIndex] || ''}>
              <GrCaretNext />
            </Link>
          </div>
          <div className="items__overview">
            <div className="items__chart__container">
              <Chart
                  width="180px"
                  height="180px"
                  chartType="PieChart"
                  loader={<div className="loader">Loading...</div>}
                  data={[['Pac Man', 'Percentage'], ['', rateForChart], ['', leftRateForChart]]}
                  options={{
                    legend: 'none',
                    pieSliceText: 'none',
                    pieStartAngle: 0,
                    tooltip: { trigger: 'none' },
                    slices: {
                      0: { color: '#41b5e8' },
                      1: { color: '#eaeef1' },
                    },
                  }}
                  rootProps={{ 'data-testid': '6' }}
              />
            </div>
            <div className="items__chart__comment">
              {`Achievements rate: ${rateForChart} %`}
            </div>
          </div>
        </div>
        <div className="content">
          <div className="items__list mb3">
            {subjects.map((item) => {
              const targetTrack = sameDateMeasures.find((measure) => measure.subject_id === subject.id);
              return (
                  <measureSubject
                      key={subject.id}
                      subject={subject}
                      result={targetMeasure ? targetMeasure.result : 0}
                      targetDate={date}
                  />
              );
            })}
          </div>
          {msg && <p className="info-msg">{msg}</p>}
          <Link to={`/measure/${Number(date)}/edit`} className="btn dark mb3">Edit this measurement</Link>
          <button type="button" onClick={handleRemoveMeasure} className="btn mb2 warn">Remove this measurement</button>
          <Link to="/measures" className="btn">Back to all measurements</Link>
        </div>
      </div>
  ) : <Redirect to="/" />;
};

const mapStateToProps = (state, props) => ({
  sameDateMeasures: state.measures.filter((measure) => measure.date === props.match.params.id),
  subjects: state.subjects,
  measureDates: state.measureDates,
  loginUser: state.user.logIn,
  date: Number(props.match.params.id),
  currentIndex: state.measureDates.findIndex((date) => date === props.match.params.id),
});

const mapDispatchToProps = (dispatch) => ({
  addSubjects: (subjects) => dispatch(addSubjects(subjects)),
  addMeasures: (measures) => dispatch(addMeasures(measures)),
  addMeasureDates: (measureDates) => dispatch(addMeasureDates(measureDates)),
});

measureSubjects.propTypes = {
  addMeasures: PropTypes.func,
  addMeasureDates: PropTypes.func,
  history: PropTypes.instanceOf(Object),
  sameDateMeasures: PropTypes.instanceOf(Array),
  loginUser: PropTypes.bool.isRequired,
  subjects: PropTypes.instanceOf(Object),
  addSubjects: PropTypes.func,
  date: PropTypes.number,
  measureDates: PropTypes.instanceOf(Array),
  currentIndex: PropTypes.number,
};

measureSubjects.defaultProps = {
  addMeasures: null,
  addMeasureDates: null,
  history: null,
  sameDateMeasures: [],
  subjects: [],
  addSubjects: null,
  date: 0,
  measureDates: [],
  currentIndex: -1,
};

export default connect(mapStateToProps, mapDispatchToProps)(measureSubjects);
