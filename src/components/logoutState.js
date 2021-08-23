import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logIn, setUser } from '../actions/user';
import { removeAllMeasurements } from '../actions/measurements';
import { removeAllMeasurementDates } from '../actions/measurementDates';

const Logout = ({
                     logIn, removeAllMeasurements, setUser, removeAllMeasurementDates,
                   }) => {
  const onLogout = () => {
    localStorage.removeItem('token');
    logIn(false);
    setUser({});
    removeAllMeasurements();
    removeAllMeasurementDates();
  };

  return (
      <button type="button" onClick={onLogout} className="btn">Logout</button>
  );
};

const mapDispatchToProps = (dispatch) => ({
  logIn: (status) => dispatch(logIn(status)),
  setUser: (user) => dispatch(setUser(user)),
  removeAllMeasurements: () => dispatch(removeAllMeasurements()),
  removeAllMeasurementDates: () => dispatch(removeAllMeasurementDates()),
});

Logout.propTypes = {
  logIn: PropTypes.func,
  removeAllMeasurements: PropTypes.func,
  removeAllMeasurementDates: PropTypes.func,
  setUser: PropTypes.func,
};

Logout.defaultProps = {
  logIn: null,
  removeAllMeasurements: null,
  removeAllMeasurementDates: null,
  setUser: null,
};

export default connect(undefined, mapDispatchToProps)(Logout);
