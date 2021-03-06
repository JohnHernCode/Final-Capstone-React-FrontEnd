import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({ adminUser, whileLoggedIn }) => {
  const [toggleClass, setToggleClass] = useState('');
  const onToggleMenu = () => {
    setToggleClass(toggleClass === ' active' ? '' : ' active');
  };
  const closeToggleMenu = () => {
    setToggleClass('');
  };

  return (
    <header className="header">
      <div className="header__title-wrap">
        <Link to="/" className="header__title">Study Up! </Link>
      </div>
      <button type="button" className={`header__toggle${toggleClass}`} onClick={onToggleMenu}>
        <span>&nbsp;</span>
        <span>&nbsp;</span>
        <span>&nbsp;</span>
      </button>
      <nav className={`header__nav${toggleClass}`}>
        <NavLink exact to="/" className="header__link" onClick={closeToggleMenu}>Home</NavLink>
        <NavLink exact to="/track/create" className="header__link" onClick={closeToggleMenu}>Add Time</NavLink>
        <NavLink exact to="/tracks" className="header__link" onClick={closeToggleMenu}>All Records</NavLink>
        <NavLink exact to="/progress" className="header__link" onClick={closeToggleMenu}>Progress</NavLink>
        <NavLink exact to="/more" className="header__link" onClick={closeToggleMenu}>More</NavLink>
        {!whileLoggedIn && (
          <>
            <NavLink exact to="/login" className="header__link" onClick={closeToggleMenu}>Login</NavLink>
            <NavLink exact to="/signup" className="header__link" onClick={closeToggleMenu}>Signup</NavLink>
          </>
        )}

        {(whileLoggedIn && adminUser) && (
          <>
            <NavLink exact to="/admin" className="header__link" onClick={closeToggleMenu}>Admin - Subject List</NavLink>
            <Link to="/admin/item/create" className="header__link" onClick={closeToggleMenu}>Admin - Add Subject</Link>
          </>
        )}
      </nav>
    </header>
  );
};

const mapStateToProps = (state) => ({
  adminUser: state.user.user.admin,
  whileLoggedIn: state.user.logIn,
});

Header.propTypes = {
  adminUser: PropTypes.bool,
  whileLoggedIn: PropTypes.bool,
};

Header.defaultProps = {
  adminUser: false,
  whileLoggedIn: false,
};

export default connect(mapStateToProps)(Header);
