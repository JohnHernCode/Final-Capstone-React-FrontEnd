import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import pluralize from 'pluralize';
import { moment } from '../api/api';

const measureForm = ({
                     subjects, handleSubmit, subjectTitles, targetDate,
                   }) => {
  const [error, setError] = useState('');
  const [date, setDate] = useState(targetDate ? moment(targetDate).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'));
  const [state, setState] = useState(subjectTitles);

  const onDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleInputChange = (value, nameSubjectNum) => {
    if (value.match(/^[0-9\s]{0,3}$/)) {
      setError('');
      setState({ ...state, [nameSubjectNum]: value });
    } else {
      setError('Please provide an integer with maximum of 3 digits');
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formattedDate = String(moment(date).valueOf());
    handleSubmit(formattedDate, state);
  };

  return (
      <div className="measure-form mb3">
        {error && <p className="error-msg">{error}</p>}
        <form className="measure-form__form mb3" onSubmit={onSubmit}>
          <div className="measure-form__date">
            <input type="date" onChange={onDateChange} value={date} />
          </div>
          <div className="measure-form__group mb3">
            {subjects.map((subject) => (
                <div className="measure-form__subject" key={subject.id}>
                  <div className="measure-form__icon">
                    <span className="iconify" data-icon={subject.icon} data-inline="false" />
                  </div>
                  <div className="measure-form__title">{subject.title}</div>
                  <input
                      type="number"
                      name={subject.title}
                      className="measure-form__input"
                      maxLength="4"
                      onChange={(e) => handleInputChange(e.target.value, subject.id)}
                      value={state[subject.id]}
                  />
                  <div className="measure-form__unit">{pluralize(subject.unit, state[subject.id])}</div>
                  <div className="measure-form__target">{`/ ${subject.target}`}</div>
                </div>
            ))}
          </div>
          <button type="submit" className="btn dark">Save</button>
        </form>
      </div>
  );
};

const mapStateToProps = (state) => ({
  subjects: state.subjects,
});

measureForm.propTypes = {
  subjects: PropTypes.instanceOf(Object),
  handleSubmit: PropTypes.func,
  subjectTitles: PropTypes.instanceOf(Object),
  targetDate: PropTypes.number,
};

measureForm.defaultProps = {
  subjects: [],
  handleSubmit: null,
  subjectTitles: {},
  targetDate: 0,
};

export default connect(mapStateToProps)(measureForm);
