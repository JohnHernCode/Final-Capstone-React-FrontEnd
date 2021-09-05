import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BiBuildingHouse, BiHelpCircle } from 'react-icons/bi';
import { GoSettings } from 'react-icons/go';
import { RiContactsLine } from 'react-icons/ri';
import { AiFillGithub } from 'react-icons/ai';
import thumb from '../images/default-icon.jpg';

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const More = ({ loginUser, userName }) => (loginUser ? (
  <div className="more">
    <div className="more__content">
      <div className="more__header">
        <div className="more__header__wrapper">
          <div className="more__thumb">
            <img src={thumb} alt={userName} className="more__thumb__image" />
          </div>
          <div className="more__names">
            <div className="more__names__name">{capitalize(userName)}</div>
            <div className="more__names__text">
              I&apos;m a super learner
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
          <RiContactsLine />
          Contact Us
        </Link>
        <Link className="more__link" to="/more">
          <AiFillGithub />
          Profile
        </Link>
        <Link className="more__link" to="/more">
          <GoSettings />
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

More.propTypes = {
  loginUser: PropTypes.bool.isRequired,
  userName: PropTypes.string,
};

More.defaultProps = {
  userName: 'Anonymous',
};

export default connect(mapStateToProps)(More);
