import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MeasureForm from '../components/measureForm';
import { addNewMeasure } from '../helpers/restMeasures';
import { getSubjects } from '../helpers/restSubjects';
import addSubjects from '../actions/subjects';
import getSubjectTitles from '../helpers/getSubjectTitles';

const AddMeasure = ({
  loginUser, measures, history, subjects, addSubjects,
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
        setError('No Items');
      }
    } catch {
      setError('Unable to fetch the item data');
    }
  };
  useEffect(() => {
    runGetSubjects();
  }, []);

  const runAddNewMeasure = async (result, subjectId, date) => {
    try {
      setError('');
      await addNewMeasure(result, subjectId, date);
    } catch {
      setError('Unable to create new tracks');
    }
  };

  const handleSubmit = (StrDate, state) => {
    const sameDateMeasure = measures.find((measure) => measure.date === StrDate);
    if (sameDateMeasure) {
      setError('Measurement for the same date already exists');
    } else {
      setError('');
      setMsg('Adding measurement now...');
      Object.keys(state).forEach((key) => {
        if (state[key]) {
          runAddNewMeasure(state[key], key, StrDate);
        }
      });
      setTimeout(() => {
        history.push('/measures');
      }, 800);
    }
  };

  const subjectTitles = getSubjectTitles(subjects, undefined);

  return (loginUser ? (
    <div className="add-track">
      <h1 className="heading">Add Measurement</h1>
      <div className="content">
        <div className="content__msg">Welcome back. Let&apos;s add your measurement for today!</div>
        <MeasureForm handleSubmit={handleSubmit} subjectTitles={subjectTitles} targetDate={null} />
        {msg && <p className="info-msg">{msg}</p>}
        {error && <p className="error-msg">{error}</p>}
        <Link to="/measures" className="btn">Cancel & Back to Measurement List</Link>
      </div>
    </div>
  ) : <Redirect to="/" />);
};

const mapStateToProps = (state) => ({
  subjects: state.subjects,
  measures: state.measures,
  loginUser: state.user.logIn,
});

const mapDispatchToProps = (dispatch) => ({
  addSubjects: (subjects) => dispatch(addSubjects(subjects)),
});

AddMeasure.propTypes = {
  subjects: PropTypes.instanceOf(Array),
  loginUser: PropTypes.bool.isRequired,
  measures: PropTypes.instanceOf(Array),
  history: PropTypes.instanceOf(Object),
  addSubjects: PropTypes.func,
};

AddMeasure.defaultProps = {
  subjects: [],
  measures: [],
  history: null,
  addSubjects: null,
};
export default connect(mapStateToProps, mapDispatchToProps)(AddMeasure);
