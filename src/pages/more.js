import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BiBuildingHouse, BiHelpCircle } from 'react-icons/bi';
import { GrContact, GrSettingsOption } from 'react-icons/gr';
import { AiFillGithub } from 'react-icons/ai';
import thumb from '../images/default-icon.jpg';

const more = ({ loginUser, userName }) => (loginUser ? (
  <div className="more">
    <h1 className="heading">More</h1>
    <div className="more__content">
      <div className="more__header">
        <div className="more__header__wrapper">
          <div className="more__thumb">
            <img src={thumb} alt={userName} className="more__thumb__image" />
          </div>
          <div className="more__names">
            <div className="more__names__name">{userName}</div>
            <div className="more__names__text">
              I am brushing up my spoken English!
            </div>
          </div>
        </div>
      </div>
      <div className="more__items">
        <Link className="more__link" to="/more">
          <BiBuildingHouse />
          About Us
        </Link>
        <Link className="more__link" to="/more">
          <GrContact />
          Contact Us
        </Link>
        <Link className="more__link" to="/more">
          <AiFillGithub />
          Profile
        </Link>
        <Link className="more__link" to="/more">
          <GrSettingsOption />
          Settings
        </Link>
        <Link className="more__link" to="/more">
          <BiHelpCircle />
          Help
        </Link>
      </div>
    </div>
  </div>
) : <Redirect to="/" />);

const mapStateToProps = (state) => ({
  loginUser: state.user.logIn,
  userName: state.user.user.username,
});

more.propTypes = {
  loginUser: PropTypes.bool.isRequired,
  userName: PropTypes.string,
};

more.defaultProps = {
  userName: 'Anonymous',
};

export default connect(mapStateToProps)(more);
