import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

const Header = () => {
  return (
    <div className="navbar-fixed">
      <nav>
        <div className="container nav-wrapper">
          <Link to="/" className="brand-logo white-text">
            Counterpick App
          </Link>
          <ul className="hide-on-med-and-down right">
            <li>
              <Link to="/" className="white-text">
                Personajes
              </Link>
            </li>
            <li>
              <GoogleAuth />
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
