import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logIn, setUser } from '../actions/user';
import { removeAllMeasures } from '../actions/measures';
import { removeAllMeasureDates } from '../actions/measureDates';

const logout = ({
                     logIn, removeAllMeasures, setUser, removeAllMeasureDates,
                   }) => {
  const onLogout = () => {
    localStorage.removeSubject('token');
    logIn(false);
    setUser({});
    removeAllMeasures();
    removeAllMeasureDates();
  };

  return (
      <button type="button" onClick={onLogout} className="btn">Logout</button>
  );
};

const mapDispatchToProps = (dispatch) => ({
  logIn: (status) => dispatch(logIn(status)),
  setUser: (user) => dispatch(setUser(user)),
  removeAllMeasures: () => dispatch(removeAllMeasures()),
  removeAllMeasureDates: () => dispatch(removeAllMeasureDates()),
});

logout.propTypes = {
  logIn: PropTypes.func,
  removeAllMeasures: PropTypes.func,
  removeAllMeasureDates: PropTypes.func,
  setUser: PropTypes.func,
};

logout.defaultProps = {
  logIn: null,
  removeAllMeasures: null,
  removeAllMeasureDates: null,
  setUser: null,
};

export default connect(undefined, mapDispatchToProps)(logout);
