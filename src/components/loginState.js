import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const loginState = ({ loginS, user }) => (
    <div className="login-status">
      {loginS ? `Welcome, ${user.user.username}` : 'Please log in.'}
    </div>
);

const mapStateToProps = (state) => ({
  loginS: state.user.logIn,
  user: state.user,
});

loginState.propTypes = {
  user: PropTypes.instanceOf(Object),
  loginS: PropTypes.bool,
};

loginState.defaultProps = {
  user: {},
  loginS: false,
};

export default connect(mapStateToProps)(loginState);
