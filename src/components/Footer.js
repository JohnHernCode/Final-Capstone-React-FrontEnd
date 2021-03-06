import React from 'react';
import { NavLink } from 'react-router-dom';
import { BiBarChart, BiPieChartAlt2 } from 'react-icons/bi';
import { BsCheck, BsThreeDots } from 'react-icons/bs';

const Footer = () => (
  <footer className="footer">
    <nav className="footer__nav">
      <NavLink to="/track/create" className="footer__nav__item">
        <BiBarChart />
        <span className="footer__nav__item__text">Add Time</span>
      </NavLink>
      <NavLink to="/tracks" className="footer__nav__item">
        <BsCheck />
        <span className="footer__nav__item__text">Records</span>
      </NavLink>
      <NavLink to="/progress" className="footer__nav__item">
        <BiPieChartAlt2 />
        <span className="footer__nav__item__text">Your Progress</span>
      </NavLink>
      <NavLink to="/more" className="footer__nav__item">
        <BsThreeDots />
        <span className="footer__nav__item__text">More</span>
      </NavLink>
    </nav>
  </footer>
);

export default Footer;
