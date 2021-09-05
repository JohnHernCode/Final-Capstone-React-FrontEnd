import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Logout from '../components/Logout';

const Home = ({ history, loginUser }) => (
  <div>
    <div className="content">
      <h2 className="home__heading">
        Welcome to the Study Up App!
      </h2>
      {loginUser ? <Logout history={history} /> : (
        <div className="home__buttons">
          <Link to="/login" className="home__btn">Login</Link>
          <Link to="/Signup" className="home__btn">Signup</Link>
        </div>
      )}

    </div>
  </div>
);

const mapStateToProps = (state) => ({
  loginUser: state.user.logIn,
});

Home.propTypes = {
  history: PropTypes.instanceOf(Object),
  loginUser: PropTypes.bool.isRequired,
};

Home.defaultProps = {
  history: null,
};

export default connect(mapStateToProps)(Home);
