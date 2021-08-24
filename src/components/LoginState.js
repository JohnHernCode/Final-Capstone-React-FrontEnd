import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const LoginState = ({ loginS, user }) => (
  <div className="login-status">
    {loginS ? `Welcome, ${user.user.username}` : 'Please log in.'}
  </div>
);

const mapStateToProps = (state) => ({
  loginS: state.user.logIn,
  user: state.user,
});

LoginState.propTypes = {
  user: PropTypes.instanceOf(Object),
  loginS: PropTypes.bool,
};

LoginState.defaultProps = {
  user: {},
  loginS: false,
};

export default connect(mapStateToProps)(LoginState);
