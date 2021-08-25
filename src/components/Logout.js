import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logIn, setUser } from '../actions/user';
import { removeAllTracks } from '../actions/tracks';
import { removeAllTrackDates } from '../actions/trackDates';

const Logout = ({
  logIn, removeAllTracks, setUser, removeAllTrackDates,
}) => {
  const onLogout = () => {
    localStorage.removeItem('token');
    logIn(false);
    setUser({});
    removeAllTracks();
    removeAllTrackDates();
  };

  return (
    <button type="button" onClick={onLogout} className="home__btn">Logout</button>
  );
};

const mapDispatchToProps = (dispatch) => ({
  logIn: (status) => dispatch(logIn(status)),
  setUser: (user) => dispatch(setUser(user)),
  removeAllTracks: () => dispatch(removeAllTracks()),
  removeAllTrackDates: () => dispatch(removeAllTrackDates()),
});

Logout.propTypes = {
  logIn: PropTypes.func,
  removeAllTracks: PropTypes.func,
  removeAllTrackDates: PropTypes.func,
  setUser: PropTypes.func,
};

Logout.defaultProps = {
  logIn: null,
  removeAllTracks: null,
  removeAllTrackDates: null,
  setUser: null,
};

export default connect(undefined, mapDispatchToProps)(Logout);
