import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MeasureForm from '../components/measureForm';
import { updateMeasure, addNewMeasure } from '../helpers/restMeasures';
import { getSubjects } from '../helpers/restSubjects';
import addSubjects from '../actions/subjects';
import getSubjectTitles from '../helpers/getSubjectTitles';

const EditMeasure = ({
  loginUser, history, subjects, addSubjects, sameDateMeasures, targetDate,
}) => {
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const runGetSubjects = async () => {
    try {
      setError('');
      const response = await getSubjects();
      if (response.length > 0) {
        addSubjects(response);
      } else {
        setError('No Subjects');
      }
    } catch {
      setError('Unable to fetch the subject data');
    }
  };
  useEffect(() => {
    runGetSubjects();
  }, []);

  const runUpdateMeasure = async (measureId, result, subjectId, date) => {
    try {
      setError('');
      await updateMeasure(measureId, result, subjectId, date);
    } catch {
      setError('Unable to update the track');
    }
  };

  const runAddNewMeasure = async (result, subjectId, date) => {
    try {
      setError('');
      await addNewMeasure(result, subjectId, date);
    } catch {
      setError('Unable to create new tracks');
    }
  };

  const handleSubmit = (StrDate, state) => {
    Object.keys(state).forEach((key) => {
      const submitSubjectId = Number(key);
      const submitSubjectValue = state[key];

      // eslint-disable-next-line max-len
      const sameSubjectMeasure = sameDateMeasures.find((measure) => measure.subject_id === submitSubjectId);
      if (sameSubjectMeasure && submitSubjectValue) {
        runUpdateMeasure(sameSubjectMeasure.id, submitSubjectValue, submitSubjectId, StrDate);
      } else if (submitSubjectValue) {
        runAddNewMeasure(submitSubjectValue, submitSubjectId, StrDate);
      }
    });
    if (!error) {
      setMsg('Updating measurement now...');
      setTimeout(() => {
        history.push(`/measures/${StrDate}`);
      }, 800);
    }
  };
  const subjectTitles = getSubjectTitles(subjects, sameDateMeasures);

  return (loginUser ? (
    <div className="add-measure">
      <h1 className="heading">Edit Measurement</h1>
      <div className="content">
        {error && <p className="error-msg">{error}</p>}
        <MeasureForm
          handleSubmit={handleSubmit}
          subjectTitles={subjectTitles}
          targetDate={targetDate}
        />
        {msg && <p className="info-msg">{msg}</p>}
        <Link to="/measures" className="btn">Cancel & Back to Measurements List</Link>
      </div>
    </div>
  ) : <Redirect to="/" />);
};

const mapStateToProps = (state, props) => ({
  sameDateMeasures: state.measures.filter((measure) => measure.date === props.match.params.id),
  subjects: state.subjects,
  loginUser: state.user.logIn,
  targetDate: Number(props.match.params.id),
});

const mapDispatchToProps = (dispatch) => ({
  addSubjects: (subjects) => dispatch(addSubjects(subjects)),
});

EditMeasure.propTypes = {
  subjects: PropTypes.instanceOf(Array),
  loginUser: PropTypes.bool.isRequired,
  history: PropTypes.instanceOf(Object),
  addSubjects: PropTypes.func,
  sameDateMeasures: PropTypes.instanceOf(Array),
  targetDate: PropTypes.number,
};

EditMeasure.defaultProps = {
  subjects: [],
  history: null,
  addSubjects: null,
  sameDateMeasures: [],
  targetDate: null,
};
export default connect(mapStateToProps, mapDispatchToProps)(EditMeasure);
