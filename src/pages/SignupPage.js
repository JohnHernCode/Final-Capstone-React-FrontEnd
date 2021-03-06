import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import UsersForm from '../components/UserForm';
import { signedUp } from '../api/userAuth';
import { logIn, setUser } from '../actions/user';

const SignupPage = ({
  history, setUser, logIn, loginUser,
}) => {
  const [errors, setErrors] = useState([]);
  const [msg, setMsg] = useState('');

  const runSignedUpAuth = async (username, password) => {
    try {
      const response = await signedUp(username, password);
      if (response.status === 'created') {
        setMsg('Logging in...');
        setErrors([]);
        localStorage.setItem('token', response.token);
        setUser(response.user);
        logIn(true);
        history.push('/tracks');
      } else if (response.errors.length > 0) {
        setMsg('');
        setErrors(response.errors);
      }
    } catch {
      setMsg('');
      setErrors(['Sign up failed.']);
    }
  };

  const handleSubmit = (username, password) => {
    runSignedUpAuth(username, password);
  };

  return loginUser ? <Redirect to="/tracks" /> : (
    <div>
      <h1 className="home__heading">Signup</h1>
      <div className="content">
        {errors && errors.map((error) => (<p key={error} className="error-msg">{error}</p>))}
        {msg && <p className="info-msg">{msg}</p>}
        <UsersForm handleSubmit={handleSubmit} btnName="Sign Up" />
        <Link to="/" className="home__btn">Go back to Home</Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  adminStatus: state.user.user.admin,
  loginUser: state.user.logIn,
});

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(setUser(user)),
  logIn: (status) => dispatch(logIn(status)),
});

SignupPage.propTypes = {
  history: PropTypes.instanceOf(Object),
  logIn: PropTypes.func,
  setUser: PropTypes.func,
  loginUser: PropTypes.bool.isRequired,
};

SignupPage.defaultProps = {
  history: null,
  logIn: null,
  setUser: null,
};
export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
