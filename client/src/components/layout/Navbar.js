import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaThinkPeaks } from 'react-icons/fa';
import AuthContext from '../../context/auth/authContext';

const Navbar = ({ title }) => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, user, logout } = authContext;

  const handleLogout = () => {
    logout();
  };

  const authLinks = (
    <Fragment>
      <ul className='navbar-nav mr-auto mt-2 mt-lg-0'>
        <li className='nav-item'>
          <Link to='/' className='nav-link'>
            Exercises
          </Link>
        </li>
        <li className='navbar-item'>
          <Link to='/create' className='nav-link'>
            Create Exercise Log
          </Link>
        </li>
        <li className='navbar-item'>
          <Link to='/about' className='nav-link'>
            About
          </Link>
        </li>
      </ul>
      <ul className='navbar-nav mr-4'>
        <li className='navbar-item'>
          <div className='nav-link'>Hello {user && user.name}</div>
        </li>
        <li className='navbar-item'>
          <a href='#!' onClick={handleLogout} className='nav-link'>
            <i className='fas fa-sign-out-alt'></i> <span>Logout</span>
          </a>
        </li>
      </ul>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <ul className='navbar-nav mr-4'>
        <li className='navbar-item'>
          <Link to='/register' className='nav-link'>
            Register
          </Link>
        </li>
        <li className='navbar-item'>
          <Link to='/login' className='nav-link'>
            Login
          </Link>
        </li>
      </ul>
    </Fragment>
  );

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <Link to='/' className='navbar-brand'>
        <FaThinkPeaks /> {title}
      </Link>
      <button
        className='navbar-toggler collapsed'
        type='button'
        data-toggle='collapse'
        data-target='#navbarTogglerDemo02'
        aria-controls='navbarTogglerDemo02'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>

      <div
        className='collape navbar-collapse collapse'
        id='navbarTogglerDemo02'
      >
        {isAuthenticated ? authLinks : guestLinks}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired
};

Navbar.defaultProps = {
  title: 'Exercises Tracker'
};

export default Navbar;
