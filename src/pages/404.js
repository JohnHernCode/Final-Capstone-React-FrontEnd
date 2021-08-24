import React from 'react';
import { Link } from 'react-router-dom';
import image from '../images/404.jpg';

const NotFound = () => (
  <div className="notfound">
    <h1 className="heading">404 Not Found</h1>
    <div className="content">
      <img src={image} alt="404 Not Found" className="image mb2" />
      <Link to="/" className="btn">Home</Link>
    </div>
  </div>
);
export default NotFound;
