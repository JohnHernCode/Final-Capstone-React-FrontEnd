import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { moment } from '../api/api';
import MeasureListSubject from '../components/measureListSubject';
import { getMeasures } from '../helpers/restMeasures';
import { getSubjects } from '../helpers/restSubjects';
import { addMeasures } from '../actions/measures';
import addSubjects from '../actions/subjects';
import { addMeasureDates } from '../actions/measureDates';

const MeasureList = ({
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
        setError('No Items');
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

  return loginUser ? (
    <div className="MeasureList">
      <h1 className="heading">All measures</h1>
      <div className="content">
        {error && <p className="error-msg">{error}</p>}
        <div className="measures mb3">
          {measureDates.length > 0 && measureDates.map((measureDate) => {
            const milSec = Number(measureDate);
            const sameDateMeasures = measures.filter((measure) => moment(Number(measure.date)).isSame(moment(milSec), 'day'));

            return (
              <MeasureListSubject
                milSec={milSec}
                key={milSec}
                sameDateMeasures={sameDateMeasures}
                subjectNum={subjects.length}
              />
            );
          })}
        </div>
        <Link to="measure/create" className="btn dark">Add New measure</Link>
      </div>
    </div>
  ) : <Redirect to="/" />;
};

const mapDispatchToProps = (dispatch) => ({
  addMeasures: (measures) => dispatch(addMeasures(measures)),
  addMeasureDates: (measureDates) => dispatch(addMeasureDates(measureDates)),
  addSubjects: (subjects) => dispatch(addSubjects(subjects)),
});

const mapStateToProps = (state) => ({
  subjects: state.subjects,
  measures: state.measures,
  measureDates: state.measureDates,
  loginUser: state.user.logIn,
});

MeasureList.propTypes = {
  addMeasures: PropTypes.func,
  addMeasureDates: PropTypes.func,
  addSubjects: PropTypes.func,
  measureDates: PropTypes.instanceOf(Array),
  loginUser: PropTypes.bool.isRequired,
  measures: PropTypes.instanceOf(Array),
  subjects: PropTypes.instanceOf(Array),
};

MeasureList.defaultProps = {
  addMeasures: null,
  addMeasureDates: null,
  addSubjects: null,
  measureDates: [],
  measures: [],
  subjects: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(MeasureList);
